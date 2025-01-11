import { useEffect, useState } from 'react'
import { BackButton } from "@twa-dev/sdk/react";

import dev from '../Game/assets/Game/developer.jpg'

import s from './earn.module.css'

import { useUserData } from '../store/main';
import { useNav } from '../store/nav';

import { swichLang } from '../lang/lang'

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const Earn = () => {

    const userLang = useUserData(state => state.user.languageCode);
    const changeNav = useNav((state) => state.setMainNav)

    const [finishTime, setFinishTime] = useState(false);

    const calculateTimeLeft = (): TimeLeft => {
        const targetDate = new Date(Date.UTC(2025, 1, 25, 0, 0, 0)).getTime();
        const now = Date.now();
        const difference = targetDate - now;

        let timeLeft: TimeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        } /* else {
            setFinishTime(true);
        } */

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        if (finishTime) return;

        const timer = setTimeout(() => {
            const newTimeLeft = calculateTimeLeft();

            if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
                setFinishTime(true);
            } else {
                setTimeLeft(newTimeLeft);
            }

        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, finishTime]);

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <><BackButton onClick={() => changeNav('hold')} />
            {/* <div>Earn</div> */}
            <div style={{ width: '70vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', margin: 'auto auto', marginTop: '1rem' }}>
                <img style={{ width: '70vw', margin: '0 auto', borderRadius: '0.5rem', boxShadow: '0px 0px 20px 0px rgb(0 0 0 / 50%)' }} src={dev} alt="" />

                <h2 style={{ marginBottom: '1rem' }}>{userLang === 'ru' ? 'Rick в работе' : 'Rick in work'}</h2>

                {!finishTime ? (
                    <p className={s.timer}>
                        <span> <span style={{ fontWeight: 'bold' }}>{userLang === 'ru' ? 'Релиз: ' : 'Release: '}</span> {days}{swichLang(userLang, 'd')} {hours}{swichLang(userLang, 'h')} {minutes}{swichLang(userLang, 'm')} {seconds}{swichLang(userLang, 's')}
                        </span>
                    </p>
                ) : (
                    <p>Time's up</p>
                )}
                <p>{userLang === 'ru' ? 'или раньше.' : 'or earlier.'}</p>
            </div>
        </>
    )
}
