
import { create } from 'zustand'
import { TradeAssets } from './types'

import { useTradeNav } from './nav';
import { useUHSWallet } from '../../Earn/earnStore/UHSWallet'


export const useTradeAssets = create<TradeAssets>((set, get) => ({
    //isOpenWallet: false,
    assets: [],
    isReady: false,
    isBuy: false,
    isLoadAssets: false,
    isAddAssets: false,
    currency: 'UHS',
    setReady: () => set({ isReady: true }),
    buy: async (userId, shareId, rawAddress, setOk) => {
        set({ isBuy: true })
        console.log('userId, shareId, rawAddress: ', userId, shareId, rawAddress)

        try {
            const token = localStorage.getItem(rawAddress + 'uhs');
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhstradeassets/buyAsset`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId, shareId, rawAddress, token
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Ошибка при добавлении инвестиций в трейд");
            }

            console.log('buy share: ', data)

            await get().getAssets();
            setOk(true);

        } catch (error) {
            console.error("Ошибка при покупки инвестиций в трейд:", error);
        } finally {
            set({ isBuy: false })
            await useUHSWallet.getState().getShares(userId);
            await useUHSWallet.getState().getBalance(userId)
        }

    },
    removeAssets: async (userId, shareId, rawAddress) => {
        set({ isLoadAssets: true });


        try {
            const token = localStorage.getItem(rawAddress + 'uhs');
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhstradeassets/removeAsset`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId, shareId, rawAddress, token
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Ошибка при добавлении инвестиций в трейд");
            }

            console.log('remove share: ', data)

            set({ isLoadAssets: false });

        } catch (error) {
            console.error("Ошибка при удалении инвестиций в трейд:", error);
        }

    },
    addAssets: async (userId, startupId, shareId, price, rawAddress) => {
        set({ isAddAssets: true });

        try {
            const token = localStorage.getItem(rawAddress + 'uhs');

            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhstradeassets/addTradeAsset`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId, startupId, shareId, price, rawAddress, token
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Ошибка при добавлении инвестиций в трейд");
            }

            console.log('add share: ', data)
            set({ isLoadAssets: false });
            set({ isAddAssets: true });
            useTradeNav.getState().setAssetsNav('assets');

        } catch (error) {
            console.error("Ошибка при добавлении инвестиций в трейд:", error);
        }

    },
    getAssets: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhstradeassets/assets`);
            if (!response.ok) throw new Error('Failed to fetch startups');

            const data = await response.json();
            console.log('assets trade: ', data)
            set({ assets: data, isLoadAssets: true });
        } catch (error) {
            console.error('Error fetching startups:', error);
        } finally {
            set({ isLoadAssets: false });
        }
    },
    setCurrency: (curr) => {
        set({
            currency: curr
        })
    }
}))
