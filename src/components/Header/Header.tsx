import { useEffect, /* useState, */ /* useCallback */ } from 'react';

import { useUserData, /* useUserBalances */ } from '../../store/main';

import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import s from './header.module.css';
import { useBalance } from '../../store/balance';

export const Header: React.FC = () => {
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);
    const rawAddressInState = useUserData(state => state.user.rawAddress);

    const user = useUserData((state) => state.user);
    const setUser = useUserData((state) => state.setUser);
    const addAddresses = useUserData((state) => state.addAddresses);

    const actualSpeed = useBalance(state => state.balance.speed)

    useEffect(() => {
        const userFromTg = WebApp.initDataUnsafe.user;
        console.log('init user render')
        if (userFromTg) {
            const newUser = {
                id: userFromTg.id,
                userName: userFromTg.username || '',
                languageCode: userFromTg.language_code || '',
                userFriendlyAddress: '',
                rawAddress: '',
            };
            setUser(newUser);
        } else if (user.id !== 757322479) {
            const newUser = {
                id: 757322479,
                userName: "Jozwiak",
                languageCode: "en",
                userFriendlyAddress: '',
                rawAddress: '',
            };
            console.log('write jozwiak user in store')
            setUser(newUser);
            console.log('write jozwiak user in store finish')
        }
    }, [setUser, user.id]);


    useEffect(() => {
        console.log('check rawaddress from wallet')
        if (rawAddress && rawAddress !== rawAddressInState) {
            console.log('write addresses  wallet')
            const addresses = {
                userFriendlyAddress,
                rawAddress
            }
            addAddresses(addresses)
        }
    }, [addAddresses, rawAddress, userFriendlyAddress, rawAddressInState])

    console.log(user)

    return (
        <div className={s.header}>
            <button className={s.profile}>
                <p style={{ fontSize: '0.8rem' }}>
                    {/* {user.userName.slice(0, 8)} */}
                    Кабинет
                </p>
            </button>

            <div className={s.speed}>
                <p>{actualSpeed < 100 ? actualSpeed.toFixed(2) : Math.round(actualSpeed)}/ч</p>
            </div>

            <div className={s.settings}>
                <TonConnectButton className={s.tonbutton} />
            </div>
        </div>
    )
}
