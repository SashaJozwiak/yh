import React from 'react'


import { useEarnNav } from '../../../Earn/earnStore/nav';

import s from './menu.module.css'

export const Menu: React.FC = () => {

    const useNav = useEarnNav(state => state.tool)
    //const setTool = useEarnNav(state => state.setTool)

    return (
        <div className={s.menu}>
            <button
                /* onClick={() => setTool('hold')} */
                className={`${s.button} ${useNav === 'hold' ? s.on : null}`}>ASSETS</button>
            <button
                style={{ opacity: '0.5' }}
                /* onClick={() => setTool('tasks')} */
                className={`${s.button} ${useNav === 'tasks' ? s.on : null}`}>SHOP</button>
            <button
                /* onClick={() => setTool('launch')} */
                style={{ opacity: '0.5' }}
                className={`${s.button} ${useNav === 'launch' ? s.on : null}`}>SERVICES</button>
            <button
                /* onClick={() => setTool('build')} */
                style={{ opacity: '0.5' }}
                className={`${s.button} ${useNav === 'build' ? s.on : null}`}>UH-PAY</button>
        </div>
    )
}
