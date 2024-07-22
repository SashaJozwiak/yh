import { useEffect, useState } from 'react'
import { useUserBalances } from '../../../store/main'

import s from './statbar.module.css'

export const StatBar: React.FC = () => {
    const [speed, setSpeed] = useState(0)
    const balance = useUserBalances(state => state.bal)

    useEffect(() => {
        const totalSpeed = balance.reduce((acc, currency) => {
            const speed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            return acc + speed;
        }, 0);
        setSpeed(totalSpeed);
    }, [balance]);

    return (
        <div className={s.statbar}>
            <button className={`${s.tabs} ${s.ontab}`}>🟢</button>
            <button className={s.tabs}> … </button>
            <p style={{ margin: 'auto', fontSize: '1rem' }}> {speed.toFixed(2)}/ч</p>
            <button className={s.hold}><h3>HOLD</h3></button>
        </div>
    )
}
