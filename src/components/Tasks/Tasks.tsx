import { useEffect, useState } from 'react';
import { useTasks } from '../../store/tasks'

import s from './tasks.module.css'

export const Tasks = () => {
    const [showButton, setShowButton] = useState(false);
    const tasks = useTasks((state) => state.tasks)

    const handleScrollUp = () => {
        const scrollElement = document.querySelector('.scroll');
        if (scrollElement) {
            scrollElement.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollElement = document.querySelector('.scroll');
            if (scrollElement) {
                setShowButton(scrollElement.scrollTop > 20); // Показывать кнопку, если прокрутили на 100px вниз
            }
        };

        const scrollElement = document.querySelector('.scroll');
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
            return () => scrollElement.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <div className={`${s.list} scroll`}>
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

            {showButton && <div
                onClick={handleScrollUp}
                className={s.goTop}
            >↑</div>}
        </div>
    )
}
