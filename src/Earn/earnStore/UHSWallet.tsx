
import { create } from 'zustand'
import { UseUHSWallet } from './types'

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const useUHSWallet = create<UseUHSWallet>((set, get) => ({
    address: null,
    assets: [
        {
            balance: "5902638871874",
            jetton:
            {
                address: '0:3c4aac2fb4c1dee6c0bacbf86505f6bc7c31426959afd34c09e69ef3eae0dfcc',
                name: 'YouHold Speed',
                symbol: 'UHS',
                decimals: 9,
                image: "https://cache.tonapi.io/imgproxy/O50xd6OBiMr9BT0yxOPhICp4tKiIHa-ahtuzFcxBEv0/rs:fill:200:200:1/g:no/aHR0cHM6Ly91aHNwZWVkLmdpdGh1Yi5pby91aHMvdWhzXzI1NngyNTZfNS5wbmc.webp",
                verification: "none",
                score: 0,
            },
            wallet_address:
            {
                address: '0:c6e0dccbd2d2c6ba86e1541ca92656fe1d3ec98ec29eafa76b532e2fe4e57e35',
                is_scam: false,
                is_wallet: false
            },
            priceUsd: 0,
        },
        {
            balance: "9308339",
            jetton:
            {
                address: "0:b113a994b5024a16719f69139328eb759596c38a25f59028b146fecdc3621dfe",
                name: "Tether USD",
                symbol: "USD₮",
                decimals: 6,
                image: "https://cache.tonapi.io/imgproxy/T3PB4s7oprNVaJkwqbGg54nexKE0zzKhcrPv8jcWYzU/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZXRoZXIudG8vaW1hZ2VzL2xvZ29DaXJjbGUucG5n.webp",
                verification: "whitelist",
                score: 100,
            },
            wallet_address:
            {
                address: "0:f9fd484a4167a0c78744fed7a3362ea041b48a5e7aff8166cfaa738b7b1d8669",
                is_scam: false,
                is_wallet: false
            },
            priceUsd: 0,
        },
    ],
    status: 'loading',
    fetchUHSPrice: async () => {
        set({ status: 'loading' });
        const client = new ApolloClient({
            uri: 'https://indexer.tonco.io', // Ваш GraphQL endpoint
            cache: new InMemoryCache(),
        });

        const PRICE_QUERY = gql`
            query Pools($where: PoolWhere) {
  pools(where: $where) {
    priceSqrt
  }
}
        `

        const poolAddress = "0:c2fd933c63ed12ebc737692903dd34fa400f296158445782a56ccf6d39981dd0";

        const { data } = await client.query({
            query: PRICE_QUERY,
            variables: { where: { address: poolAddress } },
        });

        console.log('data UHS price: ', data.pools[0].priceSqrt)

        //const price = () => ((data.pools[0].priceSqrt / (Math.pow(2, 96))) ** 2) * 1000;

        //console.log('price: ', price())

        set((state) => ({
            assets: state.assets.map((asset) => ({
                ...asset,
                priceUsd: asset.jetton.symbol === 'UHS' && ((data.pools[0].priceSqrt / (Math.pow(2, 96))) ** 2) * 1000 || asset.priceUsd,
            })),
        }));

        set({ status: 'loaded' });
    },
    fetchPrices: async () => {
        set({ status: 'loading' });
        const { assets } = get();
        const tokenAddresses = assets.map((asset) => asset.jetton.address).join(",");

        try {
            const response = await fetch(
                `https://tonapi.io/v2/rates?tokens=${tokenAddresses}&currencies=usd`, {
                headers: {
                    'accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            set((state) => ({
                assets: state.assets.map((asset) => ({
                    ...asset,
                    priceUsd: asset.jetton.symbol !== 'UHS' && data.rates[asset.jetton.address]?.prices?.USD || asset.priceUsd, // если цены нет, ставим 0
                })),
            }));
            set({ status: 'loaded' });
        } catch (error) {
            console.error("Ошибка при получении цен:", error);
        }
    },
    setWallet: ({ address, assets }) => set({ address, assets }),

}))
