import { create } from 'zustand'
import { UseTopHeroes } from '../types/TopHeroes';
//import { DeckState, Grades, UseDeck, /* Card */ } from '../types/forGameState'

//import { devtools } from 'zustand/middleware'
//import { useUserData } from '../../store/main';

export const useTopHeroes = create<UseTopHeroes>((set) => ({
    topList: [],
    isLoading: true,
    error: null,
    fetchTopList: async () => {
        set({ isLoading: true, error: null }); // Начало загрузки
        console.log('fetchTopList');
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}top/get10`);
            if (!response.ok) {
                throw new Error('Failed to fetch city list');
            }

            const data = await response.json();
            console.log('heroeslist after get', data);
            set({ topList: data });

        } catch (error) {
            console.error('Error fetching city list:', error);
            set({ error: (error as Error).message });
        } finally {
            set({ isLoading: false }); // Окончание загрузки
        }
    },
    setLoading: (isTrue) => {
        set({ isLoading: isTrue });
    }
}));
