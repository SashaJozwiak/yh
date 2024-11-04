//import React from 'react'

import { generateCard } from '../../../exmpl/arenaObjects';
import { useArena } from '../../../state/mainArena'
import { usePlayCard } from '../../../state/playCard'
import { ArenaCard } from '../../../types/Arena';
import s from './winpopup.module.css'

export const LosePopUp = () => {

    const { setLose, losing, endBattle } = usePlayCard(state => state);
    const { setRow1, setRow2, setRow3, reset } = useArena(state => state);

    const loseClose = () => {
        reset(); //resetfloor

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
        endBattle();

    }

    return (
        <div className={s.container}>
            <div className={s.window}>
                <h2 style={{ padding: '1rem' }}>Loss</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {/* <div> <h2>100</h2> exp</div>
                    <div> <h2>{getCard ? 1 : 0}</h2> card</div> */}
                </div>
                <button
                    onClick={loseClose}
                    className={s.btnok}
                    style={{ height: '5vh', borderRadius: '1rem', margin: '1rem' }}
                ><h3>OK</h3></button>
            </div>
        </div>
    )
}
