import { create } from 'zustand';
import { useUHSWallet } from './UHSWallet';

import { StartupStore } from './types'

import WebApp from '@twa-dev/sdk';

export const useStartupStore = create<StartupStore>((set, get) => ({
    startups: [],
    isLoading: true,
    addIsLoading: false,
    isGetStartups: false,
    addInvestForStars: async (userId, startupId, currency, amount, amountInUsd, total, rawAddress) => {
        set({ addIsLoading: true });

        const title = `${amount} invest in asset`;
        const description = `invest in asset ~${amount * 0.02} USD`;
        const price = amount;

        try {
            //console.log('userUHSId: ', userId, startupId, currency, amount, amountInUsd, total, rawAddress)
            //console.log('title, description, amount, price: ', title, description, amount, price)

            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}payments/starspay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, amount, price }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const data = await response.json();
            const invoiceLink = data.invoiceLink;
            //console.log('Ссылка на инвойс получена:', invoiceLink);

            //WebApp.openInvoice(invoiceLink);
            WebApp.openInvoice(invoiceLink, (status) => {
                if (status === "paid") {
                    /* const newRandomCards = amount + get().randomCards;
                    get().addRandomCards(newRandomCards);
                    get().saveDeck();
                    get().saveTransaction(user_id, amount, price); */
                    const amounUHS = amount * 2;
                    get().addInvest2(userId, startupId, currency, amounUHS, amountInUsd, total, rawAddress);
                    //console.log('удалось оплатить, карты добавлены')
                } else {
                    console.error('Не удалось оплатить');
                }
            });



        } catch (error) {
            console.error("Ошибка при добавлении инвестиций за звезды:", error);
        } finally {
            set({ addIsLoading: false });
            get().fetchStartups();
            useUHSWallet.getState().getBalance(userId)
            useUHSWallet.getState().getShares(userId)
        }

    },
    addInvest2: async (userId, startupId, currency, amount, amountInUsd, total, rawAddress) => {
        set({ addIsLoading: true });


        try {
            const token = localStorage.getItem(rawAddress + 'uhs');

            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhslaunch/addInvest2`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    startupId,
                    currency,
                    amount,
                    amountInUsd,
                    total,
                    rawAddress,
                    token
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Ошибка при добавлении инвестиций");
            }

            console.log('add invest? ', data)

            /* set((state) => ({
                investments: [...state.investments, { userId, startupId, currency, amount, total }],
            })); */

        } catch (error) {
            console.error("Ошибка при добавлении инвестиций:", error);
        } finally {
            set({ addIsLoading: false });
            get().fetchStartups();
            useUHSWallet.getState().getBalance(userId)
            useUHSWallet.getState().getShares(userId)
        }
    },
    addInvest: async (userId, startupId, currency, amount, amountInUsd, total, rawAddress) => {
        set({ addIsLoading: true });


        try {
            const token = localStorage.getItem(rawAddress + 'uhs');

            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhslaunch/addInvest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    startupId,
                    currency,
                    amount,
                    amountInUsd,
                    total,
                    rawAddress,
                    token
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Ошибка при добавлении инвестиций");
            }

            console.log('add invest? ', data)

            /* set((state) => ({
                investments: [...state.investments, { userId, startupId, currency, amount, total }],
            })); */

        } catch (error) {
            console.error("Ошибка при добавлении инвестиций:", error);
        } finally {
            set({ addIsLoading: false });
            get().fetchStartups();
            useUHSWallet.getState().getBalance(userId)
            useUHSWallet.getState().getShares(userId)
        }
    },
    fetchStartups: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhslaunch/startups`);
            if (!response.ok) throw new Error('Failed to fetch startups');

            const data = await response.json();
            const sortedStartups = [...data].sort((a, b) => a.id - b.id);
            set({ startups: sortedStartups, isGetStartups: true });
        } catch (error) {
            console.error('Error fetching startups:', error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
