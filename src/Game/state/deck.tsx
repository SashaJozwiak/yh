import { create } from 'zustand'
import { DeckState, Grades, UseDeck, /* Card */ } from '../types/forGameState'

import { devtools } from 'zustand/middleware'
import { useUserData } from '../../store/main';

export const useDeck = create<UseDeck>()(devtools((set, get) => ({
    cards: [
        {
            id: 1,
            name: 'Jack',
            grades: {
                gray: 1,
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
    randomCards: 0,
    saveDeck: async () => {
        const { cards, randomCards } = get();

        const user_id = useUserData.getState().user.internalId;
        const deck_state = { cards, randomCards };
        console.log('deck_state: ', deck_state)

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}game/saveDeck`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, deck_state }),
            });

            if (!response.ok) {
                throw new Error('Network response \'savedeck\' was not ok');
            }

            const res = await response.json()
            console.log('savedeck:', res)


        } catch (error) {
            console.log('save deck error: ', error)
        } finally {
            console.log('save deck response: finally')
        }


    },
    loadDeck: (deck_state: DeckState) => {
        console.log('deck_state: ', deck_state)
        set((state) => ({
            ...state,
            cards: deck_state.cards,
            randomCards: deck_state.randomCards,
        }))
    },
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
    addRandomCards: (count) => {
        set(() => ({ randomCards: count }))
    },
    clearRandomCards: () => { set(() => ({ randomCards: 0 })); },
    removeCards: (cards) => {
        console.log('remove cards: ', cards)
    },
})))
