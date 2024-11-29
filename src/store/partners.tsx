import { create } from 'zustand';
import { UsePartners, RawUserDetails, UserDetails } from '../types/stores';

export const usePartners = create<UsePartners>((set) => ({
    userDetails: [],
    withdraw: 0,
    loading: true,
    error: null,
    fetchUserDetails: async (user_id, internalIds) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}partners/details`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ internalIds, user_id }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            //const rawData: RawUserDetails[] = await response.json();
            const { details, total_withdrawn } = await response.json(); // Парсим ответ API


            const formattedData: UserDetails[] = details.map((user: RawUserDetails) => ({
                internal_id: Number(user.internal_id),
                username: user.username,
                balance: parseFloat(user.balance),
                card_purchases: user.card_purchases.map((purchase) => ({
                    price: parseFloat(purchase.price),
                    date: purchase.date,
                })),
                bonus_purchases: user.bonus_purchases.map((purchase) => ({
                    price: parseFloat(purchase.price),
                    date: purchase.date,
                })),
                house: user.house ? Number(user.house) : null,
                //bonuses: 0, // Добавляем значение bonuses, если оно не присутствует
            }));

            console.log('partners data: ', formattedData);
            console.log('total_withdrawn: ', total_withdrawn);

            set({
                userDetails: formattedData,
                withdraw: parseFloat(total_withdrawn), // Устанавливаем значение в стейт
                loading: false,
            });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error('Error fetching user details:', error);
        }
    },
    createWithdraw: async (user_id, amount, address) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}partners/createWithdraw`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, amount, address }),
            });

            if (!response.ok) {
                throw new Error('Failed to create withdraw request');
            }

            const result = await response.json();

            console.log('Withdraw request created successfully:', result);

            // Опционально: обновить локальное состояние, если это нужно
            // Например, добавить в массив заявок или обновить баланс
            set((state) => ({
                ...state,
                loading: false,
                withdraw: state.withdraw + amount,
            }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error('Error creating withdraw request:', error);
        }
    },
}));
