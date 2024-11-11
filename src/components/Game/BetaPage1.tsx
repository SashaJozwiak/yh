//import React from 'react'

import { useEffect, useState } from 'react';

import { useNav } from "../../store/nav"
import { useUserData } from '../../store/main';

import { useListData } from '../../store/EAlist'
import { swichLang } from '../../lang/lang';

import investor from '../../assets/game/img/inv3_11zon_1.webp'

import { formatNumber } from './../../utils/formats/bigNumbers';

import s from './betapage1.module.css'
import { Tooltip } from './Tooltip';


interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const BetaPage1 = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const userLang = useUserData(state => state.user.languageCode);

    const inList = useListData((state) => state.state.inList);
    const isLoading = useListData((state) => state.state.isLoading);

    const getInList = useListData((state) => state.getInList);
    //const addInList = useListData((state) => state.addInList);

    const changeNav = useNav(state => state.setMainNav)
    const userId = useUserData(state => state.user.internalId);
    //const userName = useUserData(state => state.user.userName);
    const balance = useUserData(state => state.balance.balance);

    const [finishTime, setFinishTime] = useState(false);

    const calculateTimeLeft = (): TimeLeft => {
        const targetDate = new Date(Date.UTC(2024, 10, 11, 0, 0, 0)).getTime();
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

    //RESOURCE LOADER
    useEffect(() => {
        const preloadImage = new Image();
        preloadImage.src = investor;

        // Когда изображение загружено, изменяем состояние
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

    useEffect(() => {
        getInList(userId);
    }, [getInList, userId])

    return (
        <> {imageLoaded && 
            <div className={s.container}>
                <h2 className={s.title}>{swichLang(userLang, 'beta_title')}</h2>
                {(userId === 3441 || userId === 9 || userId === 2 || userId === 10 || userId === 24) && <button
                    onClick={() => changeNav('game1')}
                    style={{ padding: '0.85rem' }}>PLAY</button>}

                <div className={s.playercard}>
                    <div className={s.pcimg}>
                        <h2 className={s.early}>{swichLang(userLang, 'beta_subtitle')}</h2>
                        <img
                            className={s.cardimg} src={investor}
                            alt="investor pic" />
                    </div>

                    <div className={s.content}>
                        <div className={s.titleaccess}>{swichLang(userLang, 'beta_jointitle')}</div>
                        <div style={{ marginBottom: '5%' }}>
                            <p className={s.textaccess}>{swichLang(userLang, 'beta_check1')} 🟢</p>
                            <p className={s.textaccess}>{swichLang(userLang, 'beta_check2')}: <b>{formatNumber(balance)} UH</b> {balance > 250 ? '🟢' : '🟡'}</p>
                        </div>

                        <div className={s.buttons}>

                            {/* {finishTime ? */}
                                <button
                                    className={s.btnaddlist}
                                    onClick={() => changeNav('game1')}
                                    disabled={isLoading || balance < 250 || !finishTime}
                                    style={{ padding: '0.5rem 1rem', marginBottom: '3%', marginRight: '2%', color: inList ? 'white' : balance > 250 ? 'white' : 'gray' }}
                                >
                                    {balance < 250 ? 'balance < 250' : 'Play'}
                            </button> {/* : */}

                            {/* <button
                                onClick={() => addInList(userId, userName, balance)}
                                disabled={inList || isLoading || balance < 250}
                                className={s.btnaddlist} style={{ padding: '0.5rem 1rem', marginBottom: '3%', marginRight: '2%', color: inList ? 'gray' : balance > 250 ? 'white' : 'gray' }}>
                                {isLoading ? 'loading...' : inList ? `${swichLang(userLang, 'beta_inlist')}` : balance > 250 ? `${swichLang(userLang, 'beta_goinlist')}` : `${swichLang(userLang, 'balance')} < 250 UH`}
                                </button> */}
                            {/* } */}

                            {!finishTime && <Tooltip />}
                        </div>

                        {!finishTime ? (
                        <p className={s.timer}>
                                {/* {swichLang(userLang, 'beta_timer')} */}
                            <span style={{ fontWeight: 'bold' }}> {days}{swichLang(userLang, 'd')} {hours}{swichLang(userLang, 'h')} {minutes}{swichLang(userLang, 'm')} {seconds}{swichLang(userLang, 's')}
                            </span>
                        </p>
                        ) : (
                                <p>Early access is open</p>
                        )}
                    </div>

                </div>

                <button
                    className={s.back}
                    onClick={() => changeNav('hold')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1.5rem'} strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>

            </div>
        }
            {!imageLoaded && <span className={s.loader}></span>}
        </>
    )
}
