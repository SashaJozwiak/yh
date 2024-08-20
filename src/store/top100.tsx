import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UsersFromTop100 } from '../types/stores';

export const useTop100 = create<UsersFromTop100>()(devtools((set) => ({
    top100: [
    ],
    getTop100: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}profile/top100`, {
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
            ))
        } catch (e) {
            console.error('ошибка выдачи топ 100', e)
        }
    }
})))
