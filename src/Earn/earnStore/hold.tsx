
import { create } from 'zustand'
import { useWallet } from './wallet'
import { useUHSWallet } from './UHSWallet'

import { UseHold } from './types'

export const useHold = create<UseHold>((set, get) => ({
    assets: [
        {
            name: 'UHS',
            address: '0:3c4aac2fb4c1dee6c0bacbf86505f6bc7c31426959afd34c09e69ef3eae0dfcc',
            value: 0,
            range: [50, 50000],
            APY: 0.025,
            speed: 0,
            src: "https://cache.tonapi.io/imgproxy/O50xd6OBiMr9BT0yxOPhICp4tKiIHa-ahtuzFcxBEv0/rs:fill:200:200:1/g:no/aHR0cHM6Ly91aHNwZWVkLmdpdGh1Yi5pby91aHMvdWhzXzI1NngyNTZfNS5wbmc.webp",
        },

        {
            name: 'USD₮',
            address: '0:b113a994b5024a16719f69139328eb759596c38a25f59028b146fecdc3621dfe',
            value: 0,
            range: [20, 500],
            APY: 0.007,
            speed: 0,
            src: "https://cache.tonapi.io/imgproxy/T3PB4s7oprNVaJkwqbGg54nexKE0zzKhcrPv8jcWYzU/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZXRoZXIudG8vaW1hZ2VzL2xvZ29DaXJjbGUucG5n.webp",
        },
    ],
    lastClaimTimestamp: '',
    isFetchClaimData: false,
    loading: true,
    fetchLastClaim: async (userId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}claim/last-claim/${userId}/tw-claim`);
            const data = await response.json();

            if (response.ok) {
                set({ lastClaimTimestamp: data.timestamp, loading: false, isFetchClaimData: true });
            } else {
                console.error("Ошибка при получении последней claim транзакции:", data.message);
            }

        } catch (error) {
            console.error("Ошибка сети при запросе последней claim транзакции:", error);
        }
    },
    updateHoldAssets: () => {
        const walletState = useWallet.getState();
        const holdState = get();

        const updatedAssets = holdState.assets.map(asset => {
            const matchingJetton = walletState.assets.find(jetton => jetton.jetton.address === asset.address);
            if (matchingJetton) {
                const realBalance = Number((Number(matchingJetton.balance) / (10 ** matchingJetton.jetton.decimals)).toFixed(2));

                return {
                    ...asset,
                    value: realBalance,
                    //src: matchingJetton.jetton.image
                };
            }
            return asset;
        });

        console.log('assets for hold', updatedAssets)

        set({ assets: updatedAssets });
    },

}))


export const useHoldUH = create<UseHold>((set, get) => ({
    assets: [
        {
            name: 'UHS',
            address: '0:3c4aac2fb4c1dee6c0bacbf86505f6bc7c31426959afd34c09e69ef3eae0dfcc',
            value: 0,
            range: [50, 50000],
            APY: 0.05,
            speed: 0,
            src: "https://cache.tonapi.io/imgproxy/O50xd6OBiMr9BT0yxOPhICp4tKiIHa-ahtuzFcxBEv0/rs:fill:200:200:1/g:no/aHR0cHM6Ly91aHNwZWVkLmdpdGh1Yi5pby91aHMvdWhzXzI1NngyNTZfNS5wbmc.webp",
        },

        {
            name: 'USD₮',
            address: '0:b113a994b5024a16719f69139328eb759596c38a25f59028b146fecdc3621dfe',
            value: 0,
            range: [20, 500],
            APY: 0.015,
            speed: 0,
            src: "https://cache.tonapi.io/imgproxy/T3PB4s7oprNVaJkwqbGg54nexKE0zzKhcrPv8jcWYzU/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZXRoZXIudG8vaW1hZ2VzL2xvZ29DaXJjbGUucG5n.webp",
        },
    ],
    lastClaimTimestamp: '',
    isFetchClaimData: false,
    loading: true,
    fetchLastClaim: async (userId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}claim/last-claim/${userId}/uw-claim`);
            const data = await response.json();

            if (response.ok) {
                set({ lastClaimTimestamp: data.timestamp, loading: false, isFetchClaimData: true });
            } else {
                console.error("Ошибка при получении последней claim транзакции:", data.message);
            }
        } catch (error) {
            console.error("Ошибка сети при запросе последней claim транзакции:", error);
        }
    },
    updateHoldAssets: () => {
        const walletState = useUHSWallet.getState();
        const holdState = get();



        const updatedAssets = holdState.assets.map(asset => {
            const matchingJetton = walletState.assets.find(jetton => jetton.jetton.address === asset.address);
            if (matchingJetton) {
                const realBalance = Number((Number(matchingJetton.balance) / (10 ** matchingJetton.jetton.decimals)).toFixed(2));

                return {
                    ...asset,
                    value: realBalance,
                    src: matchingJetton.jetton.image
                };
            }
            return asset;
        });

        console.log('assets for hold2', updatedAssets)
        set({ assets: updatedAssets });
    },
}))
