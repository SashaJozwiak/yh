import { Menu } from './components/Menu/Menu';
import { Balance } from "./components/Balance/Balance";

//import { useTonConnectUI } from '@tonconnect/ui-react';

//import { useWallet } from "./earnStore/wallet"
import { useUHSWallet } from "./earnStore/UHSWallet"

import { useEarnNav } from './earnStore/nav';
import { ShowBalance } from './components/ShowBalance/ShowBalance';
import { useEffect/* , useReducer  */ } from 'react';
import { HOLD } from './components/HOLD/HOLD';
import { useAuth, useUserData } from '../store/main';
import { Tasks } from './components/TASKS/Tasks';
import { Launch } from './components/LAUNCH/Launch';
import { Build } from './components/BUILD/Build';

import s from './mainearn.module.css'

export const MainEarn = () => {
    //const [tonConnectUI] = useTonConnectUI();
    //const { connector } = TonConnectUIProviderPropsWithConnector();
    //const walletState = useWallet(state => state)
    //const walletAssets = useWallet(state => state.assets)
    //const UHSWalletAssets = useUHSWallet(state => state.assets)

    //navs
    const isOpenWallet = useEarnNav(state => state.isOpenWallet)
    const tool = useEarnNav(state => state.tool)

    const ufAddress = useUserData(state => state.user.userFriendlyAddress)
    const isAuth = useAuth(state => state.isAuth)

    const getPricesUsd = useUHSWallet(state => state.fetchPrices)
    const getUHSPrice = useUHSWallet(state => state.fetchUHSPrice)

    const recPriceUHS = useUHSWallet(state => state.recPriceUHS)
    const recPriceUSDT = useUHSWallet(state => state.recPriceUSDT)


    //console.log('TON wallet: ', walletAssets)
    //console.log('UHS Wallet: ', UHSWalletAssets);
    //console.log('tonConnectUI: ', tonConnectUI.connector?.wallet?.connectItems?.tonProof);

    useEffect(() => {
        if (!recPriceUSDT) {
            getPricesUsd();
        }

    }, [getPricesUsd, recPriceUSDT])

    useEffect(() => {
        if (!recPriceUHS) {
        getUHSPrice();
        }
    }, [getUHSPrice, recPriceUHS])


    return (
        <>
            {!ufAddress && !isAuth &&
                <div>
                    {/* <span style={{ margin: '2vh auto' }} className={s.loader}></span> */}
                    <h2
                        style={{ margin: '5vh auto' }}
                        className={s.fadeIn}>Connect wallet, please
                    </h2>
                </div>
            }
            {ufAddress && !isAuth && <h2
                style={{ margin: '5vh auto' }}
                className={s.fadeIn}>Reconnect wallet, please</h2>}
            {ufAddress && isAuth && <Balance />}
            {ufAddress && isAuth && !isOpenWallet && <Menu />}
            {ufAddress && isAuth && isOpenWallet && <ShowBalance />}
            {ufAddress && isAuth && tool === 'hold' && !isOpenWallet && <HOLD />}
            {ufAddress && isAuth && tool === 'tasks' && !isOpenWallet && <Tasks />}
            {ufAddress && isAuth && tool === 'launch' && !isOpenWallet && <Launch />}
            {ufAddress && isAuth && tool === 'build' && !isOpenWallet && <Build />}
        </>
    )
}
