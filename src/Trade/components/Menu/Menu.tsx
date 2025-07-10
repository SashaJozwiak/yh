import React from 'react'
import { useTradeNav } from '../../tradeStore/nav';

import s from './menu.module.css'

export const Menu: React.FC = () => {
    const tradeNav = useTradeNav(state => state.tool)

    return (
        <div className={s.menu}>
            <button
                /* onClick={() => setTool('hold')} */
                className={`${s.button} ${tradeNav === 'assets' ? s.on : null}`}>ASSETS</button>
            <button
                style={{ opacity: '0.5' }}
                /* onClick={() => setTool('tasks')} */
                className={`${s.button} ${tradeNav === 'shop' ? s.on : null}`}>SHOP</button>
            <button
                /* onClick={() => setTool('launch')} */
                style={{ opacity: '0.5' }}
                className={`${s.button} ${tradeNav === 'services' ? s.on : null}`}>SERVICES</button>
            <button
                /* onClick={() => setTool('build')} */
                style={{ opacity: '0.5' }}
                className={`${s.button} ${tradeNav === 'uh-pay' ? s.on : null}`}>UH-PAY</button>
        </div>
    )
}
