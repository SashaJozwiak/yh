import { create } from 'zustand'
import { User, UseStore, UseUserBalances, UseUserBalancesJ, UseStonFi, BalanceObj } from '../types/stores'
import { devtools } from 'zustand/middleware'

export const useUserData = create<UseStore>()(devtools((set, get) => ({
    user:
    {
        id: 0,
        internalId: 0,
        userName: '',
        languageCode: '',
        userFriendlyAddress: '',
        rawAddress: '',
        team_id: null,
        refs: 0,
        refs_active: 0,
        //team: ''
    },
    balance: {
        balance: 0,
        isHold: false,
        period: 0.01,
        speed: 0,
        finishData: '',
        startData: ''
    },
    statuses: {
        isLoading: false,
        isError: false,
    },
    //setUser: (user: User) => set(() => ({ user })),
    handleReferral: async (userId, startParam) => {
        const [refId, refTeamId] = startParam.split("_");
        const refTeamNum = refTeamId ? Number(refTeamId) : null;

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}preRegAdd`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: Number(userId),
                    refId: Number(refId),
                    refTeamId: refTeamNum,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add referral data to DB');
            }

            console.log('Referral data added successfully');
        } catch (error) {
            console.error('handleReferral error:', error);
        }
    },
    setUser: async (user: Partial<User>) => {
        //console.log('user in state: ', user)
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}auth?externalId=${user.id}&userName=${encodeURIComponent(user.userName as string)}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to update user in DB');
            }

            const data = await response.json();
            //console.log('bd_data: ', data);
            //console.log('from_tg_data: ', user)
            const getBalance = Number(data.balance.balance).toFixed(3);
            set((state) => ({
                user: {
                    ...state.user,
                    ...user,
                    internalId: data.user.internal_id,
                    team_id: data.balance.team_id,
                    refs: +data.referralStats.total_invited || 0,
                    refs_active: +data.referralStats.active_invited || 0,
                },
                balance: {
                    ...state.balance,
                    balance: +getBalance,
                    isHold: data.balance.is_hold,
                    period: data.balance.period,
                    speed: +data.balance.speed,
                    finishData: data.balance.finishdate,
                    startData: data.balance.startdate
                }
            }))
        } catch (err) {
            set((state) => ({
                user: {
                    ...state.user,
                    ...user,
                    internalId: 1,
                }
            }))
            console.error('setUser error :', err);
        }
    },
    setBalanceData: async (balance: Partial<BalanceObj>) => {
        const internalId = get().user.internalId;
        const uf_address = get().user.userFriendlyAddress;
        //console.log('uf_address for backend: ', uf_address)

        if (balance.isHold) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}startmining`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        balance: balance.balance,
                        internalId: internalId,
                        startData: balance.startData,
                        finishData: balance.finishData,
                        speed: balance.speed,
                        uf_address: uf_address,
                    }),
                })

                if (!response.ok) {
                    throw new Error('Network response \'startMining\' was not ok');
                }

                const res = await response.json()
                console.log('start mining: ', res)
                set((state) => ({
                    balance: {
                        ...state.balance,
                        ...balance,
                    }
                }))
                return;
            } catch (err) {
                console.error('setUser error :', err);
                return;
            }
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}stopmining`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    balance: balance.balance,
                    internalId: internalId,
                }),
            })

            if (!response.ok) {
                throw new Error('Network response \'stopMining\' was not ok');
            }

            const res = await response.json()
            console.log(res)

            set((state) => ({
                balance: {
                    ...state.balance,
                    ...balance,
                }
            }))

        } catch (err) {
            console.error('setUser error :', err);

        }


    },
    addAddresses: async (addresses) => {
        //console.log('addresses: ', addresses);

        /* const response = await fetch('http://localhost:3000/api/wallet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addresses),
        });

        console.log('response: ', response);


        if (!response.ok) {
            throw new Error('Failed to update addresses in DB');
        }

        const updatedUser = await response.json();

        console.log('updatedUser: ', updatedUser); */
        set((state) => ({
            user: {
                ...state.user,
                userFriendlyAddress: addresses.userFriendlyAddress, //добавлять из фе, а не бе
                rawAddress: addresses.rawAddress, //добавлять из фе, а не бе
            }
        }))
    }
})))

export const useUserBalances = create<UseUserBalances>()(devtools((set, get) => ({
    bal: [
        {
            name: 'BONUS',
            value: 100,
            range: [0.1, 999999],
            inH: 1000,
            speed: 0,
            src: '',
        },
        {
            name: 'TON',
            value: 0,
            range: [0.01, 100],
            inH: 100,
            speed: 0,
            src: 'https://t.me/tonblockchain',
        }
    ],
    getBonuses: async () => {
        const internalId = useUserData.getState().user.internalId;
        //console.log('internalId: ', internalId);
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}bonuses?internalId=${internalId}`,
                {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json'
                    }
                }
            )

            const data = await response.json();
            //console.log('data bonuses: ', data)

            set((state) => ({
                bal: state.bal.map((currency) => currency.name === 'BONUS' ? { ...currency, value: data.bonuses } : currency)
            }))

        } catch (err) {
            console.error('Failed to get bonuses:', err);
        }
    },

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
    updateBalance: async (rawAddress: string) => {
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
            //console.log('balance: ', tonBalance);
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
            src: 'https://t.me/OfficialTether',
        },
        {
            name: 'NOT',
            address: '0:2f956143c461769579baef2e32cc2d7bc18283f40d20bb03e432cd603ac33ffc',
            value: 0,
            range: [1000, 50000],
            inH: 100,
            speed: 0,
            src: 'https://t.me/notcoin',
        }
    ],
    loadStatus: false,
    totalSpeedJ: () => {
        const state = get();
        return state.jettons.reduce((acc, currency) => {
            //const speed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            return acc + currency.speed;
        }, 0);
    },

    updateBalanceJ: async (rawAddress: string) => {
        set({ loadStatus: true });

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
            //console.log('jbalance: ', data);


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
        } finally {
            set({ loadStatus: false })
        }
    },

    updateSpeedJ: (name: string, speed: number) => set((state) => ({
        jettons: state.jettons.map(item =>
            item.name === name ? { ...item, speed } : item
        ),
    })),

}))

