
import { create } from 'zustand'
import { Nav } from './types'

export const useEarnNav = create<Nav>((set) => ({
    isOpenWallet: false,
    tool: 'hold',// hold
    hold: 'twallet',// info, uwallet, 
    setHold: (hold: string) => set({ hold }),
    setTool: (tool: string) => set({ tool }),
    setIsOpenWallet: (isOpen: boolean) => set({ isOpenWallet: isOpen }),
}))
