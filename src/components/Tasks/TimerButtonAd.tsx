import { useState, useEffect, useCallback } from 'react';
import WebApp from '@twa-dev/sdk'



import { swichLang } from '../../lang/lang.js';
import { useTasks } from '../../store/tasks.js'
import { useUserData } from '../../store/main.js';

import { useAdsgram } from './../../utils/adsgram/useAdsgram';

import s from './tasks.module.css';

const hours = import.meta.env.VITE_SECRET_TIMECOUNT;
const minutes = 90;

export const TimerButtonAd = ({ dailyReward }) => {
  //const userExternalId = useUserData(state => state.user.id)
  const userInternalId = useUserData(state => state.user.internalId)
  const getAllTasks = useTasks((state) => state.getAllTasks);
  const userLang = useUserData(state => state.user.languageCode)


  const completeTask = useTasks((state) => state.completeTask)
  //const completeAdTask = useTasks((state) => state.completeAdTask)

  const [isClaimable, setIsClaimable] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  const [loading, setLoading] = useState(false);// Состояние загрузки
  //const [renderPage, setRenderPAge] = useState(false);
  const { plusLocalBalance } = useUserData(state => state)

  //console.log('adReward/dailyreward: ', dailyReward)
  const onReward = useCallback(() => {

    WebApp.showConfirm('Bonuses successfully received!', () => {
      // Запускаем getAllTasks после закрытия диалога
      getAllTasks(userInternalId);
      plusLocalBalance(100)
    });

  }, [getAllTasks, plusLocalBalance, userInternalId]);

  const onError = useCallback((result) => {
    //alert(JSON.stringify(result, null, 4));
    WebApp.showConfirm((JSON.stringify(result, null, 4)), () => {
      // Запускаем getAllTasks после закрытия диалога
      getAllTasks(userInternalId);
    });

  }, [getAllTasks, userInternalId]);

  const showAd = useAdsgram({ blockId: "7623", onReward, onError });

  useEffect(() => {
    const rewardTime = new Date(dailyReward.timer).getTime();

    //const claimableTime = rewardTime + hours * 60 * 60 * 1000;

    const claimableTime = dailyReward.id === 8 ? rewardTime + minutes * 60 * 1000 : rewardTime + hours * 60 * 60 * 1000; /* && dailyReward.counter !== 20 ? rewardTime + minutes * 60 * 1000 : rewardTime + hours * 60 * 60 * 1000; */

    //const claimableTime5nibuts = rewardTime + minutes * 60 * 1000;
    const now = Date.now(); // Текущее время в миллисекундах

    //console.log('rewardTime: ', rewardTime);
    //console.log('claimableTime: ', claimableTime);
    //console.log('now: ', now);
    //console.log(now >= claimableTime)

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

  }, [dailyReward.counter, dailyReward.id, dailyReward.timer]);

  const handleClick = async () => {
    console.log('handleclick1')
    if (!isClaimable || loading) return; // Предотвращаем повторные клики, если кнопка заблокирована
    // Блокируем кнопку
    setLoading(true);
    console.log('loading: ', loading);

    console.log('handleclick2 ', dailyReward)

    try {
      if (dailyReward.id === 4) {
        console.log('handleclick3 -4')
        await completeTask(dailyReward.id); // Выполнение задачи
      }

      if (dailyReward.id === 8) {
        console.log('handleclick3 -8')

        try {
          await showAd();
        } catch (adError) {
          console.error('Error with Adsgram:', adError);
        }
        //await completeAdTask(userExternalId);
      }

    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setLoading(false); // Разблокировка кнопки после завершения
    }
  };

  useEffect(() => {
    console.log('loading changed: ', loading);
  }, [loading]);

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: isClaimable ? 'white' : 'transparent', color: isClaimable ? 'black' : 'gray' /* 'gray' */, marginRight: '0.5rem' }}
      className={s.check}
      disabled={!isClaimable || loading /* true */} // Блокируем кнопку, если она не доступна или в процессе загрузки
    >
      {loading ? 'Processing...' : isClaimable ? swichLang(userLang, 'claim') : timeLeft || 'loading...'}
    </button>
  );
};
