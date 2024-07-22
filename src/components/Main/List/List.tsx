import { useEffect } from 'react';
import { useUserBalances } from '../../../store/main'

import s from './list.module.css'

export const List: React.FC = () => {
    const balance = useUserBalances(state => state.bal)
    const updateSpeed = useUserBalances((state) => state.updateSpeed);

    useEffect(() => {
        balance.forEach((currency) => {
            const calculatedSpeed = ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            if (currency.speed !== calculatedSpeed) {
                updateSpeed(currency.name, calculatedSpeed);
            }
        });
    }, [balance, updateSpeed]);

    return (
        <div className={`${s.list} scroll`}>
            {balance.map((currency) => {
                return (
                    <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(25,180,21)' : 'white' }}>
                        <h4 className={s.currname}>{currency.name}</h4>
                        <div>{currency.value} {(currency.name).toLowerCase()}</div>
                        <div>+{(currency.speed).toFixed(2)}/ч</div>
                    </div>
                );
            })}
            <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0', borderRadius: '0.5rem' }}>text1</p>
        </div>
    )
}
