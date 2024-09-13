import { useEffect } from 'react';
import { useUserData } from '../../../store/main';
import { useTop100 } from '../../../store/top100';

import { swichLang } from '../../../lang/lang.js';

import s from './cabdata.module.css'
//import WebApp from '@twa-dev/sdk';

const defaultAvatar = '/yh/gnom_full_tr_150_compressed.png';

export const CabData = () => {
    const { userName, refs, refs_active, languageCode } = useUserData(state => state.user);
    const balance = useUserData(state => state.balance.balance);

    const top100 = useTop100(state => state.top100);
    const getTop100 = useTop100(state => state.getTop100);

    useEffect(() => {
        if (!top100.length) {
            getTop100();
        }
    }, [getTop100, top100.length])


    //console.log('top100: ', top100)

    const preventContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <>
            <div className={s.data}>
                <div onContextMenu={preventContextMenu} onTouchStart={preventContextMenu}>
                <img className={s.gnom} style={{ borderRadius: '0.3rem' }}
                    width='150' height='118' src={defaultAvatar} alt={``} />
                </div>
                <div className={s.info}>
                    <p className={s.line}>{swichLang(languageCode, 'user')}: <span style={{ color: 'white' }}>{userName.substring(0, 10)}</span></p>
                    <p className={s.line}>{swichLang(languageCode, 'friends')}: <span style={{ color: 'white' }}>{refs}</span></p>
                    <p className={s.line}>{swichLang(languageCode, 'afriends')}: <span style={{ color: 'white' }}>{refs_active}</span></p>
                    {/* <p className={s.line}>Fr. reward: <span style={{ color: 'white' }}>0</span></p> */}
                    {/* <p className={s.line}>Team: <span style={{ color: 'white' }}>{team || `none`}</span></p> */}
                    <p className={s.line}>{swichLang(languageCode, 'balance')}: <span style={{ color: 'white' }}>{Number(balance.toFixed(1)).toLocaleString('ru-Ru')}</span></p>
                </div>
            </div>

            <h2 className={s.headerlist}>TOP 100</h2>

            {!top100.length ? <span className={s.loader}></span> :
                <div className={`${s.list} scrollable`}/*  style={{ padding: '0 1rem' }} */>
                    {top100.sort((a, b) => b.balance - a.balance).map((item, index) => (
                        <div className={s.listitem} key={item.internal_id}>
                            <div
                                /* onClick={(e) => {
                                    e.preventDefault();
                                    WebApp.openTelegramLink(`https://t.me/${item.username}`);
                                }} */
                                className={s.btn}>{/* {index + 1}. */}<span className={s.btnspan}>{index + 1}. {(item.username).substring(0, 25)}</span></div>
                            {/* https://t.me/ */}
                            <div>{item.balance}</div>
                        </div>
                    ))}
                </div>
            }


        </>
    )
}
