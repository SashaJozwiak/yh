import { useEffect, /* useState, */ /* useCallback */ } from 'react';

import { useUserData, /* useUserBalances */ } from '../../store/main';
//import { useBalance } from '../../store/balance';
import { useNav } from '../../store/nav';
import { swichLang } from '../../lang/lang.js';

import { TonConnectButton, useTonAddress /*  useTonConnectUI, useTonWallet */ } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import s from './header.module.css';


export const Header: React.FC = () => {
    const changeNav = useNav((state) => state.setMainNav)
    const nav = useNav((state) => state.nav.main);

    const id = useUserData((state) => state.user.id);
    const internalId = useUserData((state) => state.user.internalId);
    const userLang = useUserData((state) => state.user.languageCode);

    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);

    /* const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet(); */

    const rawAddressInState = useUserData(state => state.user.rawAddress);

    const handleReferral = useUserData((state) => state.handleReferral);
    const setUser = useUserData((state) => state.setUser);
    const addAddresses = useUserData((state) => state.addAddresses);

    const actualSpeed = useUserData(state => state.balance.speed)

    /* const handleWallet = () => {
        if (wallet) {
            tonConnectUI.disconnect();
        }
        if (!wallet) {
            tonConnectUI.openModal();
        }
    } */

    useEffect(() => {
        const userFromTg = WebApp.initDataUnsafe.user;
        const startParam = WebApp.initDataUnsafe.start_param;

        if (startParam) {
            console.log('Start app:', startParam);
        } else {
            console.log('no start app:', startParam);
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

            if (startParam) {
                handleReferral(newUser.id, startParam).then(() => {
                    setUser(newUser); // Устанавливаем пользователя после обработки рефералов
                }).catch((error: Error) => {
                    console.error('Error handling referral:', error);
                    setUser(newUser); // В случае ошибки все равно устанавливаем пользователя
                });
            } else {
                setUser(newUser); // Если нет startParam, просто устанавливаем пользователя
            }

            //setUser(newUser);
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
    }, [setUser, handleReferral, id]);

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
        <div className={s.header} style={{ position: nav === 'game' ? 'absolute' : 'static', opacity: nav === 'game' ? 0 : 1 }}>
            <button
                onClick={() => nav === 'cabinet' ? changeNav('hold') : changeNav('cabinet')}
                className={`${s.profile} ${nav === 'cabinet' ? s.ontab : null}`}>
                <p style={{ color: `${nav === 'cabinet' ? 'lightgrey' : 'white'}` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={'2rem'}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </p>
            </button>

            <button className={s.speed}>
                {/* <p style={{ marginBlockStart: '-0.2em' }}>Current speed</p> */}
                <p>{actualSpeed < 100 ? actualSpeed.toFixed(2) : Math.round(actualSpeed)}/{swichLang(userLang, 'hours')}</p>
            </button>

            <div className={s.settings}>
                <TonConnectButton className={s.tonbutton} />
                {/* <div
                    onClick={handleWallet}
                    className={s.tonbutton}>

                    <p>
                        {wallet ?
                            <>
                                {`${userFriendlyAddress.slice(0, 5)}...${userFriendlyAddress.slice(-3)}`}
                                <span style={{ fontSize: '0.7rem', display: 'block' }}>disconnect</span>
                            </>
                            : 'Connect Wallet'
                        }
                    </p>
                    <p>Wallet</p>
                </div>  */}
            </div>
        </div>
    )
}
