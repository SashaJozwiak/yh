
import { create } from 'zustand'
import { UseWallet } from './types'

export const useWallet = create<UseWallet>((set) => ({
    address: null,
    assets: [],
    status: 'loading',
    setWallet: ({ address, assets }) => set({ address, assets }),

}))
