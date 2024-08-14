
//import { useState } from 'react';
import { useUserData } from '../../../store/main';
import { useTop100 } from '../../../store/top100';
//import gnom from '/gnom_full_tr_150_compressed.png'
import s from './cabdata.module.css'

const defaultAvatar = '/yh/gnom_full_tr_150_compressed.png';

export const CabData = () => {
    //const [gnomeImg] = useState<string>(gnom);
    const userName = useUserData(state => state.user.userName);

    const top100 = useTop100(state => state.top100);

    return (
        <>
            {/* <h2>Rank #{(0).toLocaleString('ru')} </h2> */}
            <div className={s.data}>
                <img className={s.gnom} style={{ borderRadius: '0.3rem' }}
                    width='150' height='118' src={defaultAvatar} alt={``} />
                <div className={s.info}>
                    <p className={s.line}>User: <span style={{ color: 'white' }}>{userName.substring(0, 10)}</span></p>
                    <p className={s.line}>Friends: <span style={{ color: 'white' }}>0</span></p>
                    <p className={s.line}>Active fr.: <span style={{ color: 'white' }}>0</span></p>
                    {/* <p className={s.line}>Fr. reward: <span style={{ color: 'white' }}>0</span></p> */}
                    <p className={s.line}>Team: <span style={{ color: 'white' }}>No</span></p>
                    <p className={s.line}>Balance: <span style={{ color: 'white' }}>{(1235486786).toLocaleString('ru')}</span></p>
                </div>
            </div>

            <h2 style={{ /* paddingTop: '1rem', */ border: '0.2rem solid rgb(42,54,73)' }}>TOP 100</h2>
            <div className={`${s.list} scrollable`}/*  style={{ padding: '0 1rem' }} */>
                {top100.sort((a, b) => b.balance - a.balance).map((item, index) => (
                    <div className={s.listitem} key={item.userName}>
                        <div>{index + 1}. {item.userName}</div>
                        <div>{item.balance}</div>
                    </div>
                ))}
            </div>

        </>
    )
}
