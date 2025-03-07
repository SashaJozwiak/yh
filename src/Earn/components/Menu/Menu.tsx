import React from 'react'

import s from './menu.module.css'
import { useEarnNav } from './../../earnStore/nav';

export const Menu: React.FC = () => {

    const useNav = useEarnNav(state => state.tool)
    const setTool = useEarnNav(state => state.setTool)

    return (
        <div className={s.menu}>
            <button
                onClick={() => setTool('hold')}
                className={`${s.button} ${useNav === 'hold' ? s.on : null}`}>HOLD</button>
            <button
                onClick={() => setTool('tasks')}
                className={`${s.button} ${useNav === 'tasks' ? s.on : null}`}>TASKS</button>
            <button
                onClick={() => setTool('launch')}
                className={`${s.button} ${useNav === 'launch' ? s.on : null}`}>LAUNCH</button>
            <button
                onClick={() => setTool('build')}
                className={`${s.button} ${useNav === 'build' ? s.on : null}`}>BUILD</button>
        </div>
    )
}
