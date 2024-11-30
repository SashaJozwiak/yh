import React, { useState } from 'react'
import { Skill, Item } from '../../../types/playCard';

import { usePlayCard } from '../../../state/playCard';
import { useArena } from '../../../state/mainArena';
import { useGameNav } from './../../../state/gameNav';

//import { useUserData } from '../../../../store/main';

import imgs from '../../Deck/charimg'
import skillsImgs from '../../../assets/Game/icons/skills_25.webp'

import ny from '../../../assets/Game/ny/ny_smallsize.png'

import { Potion } from '../../Some/PotionSvg';

import useSound from 'use-sound';
import ny_sound from '../../../assets/Game/ny/ny_sound_3s.mp3'
import s from './card.module.css'


export const Card: React.FC = () => {
    const [stat, setStat] = useState(false);
    const [play] = useSound(ny_sound);
    const [isPlay, setIsPlay] = useState(false);

    //const userId = useUserData(state => state.user.id)

    const setNavDeck = useGameNav(state => state.setPageNav)

    const navTabs = usePlayCard(state => state.tabNav)
    const setTabNav = usePlayCard(state => state.setTabNav)

    const floor = useArena(state => state.floor)

    const playCard = usePlayCard(state => state.playCard)
    const enemyAttack = usePlayCard(state => state.battleState.enemy.attack)
    const addStat = usePlayCard(state => state.addStat)
    //const addExp = usePlayCard(state => state.addExp)

    const selectedSkill = usePlayCard(state => state.selectedSkill)
    const selectSkill = usePlayCard(state => state.selectSkill)

    const goUseItem = usePlayCard(state => state.useItem)
    const addExpAnim = usePlayCard(state => state.addExpAnim);

    console.log('stat: ', stat)

    const getDamage = usePlayCard(state => state.battleState.getDamage)
    console.log('shaking: ', getDamage)

    const chooseSkill = (skill: Skill | Item) => {
        if (selectedSkill?.id === skill.id) {
            selectSkill(null)
            return
        }
        selectSkill(skill);
    }

    const handleUseItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (selectedSkill?.id) {
            goUseItem(selectedSkill.id);
        }
    }

    //console.log('selectedSkill: ', selectedSkill.amount)
    const playNy = () => {
        if (!isPlay) {
            setIsPlay(true)
            play()
            setTimeout(() => {
                setIsPlay(false)
            }, 3000)
        }
    }

    return (
        <div className={`${s.playercard} ${getDamage === 'hero' && s.shaking}`}>
            <div className={s.pcimg}>
                <div
                    className={s.lvl}>{playCard.lvl}
                </div>

                {floor === 0 &&
                    <button
                        className={s.change}
                        style={{ zIndex: stat ? '300' : '400' }}
                        onClick={() => setNavDeck('deck')} >
                        Change Hero
                    </button>}

                {/* <h2 className={`${getDamage === 'hero' ? s.damage : s.hide}`}>
                    -{Number((enemyAttack - playCard.stats.mind).toFixed()) > 0 ? Number((enemyAttack - playCard.stats.mind).toFixed()) : 0}
                </h2> */}


                <h2 className={`${getDamage === 'hero' ? s.damage : s.hide}`}
                    style={{ position: 'absolute' }}
                >
                    <p>-{Number((enemyAttack - playCard.stats.mind).toFixed()) > 0 ? Number((enemyAttack - playCard.stats.mind).toFixed()) : 0}</p>

                    <p style={{ display: 'inline-block', whiteSpace: 'nowrap', color: 'lightgray', margin: '0 auto' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -2 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={18} height={18} style={{ alignItems: 'end' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        </svg>
                        <span>{Number((enemyAttack - playCard.stats.mind).toFixed()) > 0 ? Number((playCard.stats.mind).toFixed()) : enemyAttack}</span>
                    </p>
                </h2 >

                <h2 className={`${addExpAnim ? s.expanim : s.hide}`}
                    style={{ position: 'absolute' }}
                >
                    +100 Exp
                </h2>

                <img
                    onClick={() => playNy()}
                    className={isPlay ? s.shakingx : ''}
                    style={{ position: 'absolute', zIndex: '900', top: '-1.6vh', left: '-4vw' }}
                    src={ny} alt="new year pic" width={'50vw'} height={'30vh'} />
                <img
                    style={{ filter: `grayscale(${1 - (playCard.balance_hp / (playCard.stats.balance * 10))})` }}
                    className={s.cardimg} src={imgs[playCard.image]} alt="character pic" />

                <button
                    onClick={() => setStat((prev) => !prev)}
                    className={`${s.stat} ${playCard.exp_points > 0 && !stat ? s.blur : null} `}>
                    {!stat ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1rem'} strokeWidth={1.5} stroke="currentColor" /* className="svgstat" */ style={{ filter: 'drop-shadow(1px 2px rgba(0 0 0))' }} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1rem'} strokeWidth={2.5} stroke="currentColor" style={{ filter: 'drop-shadow(1px 2px rgb(0 0 0))' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    }
                </button>

                {selectedSkill !== null &&
                    <div
                        onClick={() => selectSkill(null)}
                        className={s.aboutskill} style={{ position: 'absolute', bottom: '0', zIndex: stat ? '300' : '400', opacity: '0.8', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* <p style={{ textAlign: 'left' }}>{selectedSkill.description}</p> */}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p style={{ textAlign: 'left', fontStyle: 'italic' }}>{selectedSkill.description}</p>

                            {/* <button style={{ backgroundColor: 'green' }}>USE</button> */}
                            {selectedSkill.id > 1000 &&
                                <button
                                    onClick={handleUseItem}
                                    style={{ backgroundColor: 'black', padding: '0.3rem', border: '1px solid gray', borderRadius: '0.3rem', zIndex: '500' }}>USE
                                </button>}
                        </div>


                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                            <p style={{ textWrap: 'nowrap', color: 'silver' }}>
                                {selectedSkill.id > 1000 ? 'Total' : 'Enrg'}:&nbsp;
                                {selectedSkill.id > 1000 ?
                                    <span style={{ color: 'white' }}>
                                        {playCard.items.find((item) => item.id === selectedSkill.id)?.amount || 0 /* selectedSkill.amount */} 
                                    </span> :
                                    <span style={{ color: (selectedSkill.cost * selectedSkill.multiplier) > playCard.energy_mp ? 'rgb(235 94 48)' : 'white' }}>
                                        {(selectedSkill.cost * selectedSkill.multiplier).toFixed(0)}
                                    </span>}
                            </p>

                            <p style={{ textWrap: 'nowrap', color: 'silver' }}>
                                {selectedSkill.id > 1000 ?
                                    <>
                                        Point: <span style={{ color: 'white' }}>{selectedSkill.id > 1003 ? '1' : '100'}</span>
                                    </>
                                    :
                                    <>
                                        Dmg: <span style={{ color: 'white' }}>{(playCard.stats[playCard.key_power] * selectedSkill.multiplier).toFixed(0)}</span>
                                    </>}
                            </p>

                            {/* <p style={{ textWrap: 'nowrap' }}>Trg: Enemy</p> */}
                        </div>
                    </div>
                }

                <div
                    //onClick={() => addExp(100)} 
                    className={`${s.statblock} ${!stat ? s.hiddenstat : null}`}>
                    <h4 className={s.name}>{playCard.profession} {playCard.name}</h4>
                    <div className={s.stats}>

                        <div style={{ color: 'silver', marginTop: '0.5vh' }}> <b>Lvl: {playCard.lvl}</b>  | {playCard.exp}/{(100 + (playCard.lvl * 10))} exp</div>

                        <div className={s.progressbar} style={{ border: 'none', height: '0.5vh', margin: '0.5vh 0 2vh 0' }}>
                            <div className={s.progress} style={{ width: `${(playCard.exp / (100 + (playCard.lvl * 10))) * 100}%`, backgroundColor: 'silver', height: '0.5vh', }}></div>
                        </div>

                        <div style={{ color: 'rgb(204, 153, 0)', fontWeight: 'bold', textShadow: '#000000 1px 0 10px' }}>Balance: {playCard.balance_hp}/{playCard.stats.balance * 10}</div>
                        <div style={{ color: 'rgb(22 163 74)', fontWeight: 'bold', textShadow: '#000000 1px 0 10px' }}>Energy: {playCard.energy_mp}/{playCard.stats.energy * 10}</div>

                        <div style={{ fontWeight: 'bold', color: 'silver' }}>Attack: {playCard.stats[playCard.key_power]}</div>
                        <div style={{ fontWeight: 'bold', marginBottom: '2vh', color: 'silver' }}>Defense: {playCard.stats.mind}</div>


                        <div className={s.statline} style={{ fontWeight: playCard.key_power === 'balance' ? 'bold' : 'normal', marginBottom: '0.8vh' }}>
                            Balance: {playCard.stats.balance}
                            <div>
                                <span style={{ textDecoration: 'underline' }}/* className={`${playCard.exp_points > 0 ? s.blur : null}`} */>{playCard.exp_points}</span>

                                <button
                                    onClick={() => addStat('balance')}
                                    disabled={playCard.exp_points < 1}
                                    style={{ opacity: playCard.exp_points < 1 ? '0.5' : '1' }}
                                    className={`${s.plus} ${playCard.exp_points > 0 ? s.blur : null}`}>+</button>
                            </div>
                        </div>

                        <div className={s.statline} style={{ fontWeight: playCard.key_power === 'mind' ? 'bold' : 'normal', marginBottom: '0.8vh' }}>
                            Mind: {playCard.stats.mind}
                            <div>
                                <span style={{ textDecoration: 'underline' }} /* className={`${playCard.exp_points > 0 ? s.blur : null}`} */>{playCard.exp_points}</span>

                                <button
                                    onClick={() => addStat('mind')}
                                    disabled={playCard.exp_points < 1}
                                    style={{ opacity: playCard.exp_points < 1 ? '0.5' : '1' }}
                                    className={`${s.plus} ${playCard.exp_points > 0 ? s.blur : null}`}> +</button>
                            </div>
                        </div>

                        <div className={s.statline} style={{ fontWeight: playCard.key_power === 'energy' ? 'bold' : 'normal', marginBottom: '1vh' }}>
                            Energy: {playCard.stats.energy}

                            <div>
                                <span style={{ textDecoration: 'underline' }} /* className={`${playCard.exp_points > 0 ? s.blur : null}`} */>{playCard.exp_points}</span>

                                <button
                                    onClick={() => addStat('energy')}
                                    disabled={playCard.exp_points < 1}
                                    style={{ opacity: playCard.exp_points < 1 ? '0.5' : '1' }}
                                    className={`${s.plus} ${playCard.exp_points > 0 ? s.blur : null}`}>+</button>
                            </div>

                        </div>
                        {/* {userId === 0 &&
                        <button
                                onClick={() => addExp(150)}
                            >add exp</button>
                        } */}

                    </div>
                </div>

            </div>



            <div className={s.bars} /* style={{ opacity: stat ? '0' : '1' }} */>
                <div className={s.progressbar}>
                    <div className={s.progress} style={{ width: `${(playCard.balance_hp / (playCard.stats.balance * 10)) * 100}%`, backgroundColor: 'rgb(204, 153, 0)' }}></div>
                </div>
                <div className={s.progressbar}>
                    <div className={s.progress} style={{ width: `${(playCard.energy_mp / (playCard.stats.energy * 10)) * 100}%` }}></div>
                </div>
            </div>

            <div className={s.pcui} style={{ zIndex: stat ? 300 : 400 }}>
                <div className={s.pcuitabs} >
                    <button
                        onClick={() => setTabNav('skills')}
                        style={{ backgroundColor: navTabs === 'skills' ? 'transparent' : 'rgb(75, 94, 121)' }} className={s.pcuitab}>skills
                    </button>

                    <button
                        onClick={() => setTabNav('items')}
                        style={{ backgroundColor: navTabs === 'items' ? 'transparent' : 'rgb(75, 94, 121)' }} className={s.pcuitab}>items
                    </button>

                </div>
                {navTabs === 'skills' && <div className={s.usearea}>
                    {playCard.skills.map((skill, index) => (
                        <button
                            key={skill.id}
                            disabled={index * 2 > playCard.lvl /* || (skill.cost * skill.multiplier) > playCard.energy_mp */}
                            onClick={() => chooseSkill(skill)}
                            style={{ boxShadow: selectedSkill !== null && selectedSkill.id === skill.id ? 'inset 0px 1px 10px rgba(0, 0, 0, 0.9)' : '0px 1px 5px rgba(0, 0, 0, 0.9)', opacity: index * 2 > playCard.lvl ? 0.5 : 1, scale: selectedSkill !== null && selectedSkill.id === skill.id ? '0.95' : '0.98', backgroundColor: selectedSkill !== null && selectedSkill.id === skill.id ? 'rgb(75, 94, 121)' : 'transparent', borderRadius: selectedSkill !== null && selectedSkill.id === skill.id ? '2vh' : '2vh' }}
                            className={s.playeritem}>
                            {/* {skill.name} */}
                            <div style={{
                                width: '6.8vh',
                                height: '6vh',
                                backgroundPosition: `${skill.bp[0]}% ${skill.bp[1]}%`,
                                backgroundSize: '35vh auto',
                                backgroundImage: `url(${skillsImgs})`,
                                aspectRatio: '1/1',
                                color: 'white',
                                fontSize: '1.5vh',
                            }}> <span style={{ position: 'absolute', left: '0.3rem', color: 'lightgray' }}> {index * 2 > playCard.lvl && `${index * 2} lvl`} </span>
                            </div>

                        </button>
                    ))}
                </div>}

                {navTabs === 'items' && <div className={s.usearea}>
                    {playCard.items.map((item, index) => (
                        /* item.amount > 0 ? */
                            <button
                                key={index}
                                disabled={item.amount < 1}
                                onClick={() => chooseSkill(item)}
                                style={{ opacity: item.amount < 1 ? '0.5' : '1', boxShadow: selectedSkill !== null && selectedSkill.id === item.id ? 'inset 0px 1px 10px rgba(0, 0, 0, 0.9)' : '0px 1px 5px rgba(0, 0, 0, 0.9)', scale: selectedSkill !== null && selectedSkill.id === item.id ? '0.95' : '0.98', backgroundColor: selectedSkill !== null && selectedSkill.id === item.id ? 'rgb(75, 94, 121)' : 'transparent', borderRadius: selectedSkill !== null && selectedSkill.id === item.id ? '2vh' : '2vh' }}
                                className={s.playeritem}>
                                {/* {items?.name} */}
                                <Potion color={item.color} />
                                <span style={{ fontWeight: 'bold' }}>{item.amount} </span>
                        </button> /* : null */
                    ))}
                </div>}
            </div>
        </div >
    )
}
