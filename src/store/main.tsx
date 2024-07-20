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
    bal: {
        ton: 0,
        usdt: 0,
    },
    setUserBalance: (currency: string, value: number) => set((state) => ({
        bal: {
            ...state.bal,
            [currency]: value,
        }
    })),

})))
