import React, { useEffect, useState } from 'react';
import s from './loader.module.css';
import { useUserData } from '../store/main';

interface LoaderProps {
    progress: number;
}

const quotes = {
    en: [
        "Good things take time",
        "Small steps lead to great journeys",
        "Patience is a strength",
        "Stay with us, the adventure awaits",
        "Take a moment, the world can wait",
        "Your journey is about to begin",
    ],
    ru: [
        "Хорошие вещи требуют времени",
        "Маленькие шаги ведут к большим достижениям",
        "Терпение — это сила",
        "Оставайтесь с нами, приключение впереди",
        "Возьмите паузу, мир подождет",
        "Ваше путешествие вот-вот начнется",
    ]
};
const Loader: React.FC<LoaderProps> = ({ progress }) => {

    const userLang = useUserData(state => state.user.languageCode);
    const languageQuotes = quotes[userLang] || quotes.en;
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);


    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setCurrentQuoteIndex(prevIndex => (prevIndex + 1) % languageQuotes.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(quoteInterval);
    }, [languageQuotes.length]);

    return (
        <div className={s.progressbar}>
            <h2 style={{ fontFamily: 'Impact', textShadow: 'rgb(0, 0, 0) 1px 0px 10px' }}>YouHold Game</h2>
            {/* <h3 style={{ fontFamily: 'Impact' }}>Early Access</h3> */}

            <div className={s.loader}>
                <div className={`${s.inner} ${s.one}`}></div>
                <div className={`${s.inner} ${s.two}`}></div>
                <div className={`${s.inner} ${s.three}`}></div>
            </div>
            <div style={{ height: '5vh' }}>
                <i>{languageQuotes[currentQuoteIndex]}</i>
            </div>
            <div className={s.progress} style={{ width: `${progress}%` }} />
            <p style={{ fontWeight: 'bold', textShadow: 'rgb(0, 0, 0) 1px 0px 10px' }}>{/* {userLang === 'ru' ? 'Загрузка...' : 'Loading'}... */} {Math.round(progress)}%</p>
            {/* <i>{userLang === 'ru' ? 'Первая загрузка может идти дольше' : 'The first time load may be slow'}</i> */}
        </div>
    );
};

export default Loader;
