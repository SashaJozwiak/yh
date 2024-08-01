//import { useEffect, useState } from 'react';

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
        }
    }, []); */

    return (
        <div className={`${s.list} scrollable`}>
            <h2 style={{ /* paddingTop: '0.6rem' *//* , marginTop: '0.6rem' */ }}>Off-Chain</h2>
            <ul className={s.stagelist}>
                <li className={`${s.listelement} ${s.ok}`}>🟢 Beta launch </li>
                <li className={s.listelement}>🟡 Launch app</li>
                <li className={s.listelement}>⚪ Marketing and partnership</li>
                <li className={s.listelement}>⚪ Collecting liquidity</li>
                <li className={s.listelement}>⚪ Product presentation</li>
                <li className={s.listelement}>⚪ Airdrop</li>
            </ul >
            <h2>On-Chain</h2>
            <ul className={s.stagelist}>
                <li className={s.listelementonchain}>After product presentation...</li>
            </ul>
            {/* {showButton && <div
                onClick={handleScrollUp}
                className={s.goTop}
            >↑</div>} */}
        </div>
    )
}
