import { useState } from 'react'
//import { useUserData } from '../../store/main'

import { CabData } from './CabData/CabData'

//import gnom from './../../assets/cabinet/gnom_full_tr_150.png'
import s from './cabinet.module.css'


export const Cabinet: React.FC = () => {
    const [nav, setNav] = useState('data');
    //const userName = useUserData(state => state.user.userName);
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

            {nav === 'data' && <CabData />}

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
