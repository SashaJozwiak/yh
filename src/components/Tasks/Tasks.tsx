import { useEffect, useState } from 'react';
import { useNav } from '../../store/nav';
import { useTasks } from '../../store/tasks'
import { useUserData } from '../../store/main';

import { swichLang } from '../../lang/lang.js';

import { TimerButton } from './TimerButton ';

import { checkSubscription } from '../../utils/checks/checkSubscription';
import { checkWithTimer } from '../../utils/checks/checkWithTimer';

import s from './tasks.module.css'
import WebApp from '@twa-dev/sdk';

export const Tasks = () => {
    const { setMainNav, setCabNav } = useNav((state) => state)
    const userData = useUserData((state) => state.user)
    const { activeFriends, dailyReward } = useTasks((state) => state)

    const tasks = useTasks((state) => state.tasks)
    const completeTask = useTasks((state) => state.completeTask)
    const getAllTasks = useTasks((state) => state.getAllTasks)
    const loadStatus = useTasks((state) => state.loadStatus)

    const [blockBtns, setBlockBtns] = useState(false);
    const [loadBtn, setLoadBtn] = useState(false);

    const checkTask = async (userId: number, taskId: number, src: string) => {

        switch (taskId) {
            case 1:
            case 2:
            case 5:
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

    return (
        <div className={`${s.list} scrollable`}>
            <h2 className={s.line}>{swichLang(userData.languageCode, 'permanent')}</h2>
            <div
                onClick={() => {
                    setMainNav('cabinet')
                    setCabNav('invite')
                }}
                className={s.listitem}>
                <div className={s.title}>{activeFriends.title}</div>
                <div style={{ color: 'whitesmoke', backgroundColor: 'transparent' }} className={s.check}>{userData.refs_active}</div>
                <div style={{ color: 'whitesmoke' }} className={s.price}>{activeFriends.price}/F</div>
            </div>

            <div
                className={`${s.listitem} ${s.listitemperm}`}>
                <div style={{ border: 'none', margin: 'auto auto auto 0' }} className={s.title}>{dailyReward.title}</div>

                <TimerButton dailyReward={dailyReward} />

                <div style={{ color: 'white' }} className={s.price}>{dailyReward.price}</div>
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
                    <div className={s.price}>{task.price}</div>
                </div>
            ))}
            {tasks.filter(task => task.type === 'affiliate' && task.completed === false).length > 0 && <h2 className={s.line}>{swichLang(userData.languageCode, 'partnership')}</h2>}
            {tasks.filter(task => task.type === 'affiliate' && task.completed === false).map(task => (
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
                    <div className={s.price}>{task.price}</div>
                </div>
            ))}

            {tasks.filter(task => task.completed === true && task.title !== 'Active Friends').length > 0 && <h2 className={s.line}>{swichLang(userData.languageCode, 'completed')}</h2>}
            {tasks.filter(task => task.completed === true && task.title !== 'Active Friends').map(task => (
                <div
                    key={task.id} className={s.listitem}
                    style={{ color: 'grey' }}>
                    <div style={{ borderBottom: '1px gray solid' }}
                        className={s.title}>{task.title}</div>
                    <div style={{ color: 'gray', backgroundColor: 'transparent' }} className={s.check}>🟢</div>
                    <div className={s.price}>{task.price}</div>
                </div>
            ))}
            {loadStatus && <span className={s.loader}></span>}
        </div>
    )
}
