import { create } from 'zustand'
import { User, UseStore, UseUserBalances, UseUserBalancesJ } from '../types/stores'
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

export const useUserBalances = create<UseUserBalances>()(devtools((set, get) => ({
    bal: [
        {
            name: 'BONUS',
            value: 100,
            range: [0.1, 999999],
            inH: 10000,
            speed: 0,
        },
        {
            name: 'TON',
            value: 0,
            range: [0.01, 100],
            inH: 100,
            speed: 0,
        }
    ],
    totalSpeed: () => {
        const state = get();
        return state.bal.reduce((acc, currency) => {
            //const speed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            return acc + currency.speed;
        }, 0);
    },
    setUserBalance: (currency: string, value: number) => set((state) => ({
        bal: {
            ...state.bal,
            [currency]: value,
        }
    })), //dont use current
    updateBalance: async (rawAddress) => {
        //`https://toncenter.com/api/v3/account?address=${encodeURIComponent(rawAddress)}`
        try {
            const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${encodeURIComponent(rawAddress)}`, {
                //mode: 'no-cors',
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const tonBalance = (data.result / 10 ** 9).toFixed(2);
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

export const useJettonsBalances = create<UseUserBalancesJ>((set, get) => ({
    jettons: [
        {
            name: 'USDT',
            address: '0:b113a994b5024a16719f69139328eb759596c38a25f59028b146fecdc3621dfe',
            value: 0,
            range: [0.01, 1000],
            inH: 100,
            speed: 0,
        },
        {
            name: 'PEPE',
            address: '0:97cceec78682b97c342e08e344e3797cf90b2b7aae73abcf5954d8449dadb878',
            value: 0,
            range: [350, 100000],
            inH: 100,
            speed: 0,
        }
    ],
    totalSpeedJ: () => {
        const state = get();
        return state.jettons.reduce((acc, currency) => {
            //const speed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            return acc + currency.speed;
        }, 0);
    },

    updateBalanceJ: async (rawAddress: string) => {
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
            console.log('jbalance: ', data);

            set((state) => {
                const updatedJettons = state.jettons.map(jetton => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const serverJetton = data.balances.find((serverJetton: any) => serverJetton.jetton.address === jetton.address);
                    if (serverJetton) {
                        return {
                            ...jetton,
                            value: +(parseFloat(serverJetton.balance) / (10 ** serverJetton.jetton.decimals)).toFixed(2)
                        };
                    }
                    return jetton;
                });

                return {
                    jettons: updatedJettons
                };
            });
        } catch (error) {
            console.error('Failed to fetch balance jettons:', error);
        }
    },

    updateSpeedJ: (name: string, speed: number) => set((state) => ({
        jettons: state.jettons.map(item =>
            item.name === name ? { ...item, speed } : item
        ),
    })),
}))
