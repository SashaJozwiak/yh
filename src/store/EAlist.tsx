import { create } from 'zustand'
import { UseEAlist } from '../types/stores'

import { devtools } from 'zustand/middleware'


export const useListData = create<UseEAlist>()(devtools((set/* , get */) => ({
    state: {
        inList: false,
        isLoading: false,
    },

    getInList: async (userId) => {
        console.log('getInList: ', userId)

        set((state) => ({
            state: {
                ...state.state,
                isLoading: true,
            },
        }));

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}earlyAccess/getInList?userId=${userId}`, {
                //mode: 'no-cors',
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();

                set((state) => ({
                    state: {
                        ...state.state,
                        inList: data.inList,
                    },
                }));
            } else {
                console.log('Ошибка запроса:', response.status);
            }

        } catch (err) {
            console.log('Error get inList: ', err)
        } finally {
            set((state) => ({
                state: {
                    ...state.state,
                    isLoading: false,
                },
            }));
        }
    },
    addInList: async (userId, userName, balance) => {
        console.log('addInList: ', userId, userName, balance);

        set((state) => ({
            state: {
                ...state.state,
                isLoading: true,
            },
        }));

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}earlyAccess/addInList`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, userName, balance }),
            });

            if (response.ok) {
                const data = await response.json();

                // Если пользователь был успешно добавлен
                if (data.message === 'User added to the list.') {
                    set((state) => ({
                        state: {
                            ...state.state,
                            inList: true,
                        },
                    }));
                } else if (data.message === 'User already exists in the list.') {
                    // Если пользователь уже был в списке
                    set((state) => ({
                        state: {
                            ...state.state,
                            inList: true,
                        },
                    }));
                }
            } else {
                console.log('Ошибка запроса:', response.status);
            }
        } catch (err) {
            console.log('Error addInList:', err);
        } finally {
            set((state) => ({
                state: {
                    ...state.state,
                    isLoading: false,
                },
            }));
        }



    },
    removeInList: async (userId) => {
        console.log('removeInList: ', userId);

        set((state) => ({
            state: {
                ...state.state,
                isLoading: true,
            },
        }));

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}earlyAccess/removeInList?userId=${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                set((state) => ({
                    state: {
                        ...state.state,
                        inList: false,
                    },
                }));
            }
        } catch (err) {
            console.error('delete in EA list error: ', err);
        }
    }

})))

