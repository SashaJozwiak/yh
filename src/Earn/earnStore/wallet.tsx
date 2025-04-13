
import { create } from 'zustand'
import { UseWallet } from './types'

export const useWallet = create<UseWallet>((set, get) => ({
    address: null,
    assets: [],
    status: 'loading',
    setWallet: ({ address, assets }) => {
        set({ address, assets, status: 'loaded' })
        console.log('wallet: ', get())
        //set({ status: 'loaded' })
    }
}))
