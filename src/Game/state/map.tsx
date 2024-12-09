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
    },
    changeMyColor: async (city_id, color) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}maps/updateCityColor`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ city_id, color }), // Передаем id города и новый цвет
            });

            if (!response.ok) {
                throw new Error('Failed to update city color');
            }

            const updatedCity = await response.json();
            // Обновляем цвет города в состоянии
            set((state) => ({
                cityList: state.cityList.map((city) =>
                    city.city_id === updatedCity.city_id ? { ...city, color: updatedCity.color } : city
                ),
            }));

        } catch (error) {
            console.error('Error updating city color:', error);
            set({ error: (error as Error).message });
        } finally {
            set({ isLoading: false });
        }
    },
}));
