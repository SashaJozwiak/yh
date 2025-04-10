import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UseInvites10 } from '../types/stores';

export const useInvites10 = create<UseInvites10>()(devtools((set, get) => ({
    top10: [
    ],
    winners: [],
    rewards: {
        reward_3000: true,
        reward_6000: true,
        reward_12000: true
    },
    total: 0,
    loadStatus: false,
    checkRewards: async (id) => {
        set({ loadStatus: true });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}invites/checkRewards/${id}`);
            if (response.ok) {
                const data = await response.json();
                console.log('reward state object: ', data)
                set({ rewards: data });

            } else {
                console.error('Ошибка при проверке наград');
            }
        } catch (error) {
            console.error('Ошибка сети при проверке наград:', error);
        } finally {
            set({ loadStatus: false });
        }
    },
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
    },
    getWinners: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}invites/get-claim-list`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to getWinners users in DB');
            }

            const data = await response.json();
            console.log('winners: ', data)

            set((state) => ({
                ...state,
                winners: data,
            }));

        } catch (e) {
            console.error('ошибка выдачи winners', e)
        }
    },
    addReward: async (externalId, internalId, reward) => {
        set({ loadStatus: true }); // Устанавливаем статус загрузки в true
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}invites/add-reward`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                body: JSON.stringify({ externalId, internalId, reward })
            });

            if (!response.ok) {
                throw new Error('Не удалось начислить награду');
            }

            const data = await response.json();
            console.log(data.message); // Сообщение об успешном начислении награды

            get().checkRewards(externalId);

            //set({ loadStatus: false });


            /* set((state) => ({
                winners: state.winners.map(winner =>
                    +(winner.id) === internalId
                        ? { ...winner, is_claim: true }
                        : winner
                )
            })); */

        } catch (e) {
            console.error('Ошибка при начислении награды', e);
        }
    },
})))
