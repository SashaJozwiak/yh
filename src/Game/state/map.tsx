import { create } from 'zustand'
import { UseMap, City } from '../types/MapTypes';
//import { DeckState, Grades, UseDeck, /* Card */ } from '../types/forGameState'

//import { devtools } from 'zustand/middleware'
//import { useUserData } from '../../store/main';

export const useMap = create<UseMap>((set) => ({
    cityList: [],
    city: false,
    selectedLocation: null,
    isLoading: true,
    error: null,
    setCity: (isTrue) => {
        set({ city: isTrue });
    },
    setSelectedLocation: (city: City) => {
        set({ selectedLocation: city });
    },
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
    updateChannel: async (city_id: number, channel: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}maps/updateChannel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ city_id, channel }),
            });

            if (!response.ok) {
                throw new Error('Failed to update channel');
            }

            const data = await response.json();
            console.log('Channel updated:', data.message);

            // Обновляем состояние локально
            set((state) => {
                const updatedCityList = state.cityList.map((city) =>
                    city.city_id === city_id ? { ...city, channel } : city
                );

                const updatedSelectedLocation =
                    state.selectedLocation?.city_id === city_id
                        ? { ...state.selectedLocation, channel }
                        : state.selectedLocation;

                return {
                    cityList: updatedCityList,
                    selectedLocation: updatedSelectedLocation,
                };
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error updating channel:', errorMessage);
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    }
}));
