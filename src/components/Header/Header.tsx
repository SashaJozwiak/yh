import { useEffect } from 'react';
import { useStore } from '../../store/main';

import WebApp from '@twa-dev/sdk';

import s from './header.module.css'

export const Header: React.FC = () => {
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);

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
                <p>5315 / ч.</p>
            </div>

            <div className={s.settings}>
                {/* <div className={s.lang}>{user.languageCode}</div> */}

                <p>Settings</p>


            </div>


        </div>
    )
}
