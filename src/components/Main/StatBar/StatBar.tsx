import { useEffect, useState } from 'react'
import { useUserData, useJettonsBalances, useUserBalances, useStonFi } from '../../../store/main'
//import { useBalance } from '../../../store/balance';
import { useNav } from '../../../store/nav';

import { ButtonTimer } from './ButtonTimer/ButtonTimer';

import s from './statbar.module.css'

export const StatBar: React.FC = () => {
    const [speed, setSpeed] = useState(0)

    const rawAddress = useUserData(state => state.user.rawAddress)
    const balance = useUserBalances(state => state.bal)
    const balancesJ = useJettonsBalances(state => state.jettons)
    const balancesSF = useStonFi(state => state.pools)

    const speedBal = useUserBalances(state => state.totalSpeed)
    const speedBalJ = useJettonsBalances(state => state.totalSpeedJ)
    const speedBalSF = useStonFi(state => state.totalSpeedSF)

    const nav = useNav(state => state.nav.list)
    const setNavList = useNav(state => state.setNavList)

    const balanceData = useUserData(state => state.balance)
    const setBalance = useUserData(state => state.setBalanceData)

    const pushHold = () => {
        setBalance({
            balance: balanceData.balance + (speed * balanceData.period),
            speed: speed,
            isHold: true,
            startData: new Date().toISOString(),
            finishData: new Date(new Date().getTime() + balanceData.period * 60 * 60 * 1000).toISOString(),
        })
    }

    useEffect(() => {
        //console.log(speedBal(), speedBalJ())
        setSpeed(speedBal() + speedBalJ() + speedBalSF());
    }, [balance, balancesJ, balancesSF, speedBal, speedBalJ, speedBalSF])

    //console.log('balancedata: ', balanceData)

    return (
        <div className={s.statbar}>
            <button
                onClick={() => setNavList(true)}
                className={`${s.tabs} ${nav ? s.ontab : null}`}>🟢</button>
            <button
                onClick={() => setNavList(false)}
                className={`${s.tabs} ${!nav ? s.ontab : null}`}> … </button>
            <p style={{ margin: 'auto', fontSize: '1rem', fontWeight: 'bold', color: 'rgb(25, 180, 21)' }}> {speed.toFixed(2)}/h</p>
            <button
                disabled={balanceData.isHold || !rawAddress || !nav}
                onClick={pushHold}
                className={`${s.hold} ${balanceData.isHold ? s.holdOn : null}`}>
                <h3>{balanceData.isHold /* && nav */ ? <ButtonTimer /> : <span style={{ color: rawAddress && nav ? 'white' : 'grey' }}>HOLD!</span>}</h3>
            </button>
        </div>
    )
}
