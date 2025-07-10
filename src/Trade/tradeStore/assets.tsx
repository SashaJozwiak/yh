
import { create } from 'zustand'
//import { tradeNav } from './types'
//import { Nav } from './types'

export const useTradeAssets = create/* <tradeAssets> */((set) => ({
    //isOpenWallet: false,
    tool: 'assets',// assets, shop, services, uh-pay
    assets: [],
    getAssets: async () => {
        /* try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhslaunch/startups`);
            if (!response.ok) throw new Error('Failed to fetch startups');

            const data = await response.json();
            set({ startups: data, isGetStartups: true });
        } catch (error) {
            console.error('Error fetching startups:', error);
        } finally {
            set({ isLoading: false });
        } */
    },
    setTool: (tool: string) => set({ tool }),
}))
