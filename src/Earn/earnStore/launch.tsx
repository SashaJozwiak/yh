import { create } from 'zustand';
import { useUHSWallet } from './UHSWallet';

import { StartupStore } from './types'

export const useStartupStore = create<StartupStore>((set, get) => ({
    startups: [],
    isLoading: true,
    addIsLoading: false,
    isGetStartups: false,
    addInvest: async (userId, startupId, currency, amount, amountInUsd, total) => {
        set({ addIsLoading: true });

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhslaunch/addInvest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    startupId,
                    currency,
                    amount,
                    amountInUsd,
                    total,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Ошибка при добавлении инвестиций");
            }

            console.log('add invest? ', data)

            /* set((state) => ({
                investments: [...state.investments, { userId, startupId, currency, amount, total }],
            })); */

        } catch (error) {
            console.error("Ошибка при добавлении инвестиций:", error);
        } finally {
            set({ addIsLoading: false });
            get().fetchStartups();
            useUHSWallet.getState().getBalance(userId)
            useUHSWallet.getState().getShares(userId)
        }
    },
    fetchStartups: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhslaunch/startups`);
            if (!response.ok) throw new Error('Failed to fetch startups');

            const data = await response.json();
            set({ startups: data, isGetStartups: true });
        } catch (error) {
            console.error('Error fetching startups:', error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
