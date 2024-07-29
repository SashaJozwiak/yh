import { create } from 'zustand'
import { UseNav } from '../types/stores'
import { devtools } from 'zustand/middleware'

export const useNav = create<UseNav>()(devtools((set) => ({
    nav:
    {
        list: true,
        main: 'hold',
    },
    setNavList: (bool: boolean) => set((state) => ({
        nav:
        {
            ...state.nav,
            list: bool
        }
    })),

    setMainNav: (tabName: string) => set((state) => ({
        nav: {
            ...state.nav,
            main: tabName
        }
    })),
    //setUser: (user: User) => set(() => ({ user })),

})))
