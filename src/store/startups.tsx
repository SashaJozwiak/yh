import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UseStartups } from '../types/stores';

export const useStartups = create<UseStartups>()(devtools((set, get) => ({
    bal: [
        {
            name: 'APPName',
            address: 'some',
            value: 0,
            range: [10000, 2000000],
            inH: 10,
            speed: 0,
            src: 'link',
        },
    ],
    loadStatus: false,
    getStartupBal: async () => {
        try {
            /* const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}profile/top100`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to update user in DB');
            }

            const data = await response.json();
            set(() => (
                {
                    top100: data,
                }
            )) */
            set((state) => state);

        } catch (e) {
            /* console.error('ошибка выдачи топ 100', e) */
        }
    },
    updateSpeed: (name: string, speed: number) => set((state) => ({
        bal: state.bal.map(item =>
            item.name === name ? { ...item, speed } : item
        ),
    })),
    totalSpeed: () => {
        const state = get();
        return state.bal.reduce((acc, currency) => {
            return acc + currency.speed;
        }, 0);
    },
})))
