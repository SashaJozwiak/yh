import { /* useState, */ useEffect } from 'react';
import { useJettonsBalances, useUserBalances, useUserData } from '../../../store/main'
import { useNav } from '../../../store/nav';

import s from './list.module.css'


export const List: React.FC = () => {
    const rawAddress = useUserData(state => state.user.rawAddress);

    const balance = useUserBalances(state => state.bal)
    const balanceJ = useJettonsBalances(state => state.jettons)
    const updateSpeed = useUserBalances((state) => state.updateSpeed);
    const updateSpeedJ = useJettonsBalances((state) => state.updateSpeedJ);

    const nav = useNav(state => state.nav.list)
    //const setNavList = useNav(state => state.setNavList)


    useEffect(() => {
        balance.forEach((currency) => {
            const calculatedSpeed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            const finishSpeed = calculatedSpeed > 0.00 ? calculatedSpeed : 0.00;
            if (currency.speed !== finishSpeed) {
                updateSpeed(currency.name, finishSpeed);
            }
        });
    }, [balance, updateSpeed]);

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

    console.log('balance: ', balance, 'balanceJ: ', balanceJ);

    return (
        <div className={`${s.list} scroll`}>
            {balance.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).map((currency) => {
                return (
                    <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(25,180,21)' : nav ? 'white' : 'lightgrey' }}>
                        <h4 className={s.currname}>{currency.name}</h4>
                        <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span>{/* /{(currency.range[1]).toLocaleString('ru')} */} {(currency.name).toLowerCase()}</div>
                        <div><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/ч</div>
                        <div className={s.progressbar}>
                            <div className={s.progress} style={{ width: `${((currency.value - currency.range[0]) / currency.range[1]) * 100}%` }}></div>
                        </div>
                        <div className={s.range0}>от {(currency.range[0]).toLocaleString('ru')} {currency.name}</div>
                        <div className={s.range1}>до {(currency.inH).toLocaleString('ru')}/ч</div>
                    </div>
                );
            })}


            {
                rawAddress ? balanceJ.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).map((currency) => {
                    return (
                        <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(25,180,21)' : nav ? 'white' : 'lightgrey' }}>
                            <h4 className={s.currname}>{currency.name}</h4>
                            <div><span style={{ fontWeight: 'bold' }}>{currency.value}</span>{/* /{(currency.range[1]).toLocaleString('ru')}*/} {(currency.name).toLowerCase()}</div>
                            <div><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/ч</div>
                            <div className={s.progressbar}>
                                <div className={s.progress} style={{ width: `${((currency.value - currency.range[0]) / currency.range[1]) * 100}%` }}></div>
                            </div>
                            <div className={s.range0}>от {(currency.range[0]).toLocaleString('ru')} {currency.name}</div>
                            <div className={s.range1}>до {(currency.inH).toLocaleString('ru')}/ч</div>
                        </div>
                    );
                }) : <h2>Подключите кошелёк!</h2>
            }
        </div>
    )
}
