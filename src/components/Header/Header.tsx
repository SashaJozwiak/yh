import { useCallback, useEffect, useRef, useState, /* useCallback */ } from 'react';

import { useAuth, useUserData, /* useUserBalances */ } from '../../store/main';
//import { useBalance } from '../../store/balance';
import { useNav } from '../../store/nav';
//import { swichLang } from '../../lang/lang.js';

import { ConnectedWallet, TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
//import { useTonConnect } from '@tonconnect/ui-react';

//import { Address } from "@ton/ton";
import WebApp from '@twa-dev/sdk';
import s from './header.module.css';

//test use initData if no initDataUnsafe
const parsedInitData = WebApp.initData ? (() => {
    try {
        return JSON.parse(WebApp.initData);
    } catch (e) {
        console.error('Failed to parse initData:', e);
        return {};
    }
})() : {};

export const Header: React.FC = () => {
    const changeNav = useNav((state) => state.setMainNav)
    const nav = useNav((state) => state.nav.main);

    const internalId = useUserData((state) => state.user.internalId);
    //const userLang = useUserData((state) => state.user.languageCode);

    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);
    const [tonConnectUI] = useTonConnectUI();

    const rawAddressInState = useUserData(state => state.user.rawAddress);

    const handleReferral = useUserData((state) => state.handleReferral);
    const setUser = useUserData((state) => state.setUser);
    const addAddresses = useUserData((state) => state.addAddresses);

    //const actualSpeed = useUserData(state => state.balance.speed);
    const isAuth = useUserData(state => state.isAuth);

    const setAuthError = useUserData(state => state.setAuthError);

    const userFromTg = WebApp.initDataUnsafe.user || parsedInitData.user;
    const startParam = WebApp.initDataUnsafe.start_param || parsedInitData.start_param;

    console.log('userFromTg: ', userFromTg, 'startParam: ', startParam)

    const [onChange, setOnchange] = useState<boolean>(true)
    const statusChangeHandlerRef = useRef<(wallet: ConnectedWallet | null) => Promise<void>>(() => Promise.resolve());

    const auth = useAuth(state => state.checkNonce);
    const refreshToken = useAuth(state => state.refreshToken)
    const isAuthUHS = useAuth(state => state.isAuth);
    const userUHSId = useAuth(state => state.userId);

    const [disreload, setDisreload] = useState<boolean>(false);

    useEffect(() => {
        if (!isAuth) {
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

            /* if (newUser.id === 757322479) {
                setAuthError(true);
            } */

            if (startParam) {

                /* handleReferral(newUser.id, startParam).then(() => {
                    setUser(newUser); // после обработки рефералов
                }).catch((error: Error) => {
                    console.error('Error handling referral:', error);
                    setUser(newUser); // все равно уст пользователя
                }); */
                localStorage.setItem('UHSrefferer', startParam);
                setUser(newUser);
                // Временно записываем реферера 
            } else {
                setUser(newUser); // Если нет startParam
            }

            //setUser(newUser);
        } else /*if (id !==    757322479 )*/ {

            const newUser = {
                id: 946292829, /*  946292829 757322479  */
                //internalId: null,
                userName: "zwiak",
                languageCode: "ru",
                userFriendlyAddress: '',
                rawAddress: '',
            };

            setUser(newUser);
            //setAuthError(true);
            //console.log('write jozwiak user in store finish')
            /* if (newUser.id === 757322479) {
                setAuthError(true);
            } */
        }
        }
    }, [setUser, /* handleReferral, */ startParam, userFromTg, isAuth, setAuthError]);//id

    useEffect(() => {
        if (userUHSId) {
            const refferer = localStorage.getItem('UHSrefferer');
            if (refferer) {
                console.log('userUHSId: ', userUHSId, refferer)
                handleReferral(userUHSId, refferer);
            } else {
                handleReferral(userUHSId, null);
            }
        }
    }, [userUHSId, handleReferral])

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

    useEffect(() => {
        if (!userFriendlyAddress) {
            console.log('wallet disconnect')
            const addresses = {
                internalId,
                userFriendlyAddress: null,
                rawAddress: null,
            }
            addAddresses(addresses);
            if (disreload) {
                window.location.reload();
            }
        } else {
            console.log('wallet connected')
            setDisreload(true);
        }

    }, [addAddresses, disreload, internalId, userFriendlyAddress])


    useEffect(() => {
        const getNonce = async () => {
            console.log('start');
            tonConnectUI.setConnectRequestParameters({ state: 'loading' });

            try {
                const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhsusers/auth/getnonce`);
                const result = await response.json();
                console.log('getNonce: ', result);

                if (result.tonProof) {
                    tonConnectUI.setConnectRequestParameters({
                        state: 'ready',
                        value: { tonProof: result.tonProof }
                    });
                    //setOnchange(true);
                } else {
                    tonConnectUI.setConnectRequestParameters(null);
                }

            } catch (error) {
                console.error('Error fetching nonce:', error);
            }
        };

        if (rawAddress) {
            const lsData = localStorage.getItem(rawAddress + 'uhs');
            if (lsData) {
                setOnchange(false);
                refreshToken(lsData)
            }
        } else if (!userFriendlyAddress) {
            getNonce();
        }

    }, [rawAddress, refreshToken, tonConnectUI, userFriendlyAddress]);

    const handleStatusChange = useCallback(async (wallet: ConnectedWallet | null) => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        if (wallet?.connectItems?.tonProof && 'proof' in wallet?.connectItems?.tonProof && onChange) {
            const proof = wallet?.connectItems?.tonProof.proof;
            const account = wallet.account;

            console.log('proof: ', proof);
            console.log('account: ', account);

            setOnchange(false);
            if (proof && account) {
                auth(proof, account);
            }
        } else {
            console.log('Нет proof');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onChange]);

    useEffect(() => {
        if (onChange) {
            setOnchange(false);
            statusChangeHandlerRef.current = handleStatusChange;
            tonConnectUI.onStatusChange(statusChangeHandlerRef.current);
        } else {
            console.log('Нет wallet');
        }

        return () => {

        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tonConnectUI, onChange])

    //const address = Address.parse(userFriendlyAddress).toString();
    //console.log('address:', address ? address : 'none')
    //console.log('========onChange: ', onChange)

    return (
        <div className={s.header} style={{ position: nav === 'game' ? 'absolute' : 'static', opacity: nav === 'game' ? 0 : 1 }}>

            <button
                style={{ opacity: isAuthUHS ? '1' : '0.5' }}
                disabled={!isAuthUHS}

                onClick={() => nav === 'cabinet' ? changeNav('UHS') : changeNav('cabinet')}
                className={`${s.profile} ${nav === 'cabinet' ? s.ontab : null}`}>
                <p style={{ color: `${nav === 'cabinet' ? 'lightgrey' : 'white'}` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={'2rem'}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </p>
            </button>

            {/* <button className={s.speed}>
                {nav === 'UHS' ? <button
                    onClick={(e) => {
                        e.preventDefault();
                        WebApp.openTelegramLink('https://t.me/avtorizator')
                    }}
                    style={{ backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', padding: '0.3rem', fontWeight: 'normal', fontSize: '1rem' }}
                >support</button> : <p>{actualSpeed < 100 ? actualSpeed.toFixed(2) : Math.round(actualSpeed)}/{swichLang(userLang, 'hours')}</p>}
            </button> */}

            <button
                onClick={(e) => {
                    e.preventDefault();
                    WebApp.openTelegramLink('https://t.me/youhold_chat/2200')
                }}
                className={s.speed}
                style={{ backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', padding: '0.3rem', fontWeight: 'normal', fontSize: '1rem' }}
            >support</button>

            <div className={s.settings}>
                <TonConnectButton className={s.tonbutton} />
            </div>

        </div>
    )
}
