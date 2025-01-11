import { useEffect, useState } from 'react';

import { Header } from './components/Header/Header'
import { Arena } from './components/Arena/Arena';
import { PlayerArea } from './components/PlayerArea/PlayerArea';
import { Deck } from './components/Deck/Deck';

import { useGameNav } from './state/gameNav';
//import { useUserData } from '../store/main';
import { useArena } from './state/mainArena';

import s from './game.module.css'

import { WinPopUp } from './components/Arena/PopUp/WinPopUp';
import { usePlayCard } from './state/playCard';
import { CollectUp } from './components/PlayerArea/PopUP/CollectUp';
import { EAReward } from './components/PlayerArea/PopUP/EAReward';
import { LosePopUp } from './components/Arena/PopUp/LosePopUp';
import { Shop } from './components/Shop/Shop';
import { Map } from './components/Map/Map';
import Loader from './Loader';

import charImages from './components/Deck/charimg';
import enimies from './assets/Game/icons/enemies_36.png'
import skills from './assets/Game/icons/skills_25.webp'
import { Top } from './components/Top/Top';
//import { useDeck } from './state/deck';
//import { NYFrewards } from './components/Arena/PopUp/NYFrewards';

//import { useUserRewardStore } from './state/nyf_rewards';
import { useMap } from './state/map';

const icons = [
    enimies,
    skills
];

export const Game: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    //const user_id = useUserData(state => state.user.internalId);
    //const fetchUserReward = useUserRewardStore(state => state.fetchUserReward);
    //const hasClaimed = useUserRewardStore(state => state.hasClaimed);

    //const userId = useUserData(state => state.user.internalId);
    //const isNeedInit = useArena(state => state.isNeedInit);
    const changeNeedInit = useArena(state => state.changeNeedInit);
    const resetForSave = usePlayCard(state => state.resetForSave);


    const nav = useGameNav(state => state.page);
    const { winUp, collectUp, rewardUp, lose } = usePlayCard(state => state);
    //const deck = useDeck(state => state.cards)

    const city = useMap(state => state.city);
    //const gameInit = useArena(state => state.gameInit);

    useEffect(() => {
        console.log('main game render')
        resetForSave();
        changeNeedInit(true)
    }, [changeNeedInit, resetForSave])


    useEffect(() => {
        const allResources = [...Object.values(charImages), ...icons];
        let loadedCount = 0;

        const loadResources = async () => {
            for (const src of allResources) {
                await new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => {
                        loadedCount += 1;
                        setProgress((loadedCount / allResources.length) * 100);
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Ошибка загрузки изображения: ${src}`);
                        loadedCount += 1; 
                        setProgress((loadedCount / allResources.length) * 100);
                        resolve(); 
                    };
                });
            }
            setTimeout(() => { setIsLoading(false) }, 500)
        };

        loadResources();
    }, []);

    /* useEffect(() => {
        fetchUserReward(user_id);
    }, [fetchUserReward, user_id]) */


    if (isLoading) {
        return <Loader progress={progress} />;
    }

    return (
        <div style={{ margin: city ? '0 0' : '0 auto' }} className={s.gamewrapper}>
            {/* {!hasClaimed && <NYFrewards />} */}
            {lose && <LosePopUp />}
            {winUp && <WinPopUp />}
            {rewardUp && <EAReward />}
            {collectUp && <CollectUp />}
            {nav === 'deck' && <Deck />}
            {nav === 'shop' && <Shop />}
            {nav === 'map' && <Map />}
            {nav === 'top' && <Top />}

            {!city && <Header />}
            {!city && <Arena />}
            {!city && <PlayerArea />}

        </div>
    )
}
