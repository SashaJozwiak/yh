//import { useState, /* useEffect */ } from 'react'
import { CabData } from './CabData/CabData'
import { Teams } from './Teams/Teams';

import { BackButton } from "@twa-dev/sdk/react";

import s from './cabinet.module.css'
import { useNav } from '../../store/nav';
import { Invite } from './Invite/Invite';

export const Cabinet: React.FC = () => {
    const changeNav = useNav((state) => state.setMainNav)
    const changeCabNav = useNav((state) => state.setCabNav)
    const cabNav = useNav((state) => state.nav.cab)

    return (
        <>
            <BackButton onClick={() => changeNav('hold')} />
            <div className={s.cabnav}>
                <button
                    onClick={() => changeCabNav('data')}
                    className={`${s.cabnavbtn} ${cabNav === 'data' ? s.on : null}`}>Info
                </button>
                <button
                    onClick={() => changeCabNav('teams')}
                    className={`${s.cabnavbtn} ${cabNav === 'teams' ? s.on : null}`}>Teams
                </button>
                <button
                    onClick={() => changeCabNav('invite')}
                    className={`${s.cabnavbtn} ${cabNav === 'invite' ? s.on : null}`}>Invite
                </button>
            </div>

            {cabNav === 'data' && <CabData />}
            {cabNav === 'teams' && <Teams />}
            {cabNav === 'invite' && <Invite />} 
        </>
    )
}
