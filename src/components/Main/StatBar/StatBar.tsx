import { useEffect, useState } from 'react'
import { useUserData, useJettonsBalances, useUserBalances, useStonFi, useDedust } from '../../../store/main'
//import { useBalance } from '../../../store/balance';
import { useNav } from '../../../store/nav';

import { swichLang } from '../../../lang/lang';

import { ButtonTimer } from './ButtonTimer/ButtonTimer';

import s from './statbar.module.css'
import { useStartups } from '../../../store/startups';
import { Tooltip } from '../../Some/Tooltip/TooltipStatBar';

export const StatBar: React.FC = () => {
    const [speed, setSpeed] = useState(0)

    const userLang = useUserData((state) => state.user.languageCode);

    const rawAddress = useUserData(state => state.user.rawAddress)
    const balance = useUserBalances(state => state.bal)
    const balancesJ = useJettonsBalances(state => state.jettons)
    const balancesSF = useStonFi(state => state.pools)
    const balancesDD = useDedust(state => state.pools)
    const balanceSU = useStartups(state => state.bal)

    const speedBal = useUserBalances(state => state.totalSpeed)
    const speedBalJ = useJettonsBalances(state => state.totalSpeedJ)
    const speedBalSF = useStonFi(state => state.totalSpeedSF)
    const speedBalDD = useDedust(state => state.totalSpeedDD)
    const speedBalApps = useStartups(state => state.totalSpeed)

    const nav = useNav(state => state.nav.list)
    const setNavList = useNav(state => state.setNavList)

    const balanceData = useUserData(state => state.balance)
    const setBalance = useUserData(state => state.setBalanceData)

    const miningLoader = useUserData(state => state.miningLoader)

    const loadStatus = useJettonsBalances(state => state.loadStatus);
    const loadStatusSFPools = useStonFi(state => state.loadStatus)
    const loadStatusDDPools = useDedust(state => state.loadStatus)

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
        setSpeed(speedBal() + speedBalJ() + speedBalSF() + speedBalDD() + speedBalApps());
    }, [balance, balancesJ, balancesSF, balancesDD, balanceSU, speedBal, speedBalJ, speedBalSF, speedBalDD, speedBalApps])

    console.log('speed: ', speed)

    return (
        <div className={s.statbar}>
            <div className={s.buttons}>
                <button
                    onClick={() => setNavList(true)}
                    className={`${s.tabs} ${nav ? s.ontab : null}`}>{/* 🟢 */}

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 21" strokeWidth={1.5} stroke="currentColor" className="size-6" width={'2rem'}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                </button>

                <button
                    onClick={() => setNavList(false)}
                    className={`${s.tabs} ${!nav ? s.ontab : null}`}> {/* ... */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 21" strokeWidth={1.5} stroke="currentColor" width={'2rem'} className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                    </svg>

                </button>
            </div>


            {/* <div style={{ margin: 'auto' }}>
                <p style={{ color: 'lightgray', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Sum speed</p>
                <p style={{ margin: 'auto', fontSize: '1rem', fontWeight: 'bold', color: 'rgb(25, 180, 21)' }}> {speed.toFixed(2)}/{swichLang(userLang, 'hours')}</p>
            </div> */}

            <Tooltip speed={speed} swichLang={swichLang} userLang={userLang} />



            <button
                disabled={balanceData.isHold || !rawAddress || miningLoader || loadStatusDDPools || loadStatusSFPools || loadStatus}
                onClick={pushHold}
                className={`${s.hold} ${balanceData.isHold ? s.holdOn : null}`}>
                <h3>{balanceData.isHold /* && nav */ ? <ButtonTimer /> : <span className={rawAddress ? s.holdtexton : s.holdtext}>🟢 <span style={{ color: rawAddress ? 'white' : 'grey' }}>{(loadStatus || loadStatusSFPools || loadStatusDDPools) ? 'load...' : swichLang(userLang, 'start')}</span></span>}</h3>
            </button>
        </div>
    )
}
