import { create } from 'zustand'
import { Grades, UseDeck, /* Card */ } from '../types/forGameState'

import { devtools } from 'zustand/middleware'

export const useDeck = create<UseDeck>()(devtools((set) => ({
    cards: [
        {
            id: 1,
            name: 'Jack',
            grades: {
                gray: 2,
                bronze: 0,
                silver: 0,
                gold: 0,
            },
            img: 'investor',
            key_power: 'balance'
        },
        {
            id: 2,
            name: 'Rick',
            grades: {
                gray: 1,
                bronze: 0,
                silver: 0,
                gold: 0,
            },
            img: 'developer',
            key_power: 'mind'
        },
    ],
    randomCards: 20,
    getCards: () => {
        console.log('getCards')
    },
    addCards: (newCards) => {
        set((state) => {
            const updatedCards = [...state.cards];

            newCards.forEach((newCard) => {
                const existingCard = updatedCards.find((card) => card.id === newCard.id);

                if (existingCard) {
                    // Если карта уже существует, увеличиваем количество для каждого грейда
                    Object.keys(newCard.grades).forEach((grade) => {
                        existingCard.grades[grade as keyof Grades] += newCard.grades[grade as keyof Grades];
                    });

                    // Проверяем, можно ли улучшить карту по грейдам
                    ['gray', 'bronze', 'silver'].forEach((grade, index) => {
                        const nextGrade = ['bronze', 'silver', 'gold'][index];
                        while (existingCard.grades[grade as keyof Grades] >= 10) {
                            existingCard.grades[grade as keyof Grades] -= 10;
                            existingCard.grades[nextGrade as keyof Grades] += 1;
                        }
                    });
                } else {
                    // Если карты нет, добавляем её в колоду
                    updatedCards.push(newCard);
                }
            });

            return { cards: updatedCards };
        });
    },
    clearRandomCards: () => { set(() => ({ randomCards: 0 })); },
    removeCards: (cards) => {
        console.log('remove cards: ', cards)
    },
})))
