import { useTasks } from '../../store/tasks'

import s from './tasks.module.css'

export const Tasks = () => {
    const tasks = useTasks((state) => state.tasks)

    return (
        <div className={`${s.list} scroll`}>
            {tasks.map(task => (
                <div
                    onClick={() => (console.log(task.id))}
                    key={task.id} className={s.listitem}>
                    <div className={s.title}>{task.title}</div>
                    <div className={s.check}>Check</div>
                    <div className={s.price}>{task.price}</div>
                </div>
            ))}
        </div>
    )
}
