import { /* useState, */ useEffect } from 'react';
import { useStonFi, useJettonsBalances, useUserBalances, useUserData } from '../../../store/main'
import { useNav } from '../../../store/nav';

import s from './list.module.css'

const formatNumber = (num) => {
    if (num > 999) {
        return `${Math.floor(num / 1000)}k`;
    }
    return num.toLocaleString('ru');
};

export const List: React.FC = () => {
    const rawAddress = useUserData(state => state.user.rawAddress);

    const balance = useUserBalances(state => state.bal)
    const balanceJ = useJettonsBalances(state => state.jettons)
    const balancePoolsSF = useStonFi(state => state.pools);

    const updateSpeed = useUserBalances((state) => state.updateSpeed);
    const updateSpeedJ = useJettonsBalances((state) => state.updateSpeedJ);
    const updateSpeedSF = useStonFi(state => state.updateSpeedSF);

    const loadStatus = useJettonsBalances(state => state.loadStatus);

    const nav = useNav(state => state.nav.list)

    useEffect(() => {
        balance.forEach((currency) => {
            const calculatedSpeed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            const finishSpeed = calculatedSpeed > 0.00 ? calculatedSpeed : 0.00;
            if (currency.speed !== finishSpeed) {
                updateSpeed(currency.name, finishSpeed);
            }
        });
    }, [balance, updateSpeed]);

    console.log('loadStatus: ', loadStatus);

    useEffect(() => {
        balanceJ.forEach((currency) => {
            const calculatedSpeed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            const finishSpeed = calculatedSpeed > 0.00 ? calculatedSpeed : 0.00;
            console.log('finish speed: ', finishSpeed)
            if (currency.speed !== finishSpeed) {
                updateSpeedJ(currency.name, finishSpeed);
            }
        });
    }, [balanceJ, updateSpeedJ]);

    useEffect(() => {
        balancePoolsSF.forEach((currency) => {
            const calculatedSpeed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            const finishSpeed = calculatedSpeed > 0.00 ? calculatedSpeed : 0.00;
            console.log('finish speed: ', finishSpeed)
            if (currency.speed !== finishSpeed) {
                updateSpeedSF(currency.name, finishSpeed);
            }
        });
    }, [balancePoolsSF, updateSpeedSF]);

    console.log('balance: ', balance, 'balanceJ: ', balanceJ);

    return (
        <div className={`${s.list} scroll`}>
            {/* {balance.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).length > 0 && <h3 style={{ color: 'lightgray', borderBottom: '2px dashed', width: '4rem', margin: '0 auto' }}>Holds</h3>} */}
            {balance.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).map((currency) => {
                return (
                    <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(25,180,21)' : nav ? 'white' : 'lightgrey' }}>
                        <h4 className={s.currname}>{currency.name}</h4>
                        <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> {(currency.name).toLowerCase()}</div>
                        <div><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/h</div>
                        <div className={s.progressbar}>
                            <div className={s.progress} style={{ width: `${((currency.value - currency.range[0]) / currency.range[1]) * 100}%` }}></div>
                        </div>
                        <div className={s.range0}>{formatNumber(currency.range[0])} - {formatNumber(currency.range[1])} {currency.name}</div>
                        {currency.name !== 'BONUS' && <button className={s.news}>news</button>}
                        <div className={s.range1}>до {formatNumber(currency.inH)}/h</div>
                    </div>
                );
            })}

            {
                loadStatus ? 'LOADING...' : rawAddress ? balanceJ.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).map((currency) => {
                    return (
                        <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(25,180,21)' : nav ? 'white' : 'lightgrey' }}>
                            <h4 className={s.currname}>{currency.name}</h4>
                            <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> {(currency.name).toLowerCase()}</div>
                            <div><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/h</div>
                            <div className={s.progressbar}>
                                <div className={s.progress} style={{ width: `${((currency.value - currency.range[0]) / currency.range[1]) * 100}%` }}></div>
                            </div>
                            <div className={s.range0}>{formatNumber(currency.range[0])} - {formatNumber(currency.range[1])} {currency.name}</div>
                            <button className={s.news}>news</button>
                            <div className={s.range1}>до {formatNumber(currency.inH)}/h</div>
                        </div>
                    );
                }) : <h2>Подключите кошелёк!</h2>
            }
            {balancePoolsSF.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).length > 0 && <h3 style={{ color: 'lightgray', borderBottom: '2px dashed', width: '8rem', margin: '0 auto' }}>Stonfi Farms</h3>}
            {rawAddress &&
                balancePoolsSF.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).map((currency) => {
                    return (
                        <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(25,180,21)' : nav ? 'white' : 'lightgrey' }}>
                            <h4 className={s.currname}>{currency.name}</h4>
                            <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> Lp</div>
                            <div><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/h</div>
                            <div className={s.progressbar}>
                                <div className={s.progress} style={{ width: `${((currency.value - currency.range[0]) / currency.range[1]) * 100}%` }}></div>
                            </div>
                            <div className={s.range0}>{formatNumber(currency.range[0])} - {formatNumber(currency.range[1])} Lp</div>
                            {/* <button className={s.news}>news</button> */}
                            <div className={s.range1}>до {formatNumber(currency.inH)}/h</div>
                        </div>
                    )
                })}


        </div>
    )
}
