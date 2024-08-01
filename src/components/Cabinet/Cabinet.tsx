import { /* useEffect, */ useState } from 'react'
import WebApp from '@twa-dev/sdk'
import WebAppChat from '@twa-dev/sdk'

import s from './cabinet.module.css'

export const Cabinet = () => {
    const [nav, setNav] = useState('data');
    //const [avatar, setAvatar] = useState('');

    console.log(WebApp)
    console.log('webAppChat: ', WebAppChat)

    /*     useEffect(() => {
            const userFromTg = WebApp.initDataUnsafe?.user;
            console.log(userFromTg)
            if (userFromTg.photo_url && userFromTg.photo_url) {
                setAvatar(userFromTg.photo_url)
            }
        }, []) */

    return (
        <>
            <div className={s.cabnav}>
                <button
                    onClick={() => setNav('data')}
                    className={`${s.cabnavbtn} ${nav === 'data' ? s.on : null}`}>Data</button>
                <button
                    onClick={() => setNav('teams')}
                    className={`${s.cabnavbtn} ${nav === 'teams' ? s.on : null}`}>Teams</button>
                <button
                    onClick={() => setNav('help')}
                    className={`${s.cabnavbtn} ${nav === 'help' ? s.on : null}`}>Help</button>
            </div>

            {nav === 'data' &&
                <div className={s.data}>
                    <img width='100' height='100' src='' alt="avatar" />
                    <div className={s.info}>
                        <p className={s.line}>User: Sasha</p>
                        <p className={s.line}>Pre-refs: 0</p>
                        <p className={s.line}>Active refs: 0</p>
                        <p className={s.line}>Team: No</p>
                    </div>
                </div>
            }

            {nav === 'teams' &&
                <div className={s.data}>
                    teams
                </div>
            }

            {nav === 'help' &&
                <div className={s.data}>
                    help
                </div>
            }


        </>
    )
}
