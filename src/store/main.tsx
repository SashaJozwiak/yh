import { create } from 'zustand'
import { User, UseStore, UseUserBalances } from '../types/stores'
import { devtools } from 'zustand/middleware'
//import { UserData } from '../types/userData'

export const useUserData = create<UseStore>()(devtools((set) => ({
    user:
    {
        id: null,
        userName: '',
        languageCode: '',
        userFriendlyAddress: '',
        rawAddress: '',
    },
    setUser: (user: User) => set(() => ({ user })),
    addAddresses: (addresses) => set((state) => ({
        user: {
            ...state.user,
            userFriendlyAddress: addresses.userFriendlyAddress,
            rawAddress: addresses.rawAddress,
        }
    })),
})))

export const useUserBalances = create<UseUserBalances>()(devtools((set) => ({
    bal: [
        {
            name: 'BONUS',
            value: 100,
            range: [0, 999999],
            inH: 10000,
            speed: 0,
        },
        {
            name: 'TON',
            value: 10.59,
            range: [1, 500],
            inH: 200,
            speed: 0,
        }
    ],
    setUserBalance: (currency: string, value: number) => set((state) => ({
        bal: {
            ...state.bal,
            [currency]: value,
        }
    })),

    updateBalance: (newValue: number) => set((state) => ({
        bal: state.bal.map((currency) => currency.name === 'TON' ? { ...currency, value: newValue } : currency)
    })),

    updateSpeed: (name: string, speed: number) => set((state) => ({
        bal: state.bal.map(item =>
            item.name === name ? { ...item, speed } : item
        ),
    })),

})))
