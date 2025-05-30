import { create } from 'zustand'
import { UhsTasksStore, UhsTask } from './types'

import { useUHSWallet } from './UHSWallet';
import { useEarnNav } from './nav';

const uhsWalletStore = useUHSWallet;
const useEarnNavStore = useEarnNav;

export const useUhsTasks = create<UhsTasksStore>((set) => ({
    tasks: [],
    adTask: false,
    adTaskLoading: true,
    adTaskTimestamp: null,
    isLoading: true,
    isLoadingAdd: false,
    checkBotState: false,
    isOk: true,
    setAdTask: (isTrue) => set({ adTask: isTrue }),
    setIsOk: (isOk) => set({ isOk }),
    rewardAdTask: async (userId, internalId) => {
        set({ adTaskLoading: true });
        const { getBalance } = uhsWalletStore.getState();
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhstasks/agTaskReward`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    internal_id: internalId
                })
            });

            if (!response.ok) {
                throw new Error(`Ошибка при начислении награды: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Награда начислена:', data);
            set({ adTaskTimestamp: new Date().toISOString() })

            await getBalance(userId);

        } catch (error) {
            console.error('Ошибка в rewardAdTask:', error);

        } finally {
            set({ adTaskLoading: false, adTask: false });
        }
    },
    getAGTask: async (userId) => {
        //console.log('userIdTasks: ', userId)
        set({ adTaskLoading: true });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhstasks/agTaskState?userId=${userId}`);
            if (!response.ok) throw new Error('Failed to fetch tasks');

            const data = await response.json();
            console.log('AD TASK STATE:', data)
            //set({ tasks: data, isLoading: false });
            //set({ adTaskLoading: false, adTask: data.isTaskActive });
            set({ adTaskLoading: false, adTask: data.claim, adTaskTimestamp: data.timestamp });
        } catch (err) {
            console.log('Error fetching tasks:', err);
            set({ adTaskLoading: false });
        }

    },
    addTask: async (userId, title, description, currency, price, count, balance, src) => {
        set({ isLoadingAdd: true });
        const { getBalance } = uhsWalletStore.getState();
        try {
            console.log('Adding task with:', userId, title, description, currency, price, count, balance, src);

            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhstasks/addTask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, title, description, currency, price, count, balance, src })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to add task');
            }

            console.log('Task added successfully:', data);
            useUhsTasks.getState().getTasks(userId);
            await getBalance(userId);
            useEarnNavStore.getState().setTasks('easy')

            //return data;
        } catch (err) {
            console.error('Error adding task:', err);
            throw err;
        } finally {
            set({ isLoadingAdd: false });

        }
    },
    checkBot: async (userId, chatId) => {
        console.log('userId, chatId for check: ', userId, chatId)
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhstasks/checkBot/?userId=${userId}&chatId=${chatId}`,
                { method: "GET" }
            );

            if (!response.ok) throw new Error('Failed to fetch tasks');

            const data = await response.json();
            console.log('Check ok?:', data)
            set({ checkBotState: data.isMember });

        } catch (err) {
            console.log('Error fetching tasks:', err);
        }

    },
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
