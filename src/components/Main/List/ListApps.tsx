import { useEffect } from 'react'
//import WebApp from '@twa-dev/sdk';
//import s from './listapps.module.css';
import { useStartups } from '../../../store/startups';

/* const formatNumber = (num: number) => {
    if (num > 999999) {
        return `${Math.floor(num / 1000000)}kk`;
    }
    if (num > 999) {
        return `${Math.floor(num / 1000)}k`;
    }
    return num.toLocaleString('ru');
}; */

export const ListApps = () => {
    const bal = useStartups(state => state.bal)
    const updateSpeed = useStartups(state => state.updateSpeed)

    useEffect(() => {
        bal.forEach((currency) => {
            const calculatedSpeed = currency.value < currency.range[1] ? ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH) : ((currency.range[1] - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);

            const finishSpeed = calculatedSpeed > 0.00 ? calculatedSpeed : 0.00;
            if (currency.speed !== finishSpeed) {
                updateSpeed(currency.name, finishSpeed);
            }
        });
    }, [bal, updateSpeed]);

    return (
        <>
            {/* {bal.map(startup => {
                return (
                    <div key={startup.name} className={s.listitem}>
                        <h4 className={s.currname}>{startup.name}</h4>
                        <div><span style={{ fontWeight: 'bold' }}>{formatNumber(startup.value)}</span></div>
                        <div style={{ color: startup.speed > 0.00 ? 'rgb(25,180,21)' : 'gray' }}><span style={{ fontWeight: 'bold' }}>+{(startup.speed).toFixed(2)}</span>/h</div>

                        <div className={s.progressbar}>
                            <div className={s.progress} style={{ width: `${((startup.speed) / startup.inH) * 100 > 100 ? 100 : ((startup.speed) / startup.inH) * 100}%` }}></div>
                        </div>

                        <div className={s.range0}>{formatNumber(startup.range[0])}-{formatNumber(startup.range[1])}</div>
                        {startup.name !== 'BONUS' && <button
                            onClick={(e) => {
                                e.preventDefault();
                                WebApp.openTelegramLink(startup.src);
                            }}
                            className={s.news}>news</button>}
                        <div className={s.range1}>till {formatNumber(startup.inH)}/h</div>
                    </div>
                )
            })} */}
            <h2 style={{ color: 'lightgrey', marginTop: '1rem' }}>SOON</h2>
        </>
    )
}
