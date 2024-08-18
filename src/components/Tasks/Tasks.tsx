import { /* useEffect, */ /* useState  */ } from 'react';
import { useTasks } from '../../store/tasks'

import s from './tasks.module.css'

export const Tasks = () => {
    const tasks = useTasks((state) => state.tasks)

    return (
        <div className={`${s.list} scrollable`}>
            <h2>Permanent</h2>
            <div
                //onClick={() => (console.log(task.id))}
                className={`${s.listitem} ${s.listitemperm}`}>
                <div className={`${s.title} ${s.titleperm}`}>Active Friends</div>
                <div className={s.check}>0</div>
                <div className={s.price}>{0 * 100}/150</div>
            </div>
            <h2>Native</h2>
            {tasks.filter(task => task.type === 'native').map(task => (
                <div
                    onClick={() => (console.log(task.id))}
                    key={task.id} className={s.listitem}>
                    <div className={s.title}>{task.title}</div>
                    <div className={s.check}>Check</div>
                    <div className={s.price}>{task.price}</div>
                </div>
            ))}
            <h2>Affiliate</h2>
            {tasks.filter(task => task.type === 'affiliate').map(task => (
                <div
                    onClick={() => (console.log(task.id))}
                    key={task.id} className={s.listitem}>
                    <div className={s.title}>{task.title}</div>
                    <div className={s.check}>Check</div>
                    <div className={s.price}>{task.price}</div>
                </div>
            ))}
            {/*
            {showButton && <div
                onClick={handleScrollUp}
                className={s.goTop}
            >↑</div>} */}
        </div>
    )
}
