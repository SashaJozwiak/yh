
//import { useState } from 'react';
import { useUserData } from '../../../store/main';
//import gnom from '/gnom_full_tr_150_compressed.png'
import s from './cabdata.module.css'

const defaultAvatar = '/yh/gnom_full_tr_150_compressed.png';

export const CabData = () => {
    //const [gnomeImg] = useState<string>(gnom);
    const userName = useUserData(state => state.user.userName);

    return (
        <div className={`${s.list} scroll`}>
            <h2 style={{/*  paddingTop: '1rem' */ }}>Rank #{(0).toLocaleString('ru')} </h2>
            <div className={s.data}>
                <img className={s.gnom} style={{ borderRadius: '0.3rem' }}
                    width='150' height='118' src={defaultAvatar} alt={``} />
                <div className={s.info}>
                    <p className={s.line}>User: <span style={{ color: 'white' }}>{userName.substring(0, 10)}</span></p>
                    <p className={s.line}>Pre-refs: <span style={{ color: 'white' }}>0</span></p>
                    <p className={s.line}>Active refs: <span style={{ color: 'white' }}>0</span></p>
                    <p className={s.line}>Ref reward: <span style={{ color: 'white' }}>0</span></p>
                    <p className={s.line}>Team: <span style={{ color: 'white' }}>No</span></p>
                </div>
            </div>

            <h2 style={{ paddingTop: '1rem' }}>TOP 100</h2>

        </div>
    )
}
