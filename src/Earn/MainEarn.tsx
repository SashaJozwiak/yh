import { Menu } from './components/Menu/Menu';
import { Balance } from "./components/Balance/Balance";

import { useTonConnectUI } from '@tonconnect/ui-react';

import { useWallet } from "./earnStore/wallet"
import { useUHSWallet } from "./earnStore/UHSWallet"

import { useEarnNav } from './earnStore/nav';
import { ShowBalance } from './components/ShowBalance/ShowBalance';
import { useEffect } from 'react';
import { HOLD } from './components/HOLD/HOLD';

//import s from './mainearn.module.css'

export const MainEarn = () => {
    const [tonConnectUI] = useTonConnectUI();
    //const {connector } = TonConnectUIProviderPropsWithConnector();
    //const walletState = useWallet(state => state)
    const walletAssets = useWallet(state => state.assets)
    //const UHSWalletAssets = useUHSWallet(state => state.assets)

    //navs
    const isOpenWallet = useEarnNav(state => state.isOpenWallet)
    const tool = useEarnNav(state => state.tool)


    const getPricesUsd = useUHSWallet(state => state.fetchPrices)
    const getUHSPrice = useUHSWallet(state => state.fetchUHSPrice)

    console.log('use wallet: ', walletAssets)
    console.log('tonConnectUI: ', tonConnectUI.connector?.wallet?.connectItems?.tonProof);
    //console.log('walletState: ', UHSWalletAssets)
    //console.log('UHSWalletAssets: ', UHSWalletAssets);


    useEffect(() => {
        getPricesUsd();
    }, [getPricesUsd])

    useEffect(() => {
        getUHSPrice();
    }, [getUHSPrice])

    useEffect(() => {
        console.log('start');
        tonConnectUI.setConnectRequestParameters({ state: 'loading' });


        tonConnectUI.setConnectRequestParameters({
            state: 'ready',
            value: { tonProof: '12345' }
        });
        console.log('ok')
        console.log('tonConnectUI: ', tonConnectUI/* .connector */)

    }, [tonConnectUI]); // Добавьте зависимости, если они изменяются

    useEffect(() => {
        tonConnectUI.onStatusChange(async (wallet) => {
            // eslint-disable-next-line no-unsafe-optional-chaining
            if (wallet?.connectItems?.tonProof && 'proof' in wallet?.connectItems?.tonProof) {
                const proof = wallet?.connectItems?.tonProof.proof;
                const account = wallet.account;

                console.log('proof: ', proof);
                console.log('account: ', account);
                // Отправляем на бэкенд для проверки
                /*  const response = await fetch('/api/verify-ton-proof', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({ proof, account })
                 });
     
                 const data = await response.json();
                 if (data.verified) {
                     console.log('Аутентификация успешна!', data.user);
                 } else {
                     console.error('Ошибка аутентификации!');
                 } */
            }
        });
    }, [tonConnectUI])

    return (
        <>
            <Balance />
            {!isOpenWallet && <Menu />}
            {isOpenWallet && <ShowBalance />}
            {tool === 'hold' && !isOpenWallet && <HOLD />}
        </>
    )
}
