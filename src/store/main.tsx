import { create } from 'zustand'
import { User, UseStore, UseUserBalances, UseUserBalancesJ, UseStonFi, UseDedust, UseTonco, BalanceObj, UseAuth } from '../types/stores'
import { devtools } from 'zustand/middleware'
import { Address } from "@ton/ton";
import { useWallet } from '../Earn/earnStore/wallet';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import { useUHSWallet } from '../Earn/earnStore/UHSWallet';

import WebApp from '@twa-dev/sdk';

const useWalletStore = useUHSWallet;

export const useAuth = create<UseAuth>((set, get) => ({
    userId: null,
    token: '',
    address: '',
    limit: 24,
    isAuth: false,
    isError: false,
    isLoading: false,
    isRefreshing: false,
    mail: '',
    heirMail: '',
    years: 0,
    isMailsLoading: false,
    setMails: async (mail, heirMail, years, uhs_id, rawAddress) => {
        try {
            set({ isMailsLoading: true })
            const token = localStorage.getItem(rawAddress + 'uhs');

            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhsmails/saveMails`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mail, heirMail, years, uhs_id, rawAddress, token })
            });

            if (response.ok) {
                const data = await response.json();
                set({
                    mail: data.data.email,
                    heirMail: data.data.heirEmail,
                    years: data.data.years,
                    isLoading: false
                });
                //return { success: true };
            } else {
                const error = await response.json();
                console.log('errror: ', error)
                //set({ isError: true, isLoading: false });
                //return { success: false, error: error.error };
            }



        } catch (err) {
            //maybe clear locstrg?
            set({ isMailsLoading: false })
            console.log('error: ', err);
        } finally {
            setTimeout(() => {
                set({ isMailsLoading: false })
            }, 1000)

        }
    },
    updateLimit: async (uhs_id, newLimit, amount) => {

        try {
            const res = await fetch(`${import.meta.env.VITE_SECRET_HOST}claim/updateLimit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uhs_id,
                    limit: newLimit,
                    amount, // строка или число — главное, чтобы серверу подошло
                }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || 'Failed to update limit');

            const current = get();
            if (current && current.userId === uhs_id) {
                set({
                    ...current,
                    limit: newLimit,
                });
            }

            const { getBalance } = useWalletStore.getState();
            getBalance(uhs_id)

        } catch (err) {
            const error = err instanceof Error ? err : new Error('Unknown error');
            console.error('updateLimit error:', error);
        }
    },

    refreshToken: async (token) => {
        //auth/refresh
        const isRefreshing = get().isRefreshing;
        console.log('isRefreshing: ', isRefreshing)
        if (isRefreshing) {
            return;
        }

        //set({ isRefreshing: true });


        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhsusers/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });

            if (!response.ok) {
                console.log(response.json())
                set(() => ({ isError: true }))
                throw new Error('refresh token failed');
            }


            const res = await response.json()
            console.log('refresh res: ', res)

            localStorage.setItem(res.userRes.wallet_address + 'uhs', res.token)

            /* set((state) => ({
                ...state,
                isAuth: true,
                token: res.token,
                userId: res.userRes.id,
                address: res.userRes.wallet_address,
            })); */

            set(() => ({
                isAuth: true,
                token: res.token,
                userId: res.userRes.id,
                address: res.userRes.wallet_address,
                limit: res.userRes.limit,
                isRefreshing: true,
                mail: res.userRes.email,
                years: res.userRes.years,
                heirMail: res.userRes.heir_email
            }))


        } catch (err) {
            //maybe clear locstrg?
            localStorage.removeItem(token)
            set({ isRefreshing: false });
            console.log('error: ', err);
        }
    },
    checkNonce: async (proof, account) => {
        console.log('proof and accont for post fecth: ', proof, account)

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhsusers/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ proof, account })
            });

            if (!response.ok) {
                console.log(response.json())
                set(() => ({ isError: true }))
                throw new Error('checkNonce and auth was not ok');
            }

            const res = await response.json()
            console.log('res auth_!:', res)
            //localStorage.setItem('test', 'test');
            localStorage.setItem(res.user.wallet_address + 'uhs', res.token)

            set(() => ({
                isAuth: true,
                token: res.token,
                userId: res.user.id,
                address: res.user.wallet_address,
                mail: res.userRes.email,
                years: res.userRes.years,
                heirMail: res.userRes.heir_email
            }))

        } catch (err) {
            set(() => ({ isError: true }))
            console.log('error: ', err);
        }

    }
}))

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
        active_usernames: [],
        anonim: false,
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
    isAuth: false,
    balanceLoader: true,
    miningError: '',
    miningLoader: false,
    authError: false,
    //setUser: (user: User) => set(() => ({ user })),
    plusLocalBalance: (bal) => {
        set((state) => ({
            ...state,
            balance: {
                ...state.balance,
                balance: state.balance.balance + bal,
            }
        }))
    },
    setAuthError: (isTrue) => set(() => ({ authError: isTrue })),
    minusBalance: async (price) => {
        const user_id = get().user.internalId;
        console.log('changeBalance price: ', price)
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}game/minusBalance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id, price }),
            });

            if (!response.ok) {
                throw new Error('Network response \'savedeck\' was not ok');
            }

            const res = await response.json()
            console.log('newBalance after buy:', res)

            set((state) => ({
                ...state,
                balance: {
                    ...state.balance,
                    balance: res.newBalance,
                }
            }))


        } catch (err) {
            console.log('minus balance error: ', err)
        }

    },
    handleReferral: async (externalId, userId, startParam, rawAddress) => {
        //const [refId, refTeamId] = startParam.split("_");
        //const refTeamNum = refTeamId ? Number(refTeamId) : null;
        const userData = WebApp.initData;

        if (!userData || userData.length < 10) {
            console.error('Invalid WebApp.initData:', userData);
            throw new Error('WebApp.initData is invalid!');
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}preRegAdd`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: Number(userId),
                    refId: Number(startParam),
                    externalId: Number(externalId),
                    rawAddress: rawAddress,
                    telegramInitData: userData
                }),
            });

            if (response.status === 409) {
                console.log('Referral already exists, skipping insert.');
                return; // Никакой ошибки, просто выходим
            }

            if (!response.ok) {
                throw new Error('Failed to add referral data to DB');
            }


            console.log('Referral data added successfully');
        } catch (error) {
            console.error('handleReferral error:', error);
        } finally {
            localStorage.removeItem('UHSrefferer')
        }
    },
    setUser: async (user: Partial<User>) => {
        console.log('user in state: ', user)
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}auth?externalId=${user.id}&userName=${encodeURIComponent(user.userName as string)}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Cache-Control': 'no-cache' //add or clear
                },
                credentials: 'include', //add or clear
            });

            if (!response.ok) {
                throw new Error('Failed to update user in DB');
            }

            const data = await response.json();
            //console.log('bd_user_data: ', data);
            //console.log('from_tg_data_refs: ', user)
            const getBalance = Number(data.balance.balance).toFixed(3);
            set((state) => ({
                /* ...state,
                balanceLoader: false, */
                user: {
                    ...state.user,
                    ...user,
                    internalId: data.user.internal_id,
                    team_id: data.balance.team_id,
                    refs: +data.referralStats.total_invited || 0,
                    refs_active: +data.referralStats.active_invited || 0,
                    anonim: data.user.anonim || false,
                    active_usernames: data.referralStats.active_usernames || [],
                },
                balance: {
                    ...state.balance,
                    balance: +getBalance,
                    isHold: data.balance.is_hold,
                    period: data.balance.period,
                    speed: +data.balance.speed,
                    finishData: data.balance.finishdate,
                    startData: data.balance.startdate
                },
            }))

            console.log('balance load: false: ', get().balanceLoader)
            /* set((state) => ({
                ...state,
                balanceLoader: false,
            })) */
            set({ balanceLoader: false });
            set({ isAuth: true });
            console.log('balance load: false: ', get().balanceLoader)

        } catch (err) {
            set((state) => ({
                user: {
                    ...state.user,
                    ...user,
                    internalId: 1,
                }
            }))
            set({ authError: true });
            console.error('setUser error :', err);
        }
    },
    setBalanceData: async (balance: Partial<BalanceObj>) => {
        set(() => ({
            miningLoader: true
        }));
        const internalId = get().user.internalId;
        const uf_address = get().user.userFriendlyAddress;
        //console.log('uf_address for backend: ', uf_address)

        if (balance.isHold) {
            const userData = WebApp.initData;
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
                        telegramInitData: userData
                    }),
                })

                if (!response.ok) {

                    const messageError = await response.json();
                    console.log('Error message:', messageError);

                    set(() => ({
                        miningError: messageError.error
                    }));
                    throw new Error(`Network response 'startMining' was not ok: ${messageError.error}`);
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
            } finally {
                set(() => ({
                    miningLoader: false
                }));
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
            console.error('setBalance stop mining :', err);

        } finally {
            set(() => ({
                miningLoader: false
            }));
        }
    },
    addAddresses: async (addresses) => {
        console.log('addresses: ', addresses);

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
    },
    setAnonim: async (userId, anonim) => {

        console.log('set anon start:', userId, anonim)

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}setanonim`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    anonim: anonim,
                }),
            })

            if (!response.ok) {
                throw new Error('Network response \'setAnonim\' was not ok');
            }

            const res = await response.json()
            console.log(res)

            set((state) => ({
                user: {
                    ...state.user,
                    anonim: anonim,  // Обновляем поле anonim
                }
            }));

        } catch (err) {
            console.error('setAnonim error :', err);
        }

    },
    setMiningError: async () => {
        set(() => ({
            miningError: ''
        }));
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
            inH: 50,
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
                        'accept': 'application/json',
                        'Cache-Control': 'no-cache' //add or clear
                    },
                    credentials: 'include', //add or clear
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
        if (rawAddress === null) {
            return;
        }

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
            name: 'UHS',
            address: '0:3c4aac2fb4c1dee6c0bacbf86505f6bc7c31426959afd34c09e69ef3eae0dfcc',
            value: 0,
            range: [1, 100000],
            inH: 10000,
            speed: 0,
            src: 'https://app.tonco.io/#/swap?from=USD%E2%82%AE&to=UHS',
        },
        {
            name: 'USDT',
            address: '0:b113a994b5024a16719f69139328eb759596c38a25f59028b146fecdc3621dfe',
            value: 0,
            range: [0.01, 1000],
            inH: 80,
            speed: 0,
            src: 'https://t.me/OfficialTether',
        },
        {
            name: 'NOT',
            address: '0:2f956143c461769579baef2e32cc2d7bc18283f40d20bb03e432cd603ac33ffc',
            value: 0,
            range: [1000, 50000],
            inH: 50,
            speed: 0,
            src: 'https://t.me/notcoin',
        },/* ,
        {
            name: 'RODDGAZM',
            address: '0:4da7033be81d36a70fe3fd43da6a6bdb5317ea1595a636a3c2405ed1a1f9cbc6',
            value: 0,
            range: [1000, 500000],
            inH: 100,
            speed: 0,
            src: 'https://t.me/milanrodd',
        } */
    ],
    loadStatus: true,
    totalSpeedJ: () => {
        const state = get();
        return state.jettons.reduce((acc, currency) => {
            //const speed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            return acc + currency.speed;
        }, 0);
    },

    updateBalanceJ: async (rawAddress: string) => {
        set({ loadStatus: true });
        const { setWallet } = useWallet.getState();

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
            console.log('jetttons result:', data)
            // Фильтрация данных
            const filteredBalances = data.balances.filter(
                (item) =>
                    item.balance !== '0' &&  // Условие: баланс не равен 0
                    !item.jetton.name.startsWith('LP ') && // Условие: имя не начинается с "LP "
                    (
                        item.jetton.address === "0:3c4aac2fb4c1dee6c0bacbf86505f6bc7c31426959afd34c09e69ef3eae0dfcc" || // Адрес равен указанному
                        item.jetton.verification === "whitelist" // Если адрес не равен, проверяем verification
                    )
            );

            const sortedBalances = filteredBalances.sort((a, b) => {
                const priority = ["UHS", "USD₮", "TON"]; // Заданный порядок

                const aPriority = priority.indexOf(a.jetton.symbol);
                const bPriority = priority.indexOf(b.jetton.symbol);

                // Если оба токена имеют приоритет, сортируем по их индексам
                if (aPriority !== -1 && bPriority !== -1) {
                    return aPriority - bPriority;
                }

                // Если только один из токенов имеет приоритет, он должен идти первым
                if (aPriority !== -1) return -1;
                if (bPriority !== -1) return 1;

                // Если ни один из токенов не имеет приоритета, сортируем по значению
                const aValue = parseFloat(a.balance) / (10 ** a.jetton.decimals);
                const bValue = parseFloat(b.balance) / (10 ** b.jetton.decimals);

                return bValue - aValue; // Сортировка по убыванию
            });

            // Отправка отфильтрованных данных в другой стор
            setWallet({
                address: rawAddress, // Передаем адрес
                assets: sortedBalances, // Передаем отфильтрованные токены
            });

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
                    return {
                        ...jetton,
                        value: 0,
                    };
                });

                console.log('updatedJettons: ', updatedJettons);

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
            inH: 50,
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

