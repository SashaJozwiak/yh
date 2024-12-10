import { create } from 'zustand'
import { UseCityState } from '../types/City';


export const useCity = create<UseCityState>((set) => ({
    getReward: true,
    isLoading: true,
    error: null,
    checkReward: async (user_id, city_id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(
                `${import.meta.env.VITE_SECRET_HOST}maps/checkReward?user_id=${user_id}&city_id=${city_id}`
            );
            if (!response.ok) {
                throw new Error('Failed to check reward');
            }
            const data = await response.json();

            set(() => ({
                getReward: data.exists,
            }));
            return data.exists; // Возвращает true или false
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error checking reward:', errorMessage);
            set({ error: errorMessage });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },
    addReward: async (user_id, city_id, reward) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}maps/addReward`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, city_id, reward }),
            });
            if (!response.ok) {
                throw new Error('Failed to add reward');
            }
            const data = await response.json();
            console.log('Reward added:', data.message);

            // Обновляем локальное состояние, если нужно
            setTimeout(() => {
                set(() => ({
                    getReward: true, // Пример: меняем статус на противоположный
                }));
            }, 3000)

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error adding reward:', errorMessage);
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },
}));
