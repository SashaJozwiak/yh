import { useEffect } from 'react';

import { Header } from './components/Header/Header'
import { Arena } from './components/Arena/Arena';
import { PlayerArea } from './components/PlayerArea/PlayerArea';
import { Deck } from './components/Deck/Deck';

import { useGameNav } from './state/gameNav';

import s from './game.module.css'
import { WinPopUp } from './components/Arena/PopUp/WinPopUp';
import { usePlayCard } from './state/playCard';
import { CollectUp } from './components/PlayerArea/PopUP/CollectUp';
import { LosePopUp } from './components/Arena/PopUp/LosePopUp';
import { Shop } from './components/Shop/Shop';
import { Map } from './components/Map/Map';

export const Game: React.FC = () => {
    const nav = useGameNav(state => state.page);
    const { winUp, collectUp, lose } = usePlayCard(state => state);

    useEffect(() => {
        console.log('main game render')
    }, [])

    return (
        <div className={s.gamewrapper}>
            {lose && <LosePopUp />}
            {winUp && <WinPopUp />}
            {collectUp && <CollectUp />}
            {nav === 'deck' && <Deck />}
            {nav === 'shop' && <Shop />}
            {nav === 'map' && <Map />}
            <Header />
            <Arena />
            <PlayerArea />
        </div>
    )
}
