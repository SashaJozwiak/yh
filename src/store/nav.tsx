import { create } from 'zustand'
import { UseNav } from '../types/stores'
import { devtools } from 'zustand/middleware'

export const useNav = create<UseNav>()(devtools((set) => ({
    nav:
    {
        list: true,
        main: 'hold',
        cab: 'data',
        stage: 'stages',
    },
    setStages: (tabName: string) => set((state) => ({
        nav:
        {
            ...state.nav,
            stage: tabName
        }
    })),
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
    setCabNav: (tabName: string) => set((state) => ({
        nav: {
            ...state.nav,
            cab: tabName
        }
    })),
})))
