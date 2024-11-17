import { useEffect, useState } from 'react';
import { useNav } from '../../store/nav';
import { useTasks } from '../../store/tasks'
import { useUserData } from '../../store/main';

import { swichLang } from '../../lang/lang.js';

import { TimerButton } from './TimerButton ';
import { TimerButtonAd } from './TimerButtonAd';

import { checkSubscription } from '../../utils/checks/checkSubscription';
import { checkWithTimer } from '../../utils/checks/checkWithTimer';

import s from './tasks.module.css'
import WebApp from '@twa-dev/sdk';


export const Tasks = () => {
    const { setMainNav } = useNav((state) => state)
    const userData = useUserData((state) => state.user)
    const { activeFriends, dailyReward, adReward } = useTasks((state) => state)

    const tasks = useTasks((state) => state.tasks)
    const completeTask = useTasks((state) => state.completeTask)
    const getAllTasks = useTasks((state) => state.getAllTasks)
    const loadStatus = useTasks((state) => state.loadStatus)

    const buyBonuses = useTasks((state) => state.buyBonuses)

    const [blockBtns, setBlockBtns] = useState(false);
    const [blockBuyBtns, setBlockBuyBtns] = useState(false);
    const [loadBtn, setLoadBtn] = useState(false);

    const handleBuy = (stars: number) => {
        setBlockBuyBtns(true);
        buyBonuses(stars, userData.internalId)
        setBlockBuyBtns(false);
    }

    const checkTask = async (userId: number, taskId: number, src: string) => {

        switch (taskId) {
            case 1:
            case 2:
            case 5:
            case 9:
                await checkSubscription(userId, taskId, src, completeTask);
                break;
            case 6:
            case 7:
                checkWithTimer(/* userId, */ taskId, src, completeTask, setLoadBtn);
                break;
            case 4:
                //await checkTeams(userId, taskId, setRoutes);
                //await completeTask(taskId)
                break;
            default:
            //console.log('no task id');
        }
        await setBlockBtns(false)
    }

    useEffect(() => {
        getAllTasks(userData.internalId)
    }, [getAllTasks, userData.internalId])

    //console.log('tasks: ', tasks);
    //console.log('dailyReward: ', dailyReward);
    //console.log('adReward: ', adReward);

    return (
        <div className={`${s.list} scrollable`}>
            <h2 className={s.line}>{swichLang(userData.languageCode, 'permanent')}</h2>
            <div
                onClick={() => {
                    setMainNav('invite')
                }}
                className={s.listitem}>
                <div className={s.title}>{activeFriends.title}</div>
                <div style={{ color: 'whitesmoke', backgroundColor: 'transparent' }} className={s.check}>{userData.refs_active}</div>
                <div style={{ color: 'whitesmoke' }} className={s.price}>{activeFriends.price}<span style={{ color: 'rgb(22, 163, 74)' }}>B</span>/F</div>
            </div>

            <div
                className={`${s.listitem} ${s.listitemperm}`}>
                <div style={{ border: 'none', margin: 'auto auto auto 0' }} className={s.title}>{dailyReward.title}</div>

                <TimerButton dailyReward={dailyReward} />

                <div style={{ color: 'white' }} className={s.price}>{dailyReward.price}<span style={{ color: 'rgb(22, 163, 74)' }}> B</span></div>
            </div>

            <div
                className={`${s.listitem} ${s.listitemperm}`}>
                <div style={{ border: 'none', margin: 'auto auto auto 0' }} className={s.title}>{adReward.title}</div>

                <TimerButtonAd dailyReward={adReward} />

                <div style={{ color: 'white' }} className={s.price}>{adReward.price}<span style={{ color: 'rgb(22, 163, 74)' }}> B</span></div>
            </div>

            {tasks.filter(task => task.type === 'native' && task.completed === false).length > 0 && <h2 className={s.line}>{swichLang(userData.languageCode, 'our')}</h2>}

            {tasks.filter(task => task.type === 'native' && task.completed === false).map(task => (
                <div
                    key={task.id} className={s.listitem}>
                    <button
                        onClick={() => {
                            WebApp.openTelegramLink(`https://t.me/${task.src.slice(1)}`);
                        }}
                        className={s.titlebtn}>{task.title}</button>
                    <button
                        style={{ backgroundColor: blockBtns ? 'transparent' : 'whitesmoke', color: blockBtns ? 'gray' : 'black' }}
                        onClick={() => {
                            setBlockBtns(true)
                            checkTask(userData.id, task.id, task.src)
                        }}
                        disabled={blockBtns}
                        className={s.check}>{swichLang(userData.languageCode, 'check')}</button>
                    <div className={s.price}>{task.price}<span style={{ color: 'rgb(22, 163, 74)' }}> B</span></div>
                </div>
            ))}
            {tasks.filter(task => task.type === 'affiliate' && task.completed === false && task.id !== 7 && task.id !== 6).length > 0 && <h2 className={s.line}>{swichLang(userData.languageCode, 'partnership')}</h2>}
            {tasks.filter(task => task.type === 'affiliate' && task.completed === false && task.id !== 7 && task.id !== 6).map(task => (
                <div
                    key={task.id} className={s.listitem}>
                    <button
                        onClick={() => {
                            WebApp.openTelegramLink(`https://t.me/${task.src.slice(1)}`);
                        }}
                        className={s.titlebtn}>{task.title}</button>
                    <button
                        style={{ backgroundColor: blockBtns ? 'transparent' : 'whitesmoke', color: blockBtns ? 'gray' : 'black' }}
                        onClick={() => {
                            setBlockBtns(true)
                            checkTask(userData.id, task.id, task.src)
                        }}
                        disabled={blockBtns}
                        className={s.check}>{loadBtn ? 'load' : swichLang(userData.languageCode, 'check')}</button>
                    <div className={s.price}>{task.price}<span style={{ color: 'rgb(22, 163, 74)' }}> B</span></div>
                </div>
            ))}

            {tasks.filter(task => task.completed === true && task.title !== 'Active Friends').length > 0 && <h2 className={s.line}>{swichLang(userData.languageCode, 'completed')}</h2>}
            {tasks.filter(task => task.completed === true && task.title !== 'Active Friends').map(task => (
                <div
                    key={task.id} className={s.listitem}
                    style={{ color: 'grey' }}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            WebApp.openTelegramLink(`https://t.me/${task.src.slice(1)}`);
                        }}
                        disabled={task.type === 'affiliate'}
                        style={{ borderBottom: '1px gray solid', color: 'gray' }}
                        className={s.titlebtn}>{task.title}
                    </button>
                    <div style={{ color: 'gray', backgroundColor: 'transparent' }} className={s.check}>🟢</div>
                    <div className={s.price}>{task.price}<span style={{ color: 'rgb(22, 163, 74)' }}> B</span></div>
                </div>
            ))}




            {userData.internalId === 9 &&
                <>
                    <h2 style={{ color: 'gray' }} className={s.line}>Boosts</h2>
                    <div
                        //key={task.id} 
                        className={s.listitem}
                        style={{ color: 'grey' }}>
                        <button
                            onClick={() => handleBuy(1)}
                            disabled={blockBuyBtns}
                            style={{ borderBottom: '1px white solid', color: 'white' }}
                            className={s.titlebtn}>Bonuses for stars
                        </button>
                        <button
                            onClick={() => handleBuy(1)}
                            style={{ color: 'black', backgroundColor: 'white' }} className={s.check}>1⭐</button>
                        <div style={{ color: 'white', border: '1px solid gray' }} className={s.price}>1K<span style={{ color: 'rgb(22, 163, 74)' }}> B</span></div>
                    </div>
                    <div
                        //key={task.id} 
                        className={s.listitem}
                        style={{ color: 'grey' }}>
                        <button
                            onClick={() => handleBuy(100)}
                            disabled={blockBuyBtns}
                            style={{ borderBottom: '1px white solid', color: 'white' }}
                            className={s.titlebtn}>Bonuses for stars
                        </button>
                        <button
                            onClick={() => handleBuy(100)}
                            style={{ color: 'black', backgroundColor: 'white' }} className={s.check}>100⭐</button>
                        <div style={{ color: 'white', border: '1px solid gray' }} className={s.price}>10K<span style={{ color: 'rgb(22, 163, 74)' }}> B</span></div>
                    </div>

                    <div
                        //key={task.id} 
                        className={s.listitem}
                        style={{ color: 'grey' }}>
                        <button
                            onClick={() => handleBuy(500)}
                            disabled={blockBuyBtns}
                            style={{ borderBottom: '1px white solid', color: 'white' }}
                            className={s.titlebtn}>Bonuses for stars
                        </button>
                        <button
                            onClick={() => handleBuy(500)}
                            style={{ color: 'black', backgroundColor: 'white' }} className={s.check}>500⭐</button>
                        <div style={{ color: 'white', border: '1px solid gray' }} className={s.price}>50K<span style={{ color: 'rgb(22, 163, 74)' }}> B</span></div>
                    </div>

                    <div
                        //key={task.id} 
                        className={s.listitem}
                        style={{ color: 'grey' }}>
                        <button
                            onClick={() => handleBuy(1000)}
                            disabled={blockBuyBtns}
                            style={{ borderBottom: '1px white solid', color: 'white' }}
                            className={s.titlebtn}>Bonuses for stars
                        </button>
                        <button
                            onClick={() => handleBuy(1000)}
                            style={{ color: 'black', backgroundColor: 'white' }} className={s.check}>1000⭐</button>
                        <div style={{ color: 'white', border: '1px solid gray' }} className={s.price}>100K<span style={{ color: 'rgb(22, 163, 74)' }}> B</span></div>
                    </div>
                </>
            }

            {loadStatus && <span className={s.loader}></span>}
        </div>
    )
}