export const useStonFi = create<UseStonFi>((set, get) => ({
    pools: [
        {
            name: 'TON/USDT',
            address: 'EQD8TJ8xEWB1SpnRE4d89YO3jl0W0EiBnNS4IBaHaUmdfizE',
            value: 0,
            range: [0.1, 100],
            inH: 100,
            speed: 0,
            src: 'https://app.ston.fi/pools/EQD8TJ8xEWB1SpnRE4d89YO3jl0W0EiBnNS4IBaHaUmdfizE?farmTab=nfts',
        },
    ],
    loadStatus: false,
    updateBalanceSF: async (rawAddress: string) => {
        set({ loadStatus: true });
        console.log('fetch new poool for: ', rawAddress)
        try {
            const response = await fetch(`https://api.ston.fi/v1/wallets/${encodeURIComponent(rawAddress)}/farms`, {
                //mode: 'no-cors',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('pool: ', data)
            //const filteredPools = data.farm_list.filter(farm => farm.pool_address === 'TON/USDT');
            //console.log('get: ', get().pools)

            set(state => {
                const updatedPools = state.pools.map(pool => {
                    const isPool = data.farm_list.find(poolIn => poolIn.pool_address === pool.address);

                    if (isPool && isPool.status === 'operational' && Array.isArray(isPool.nft_infos) && isPool.nft_infos.length > 0) {
                        const totalStakedTokens = isPool.nft_infos
                            .filter(nft => nft.status === 'active')
                            .reduce((acc, nft) => acc + parseInt(nft.staked_tokens, 10), 0);

                        return {
                            ...pool,
                            value: totalStakedTokens / 1000000
                        };
                    } else {
                        // Если пул не найден или не активен, устанавливаем value: 0
                        return {
                            ...pool,
                            value: 0
                        };
                    }
                });
                console.log('updatedPools: ', updatedPools);
                return { pools: updatedPools };
            });

            //console.log('stonfi_tonusdt_balance: ', data);
        } catch (error) {
            console.error('Failed to fetch balance jettons:', error);
        } finally {
            set({ loadStatus: false })
        }

    },
    updateSpeedSF: (name: string, speed: number) => set((state) => ({
        pools: state.pools.map(item =>
            item.name === name ? { ...item, speed } : item
        )
    })),
    totalSpeedSF: () => {
        const state = get();
        return state.pools.reduce((acc, currency) => {
            //const speed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            return acc + currency.speed;
        }, 0);
    },

}))
