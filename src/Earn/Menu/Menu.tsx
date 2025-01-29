import React from 'react'

import s from './menu.module.css'

export const Menu: React.FC = () => {
    return (
        <div className={s.menu}>
            <button className={s.button}>HOLD</button>
            <button className={s.button}>TASKS</button>
            <button className={s.button}>LAUNCH</button>
            <button className={s.button}>BUILD</button>
        </div>
    )
}
