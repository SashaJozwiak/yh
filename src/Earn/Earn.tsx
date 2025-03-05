import { useEffect, useState } from 'react'
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
    const userId = useUserData(state => state.user.id)
    const userLang = useUserData(state => state.user.languageCode);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [finishTime, setFinishTime] = useState(false);

    const changeNav = useNav((state) => state.setMainNav)

    const calculateTimeLeft = (): TimeLeft => {
        const targetDate = new Date(Date.UTC(2025, 2, 7, 0, 0, 0)).getTime();
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
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    //RESOURCE LOADER
    useEffect(() => {
        const preloadImage = new Image();
        preloadImage.src = dev;

        preloadImage.onload = () => {
            setImageLoaded(true);
        };

        return () => {
            preloadImage.onload = null;
        };
    }, []);

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

    //console.log('userId: ', userId)

    return (
        <>
            {imageLoaded &&
            <div style={{ width: '70vw', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', margin: 'auto auto', marginTop: '1rem' }}>
                    <img style={{ width: '70vw', margin: '0 auto', borderRadius: '0.5rem', boxShadow: '0px 0px 20px 0px rgb(0 0 0 / 50%)' }} src={dev} alt="developer pic" />

                <h2 style={{ marginBottom: '1rem' }}>{userLang === 'ru' ? 'Rick в работе' : 'Rick in work'}</h2>

                {!finishTime ? (
                    <p className={s.timer}>
                        <span> <span style={{ fontWeight: 'bold' }}>{userLang === 'ru' ? 'Релиз: ' : 'Release: '}</span> {days}{swichLang(userLang, 'd')} {hours}{swichLang(userLang, 'h')} {minutes}{swichLang(userLang, 'm')} {seconds}{swichLang(userLang, 's')}
                        </span>
                    </p>
                ) : (
                    <p>Time's up</p>
                )}
                    {/* <p>{userLang === 'ru' ? 'или раньше.' : 'or earlier.'}</p> */}
                    {(userId === 0 || userId === 946292829) && <button
                        onClick={() => changeNav('UHS')}
                        style={{ marginTop: '1rem', height: '2rem' }}>START</button>}
                </div>}
            {!imageLoaded && <span className={s.loader}></span>}


        </>
    )
}
