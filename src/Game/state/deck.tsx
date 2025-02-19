import { create } from 'zustand'
import { DeckState, Grades, UseDeck, Card } from '../types/forGameState'

import { devtools } from 'zustand/middleware'
import { useUserData } from '../../store/main';
import { useMap } from './map';

import WebApp from '@twa-dev/sdk';

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
    ],
    randomCards: 100,
    gradeDetector: (name) => {
        const cards = get().cards;
        const deckCard = cards.find((card: Card) => card.name === name)

        console.log('deckCard: ', deckCard)

        if (!deckCard) {
            console.log('не найдена')
            return 'gray';
        }

        if (deckCard.grades.gold > 0) return 'gold';
        if (deckCard.grades.silver > 0) return 'silver';
        if (deckCard.grades.bronze > 0) return 'bronze';
        return 'gray';
    },
    saveTransaction: async (user_id, amount, price) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}payments/finishpay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, amount, price }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            console.log('ok save transaction: ', data)

        } catch (err) {
            console.log('запись об оплате в бд ошибка: ', err)
        }
    },
    buyRandomCards: async (options, user_id) => {
        const { amount, price } = options;
        //console.log('userId and price ', user_id, price)
        const title = `${amount} random grey cards`;
    //const amount = 1;
        const description = `Buy random cards`;

        //console.log(title, description, amount)

        //console.log(`${import.meta.env.VITE_SECRET_HOST}payments/starspay`);

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}payments/starspay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, amount, price }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            const invoiceLink = data.invoiceLink;
            //console.log('Ссылка на инвойс получена:', invoiceLink);

            //WebApp.openInvoice(invoiceLink);
            WebApp.openInvoice(invoiceLink, (status) => {
                if (status === "paid") {
                    const newRandomCards = amount + get().randomCards;
                    get().addRandomCards(newRandomCards);
                    get().saveDeck();
                    get().saveTransaction(user_id, amount, price);
                    console.log('удалось оплатить, карты добавлены')
                } else {
                    console.error('Не удалось оплатить');
                }
            });

        } catch (err) {
            console.log('Error buy random cards: ', err)
        }
    },
    sellGoldCard: async (card_id, city_id, price) => {
        const user_id = useUserData.getState().user.internalId;
        console.log('number: ', card_id, city_id, user_id, price)

        set((state) => {
            // Находим нужную карту
            const card = state.cards.find((card) => card.id === card_id);

            // Проверка, достаточно ли золотых карт
            if (!card || card.grades.gold < price) {
                console.error('Недостаточно золотых карт для обмена');
                return state; // Возвращаем текущее состояние без изменений
            }

            // Обновляем состояние, отнимая нужное количество золотых карт
            const updatedCards = state.cards.map((card) =>
                card.id === card_id
                    ? {
                        ...card,
                        grades: {
                            ...card.grades,
                            gold: card.grades.gold - price,
                        },
                    }
                    : card
            );
            return {
                ...state,
                cards: updatedCards,
            };
        });
        // Сохранение обновленного состояния
        get().saveDeck();

        // Добавление новой записи в city_map после сохранения deck_state
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}maps/addCity`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, city_id }),
            });

            if (response.ok) {
                console.log('City record successfully added');
            } else {
                console.error('Failed to add city record');
            }
        } catch (error) {
            console.error('Error adding city record:', error);
        } finally {
            useMap.getState().fetchCityList();
        }
    },
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
