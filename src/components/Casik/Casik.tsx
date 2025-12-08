
import { useEffect, useState } from 'react';
import { useUHSWallet } from '../../Earn/earnStore/UHSWallet';

import { useEarnNav } from '../../Earn/earnStore/nav';
import { useNav } from '../../store/nav';

import s from './casik.module.css'
import { Slot } from './Slot/Slot';
import { useSlotStore } from './Slot/store/slot';
import { Wheel } from './Wheel/Wheel';



export const Casik = () => {
    const setWallet = useEarnNav(state => state.setIsOpenWallet)
    const setEarn = useNav(state => state.setMainNav)

    const assets = useUHSWallet(state => state.assets);
    const [cazikNav, setCazikNav] = useState('slot') // slot, wheel, loto

    const balance = useSlotStore(state => state.balance)
    const setBalance = useSlotStore(state => state.setBalance)

    useEffect(() => {
        const bal = +(Number(assets.find(a => a.jetton.address === '0:b113a994b5024a16719f69139328eb759596c38a25f59028b146fecdc3621dfe')?.balance ?? 0) / (10 ** 6)).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        setBalance(bal)
    }, [assets, setBalance])

    return (
        <>
            <div className={s.menu}>
                <button
                    onClick={() => setCazikNav('slot')}
                    className={`${s.button} ${cazikNav === 'slot' ? s.on : null}`}>SLOT</button>
                <button
                    //style={{ opacity: '0.5' }}
                    onClick={() => setCazikNav('wheel')}
                    className={`${s.button} ${cazikNav === 'wheel' ? s.on : null}`}>WHEEL</button>
                <button
                    /* onClick={() => setTool('loto')} */
                    style={{ opacity: '0.5' }}
                    className={`${s.button} ${cazikNav === 'services' ? s.on : null}`}>LOTO</button>

                <button
                    onClick={() => {
                        setEarn('UHS')
                        setWallet(true)
                    }}
                    style={{
                        margin: 'auto',
                        fontWeight: 'bold',
                        fontSize: '0.7rem',
                        backgroundColor: 'green',
                        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px',
                        border: `1px solid ${balance} > ${0.10} ? 'green' : 'red'}`, padding: '0.5rem', borderRadius: '0.3rem'
                    }}>{balance} USDT </button>
            </div>



            {cazikNav === 'slot' && <Slot />}
            {cazikNav === 'wheel' && <Wheel />}

        </>
    )
}
