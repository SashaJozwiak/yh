import { Menu } from './components/Menu/Menu';
import { Balance } from "./components/Balance/Balance";

import { useTonConnectUI } from '@tonconnect/ui-react';

import { useWallet } from "./earnStore/wallet"
import { useUHSWallet } from "./earnStore/UHSWallet"

import { useEarnNav } from './earnStore/nav';
import { ShowBalance } from './components/ShowBalance/ShowBalance';
import { useEffect/* , useReducer  */ } from 'react';
import { HOLD } from './components/HOLD/HOLD';
import { useUserData } from '../store/main';
import { Tasks } from './components/TASKS/Tasks';

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

    const ufAddress = useUserData(state => state.user.userFriendlyAddress)



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
            {!ufAddress && <h2>Connect wallet, please</h2>}
            {ufAddress && <Balance />}
            {ufAddress && !isOpenWallet && <Menu />}
            {ufAddress && isOpenWallet && <ShowBalance />}
            {ufAddress && tool === 'hold' && !isOpenWallet && <HOLD />}
            {ufAddress && tool === 'tasks' && !isOpenWallet && <Tasks />}
        </>
    )
}
