import { Balance } from "../Earn/components/Balance/Balance"
import { ShowBalance } from "../Earn/components/ShowBalance/ShowBalance"
import { useEarnNav } from "../Earn/earnStore/nav"
import { useAuth, useUserData } from "../store/main"
import { Assets } from "./components/Asset/Assets"
import { Menu } from "./components/Menu/Menu"

import s from './trade.module.css'
import { useTradeNav } from "./tradeStore/nav"

export const Trade = () => {

    const ufAddress = useUserData(state => state.user.userFriendlyAddress)
    const isAuth = useAuth(state => state.isAuth)

    const isOpenWallet = useEarnNav(state => state.isOpenWallet)

    const tradeNav = useTradeNav(state => state.tool)


    return (
        <>
            {!ufAddress && !isAuth &&
                <div>
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
            {ufAddress && isAuth && isOpenWallet && <ShowBalance />}
            {ufAddress && isAuth && !isOpenWallet && <Menu />}
            {ufAddress && isAuth && !isOpenWallet && tradeNav == 'assets' && <Assets />}

        </>
    )
}
