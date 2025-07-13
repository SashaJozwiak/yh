
import { create } from 'zustand'
import { TradeAssets } from './types'

export const useTradeAssets = create<TradeAssets>((set) => ({
    //isOpenWallet: false,
    assets: [],
    isLoadAssets: false,
    currency: 'UHS',
    getAssets: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhstradeassets/assets`);
            if (!response.ok) throw new Error('Failed to fetch startups');

            const data = await response.json();
            console.log('assets trade: ', data)
            set({ assets: data, isLoadAssets: true });
        } catch (error) {
            console.error('Error fetching startups:', error);
        } finally {
            set({ isLoadAssets: false });
        }
    },
    setCurrency: (curr) => {
        set({
            currency: curr
        })
    }
}))
