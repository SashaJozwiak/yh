import { create } from 'zustand';
import { NyfRewards } from '../types/nyfRewards';

export const useUserRewardStore = create<NyfRewards>((set) => ({
    userReward: null, // Данные о награде
    isLoading: false, // Состояние загрузки
    hasClaimed: false, // Флаг, показывающий, что пользователь уже забрал награду
    fetchUserReward: async (userId) => {
        set({ isLoading: true }); // Устанавливаем состояние загрузки
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}rewards/nyfReward/${userId}`); // Отправляем запрос
            const data = await response.json();

            if (data.success) {
                console.log('nyfRewards:', data.data)
                set({ userReward: data.data, hasClaimed: false }); // Сохраняем награду, пользователь ещё не забрал
            } else {
                set({ userReward: null, hasClaimed: true }); // Пользователь уже забрал награду
            }
        } catch (error) {
            console.error('Ошибка при получении данных награды:', error);
            set({ userReward: null, hasClaimed: false }); // Сбрасываем состояние в случае ошибки
        } finally {
            set({ isLoading: false }); // Снимаем состояние загрузки
        }
    },
    addInRewardList: async (userId, cards, uh) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}rewards/addInListNyfReward`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, cards, uh }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Награда успешно добавлена:', data.data);
                set({ userReward: data.data });
            } else {
                console.error('Ошибка при добавлении награды:', data.message);
            }
            set({ hasClaimed: true });
        } catch (error) {
            console.error('Ошибка при добавлении награды:', error);
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useUserRewardStore;
