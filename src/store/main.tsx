import { create } from 'zustand'
import { User, UseStore, UseUserBalances } from '../types/stores'
import { devtools } from 'zustand/middleware'
//import { UserData } from '../types/userData'

export const useUserData = create<UseStore>()(devtools((set) => ({
    user:
    {
        id: null,
        userName: '',
        languageCode: '',
        userFriendlyAddress: '',
        rawAddress: '',
    },
    //setUser: (user: User) => set(() => ({ user })),
    setUser: (user: User) => set((state) => ({
        user: {
            ...state.user,
            id: user.id,
            userName: user.userName,
            languageCode: user.languageCode
        },

    })),
    addAddresses: (addresses) => set((state) => ({
        user: {
            ...state.user,
            userFriendlyAddress: addresses.userFriendlyAddress,
            rawAddress: addresses.rawAddress,
        }
    })),
})))

export const useUserBalances = create<UseUserBalances>()(devtools((set) => ({
    bal: [
        {
            name: 'BONUS',
            value: 100,
            range: [0, 999999],
            inH: 10000,
            speed: 0,
        },
        {
            name: 'TON',
            value: 10.59,
            range: [1, 500],
            inH: 200,
            speed: 0,
        }
    ],

    setUserBalance: (currency: string, value: number) => set((state) => ({
        bal: {
            ...state.bal,
            [currency]: value,
        }
    })), //dont use current

    updateBalance: async (rawAddress) => {
        try {
            const response = await fetch(`https://toncenter.com/api/v3/account?address=${encodeURIComponent(rawAddress)}`, {
                /* mode: 'no-cors', */
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const tonBalance = (data.balance / 10 ** 9).toFixed(2);
            console.log('balance: ', tonBalance);
            set((state) => ({
                bal: state.bal.map((currency) => currency.name === 'TON' ? { ...currency, value: +tonBalance } : currency)
            }));
        } catch (error) {
            console.error('Failed to fetch balance:', error);
        }
    },

    updateSpeed: (name: string, speed: number) => set((state) => ({
        bal: state.bal.map(item =>
            item.name === name ? { ...item, speed } : item
        ),
    })),

})))

/* 
export const useJettonsBalances = create((set) => ({
    jettons: [
        {
            name: 'USDT',
            address: '0:b113a994b5024a16719f69139328eb759596c38a25f59028b146fecdc3621dfe',
            value: 0,
            range: [0, 1000],
            inH: 200,
            speed: 0,
        },
        {
            name: 'PEPE',
            address: '0:b113a994b5024a16719f69139328eb759596c38a25f59028b146fecdc3621dfe',
            value: 10.59,
            range: [1, 500],
            inH: 200,
            speed: 0,
        }
    ],

    updateBalance: async(rawAddress:string) => set((state) => ({
        try {
            const response = await fetch(`https://tonapi.io/v2/accounts/${encodeURIComponent(rawAddress)}/jettons`, {
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const tonBalance = (data.balance / 10 ** 9).toFixed(2);
            console.log('balance: ', tonBalance);
            set((state) => ({
                bal: state.bal.map((currency) => currency.name === 'TON' ? { ...currency, value: +tonBalance } : currency)
            }));
        } catch (error) {
            console.error('Failed to fetch balance:', error);
        }
    })),
})) */