export const useDedust = create<UseDedust>((set, get) => ({
    pools: [
        {
            name: 'TON/USDT',
            address: 'EQA-X_yo3fzzbDbJ_0bzFWKqtRuZFIRa1sJsveZJ1YpViO3r',
            value: 0,
            range: [0.1, 100],
            inH: 50,
            speed: 0,
            src: 'https://dedust.io/pools/EQA-X_yo3fzzbDbJ_0bzFWKqtRuZFIRa1sJsveZJ1YpViO3r',
        },
    ],
    loadStatus: false,
    updateBalanceDedust: async (rawAddress: string) => {
        set({ loadStatus: true });
        //const testRawAddress = 'UQAfojORTA27dsoKsPrxmDo5zQ_UK0hwK4MgxH-Ny9YiUYz5'
        console.log('fetch new poool for: ', rawAddress)
        try {
            const response = await fetch(`https://api.dedust.io/v2/accounts/${encodeURIComponent(rawAddress)}/assets`, {
                //mode: 'no-cors',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('dedust pool: ', data)

            set(state => {
                const updatedPools = state.pools.map(pool => {
                    const matchingAssets = data.filter(poolIn => poolIn.asset.address === pool.address);

                    if (matchingAssets.length > 0) {
                        const totalBalance = matchingAssets.reduce((acc, asset) => acc + parseInt(asset.balance, 10), 0);

                        return {
                            ...pool,
                            value: totalBalance / 1000000000 // Если баланс в более мелкой единице (например, в токенах)
                        };
                    } else {
                        // Если соответствующие активы не найдены, устанавливаем value: 0
                        return {
                            ...pool,
                            value: 0
                        };
                    }
                });

                console.log('updatedPools Dedust: ', updatedPools);
                return { pools: updatedPools };
            });


        } catch (error) {
            console.error('Failed to fetch balance jettons dedust:', error);
        } finally {
            set({ loadStatus: false })
        }
    },
    updateSpeedDD: (name: string, speed: number) => set((state) => ({
        pools: state.pools.map(item =>
            item.name === name ? { ...item, speed } : item
        )
    })),
    totalSpeedDD: () => {
        const state = get();
        return state.pools.reduce((acc, currency) => {
            //const speed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            return acc + currency.speed;
        }, 0);
    },
}))

export const useTonco = create<UseTonco>((set, get) => ({
    pools: [
        {
            name: 'UHS/USDT',
            address: '0:c2fd933c63ed12ebc737692903dd34fa400f296158445782a56ccf6d39981dd0',
            value: 0,
            range: [1, 100000],
            inH: 10000,
            speed: 0,
            src: 'https://app.tonco.io/#/pool/EQDC_ZM8Y-0S68c3aSkD3TT6QA8pYVhEV4KlbM9tOZgd0CSa',
        },
    ],
    loadStatus: false,
    updateBalanceTonco: async (rawAddress: string) => {
        set({ loadStatus: true });
        //const testRawAddress = 'UQAfojORTA27dsoKsPrxmDo5zQ_UK0hwK4MgxH-Ny9YiUYz5'
        const client = new ApolloClient({
            uri: 'https://indexer.tonco.io', // Ваш GraphQL endpoint
            cache: new InMemoryCache(),
        });

        const POSITIONS_QUERY = gql`
            query GetPoolHolders($poolAddress: String!, $ownerAddress: String!) {
  positions(where: { pool: $poolAddress, owner: $ownerAddress }) {
    amount0
    amount1
  }
}
        `

        console.log('tonco rawAddress: ', rawAddress)
        const ownerAddress = Address.parse(rawAddress).toString();
        console.log('tonco EQ address: ', ownerAddress)

        const poolAddress = '0:c2fd933c63ed12ebc737692903dd34fa400f296158445782a56ccf6d39981dd0'

        const { data } = await client.query({
            query: POSITIONS_QUERY,
            variables: { poolAddress, ownerAddress },
        });

        console.log('tonco data: ', data)

        const positions = data.positions;

        console.log('positions:', positions)

        const decimalsJetton0 = 9;
        const decimalsJetton1 = 6;  

        const formatAmount = (amount, decimals) => Number(amount) / 10 ** decimals;

        let totalJetton0 = 0;
        let totalJetton1 = 0;


        positions.forEach((position) => {
            totalJetton0 += formatAmount(position.amount0, decimalsJetton0);
            totalJetton1 += formatAmount(position.amount1, decimalsJetton1);
        });


        totalJetton0 = +totalJetton0.toFixed(3);
        totalJetton1 = +totalJetton1.toFixed(2) * 100; 

        const totalValue = totalJetton0 + totalJetton1;


        set((state) => ({
            pools: state.pools.map((pool) =>
                pool.address === "0:c2fd933c63ed12ebc737692903dd34fa400f296158445782a56ccf6d39981dd0"
                    ? { ...pool, value: totalValue }
                    : pool
            ),
        }));

        console.log(`Updated TONCO pool value: ${totalValue}`);

    },

    updateSpeedTonco: (name: string, speed: number) => set((state) => ({
        pools: state.pools.map(item =>
            item.name === name ? { ...item, speed } : item
        )
    })),
    totalSpeedTonco: () => {
        const state = get();
        return state.pools.reduce((acc, currency) => {
            //const speed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            return acc + currency.speed;
        }, 0);
    },
}))

