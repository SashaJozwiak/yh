import React, { useEffect, useState } from 'react';
import { useArena } from '../../state/mainArena';
import { usePlayCard } from '../../state/playCard';
import { useUserData } from '../../../store/main';

import { ArenaCard } from '../../types/Arena';
import { useCardRowAnimation } from '../../utils/forArena/NewRow';
import { generateCard } from '../../exmpl/arenaObjects';

import enemies from '../../assets/Game/icons/enemies_36.png'
import { Potion } from '../Some/PotionSvg';
import { Rewards } from '../Some/Rewards';

import imgs from './../Deck/charimg'
import s from './arena.module.css';

export const Arena: React.FC = () => {
    const userId = useUserData(state => state.user.internalId);
    //const gameInit = useArena(state => state.gameInit);

    const { house, floor, row1, row2, row3, isNeedInit, setRow1, setRow2, setRow3, /* changeNeedInit, */ gameInit, addFloor, saveGame } = useArena(state => state);
    const { battleState, inBattle, selectedSkill, playCard, nextFloor, selectSkill, addItem, startBattle, goNextFloor, endBattle, addForSave } = usePlayCard();
    const { animateRows, removingBottom, slidingDown, newRowVisible } = useCardRowAnimation({
        row1,
        row2,
        floor,
        setRow1,
        setRow2,
        setRow3,
    });
    const [blockClick, setBlockClick] = useState(false);
    const [battleIndex, setBattleIndex] = useState<number | null>(null);
    //const [getDamageAnim, setGetDamageAnim] = useState<boolean>(false);
    //const [getDamage, setGetDamage] = useState<string>('');
    const { getDamage } = usePlayCard(state => state.battleState);

    const imageArray = Object.values(imgs);

    const [randomBoss, setRandomBoss] = useState(Math.floor(Math.random() * imageArray.length));

    const cardChance = (card: ArenaCard) => {
        //const sign = card.id > 15 ? -1 : 1;
        const chance = ((floor + card.multiplier) / 10) + (card.id / 100);
        return chance < 0 ? 0 : chance.toFixed(2);
    }

    const handleClick = (card: ArenaCard, indx: number) => {

        if (blockClick) return;
        if (inBattle && 'id' in battleState.enemy && card.id !== battleState.enemy.id) return;
        if (card.type === 'empty') return;

        setBlockClick(true);

        if (card.type === 'items') {
            addItem(card.id);
        }

        if (card.type === 'rewards') {
            addForSave(card.id);
        }

        if (card.type === 'enemies' || card.type === 'boss') {
            if (selectedSkill === null) {
                selectSkill(playCard.skills[0]);
            }
            console.log('need start battle: ', card)
            setBattleIndex(indx);
            startBattle(card);
            //setGetDamageAnim(true);
            //setTimeout(() => setGetDamageAnim(false), 2000);
            setTimeout(() => setBlockClick(false), 2000);
            return;
        }

        // генерация и вывод новых карт:

        if (!inBattle) {
            animateRows();
            addFloor();
            setTimeout(() => setBlockClick(false), 1000);
        }
    };
    //console.log('inBattle: ', battleState);

    useEffect(() => {
        console.log('render 1')
        if (nextFloor) {
            console.log('render 1 nextfloor: ', nextFloor)
            endBattle();
            animateRows();
            addFloor();
            setTimeout(() => setBlockClick(false), 1000);
            goNextFloor(false);
            if ((floor + 1) % 10 === 0) {
                console.log('this setTimeout save');
                setTimeout(() => saveGame(userId), 1200);
                setRandomBoss(Math.floor(Math.random() * imageArray.length))

            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addFloor, animateRows, endBattle, floor, goNextFloor, nextFloor])

    useEffect(() => {
        console.log('render 1')
        //if (!isNeedInit) {
        const newRow1: ArenaCard[] = [
            { ...generateCard(floor), multiplier: 3 } as ArenaCard,
            { ...generateCard(floor), multiplier: 3 } as ArenaCard,
            { ...generateCard(floor), multiplier: 3 } as ArenaCard,
        ];
        const newRow2: ArenaCard[] = [
            { ...generateCard(floor), multiplier: 2 } as ArenaCard,
            { ...generateCard(floor), multiplier: 2 } as ArenaCard,
            { ...generateCard(floor), multiplier: 2 } as ArenaCard,
        ];
        const newRow3: ArenaCard[] = [
            { ...generateCard(floor), multiplier: 1 } as ArenaCard,
            { ...generateCard(floor), multiplier: 1 } as ArenaCard,
            { ...generateCard(floor), multiplier: 1 } as ArenaCard,
        ];
        setRow1(newRow1);
        setRow2(newRow2);
        setRow3(newRow3);
        //}

        console.log('isNeedInit: ', isNeedInit)
        if (isNeedInit) {
            gameInit(userId);
            //changeNeedInit(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={s.arena}>
            {isNeedInit && <div style={{ margin: '0 auto' }} className={s.loader}></div>}

            {!isNeedInit && [...row1, ...row2, ...row3].map((card, index) => (
                <div onClick={index > 5 && !blockClick ? () => handleClick(card, index) : () => { console.log('no click') }}
                    key={index}
                    className={`${s.pixel} ${!(card.name) ? s.hidden : ''}
                        ${removingBottom && index >= 6 ? s.fadeout : ''}
                        ${slidingDown && index < 6 ? s.slidedown : s.slideback}
                        ${newRowVisible && index < 3 ? s.newcard : ''}
                        ${newRowVisible && index < 3 ? s.newcardvisible : ''}
                        ${inBattle && 'id' in battleState.enemy && card.id === battleState.enemy.id && battleIndex === index && getDamage === 'enemy' ? s.shaking : ''}
                        `}
                    style={{ opacity: inBattle && 'id' in battleState.enemy && card.id !== battleState.enemy.id && index !== battleIndex ? '0.6' : inBattle ? '1' : index <= 5 ? '0.6' : removingBottom ? '0' : '1' }}
                >
                    {/* {card.name} */}
                    <div className={s.wfaup}
                    /* style={{ borderRadius: '5%', width: '-webkit-fill-available' }} */>

                        <div
                            className={s.wfa}
                            style={{
                            height: '9.5vh',
                            backgroundPosition: `${card.bp[0]}% ${card.bp[1]}%`,
                                backgroundSize: card.type === 'boss' ? 'cover' : '71vh auto',
                                backgroundImage: `url(${card.type === 'enemies' ? enemies : card.type === 'boss' ? imageArray[randomBoss] : ''})`,
                                aspectRatio: '1/1',
                                backgroundRepeat: 'no-repeat',
                            borderRadius: '5%',
                            borderBottomLeftRadius: '0%',
                            borderBottomRightRadius: '0%',
                            color: 'white',
                            fontSize: '1.5vh',
                            fontWeight: 'bold',
                            textShadow: 'rgb(0, 0, 0) 1px 0px 10px',
                        }}> <p style={{ marginBottom: '1vh' }}>{card.name}</p>


                            <h2 style={{ zIndex: '500' }} className={inBattle && 'id' in battleState.enemy && card.id === battleState.enemy.id && battleIndex === index && (getDamage === 'enemy' || getDamage === 'boss') ? s.damage : s.hide}>
                                -{Number(playCard.stats[playCard.key_power] * (selectedSkill?.multiplier || 1)).toFixed()}
                            </h2>

                            {card.type === 'items' ? <Potion color={card.name === 'Balance' ? 'rgb(204, 153, 0)' : card.name === 'Energy' ? 'rgb(22 163 74)' : card.name === 'Experience' ? 'silver' : 'gray'} /> : card.type === 'rewards' ? <Rewards id={card.id} /> /* : card.type === 'boss' ?

                                <img src={imageArray[randomBoss]} alt="boss pic" className={s.boss}  /> */

                                : null}
                        </div>

                        <div style={{ /* border: '1px solid gray' */ }}>
                            {card.type === 'enemies' &&
                                <>
                                    <p style={{ color: 'rgb(204, 153, 0)', fontWeight: 'bold', fontSize: '1.8vh' }}>
                                        {inBattle && 'id' in battleState.enemy && card.id === battleState.enemy.id && battleIndex === index ?
                                            battleState.enemy.balance.toFixed()
                                            : card.multiplier === 1 ? ((card.balance * (floor / 100 + 1)) * (house / 100 + 1)).toFixed() : '***'
                                        }

                                        {/* {card.multiplier === 1 ? (card.balance * ((floor / 100 + 1))).toFixed() : '***'} */}
                                    </p>
                                    <p style={{ color: 'rgb(154 52 18)', fontWeight: 'bold', fontSize: '1.8vh' }}>
                                        {inBattle && 'id' in battleState.enemy && card.id === battleState.enemy.id ?
                                            battleState.enemy.attack.toFixed()
                                            : card.multiplier === 1 ? ((card.attack * (floor / 100 + 1)) * (house / 100 + 1)).toFixed() : '***'
                                        }
                                        {/* {card.multiplier === 1 ? (card.attack * (floor / 100 + 1)).toFixed() : '***'} */}
                                    </p>
                                <p style={{ marginTop: '0.5vh', fontSize: '1.2vh', color: 'gray' }}>Card Drop:{/* {((floor + card.multiplier) / 10).toFixed()} */} {cardChance(card)}%</p>
                                </>
                            }
                            {card.type === 'items' &&
                                <>
                                    <p style={{ color: 'rgb(204, 153, 0)', fontWeight: 'bold', fontSize: '1.8vh' }}>{card.balance || null}</p>
                                    <p style={{ color: card.id === 36 ? 'gray' : 'rgb(22, 163, 74)', fontWeight: 'bold', fontSize: '1.8vh' }}>{card.attack || null}</p>
                                </>}

                            {card.type === 'boss' &&
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '0.4rem' }}>

                                    <p style={{ color: 'rgb(204, 153, 0)', fontWeight: 'bold', fontSize: '1.8vh' }}>
                                        {inBattle && 'id' in battleState.enemy && card.id === battleState.enemy.id && battleIndex === index ?
                                            battleState.enemy.balance.toFixed()
                                            : card.multiplier === 1 ? ((card.balance * (floor / 18 + 1)) * (house / 100 + 1)).toFixed() : '***'
                                        }

                                        {/* {card.multiplier === 1 ? (card.balance * ((floor / 100 + 1))).toFixed() : '***'} */}
                                    </p>
                                    <p style={{ color: 'rgb(154 52 18)', fontWeight: 'bold', fontSize: '1.8vh' }}>
                                        {inBattle && 'id' in battleState.enemy && card.id === battleState.enemy.id ?
                                            battleState.enemy.attack.toFixed()
                                            : card.multiplier === 1 ? ((card.attack * (floor / 18 + 1)) * (house / 100 + 1)).toFixed() : '***'
                                        }
                                        {/* {card.multiplier === 1 ? (card.attack * (floor / 100 + 1)).toFixed() : '***'} */}
                                    </p>

                                    <p style={{ /* position: 'absolute', bottom: '0' ,*/ fontSize: '1vh', color: 'gray', textAlign: 'center' }}>Card drop: 10%</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    );
};
