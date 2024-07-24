import { useEffect, useState } from 'react'
import { useJettonsBalances, useUserBalances } from '../../../store/main'
import { useBalance } from '../../../store/balance';
import { useNav } from '../../../store/nav';

import s from './statbar.module.css'

export const StatBar: React.FC = () => {
    const [speed, setSpeed] = useState(0)
    const balance = useUserBalances(state => state.bal)
    const balancesJ = useJettonsBalances(state => state.jettons)

    const speedBal = useUserBalances(state => state.totalSpeed)
    const speedBalJ = useJettonsBalances(state => state.totalSpeedJ)

    const nav = useNav(state => state.nav.list)
    const setNavList = useNav(state => state.setNavList)

    const balanceData = useBalance(state => state.balance)
    const setBalance = useBalance(state => state.setBalanceData)

    useEffect(() => {
        console.log(speedBal(), speedBalJ())
        setSpeed(speedBal() + speedBalJ());
    }, [balance, balancesJ, speedBal, speedBalJ])


    const pushHold = () => {
        //onst now = new Date();

        setBalance({
            //balance: 0,
            speed: speed,
            isHold: true,
            startData: new Date().toISOString(),
            finishData: new Date(new Date().getTime() + balanceData.period * 60 * 60 * 1000).toISOString(),
        })
        //localStorage.setItem('balanceData', JSON.stringify(newBalanceData));
    }

    console.log('balancedata: ', balanceData)

    return (
        <div className={s.statbar}>
            <button
                onClick={() => setNavList(true)}
                className={`${s.tabs} ${nav ? s.ontab : null}`}>🟢</button>
            <button
                onClick={() => setNavList(false)}
                className={`${s.tabs} ${!nav ? s.ontab : null}`}> … </button>
            <p style={{ margin: 'auto', fontSize: '1rem', fontWeight: 'bold', color: 'rgb(25, 180, 21)' }}> {speed.toFixed(2)}/ч</p>
            <button
                onClick={pushHold}
                className={s.hold}>
                <h3>HOLD!</h3>
            </button>
        </div>
    )
}
