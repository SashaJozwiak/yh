import { useEffect, /* useState, */ /* useCallback */ } from 'react';

import { useUserData, /* useUserBalances */ } from '../../store/main';
//import { useBalance } from '../../store/balance';
import { useNav } from '../../store/nav';

import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import s from './header.module.css';


export const Header: React.FC = () => {
    const changeNav = useNav((state) => state.setMainNav)
    const nav = useNav((state) => state.nav.main);

    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);

    const rawAddressInState = useUserData(state => state.user.rawAddress);

    //const user = useUserData((state) => state.user);
    const id = useUserData((state) => state.user.id);
    const internalId = useUserData((state) => state.user.internalId);

    const setUser = useUserData((state) => state.setUser);
    const addAddresses = useUserData((state) => state.addAddresses);

    const actualSpeed = useUserData(state => state.balance.speed)

    useEffect(() => {
        const userFromTg = WebApp.initDataUnsafe.user;

        //console.log('init user render')
        console.log(WebApp.initDataUnsafe)

        const params = new URLSearchParams(window.location.search);
        const startAppId = params.get('startapp');
        if (startAppId) {
            console.log('Start app:', startAppId);
        } else {
            console.log('no Start app:', startAppId);
        }

        if (userFromTg) {
            const newUser = {
                id: userFromTg.id,
                //internalId: null,
                userName: userFromTg.username || 'anonymous',
                languageCode: userFromTg.language_code || '',
                userFriendlyAddress: '',
                rawAddress: '',
            };
            setUser(newUser);
        } else if (id !== 757322479) {
            const newUser = {
                id: 757322479,
                //internalId: null,
                userName: "Jozwiak",
                languageCode: "en",
                userFriendlyAddress: '',
                rawAddress: '',
            };
            //console.log('write jozwiak user in store')
            setUser(newUser);
            //console.log('write jozwiak user in store finish')
        }
    }, [setUser, id]);


    useEffect(() => {
        //console.log('check rawaddress from wallet')
        //console.log('check add and some :', internalId, rawAddress, rawAddressInState)
        if (internalId && rawAddress && rawAddress !== rawAddressInState) {
            //console.log('write addresses  wallet')
            const addresses = {
                internalId,
                userFriendlyAddress,
                rawAddress
            }
            addAddresses(addresses)
        }
    }, [addAddresses, rawAddress, userFriendlyAddress, rawAddressInState, internalId])

    //console.log('user :', user, 'rawAddress: ', rawAddress)

    return (
        <div className={s.header}>
            <button
                onClick={() => nav === 'cabinet' ? changeNav('hold') : changeNav('cabinet')}
                className={`${s.profile} ${nav === 'cabinet' ? s.ontab : null}`}>
                <p style={{ color: `${nav === 'cabinet' ? 'lightgrey' : 'white'}` }}>
                    Profile
                </p>
            </button>

            <button className={s.speed}>
                <p>{actualSpeed < 100 ? actualSpeed.toFixed(2) : Math.round(actualSpeed)}/h</p>
            </button>

            <div className={s.settings}>
                <TonConnectButton className={s.tonbutton} />
            </div>
        </div>
    )
}
