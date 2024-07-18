import { create } from 'zustand'
import { User, UseStore } from '../types/stores'
//import { UserData } from '../types/userData'

export const useStore = create<UseStore>((set) => ({
    user:
    {
        id: 757322479,
        userName: 'Jozwiak',
        languageCode: 'en'
    },

    setUser: (user: User) => set(() => ({ user })),

    //increasePopulation: () => set((state) => ({ id: state.id + 1 })),
    //removeAllBears: () => set({ id: 0 }),

}))
