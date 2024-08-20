import { useState, useEffect } from 'react';
import s from './tasks.module.css';

import { useTasks } from '../../store/tasks'

const hours = import.meta.env.VITE_SECRET_TIMECOUNT;

export const TimerButton = ({ dailyReward }) => {
  const completeTask = useTasks((state) => state.completeTask)

  const [isClaimable, setIsClaimable] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  const [loading, setLoading] = useState(false); // Состояние загрузки

  useEffect(() => {
    const rewardTime = new Date(dailyReward.timer).getTime();
    const claimableTime = rewardTime + hours * 60 * 60 * 1000;
    const now = Date.now(); // Текущее время в миллисекундах

    console.log('rewardTime: ', rewardTime);
    console.log('claimableTime: ', claimableTime);
    console.log('now: ', now);
    console.log(now >= claimableTime)

    if (now >= claimableTime) {
      setIsClaimable(true);
      setTimeLeft('');
    } else {
      setIsClaimable(false);
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const difference = claimableTime - currentTime;

        if (difference <= 0) {
          setIsClaimable(true);
          setTimeLeft(''); 
          clearInterval(intervalId);
        } else {
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / (1000 * 60)) % 60);
          const seconds = Math.floor((difference / 1000) % 60);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);



      return () => clearInterval(intervalId);
    }
    setLoading(false)

  }, [dailyReward.timer]);

  const handleClick = async () => {
    if (!isClaimable || loading) return; // Предотвращаем повторные клики, если кнопка заблокирована

    setLoading(true); // Блокируем кнопку

    try {
      await completeTask(dailyReward.id); // Выполнение задачи
    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setLoading(false); // Разблокировка кнопки после завершения
    }
  };

  //console.log(dailyReward)

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: isClaimable ? 'white' : 'transparent', color: isClaimable ? 'black' : 'gray' }}
      className={s.check}
      disabled={!isClaimable || loading} // Блокируем кнопку, если она не доступна или в процессе загрузки
    >
      {loading ? 'Processing...' : isClaimable ? 'Claim' : timeLeft || 'loading...'}
    </button>
  );
};
