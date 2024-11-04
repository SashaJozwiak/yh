import { create } from 'zustand'
import { Arena, ArenaCard } from '../types/Arena'
import { devtools } from 'zustand/middleware'

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
