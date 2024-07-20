import { useEffect, /* useState, */ /* useCallback */ } from 'react';

import { useUserData } from '../../store/main';

import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';

import s from './header.module.css'




export const Header: React.FC = () => {

    //const [balance, setBalance] = useState<string | null>(null);

    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);

    const user = useUserData((state) => state.user);
    const setUser = useUserData((state) => state.setUser);
    const addAddresses = useUserData((state) => state.addAddresses);

    /* const fetchBalance = useCallback(async (rawAddress: string) => {
        console.log(`start fetch for ${rawAddress}`)
        try {
            const response = await fetch(`https://tonapi.io/v2/accounts/${encodeURIComponent(rawAddress)}`, {
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('data: ', data)
            const tonBalance = (data.balance / 10 ** 9).toFixed(2);
            console.log('balance: ', tonBalance);
            //setBalance(tonBalance);
        } catch (error) {
            console.error('Failed to fetch balance:', error);
        }
    }, []); */

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
        } else {
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
    }, [setUser]);

    /* useEffect(() => {
        console.log('check new address')
        if (user.rawAddress) {
            console.log('have new address and start fetch')
            fetchBalance(user.rawAddress);
        }
    }, [user.rawAddress, fetchBalance]); */

    useEffect(() => {
        console.log('check rawaddress from wallet')
        if (rawAddress) {
            const addresses = {
                userFriendlyAddress,
                rawAddress
            }
            addAddresses(addresses)
        }
    }, [addAddresses, rawAddress, userFriendlyAddress])

    console.log(useUserData(state => state))


    return (
        <div className={s.header}>
            <button className={s.profile}>
                <p style={{ fontSize: '0.92rem' }}>
                    {user.userName.slice(0, 8)}
                </p>
            </button>

            <div className={s.speed}>
                <p>00.00/ч</p>
            </div>

            <div className={s.settings}>
                <TonConnectButton className={s.tonbutton} />
            </div>
        </div>
    )
}
