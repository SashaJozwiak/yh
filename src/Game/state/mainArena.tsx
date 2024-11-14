import { create } from 'zustand'
import { Arena, ArenaCard, ArenaState } from '../types/Arena'
import { devtools } from 'zustand/middleware'

import { usePlayCard } from './playCard'
import { useDeck } from './deck'

import { findArenaObjectById } from '../exmpl/arenaObjects'
import { useUserBalances, useUserData } from '../../store/main'
import { useListData } from '../../store/EAlist'


export const useArena = create<Arena>()(devtools((set, get) => ({
    house: 1,
    floor: 0,
    row1: [
        {
            id: 1,
            name: 'Apper',
            type: 'enemies',
            bp: [22, 22],
            multiplier: 3,
            balance: 150,
            attack: 15,
        },
        {
            id: 2,
            name: 'Hairyk',
            type: 'enemies',
            bp: [59.5, 22],
            multiplier: 3,
            balance: 150,
            attack: 15,
        },
        {
            id: 3,
            name: 'Minik',
            type: 'enemies',
            bp: [78, 22],
            multiplier: 3,
            balance: 150,
            attack: 15,
        }
    ],
    row2: [
        {
            id: 4, name: 'Bitpink', type: 'enemies', bp: [59.3, 3.8], multiplier: 2, balance: 150,
            attack: 15,
        },
        {
            id: 5, name: 'Blockbeast', type: 'enemies', bp: [78, 3.2], multiplier: 2, balance: 150,
            attack: 15,
        },
        {
            id: 6, name: 'Hellchain', type: 'enemies', bp: [3, 22.2], multiplier: 2, balance: 150,
            attack: 15,
        },
    ],
    row3: [
        {
            id: 7, name: 'Pinkchain', type: 'enemies', bp: [59.5, 96.5], multiplier: 1, balance: 150,
            attack: 15,
        },
        {
            id: 8, name: 'Bilder', type: 'enemies', bp: [78.3, 96.3], multiplier: 1, balance: 150,
            attack: 15,
        },
        {
            id: 9, name: 'Loshak', type: 'enemies', bp: [97, 95], multiplier: 1, balance: 150,
            attack: 15,
        },
    ],
    isNeedInit: false,
    getReward: async (user_id, UH, B, cards) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}game/getReward`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, UH, B, cards }),
            });

            if (!response.ok) {
                throw new Error('Network response \'savedeck\' was not ok');
            }

            const res = await response.json()
            console.log('reward fn return:', res)

            const currentBalance = parseFloat(res.currentBalance);
            const currentBonuses = parseInt(res.currentBonuses, 10);
            const randomCards = res.randomCards;

            useUserData.setState((state) => ({
                ...state,
                balance: {
                    ...state.balance,
                    balance: currentBalance
                }
            }));

            useUserBalances.setState((state) => ({
                ...state,
                bal: state.bal.map((item) =>
                    item.name === 'BONUS' ? { ...item, value: currentBonuses } : item
                )
            }));

            useDeck.setState((state) => ({
                ...state,
                randomCards: randomCards
            }));

            useListData.getState().removeInList();

        } catch (err) {
            console.log('get reward error: ', err)
        }

    },
    saveGame: async (userId) => {
        //console.log(userId)
        const user_id = userId;
        const { house, floor, row1, row2, row3 } = get();

        const playCard = usePlayCard.getState().playCard;
        //const allCards = useDeck.getState().cards;
        const newCountCards = usePlayCard.getState().forSave.cards;
        const { UH, B } = usePlayCard.getState().forSave;
        const { cards, randomCards } = useDeck.getState();

        const newRandomCards = randomCards + newCountCards;
        console.log('newRandomCards: ', newRandomCards);

        const character_state = {
            playCard
        };
        const arena_state = {
            house, floor, rows: [row1[0].id, row1[1].id, row1[2].id, row2[0].id, row2[1].id, row2[2].id, row3[0].id, row3[1].id, row3[2].id,
            ]
        };
        const deck_state = { cards, randomCards: newRandomCards };

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}game/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, character_state, arena_state, deck_state, UH, B }),
            });

            if (!response.ok) {
                throw new Error('Network response \'savegame\' was not ok');
            }

            const res = await response.json()
            console.log('save game:', res)
            //const res = await response.json()
            //console.log('save game:', response)
            useDeck.getState().addRandomCards(newRandomCards);
            useUserData.setState((state) => ({
                ...state,
                balance: {
                    ...state.balance,
                    balance: state.balance.balance + UH
                }
            }));

            usePlayCard.getState().resetForSave();

            //get().loadArena(res.arena_state);
            //usePlayCard.getState().loadCharacter(res.character_state);
            //useDeck.getState().loadDeck(res.deck_state);

        } catch (error) {
            console.log('save game error: ', error)
        } finally {
            console.log('save game response: ok')
        }

    },
    changeNeedInit: (isNeed) => {
        set({ isNeedInit: isNeed })
    },
    loadArena: (arena_state: ArenaState) => {
        //console.log('arena_state for load: ', arena_state);
        const { floor, house, rows } = arena_state;

        const [row1, row2, row3] = [
            rows.slice(0, 3).map(id => findArenaObjectById(id)),
            rows.slice(3, 6).map(id => findArenaObjectById(id)),
            rows.slice(6, 9).map(id => findArenaObjectById(id)),
        ];

        //console.log('rows: ', row1, row2, row3);

        set(() => ({
            floor,
            house,
            row1: row1.map(card => ({ ...card, multiplier: 3, bp: [card.bp[0] || 0, card.bp[1] || 0] as [number, number] })),
            row2: row2.map(card => ({ ...card, multiplier: 2, bp: [card.bp[0] || 0, card.bp[1] || 0] as [number, number] })),
            row3: row3.map(card => ({ ...card, multiplier: 1, bp: [card.bp[0] || 0, card.bp[1] || 0] as [number, number] })),
        }));
    },
    gameInit: async (userId) => {
        //accum state:
        const user_id = userId;
        const playCard = usePlayCard.getState().playCard;
        const { house, floor, row1, row2, row3 } = get();
        const { cards, randomCards } = useDeck.getState();

        console.log('random cards: ', randomCards)

        const character_state = {
            playCard
        };
        const arena_state = {
            house, floor, rows: [row1[0].id, row1[1].id, row1[2].id, row2[0].id, row2[1].id, row2[2].id, row3[0].id, row3[1].id, row3[2].id,
            ]
        };
        const deck_state = { cards, randomCards }

        console.log('user_id and states ', user_id, character_state, arena_state, deck_state)

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}game/init`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, character_state, arena_state, deck_state }),
            });

            if (!response.ok) {
                throw new Error('Network response \'stopMining\' was not ok');
            }

            const res = await response.json()
            console.log('init game:', res)

            get().loadArena(res.arena_state);
            usePlayCard.getState().loadCharacter(res.character_state);
            useDeck.getState().loadDeck(res.deck_state);

        } catch (error) {
            console.log('game_init error: ', error)
        } finally {
            console.log('game_init response: ok')
            get().changeNeedInit(false)
        }
    },
    addHouse: () => {
        set({ house: get().house + 1 })
    },
    reset: () => {
        set({ floor: 0 })
    },
    setRow1: (row: ArenaCard[]) => {
        const floor = get().floor;
        console.log('floor: ', floor)
        if (/* floor !== 0 && */ (floor + 3) % 10 === 0 && (floor + 3) <= 100) {
            set((state) => ({
                ...state, row1: [
                    {
                        id: 0,
                        name: '',
                        type: 'empty',
                        bp: [0, 0],
                        multiplier: 0,
                        balance: 0,
                        attack: 0,
                    }, {
                        id: 1,
                        name: 'BOSS',
                        type: 'boss',
                        bp: [0, 0],
                        multiplier: 3,
                        balance: 200,
                        attack: 20,
                    }, {
                        id: 0,
                        name: '',
                        type: 'empty',
                        bp: [0, 0],
                        multiplier: 0,
                        balance: 0,
                        attack: 0,
                    }
                ]
            }))
            return;
        }

        if ((floor + 3) >= 100) {
            set((state) => ({
                ...state, row1: [
                    {
                        id: 0,
                        name: '',
                        type: 'empty',
                        bp: [0, 0],
                        multiplier: 0,
                        balance: 0,
                        attack: 0,
                    }, {
                        id: 0,
                        name: '',
                        type: 'empty',
                        bp: [0, 0],
                        multiplier: 0,
                        balance: 0,
                        attack: 0,
                    }, {
                        id: 0,
                        name: '',
                        type: 'empty',
                        bp: [0, 0],
                        multiplier: 0,
                        balance: 0,
                        attack: 0,
                    }
                ]
            }))
            return;
        }

        set((state) => ({ ...state, row1: [...row] }))
    },
    setRow2: (row: ArenaCard[]) => {
        set((state) => ({ ...state, row2: [...row] }))
    },
    setRow3: (row: ArenaCard[]) => {
        set((state) => ({ ...state, /* floor: get().floor + 1,  */row3: [...row] }))
    },
    addFloor: () => set((state) => ({ ...state, floor: state.floor + 1 })),
})))
