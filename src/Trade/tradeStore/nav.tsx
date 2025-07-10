
import { create } from 'zustand'
import { tradeNav } from './types'
//import { Nav } from './types'

export const useTradeNav = create<tradeNav>((set) => ({
    //isOpenWallet: false,
    tool: 'assets',// assets, shop, services, uh-pay
    assetsNav: 'assets', //info, sell
    setTool: (tool: string) => set({ tool }),
    setAssetsNav: (aNav: string) => set({ assetsNav: aNav })
}))
