import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { usersFromTop100 } from '../types/stores';

export const useTop100 = create<usersFromTop100>()(devtools((_, get) => ({
    top100: [
        {
            userName: 'anonim',
            balance: 150,
        },
        {
            userName: 'anonim2',
            balance: 1320,
        },
        {
            userName: 'anonim3',
            balance: 15450,
        },
        {
            userName: 'anonim4',
            balance: 13120,
        },
        {
            userName: 'anonim5',
            balance: 134150,
        },
        {
            userName: 'anonim6',
            balance: 1351981,
        },
        {
            userName: 'anonim7',
            balance: 1359280,
        },
        {
            userName: 'anonim8',
            balance: 1359370,
        },
        {
            userName: 'anonim9',
            balance: 1359380,
        },
    ],
    getTop100: () => {
        console.log(get().top100);
    }
})))
