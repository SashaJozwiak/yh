import { create } from 'zustand';
import { StartupStore } from './types'

export const useStartupStore = create<StartupStore>((set) => ({
    startups: [],
    isLoading: true,
    fetchStartups: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhslaunch/startups`);
            if (!response.ok) throw new Error('Failed to fetch startups');

            const data = await response.json();
            set({ startups: data });
        } catch (error) {
            console.error('Error fetching startups:', error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
