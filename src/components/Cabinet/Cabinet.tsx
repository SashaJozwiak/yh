import { useState, /* useEffect */ } from 'react'
import { CabData } from './CabData/CabData'
import { Teams } from './Teams/Teams';

import { BackButton } from "@twa-dev/sdk/react";

import s from './cabinet.module.css'
import { useNav } from '../../store/nav';
import { Invite } from './Invite/Invite';


export const Cabinet: React.FC = () => {

    const changeNav = useNav((state) => state.setMainNav)
    const [nav, setNav] = useState('data');

    return (
        <>
            <BackButton onClick={() => changeNav('hold')} />
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
                    className={`${s.cabnavbtn} ${nav === 'help' ? s.on : null}`}>Invite
                </button>
            </div>

            {nav === 'data' && <CabData />}
            {nav === 'teams' && <Teams />}
            {nav === 'help' && <Invite />} 
        </>
    )
}
