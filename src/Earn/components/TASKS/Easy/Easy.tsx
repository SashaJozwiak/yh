import { useCallback, useEffect, useState } from "react";
import { useUhsTasks } from "../../../earnStore/uhstasks"
import { useAuth, useUserData } from "../../../../store/main";

import s from "./easy.module.css"
import WebApp from "@twa-dev/sdk";
import { useNav } from "../../../../store/nav";
import { AdsgramTask } from './AdsgramTask';
//import { TimerAdsgram } from "./TimerAdsgram";

export const Easy = () => {

    const { tasks, isLoading, adTask, adTaskLoading, adTaskTimestamp, getTasks, checkTask, getAGTask, rewardAdTask } = useUhsTasks(state => state);
    const userId = useAuth(state => state.userId)

    const externalId = useUserData(state => state.user.id)
    //const lang = useUserData(state=>state.user.languageCode)

    const changeNav = useNav(state => state.setMainNav)

    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [ok, setOk] = useState<boolean>(false);

    useEffect(() => {
        if (!adTaskTimestamp) return; // 🔒 защита от null

        const interval = setInterval(() => {
            const start = new Date(adTaskTimestamp).getTime();
            const now = Date.now();
            const diff = 30 * 60 * 1000 - (now - start); // 30 минут в мс

            setTimeLeft(diff > 0 ? diff : 0);
            setOk(true);
        }, 1000);


        return () => clearInterval(interval);
    }, [adTaskTimestamp]);

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);


    const getAdTaskState = useCallback(() => {
        if (externalId) {
            getAGTask(externalId);
        }
    }, [externalId, getAGTask]);

    useEffect(() => {
        getAdTaskState()
    }, [getAdTaskState])

    useEffect(() => {
        if (userId && !tasks.length) {
            getTasks(userId);
        }
    }, [getTasks, tasks.length, userId])

    //console.log('timeleft: ', timeLeft)

    return (
        <div style={{ overflowY: 'auto', marginTop: '0.5rem', marginBottom: '5rem' }}>
            {isLoading ? <span className={s.loader}></span> :
                <ul style={{ backgroundColor: 'rgb(58, 70, 88)' }}>
                    <li style={{ padding: '0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <h3 style={{ textAlign: 'center' }}>Invite your friends</h3>
                        <button
                            onClick={() => changeNav('invite')}
                            style={{ width: '4rem', fontSize: '1rem', backgroundColor: 'rgb(30 150 23)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', fontWeight: 'bold' }}>GO</button>
                    </li>

                    {!adTaskLoading && ok &&
                    <li style={{ /* padding: '0.6rem', */ listStyle: "none", /* display: 'flex', justifyContent: 'space-between', */ backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <AdsgramTask debug={false} blockId={"task-10130"} timeLeft={timeLeft} />
                        {adTask && timeLeft <= 0 && <button
                            onClick={() => {
                                if (userId) {
                                    rewardAdTask(userId, externalId)
                                }
                            }}
                            disabled={adTaskLoading}
                            style={{ width: '10rem', fontSize: '1rem', margin: '0 0 0.2rem 0', border: '1px solid white', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', opacity: adTaskLoading ? '0.5' : '1' }}
                        >Claim 0.01 USDT</button>}

                        {!adTask && timeLeft <= 0 && <button
                            disabled={adTaskLoading}
                            onClick={() => getAdTaskState()}
                            style={{ width: '4rem', fontSize: '1rem', margin: '0 0 0.2rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', border: '1px solid gray', opacity: adTaskLoading ? '0.5' : '1' }}>
                            CHECK
                        </button>}
                        {adTaskTimestamp && timeLeft > 0 && <div>{minutes}:{seconds.toString().padStart(2, "0")}</div>}
                    </li>
                    }

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
