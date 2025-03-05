import { create } from 'zustand'
import { UhsTasksStore, UhsTask } from './types'

import { useUHSWallet } from './UHSWallet';

const uhsWalletStore = useUHSWallet;

export const useUhsTasks = create<UhsTasksStore>((set) => ({
    tasks: [],
    isLoading: true,
    checkTask: async (uhsUserId, userId, chatId, taskId) => {
        console.log("Checking task:", { uhsUserId, userId, chatId, taskId });
        const { getBalance } = uhsWalletStore.getState();
        set({ isLoading: true });
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SECRET_HOST}uhstasks/checkSub?uhsUserId=${uhsUserId}&userId=${userId}&chatId=${chatId}&taskId=${taskId}`,
                { method: "GET" }
            );

            const data = await response.json();
            console.log("Task check result:", data);

            if (data.success) {
                // Если задача выполнена, обновляем список задач
                useUhsTasks.getState().getTasks(uhsUserId);
                await getBalance(uhsUserId);
            }
        } catch (error) {
            console.error("Error checking task:", error);
        } finally {
            set({ isLoading: false });
        }
    },
    getTasks: async (userId) => {
        console.log('userIdTasks: ', userId)
        set({ isLoading: true });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhstasks/usertasks/${userId}`);
            if (!response.ok) throw new Error('Failed to fetch tasks');

            const data: UhsTask[] = await response.json();
            console.log('TASKS for USER:', data)
            set({ tasks: data, isLoading: false });
        } catch (err) {
            console.log('Error fetching tasks:', err);
            set({ isLoading: false });
        }
    },
}))
