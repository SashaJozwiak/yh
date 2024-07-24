import { create } from 'zustand'
import { UseBalance, BalanceObj } from '../types/stores'
import { devtools } from 'zustand/middleware'

export const useBalance = create<UseBalance>()(devtools((set) => ({
    balance: {
        balance: 0,
        isHold: false,
        period: 24,
        speed: 0,
        finishData: '',
        startData: '',
    },
    setBalanceData: (balance: Partial<BalanceObj>) => set((state) => ({
        balance: {
            ...state.balance,
            ...balance,
        }
    })),
    setBalance: (value: number) => set((state) => (
        {
            balance: {
                ...state.balance,
                balance: value
            }
        })),
})))
