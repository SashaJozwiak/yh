//import { useEffect, useState } from 'react';
import { swichLang } from '../../lang/lang.js';
import { useUserData } from '../../store/main';

import s from './stages.module.css'

export const Stages = () => {
    //const [showButton, setShowButton] = useState(false);

    /* const handleScrollUp = () => {
        const scrollElement = document.querySelector('.scrollable');
        if (scrollElement) {
            scrollElement.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollElement = document.querySelector('.scrollable');
            if (scrollElement) {
                setShowButton(scrollElement.scrollTop > 20); // Показывать кнопку, если прокрутили на 100px вниз
            }
        };

        const scrollElement = document.querySelector('.scrollable');
        if (scrollElement) {
            scrollElement.addEventListener('scrollable', handleScroll);
            return () => scrollElement.removeEventListener('scrollable', handleScroll);
        }🟡
    }, []); */

    const userLang = useUserData(state => state.user.languageCode)

    return (
        <div className={`${s.list} scrollable`}>
            <h2 style={{ /* paddingTop: '0.6rem' *//* , marginTop: '0.6rem' */ }}>{swichLang(userLang, 'off_chain')}</h2>
            <ul className={s.stagelist}>
                <li className={s.listelement}>🟢 {swichLang(userLang, 'beta_launch')} </li>
                <li className={`${s.listelement} ${s.ok}`}>🟢 {swichLang(userLang, 'launch_app')}</li>
                <li className={s.listelement}>🟡 {swichLang(userLang, 'launch_game')}</li>
                <li className={s.listelement}>⚪ {swichLang(userLang, 'marketing')}</li>
                <li className={s.listelement}>⚪ {swichLang(userLang, 'presa')}</li>
                <li className={s.listelement}>⚪ {swichLang(userLang, 'airdrop')}</li>
            </ul >
            <h2>{swichLang(userLang, 'on_chain')}</h2>
            <ul className={s.stagelist}>
                <li className={s.listelementonchain}>{swichLang(userLang, 'after')}</li>
            </ul>
            {/* {showButton && <div
                onClick={handleScrollUp}
                className={s.goTop}
            >↑</div>} */}
        </div>
    )
}
