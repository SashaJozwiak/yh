
import { create } from 'zustand'
//import { Nav } from './types'

export const useTradeNav = create((set) => ({
    isOpenWallet: false,
    tool: 'assets',// hold, tasks,launch, build
    assets: 'assets',// uwallet, info
    tasks: 'easy', //hard, info, add
    launch: 'web2', // 'web3', info, add
    build: 'team1', //  team2, info, add
    setBuild: (build: string) => set({ build }),
    setLaunch: (launch: string) => set({ launch }),
    setTasks: (tasks: string) => set({ tasks }),
    setHold: (hold: string) => set({ hold }),
    setTool: (tool: string) => set({ tool }),
    setIsOpenWallet: (isOpen: boolean) => set({ isOpenWallet: isOpen }),
}))
