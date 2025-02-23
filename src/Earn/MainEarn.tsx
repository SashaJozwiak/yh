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
    //const { connector } = TonConnectUIProviderPropsWithConnector();
    //const walletState = useWallet(state => state)
    const walletAssets = useWallet(state => state.assets)
    const UHSWalletAssets = useUHSWallet(state => state.assets)

    //navs
    const isOpenWallet = useEarnNav(state => state.isOpenWallet)
    const tool = useEarnNav(state => state.tool)


    const getPricesUsd = useUHSWallet(state => state.fetchPrices)
    const getUHSPrice = useUHSWallet(state => state.fetchUHSPrice)

    console.log('TON wallet: ', walletAssets)
    console.log('UHS Wallet: ', UHSWalletAssets);
    console.log('tonConnectUI: ', tonConnectUI.connector?.wallet?.connectItems?.tonProof);

    useEffect(() => {
        getPricesUsd();
    }, [getPricesUsd])

    useEffect(() => {
        getUHSPrice();
    }, [getUHSPrice])

    return (
        <>
            <Balance />
            {!isOpenWallet && <Menu />}
            {isOpenWallet && <ShowBalance />}
            {tool === 'hold' && !isOpenWallet && <HOLD />}
        </>
    )
}
