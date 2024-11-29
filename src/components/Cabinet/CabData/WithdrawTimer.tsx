import React, { useState, useEffect } from "react";

interface TimerButtonProps {
    latestPurchaseDate: string | null | undefined; // Дата последней покупки
    /* onWithdraw: () => void; */// Функция для обработки вывода средств
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WithdrawTimer: React.FC<TimerButtonProps> = ({ latestPurchaseDate, /* onWithdraw, */ setPopUp }) => {
    const [remainingTime, setRemainingTime] = useState<number | null>(null); // Оставшееся время в секундах

    useEffect(() => {
        if (!latestPurchaseDate) {
            setRemainingTime(null); // Если даты нет, таймер не запускается
            return;
        }
        // Вычисляем дату окончания 25-дневного периода
        const startDate = new Date(latestPurchaseDate); // Преобразуем дату в объект Date
        const endDate = new Date(startDate.getTime() + 25 * 24 * 60 * 60 * 1000); // Прибавляем 25 дней

        const updateRemainingTime = () => {
            const now = new Date();
            const diff = endDate.getTime() - now.getTime(); // Разница в миллисекундах

            if (diff <= 0) {
                setRemainingTime(null); // 25 дней прошло, убираем таймер
            } else {
                setRemainingTime(Math.ceil(diff / 1000)); // Оставшееся время в секундах
            }
        };

        updateRemainingTime(); // Обновляем таймер сразу
        const interval = setInterval(updateRemainingTime, 1000); // И затем каждые 1 секунду

        return () => clearInterval(interval); // Очищаем интервал при размонтировании
    }, [latestPurchaseDate]);

    // Форматируем оставшееся время
    const formatTime = (seconds: number): string => {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = seconds % 60;

        return `${days}д ${hours}ч ${minutes}м ${secs}с`;
    };

    return (
        <div>
            {remainingTime !== null ? (
                <button
                    //onClick={() => setPopUp(true)}
                    disabled={true}
                    style={{ height: '2rem', padding: '0rem 0.5rem', margin: '1rem auto', backgroundColor: 'rgb(103, 119, 142)', opacity: '0.7' }}
                >
                    Last purchase: {formatTime(remainingTime)}
                </button>
            ) : (
                <button
                    style={{ height: '2rem', padding: '0rem 0.5rem', margin: '1rem auto', backgroundColor: 'rgb(103, 119, 142)' }}
                    onClick={() => setPopUp(true)}>Withdraw</button>
            )}
        </div>
    );
};

