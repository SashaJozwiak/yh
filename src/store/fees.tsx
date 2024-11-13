import { create } from 'zustand'

import { UseFees } from '../types/stores';

import { calculateCommission } from '../utils/math/calculateCommission'


export const useFees = create<UseFees>((set, get) => ({
    deckState: null,
    commission: 40, // Default commission
    isLoading: false,
    transactions: [],
    isLoadingHistory: false,
    fetchTransactionHistory: async (userId) => {
        set({ isLoadingHistory: true });

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}transfers/transaction-history/${userId}`);
            const transactions = await response.json();
            set({ transactions });
            console.log('transactions', transactions);
        } catch (error) {
            console.error("Ошибка при получении истории транзакций:", error);
        } finally {
            set({ isLoadingHistory: false });
        }
    },
    fetchDeckState: async (userId) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}transfers/deck-state/${userId}`);
            const deckState = await response.json();

            if (!response.ok) {
                set({ commission: 40 });
                return;
            }

            set({ deckState });
            set({ commission: calculateCommission(deckState.cards) });

            console.log(deckState, get().commission);

        } catch (error) {
            console.error("Error fetching deck state:", error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
