
import { create } from 'zustand'
import { UseHistory } from './types'
import { useUHSWallet } from './UHSWallet'; // Импорт для типа, но не используем как хук

// Получаем сам объект стора напрямую
const uhsWalletStore = useUHSWallet;

export const useHistory = create<UseHistory>((set) => ({
    transactions: [],
    loading: false,
    error: null,
    getHistory: async (userId) => {
        set({ loading: true, error: null });
        console.log('uhsId for history: ', userId)

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}txs/history/${userId}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('history tx: ', data)

            set({ transactions: data, loading: false });
        } catch (error) {
            set({ error: "Ошибка загрузки транзакций", loading: false });
            console.error(error);
        } finally {
            const { getBalance } = uhsWalletStore.getState();
            await getBalance(userId);
        }
    },
}))
