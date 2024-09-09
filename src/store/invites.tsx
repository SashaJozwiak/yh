import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UseInvites10 } from '../types/stores';

export const useInvites10 = create<UseInvites10>()(devtools((set) => ({
    top10: [
    ],
    total: 0,
    loadStatus: false,
    getTop10: async () => {
        set({ loadStatus: true });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}invites/get10`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to update user in DB');
            }

            const data = await response.json();
            console.log('top: ', data)
            const filledTop10 = [...data.top10 || []];

            while (filledTop10.length < 10) {
                filledTop10.push({ username: 'free place', active_friends_count: 0 });
            }

            set(() => (
                {
                    top10: filledTop10,
                    total: +data.totalActiveFriends
                }
            ))
        } catch (e) {
            console.error('ошибка выдачи топ 100', e)
        } finally {
            set({ loadStatus: false });
        }
    }
})))
