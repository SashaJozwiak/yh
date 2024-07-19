import { useEffect, /* useState */ } from 'react';
import { useStore } from '../../store/main';

import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';

import s from './header.module.css'
import './header.css'

export const Header: React.FC = () => {
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);

    const user = useStore((state) => state.user);
    const addresses = useStore((state) => (
        {
            userFriendlyAddress: state.user.userFriendlyAddress,
            rawAddress: state.user.rawAddress
        })
    );
    const setUser = useStore((state) => state.setUser);
    const addAddresses = useStore((state) => state.addAddresses);

    useEffect(() => {
        if (rawAddress) {
            const addresses = {
                userFriendlyAddress,
                rawAddress
            }
            addAddresses(addresses)
        }

    }, [addAddresses, rawAddress, userFriendlyAddress])

    useEffect(() => {
        const user = WebApp.initDataUnsafe.user;
        if (user) {
            const newUser = {
                id: user.id,
                userName: user.username || '',
                languageCode: user.language_code || '',
                userFriendlyAddress: '',
                rawAddress: '',
            };
            setUser(newUser);
        } else {
            const newUser = {
                id: 757322479,
                userName: "Jozwiak",
                languageCode: "en",
                userFriendlyAddress: '',
                rawAddress: '',
            };
            setUser(newUser);
        }
    }, [setUser]);

    return (
        <div className={s.header}>
            {/* <p>{user.id}</p> */}
            <div className={s.profile}>
                <p>{user.userName.slice(0, 10)}</p>
            </div>

            <div className={s.speed}>
                <p>1.2/ч.</p>
                <p>{addresses.rawAddress}</p>
                <p>{addresses.userFriendlyAddress}</p>

            </div>

            <div className={s.settings}>
                <TonConnectButton className={s.tonbutton} />
            </div>
        </div>
    )
}
