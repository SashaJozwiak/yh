import { useEffect } from 'react';
import { useStore } from '../../store/main';

import { /* TonConnectButton, */ useTonConnectModal } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';

import s from './header.module.css'

export const Header: React.FC = () => {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);

    const { state, open, close } = useTonConnectModal();

    useEffect(() => {
        const user = WebApp.initDataUnsafe.user;
        if (user) {
            const newUser = {
                id: user.id,
                userName: user.username || '',
                languageCode: user.language_code || ''
            };
            setUser(newUser);
        } else {
            const newUser = {
                id: 757322479,
                userName: "Jozwiak",
                languageCode: "en",
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
            </div>

            <div className={s.settings}>
                {/* <div className={s.lang}>{user.languageCode}</div> */}

                {/* <p>Настройки</p> */}
                {/* <TonConnectButton className={s.tonbutton} /> */}

                <button className={s.tonbutton} onClick={state?.status == 'closed' ? open : close}>Кошелек</button>
            </div>
            <div>state: {state?.status}</div>

            {/* <div>Modal state: {state?.status}</div>
            <button onClick={open}>Open modal</button>
            <button onClick={close}>Close modal</button> */}

        </div>
    )
}
