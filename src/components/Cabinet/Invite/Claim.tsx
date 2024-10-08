import React, { useState } from 'react'

import { useUserData } from '../../../store/main'

//import s from './invite.module.css'

export const Claim: React.FC = () => {
    const [claimTable] = useState({
        0: 1000,
        7525744453: 12000,
        5531877002: 8000,
        602283275: 6000,
        6782161235: 4000,
        6765854474: 4000,
        983125540: 4000,
        314702838: 1000,
        6681857903: 1000,
        150055264: 1000,
        1538550056: 1000,
        6811877190: 1000,
        5988229032: 1000,
        1409142434: 1000,
        7462631299: 1000,
        5352926698: 1000,
        491986373: 1000,
        1377066841: 1000,
        6679696487: 1000,
        5916140076: 1000,
        391956726: 1000,
        6426546246: 1000,
        5050768446: 1000,
    });

    const userId = useUserData(state => state.user.id)

    console.log('claimId: ', claimTable[userId])

    return (
        <>
            <button
                style={{ border: '1px solid lightgray', background: 'rgb(103 119 142)', borderRadius: '0.25rem', padding: '0.3rem 0.5rem', margin: '0.3rem auto', height: '2rem', fontSize: 'calc(1.3vh + 1.3vw)', fontWeight: 'bold', color: 'white' }}
            //onClick={}
            >Claim {claimTable[userId]}</button>
        </>
    )
}
