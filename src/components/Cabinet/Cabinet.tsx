import { useState, /* useEffect */ } from 'react'
import { CabData } from './CabData/CabData'
import { Teams } from './Teams/Teams';
import s from './cabinet.module.css'


export const Cabinet: React.FC = () => {

    const [nav, setNav] = useState('data');

    return (
        <>
            <div className={s.cabnav}>
                <button
                    onClick={() => setNav('data')}
                    className={`${s.cabnavbtn} ${nav === 'data' ? s.on : null}`}>Info
                </button>
                <button
                    onClick={() => setNav('teams')}
                    className={`${s.cabnavbtn} ${nav === 'teams' ? s.on : null}`}>Teams
                </button>
                <button
                    onClick={() => setNav('help')}
                    className={`${s.cabnavbtn} ${nav === 'help' ? s.on : null}`}>Help
                </button>
            </div>

            {nav === 'data' && <CabData />}
            {nav === 'teams' && <Teams />}
            {nav === 'help' && <div className={s.data}>help</div>}
        </>
    )
}
