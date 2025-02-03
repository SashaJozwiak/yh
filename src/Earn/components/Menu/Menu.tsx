import React from 'react'

import s from './menu.module.css'
import { useEarnNav } from './../../earnStore/nav';

export const Menu: React.FC = () => {

    const useNav = useEarnNav(state => state.tool)

    return (
        <div className={s.menu}>
            <button className={`${s.button} ${useNav === 'hold' ? s.on : null}`}>HOLD</button>
            <button className={s.button}>TASKS</button>
            <button className={s.button}>LAUNCH</button>
            <button className={s.button}>BUILD</button>
        </div>
    )
}
