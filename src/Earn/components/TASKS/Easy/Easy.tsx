//import React from 'react'

import { useEffect } from "react";
import { useUhsTasks } from "../../../earnStore/uhstasks"
import { useAuth, useUserData } from "../../../../store/main";

import s from "./easy.module.css"
import WebApp from "@twa-dev/sdk";
import { useNav } from "../../../../store/nav";

export const Easy = () => {

    const { tasks, isLoading, getTasks, checkTask } = useUhsTasks(state => state);
    const userId = useAuth(state => state.userId)

    const externalId = useUserData(state => state.user.id)

    const changeNav = useNav(state => state.setMainNav)

    useEffect(() => {
        if (userId && !tasks.length) {
            getTasks(userId);
        }
    }, [getTasks, tasks.length, userId])

    return (
        <div style={{ overflowY: 'auto', marginTop: '0.5rem', marginBottom: '5rem' }}>
            {isLoading ? <span className={s.loader}></span> :
                <ul style={{ backgroundColor: 'rgb(58, 70, 88)' }}>
                    <li style={{ padding: '0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h3 style={{ textAlign: 'center' }}>Invite your friends</h3>
                        <button
                            onClick={() => changeNav('invite')}
                            style={{ width: '4rem', fontSize: '1rem', backgroundColor: 'rgb(30 150 23)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>GO</button>
                    </li>
                    {tasks.filter((task) => task.active && task.status !== "completed").map((task) => {
                        return (
                            <li key={task.id}
                                style={{ padding: '0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.3rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h3
                                            onClick={() => {
                                                WebApp.openTelegramLink(`https://t.me/${task.src.slice(1)}`);
                                            }}
                                            style={{ textDecoration: 'underline' }}
                                        >{task.title}</h3>
                                    </div>

                                    <p style={{ fontStyle: 'normal', fontWeight: '400', fontSize: '1rem', textAlign: 'left' }}>{task.description}</p>

                                    <p style={{ textAlign: 'left', fontSize: '0.8rem', fontStyle: 'italic', fontWeight: '300' }}>Available: {task.balance / task.price}</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <span style={{ /* textDecoration: 'underline',  */border: '1px solid', padding: '0 0.1rem', borderRadius: '0.3rem', margin: '0.3rem 0' }}> +{task.price / 10 ** (task.currency === 'USDT' ? 6 : 9)} {task.currency}</span>
                                    <button
                                        onClick={() => {
                                            WebApp.openTelegramLink(`https://t.me/${task.src.slice(1)}`);
                                        }}
                                        style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>Go</button>
                                    <button
                                        onClick={() => {
                                            if (userId) {
                                                checkTask(userId, externalId, task.src, task.id)
                                            }
                                        }}
                                        style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>Check</button>
                                </div>
                            </li>

                        )
                    })}
                </ul >}

            {tasks.filter((task) => task.active && task.status === "completed").length > 0 && <h3 style={{ textAlign: 'center', margin: '1rem', color: 'gray' }}>Completed tasks</h3>}


            <ul style={{ opacity: '0.5', overflowY: 'auto', backgroundColor: 'rgb(58, 70, 88)' }}>
                {tasks.filter((task) => task.active && task.status === "completed").map((task) => {
                    return (
                        <li key={task.id}
                            style={{ padding: '0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.3rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3
                                        onClick={() => {
                                            WebApp.openTelegramLink(`https://t.me/${task.src.slice(1)}`);
                                        }}
                                        style={{ textDecoration: 'underline' }}
                                    >{task.title}</h3>
                                </div>

                                <p style={{ fontStyle: 'normal', fontWeight: '400', fontSize: '1rem', textAlign: 'left' }}>{task.description}</p>
                                <p style={{ textAlign: 'left', fontSize: '0.8rem', fontStyle: 'italic', fontWeight: '300' }}>Available: {task.balance / task.price}</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                                <span style={{ border: '1px solid', padding: '0 0.1rem', borderRadius: '0.3rem', margin: '0.3rem 0' }}> +{task.price / 10 ** (task.currency === 'USDT' ? 6 : 9)} {task.currency}</span>
                                <div style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>Go</div>
                                <div
                                    style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>Check</div>
                            </div>
                        </li>
                    )
                })}
            </ul >
        </div>
    )
}
