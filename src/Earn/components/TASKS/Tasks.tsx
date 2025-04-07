//import React from 'react'
import { useEarnNav } from "../../earnStore/nav";
import { Plus, Close, Question } from "../../svgs";
import { Add } from "./Add/Add";
import { Easy } from "./Easy/Easy";
import { Info } from "./Info/Info";

import s from './tasks.module.css'

export const Tasks = () => {
    const { tasks, setTasks } = useEarnNav(state => state)

    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'space-between'/* , border: '1px solid' */ }}>
                <button
                    onClick={tasks === 'info' ? () => setTasks('easy') : () => setTasks('info')}
                    style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', border: tasks === 'info' ? '1px solid #bbbbbb' : '1px solid transparent' }}>
                    <div>{tasks === 'info' ? <Close /> : <Question />}</div>
                    <div>info</div>
                </button>

                <div style={{ display: 'flex', }}>
                    <div className={s.switch}>
                        <button onClick={() => setTasks('easy')} className={`${s.tabs} ${tasks === 'easy' ? s.ontab : null}`}>{tasks === 'easy' ? '🔵 Easy' : '⚪ Easy'}</button>
                        <button onClick={() => setTasks('hard')} className={`${s.tabs} ${tasks == 'hard' ? s.ontab : null}`}>{tasks === 'hard' ? '🟢 Hard' : '⚪ Hard'}</button>
                    </div>
                </div>

                <button
                    onClick={tasks === 'add' ? () => setTasks('easy') : () => setTasks('add')}
                    style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', border: tasks === 'add' ? '1px solid #bbbbbb' : '1px solid transparent' }}>
                    <div>{tasks === 'add' ? <Close /> : <Plus />}</div>
                    <div>add</div>
                </button>
            </header>

            <>
                {tasks === 'info' && <Info />}
                {tasks === 'add' && <Add />}
                {tasks === 'easy' && <Easy />}
                {tasks === 'hard' && <h3 style={{ color: 'gray' }}>No hard tasks now</h3>}
            </>
        </>
    )
}
