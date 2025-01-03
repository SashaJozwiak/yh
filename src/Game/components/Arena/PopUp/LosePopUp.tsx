//import React from 'react'

import { useUserData } from '../../../../store/main';
//import { generateCard } from '../../../exmpl/arenaObjects';
import { useArena } from '../../../state/mainArena'
import { usePlayCard } from '../../../state/playCard'


//import { ArenaCard } from '../../../types/Arena';
import imgs from '../../Deck/charimg'
import s from './winpopup.module.css'

export const LosePopUp = () => {

    const userId = useUserData(state => state.user.internalId)
    //const userLang = useUserData(state => state.user.languageCode)

    const { playCard, setLose, losing, endBattle } = usePlayCard(state => state);
    const { /* setRow1, setRow2, setRow3, reset, */ gameInit } = useArena(state => state);

    const loseClose = () => {
        gameInit(userId);
        losing();
        setLose(false);
        endBattle();
       /*  reset(); //resetfloor

        const newRow1: ArenaCard[] = [
            { ...generateCard(0), multiplier: 3 } as ArenaCard,
            { ...generateCard(0), multiplier: 3 } as ArenaCard,
            { ...generateCard(0), multiplier: 3 } as ArenaCard,
        ];
        const newRow2: ArenaCard[] = [
            { ...generateCard(0), multiplier: 2 } as ArenaCard,
            { ...generateCard(0), multiplier: 2 } as ArenaCard,
            { ...generateCard(0), multiplier: 2 } as ArenaCard,
        ];
        const newRow3: ArenaCard[] = [
            { ...generateCard(0), multiplier: 1 } as ArenaCard,
            { ...generateCard(0), multiplier: 1 } as ArenaCard,
            { ...generateCard(0), multiplier: 1 } as ArenaCard,
        ];
        setRow1(newRow1);
        setRow2(newRow2);
        setRow3(newRow3);
        losing();
        setLose(false);
        endBattle(); */
    }

    return (
        <div className={s.container}>
            <div className={s.window}>
                <h2 style={{ padding: '1rem' }}>Defeat</h2>
                <img style={{ filter: 'grayscale(1)' }} className={s.cardimg} src={imgs[playCard.image]} alt="character pic" />
                <h3>Don't give up</h3>
                <button
                    onClick={loseClose}
                    className={s.btnok}
                    style={{ height: '5vh', borderRadius: '1rem', margin: '1rem' }}
                ><h3>OK</h3></button>
            </div>
        </div>
    )
}
