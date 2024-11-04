import { create } from 'zustand'
import { UseNav } from '../types/forGameState'
import { devtools } from 'zustand/middleware'

export const useGameNav = create<UseNav>()(devtools((set) => ({
    page: 'home',
    deckGrade: 'all',
    showCard: false,
    showGetCards: false,
    setPageNav: (tabName: string) => set((state) => ({
        ...state,
        page: tabName
    })),
    setDeckGrade: (tabName: string) => set((state) => ({
        ...state,
        deckGrade: tabName
    })),
    setShowCard: () => set((state) => ({
        ...state,
        showCard: !(state.showCard)
    })),
    setShowGetCard: () => set((state) => ({
        ...state,
        showGetCards: !(state.showGetCards)
    })),
})))
