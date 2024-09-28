//import React from 'react'

import { useEffect, useState } from 'react';

import { useNav } from "../../store/nav"
import { useUserData } from '../../store/main';

import { useListData } from '../../store/EAlist'
import { swichLang } from '../../lang/lang';

import investor from '../../assets/game/img/inv3.jpg'

import s from './betapage.module.css'
import { Tooltip } from './Tooltip';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const BetaPage = () => {

    const [imageLoaded, setImageLoaded] = useState(false);

    const userLang = useUserData(state => state.user.languageCode);

    const inList = useListData((state) => state.state.inList);
    const isLoading = useListData((state) => state.state.isLoading);

    const getInList = useListData((state) => state.getInList);
    const addInList = useListData((state) => state.addInList);

    const changeNav = useNav(state => state.setMainNav)
    const userId = useUserData(state => state.user.internalId);
    const userName = useUserData(state => state.user.userName);
    const balance = useUserData(state => state.balance.balance);


    const calculateTimeLeft = (): TimeLeft => {
        const targetDate = new Date('2024-11-11T00:00:00').getTime();
        const now = new Date().getTime();
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

    useEffect(() => {
        const preloadImage = new Image();
        preloadImage.src = investor;

        // Когда изображение загружено, изменяем состояние
        preloadImage.onload = () => {
            setImageLoaded(true);
        };

        // Очистка при размонтировании компонента
        return () => {
            preloadImage.onload = null;
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const { days, hours, minutes, seconds } = timeLeft;

    useEffect(() => {
        getInList(userId);
    }, [getInList, userId])

    return (
        <>
            {imageLoaded &&
                <div /* className={s.container} */>
                    {/* <h2 className={s.title}>{swichLang(userLang, 'beta_title')}</h2> */}
                    <div className={s.playercard}>
                        <div className={s.pcimg}>
                            <img
                                /* onClick={() => setOpacity((prev) => !prev)} */
                                className={s.cardimg} src={investor}
                                /* style={{ opacity: opacity ? '0.5' : '1' }} */
                                alt="investor pic" />
                            <h2 className={s.early}>{swichLang(userLang, 'beta_subtitle')}</h2>
                        </div>

                        <div className={s.content}>
                            <div className={s.titleaccess}>{swichLang(userLang, 'beta_jointitle')}</div>
                            <div style={{ marginBottom: '5%' }}>
                                <p className={s.textaccess}>{swichLang(userLang, 'beta_check1')} 🟢</p>
                                <p className={s.textaccess}>{swichLang(userLang, 'beta_check2')}: <b>{balance} UH</b> {balance > 250 ? '🟢' : '🟡'}</p>
                            </div>

                            <div className={s.buttons}>
                                <button
                                    onClick={() => addInList(userId, userName, balance)}
                                    disabled={inList || isLoading || balance < 250}
                                    className={s.btnaddlist} style={{ padding: '0.5rem 1rem', marginBottom: '3%', marginRight: '2%', color: inList ? 'gray' : balance > 250 ? 'white' : 'gray' }}>
                                    {isLoading ? 'loading...' : inList ? `${swichLang(userLang, 'beta_inlist')}` : balance > 250 ? `${swichLang(userLang, 'beta_goinlist')}` : `${swichLang(userLang, 'balance')} < 250 UH`}
                                </button>
                                <Tooltip />
                            </div>


                            {days !== undefined ? (
                                <p className={s.timer}>
                                    {swichLang(userLang, 'beta_timer')}
                                    <span style={{ fontWeight: 'bold' }}> {days}{swichLang(userLang, 'd')} {hours}{swichLang(userLang, 'h')} {minutes}{swichLang(userLang, 'm')} {seconds}{swichLang(userLang, 's')}
                                    </span>
                                </p>
                            ) : (
                                <p>Time's up!</p>
                            )}
                        </div>

                    </div>

                    <button
                        className={s.back}
                        onClick={() => changeNav('hold')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1.5rem'} strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </button>
                </div>}
            {!imageLoaded && <span className={s.loader}></span>}
        </>
    )
}
