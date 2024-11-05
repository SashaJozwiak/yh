//import React from 'react'

import { useEffect, useState } from 'react'
import { useArena } from '../../../state/mainArena'
import { usePlayCard } from '../../../state/playCard'

import { generateCard } from '../../../exmpl/arenaObjects';

import { ArenaCard } from '../../../types/Arena';
import s from './winpopup.module.css'

export const WinPopUp = () => {
    const [getCard, setGetCard] = useState(false)

    const { setLose, /* losing, */ endBattle, selectSkill } = usePlayCard(state => state);
    const { setRow1, setRow2, setRow3, reset } = useArena(state => state);

    const closeWin = usePlayCard(state => state.closeWin)
    const floor = useArena(state => state.floor)

    const addExp = usePlayCard(state => state.addExp)
    const addForSave = usePlayCard(state => state.addForSave)
    const goNextFloor = usePlayCard(state => state.goNextFloor)

    const enemyType = usePlayCard(state => state.battleState.enemy.type);
    const nextHouse = usePlayCard(state => state.nextHouse)

    const handleClose = () => {
        //получить или не получить карту
        //получить exp
        /* if (getCard) {
            addForSave(2004)
        } */
        //console.log(getCard)
        //addExp(100);
        //setGetCard(false)
        //goNextFloor(true)
        closeWin(); //закрыть окно
    }

    useEffect(() => {
        console.log(floor)
        const chance = 100 / 1000;
        const isCard = Math.random() < chance;
        console.log('isCard: ', chance, Math.random(), isCard);
        if (isCard) {
            setGetCard(() => true);
            addForSave(2004)
        } else {
            setGetCard(() => false);
        }
        addExp(100);
        if (enemyType === 'boss' && floor === 99) {
            nextHouse();

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
            //losing();
            selectSkill(null);
            setLose(false);
            endBattle();
        } else {
            goNextFloor(true);
        }


        //save()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={s.container}>
            <div className={s.window}>
                <h2 style={{ padding: '1rem' }}>Reward</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div> <h2>100</h2> exp</div>
                    <div> <h2>{getCard ? 1 : 0}</h2> card</div>
                </div>
                <button
                    onClick={handleClose}
                    className={s.btnok}
                    style={{ height: '5vh', borderRadius: '1rem', margin: '1rem' }}
                ><h3>GET</h3></button>
            </div>
        </div>
    )
}
