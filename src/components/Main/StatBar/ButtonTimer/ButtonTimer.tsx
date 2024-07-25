import React, { useEffect, useState } from 'react';
import { useBalance } from '../../../../store/balance';

export const ButtonTimer: React.FC = () => {
    const { balanceData } = useBalance(state => ({
        balanceData: state.balance,
    }));

    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        const finishDate = new Date(balanceData.finishData).getTime();

        const updateTimer = () => {
            const currentTime = Date.now();
            const timeRemaining = finishDate - currentTime;

            if (timeRemaining <= 0) {
                setTimeLeft(0);
            } else {
                setTimeLeft(timeRemaining);
            }
        };

        // Обновляем баланс сразу после монтирования
        updateTimer();

        // Устанавливаем интервал для обновления баланса каждую секунду
        const interval = setInterval(updateTimer, 1000);

        // Очищаем интервал при размонтировании компонента или изменении зависимостей
        return () => clearInterval(interval);
    }, [balanceData.finishData]);

    // Преобразование оставшегося времени в часы, минуты и секунды
    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <span style={{ color: 'gray' }}>{formatTime(timeLeft)}</span>
        </>
    );
};
