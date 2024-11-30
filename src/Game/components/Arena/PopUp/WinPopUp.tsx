//import React from 'react'

import { useEffect, useState } from 'react'
import { useUserData } from '../../../../store/main';
import { useArena } from '../../../state/mainArena'
import { usePlayCard } from '../../../state/playCard'

import { generateCard } from '../../../exmpl/arenaObjects';

import { ArenaCard } from '../../../types/Arena';
import s from './winpopup.module.css'
//import { useDeck } from '../../../state/deck';

export const WinPopUp = () => {
    const [getCard, setGetCard] = useState(false)

    const userId = useUserData(state => state.user.internalId)

    const { setLose, /* losing, */ endBattle, selectSkill } = usePlayCard(state => state);
    const { setRow1, setRow2, setRow3, reset, saveGame } = useArena(state => state);

    const closeWin = usePlayCard(state => state.closeWin)
    const floor = useArena(state => state.floor)

    const addExp = usePlayCard(state => state.addExp)
    const addForSave = usePlayCard(state => state.addForSave)

    //const randomCards = useDeck(state => state.randomCards)
    //const cardsForSave = useDeck(state => state.randomCards)
    //const addRandomCards = useDeck(state => state.addRandomCards)

    const goNextFloor = usePlayCard(state => state.goNextFloor)

    const enemyType = usePlayCard(state => state.battleState.enemy.type);
    const enemyCard = usePlayCard(state => state.battleState.enemy);
    const nextHouse = usePlayCard(state => state.nextHouse)

    const [btnBlock, setBtnBlock] = useState(true);

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

        const cardChance = (card: ArenaCard) => {
            const chance = ((floor + card.multiplier) / 10) + (card.id / 100);
            return chance < 0 ? 0 : chance;
        }

        const chance = enemyType === 'boss' ? 100 / 1000 : cardChance(enemyCard) / 100;/* floor / 1000 */
        const isCard = Math.random() < chance + 0.02;
        console.log('nm: ', chance, isCard);
        console.log('isCard: ', chance + 0.02, Math.random(), isCard);
        if (isCard) {
            setGetCard(() => true);
            addForSave(2004)
        } else {
            setGetCard(() => false);
        }
        addExp(100);
        //const newRC = randomCards + cardsForSave;
        //addRandomCards(newRC);
        //addRCinDeck
        if (enemyType === 'boss' && floor >= 99) {
            //nextHouse(); отсюда
            reset(); //resetfloor 0
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

            nextHouse(); //сюда
            saveGame(userId);
            //setBtnOn(true);
        } else {
            goNextFloor(true);
        }


        setBtnBlock(false);
        //save()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={s.container}>
            <div className={s.window}>
                <h2 style={{ padding: '1rem' }}>Win</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div> <h2>100</h2> exp</div>
                    {getCard && <div> <h2>{getCard ? 1 : 0}</h2> card</div>}
                </div>
                <button
                    onClick={handleClose}
                    disabled={btnBlock}
                    className={s.btnok}
                    style={{ height: '5vh', borderRadius: '1rem', margin: '1rem', opacity: btnBlock ? '0.5' : '1' }}
                ><h3>GET</h3></button>
            </div>
        </div>
    )
}
