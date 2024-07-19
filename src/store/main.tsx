import { create } from 'zustand'
import { User, UseStore } from '../types/stores'
//import { UserData } from '../types/userData'

export const useStore = create<UseStore>((set) => ({
    user:
    {
        id: 757322479,
        userName: 'Jozwiak',
        languageCode: 'en',
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
}))
