import { create } from 'zustand'
import { UseMap } from '../types/MapTypes';
//import { DeckState, Grades, UseDeck, /* Card */ } from '../types/forGameState'

//import { devtools } from 'zustand/middleware'
//import { useUserData } from '../../store/main';

export const useMap = create<UseMap>((set) => ({
    cityList: [],
    isLoading: true,
    error: null,
    fetchCityList: async () => {
        set({ isLoading: true, error: null }); // Начало загрузки
        console.log('fetchCityList');
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}maps/cityList`);
            if (!response.ok) {
                throw new Error('Failed to fetch city list');
            }

            const data = await response.json();
            console.log('cityList after get', data);
            set({ cityList: data }); // Обновляем список городов
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
