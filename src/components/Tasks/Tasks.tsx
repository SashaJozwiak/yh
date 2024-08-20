import { useEffect } from 'react';
import { useTasks } from '../../store/tasks'
import { useUserData } from '../../store/main';

import { checkSubscription } from '../../utils/checks/checkSubscription';

import s from './tasks.module.css'
import { useNav } from '../../store/nav';

export const Tasks = () => {
    const { setMainNav, setCabNav } = useNav((state) => state)


    const userData = useUserData((state) => state.user)
    const { activeFriends, dailyReward } = useTasks((state) => state)
    const tasks = useTasks((state) => state.tasks)
    const completeTask = useTasks((state) => state.completeTask)



    const getAllTasks = useTasks((state) => state.getAllTasks)

    const checkTask = async (userId: number, taskId: number, src: string) => {
        switch (taskId) {
            case 1:
            case 2:
                await checkSubscription(userId, taskId, src, completeTask);
                break;
            case 4:
                //await checkTeams(userId, taskId, setRoutes);
                break;
            default:
                console.log('no task id');
        }
    }

    useEffect(() => {
        getAllTasks(userData.internalId)
    }, [getAllTasks, userData.internalId])

    return (
        <div className={`${s.list} scrollable`}>
            <h2>Permanent</h2>
            <div
                onClick={() => {
                    setMainNav('cabinet')
                    setCabNav('invite')
                }}
                className={s.listitem}>
                <div className={s.title}>{activeFriends.title}</div>
                <div style={{ color: 'gray', backgroundColor: 'transparent' }} className={s.check}>{userData.refs_active}</div>
                <div style={{ color: 'gray' }} className={s.price}>{activeFriends.price}/F</div>
            </div>

            <div
            //onClick={() => (console.log('daily reward'))}
                className={`${s.listitem} ${s.listitemperm}`}>
                <div className={s.title}>{dailyReward.title}</div>

                <button className={s.check}>Claim</button>

                <div style={{ color: 'white' }} className={s.price}>{dailyReward.price}</div>
            </div>
            <h2>Native</h2>
            {tasks.filter(task => task.type === 'native').map(task => (
                <div
                    onClick={() => checkTask(userData.id, task.id, task.src)}
                    key={task.id} className={s.listitem}>
                    <div className={s.title}>{task.title}</div>
                    <button className={s.check}>Check</button>
                    <div className={s.price}>{task.price}</div>
                </div>
            ))}
            <h2>Affiliate</h2>
            {tasks.filter(task => task.type === 'affiliate').map(task => (
                <div
                    onClick={() => checkTask(userData.id, task.id, task.src)}
                    key={task.id} className={s.listitem}>
                    <div className={s.title}>{task.title}</div>
                    <button className={s.check}>Check</button>
                    <div className={s.price}>{task.price}</div>
                </div>
            ))}

            {tasks.filter(task => task.completed === true && task.title !== 'Active Friends') && <h2>Complete</h2>}
            {tasks.filter(task => task.completed === true && task.title !== 'Active Friends').map(task => (
                <div
                    //onClick={() => (console.log(task.id))}
                    key={task.id} className={s.listitem}
                    style={{ color: 'grey' }}>
                    <div style={{ borderBottom: '1px gray solid' }}
                        className={s.title}>{task.title}</div>
                    <div style={{ color: 'gray', backgroundColor: 'transparent' }} className={s.check}>🟢</div>
                    <div className={s.price}>{task.price}</div>
                </div>
            ))}
        </div>
    )
}
