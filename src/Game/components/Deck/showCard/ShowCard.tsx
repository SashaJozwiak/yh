import React, { /* useEffect, */ useEffect, useState } from 'react'

import { useGameNav } from '../../../state/gameNav'
import { charDeck } from '../../../exmpl/charDeck_big';

//import langG from '../../../utils/'

import imgs from '../charimg'

import s from './showcard.module.css'
//import ss from '../../PlayerArea/Card/card.module.css'


import { swichLang } from '../../../utils/lang';
import { useUserData } from '../../../../store/main';
import { statGrades } from '../../../exmpl/statsGrades';
import { useDeck } from '../../../state/deck';

interface ShowCardProps {
    name: string;
}

/* const colors = {
    gray: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 'medium',
    },
    bronze: {
        color: 'rgb(205, 127, 50)',
        fontWeight: 'bold',
        fontSize: 'medium',
    },
    silver: {
        color: 'lightgray',
        fontWeight: 'bold',
        fontSize: 'medium',
    },
    gold: {
        color: 'rgb(204, 153, 0)',
        fontWeight: 'bold',
        fontSize: 'medium',
    },
} */

export const ShowCard: React.FC<ShowCardProps> = ({ name }) => {
    const [card] = useState(charDeck.find((c: ShowCardProps) => c.name === name));
    const [stat, setStat] = useState(false);
    const [grade, setGrade] = useState('gray')

    //const sl = switchLang()
    const userLang = useUserData(state => state.user.languageCode)
    console.log('card: ', card)

    const setShowCard = useGameNav(state => state.setShowCard);

    const gradeDetector = useDeck(state => state.gradeDetector);

    useEffect(() => {
        const newGrade = gradeDetector(name);
        console.log('new grade: ', newGrade)
        setGrade(newGrade)
    }, [gradeDetector, name])

    return (
        <div onClick={() => setShowCard()} className={s.container}>
            <div onClick={e => e.stopPropagation()}
                style={{ boxShadow: grade === 'bronze' ? '0px 0px 25px rgb(205 127 50 / 50%)' : grade === 'silver' ? '0px 0px 25px rgb(212 212 212 / 50%)' : grade === 'gold' ? '0px 0px 25px rgb(204 153 0 / 50%)' : '0px 0px 25px rgb(0 0 0 / 50%)' }}
                className={s.playercard}>
                <div /* className={ss.pcimg} */>
                    <h3 className={s.name}>{card?.profession} {name}</h3>

                    <img className={s.cardimg} src={imgs[card?.image || 'empty']} alt="character pic" />

                    <button
                        onClick={() => setStat((prev) => !prev)}
                        className={s.stat}>
                        {!stat ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1rem'} strokeWidth={1.5} stroke="currentColor" className="svgstat" style={{ filter: 'drop-shadow(1px 2px rgba(0 0 0))' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1rem'} strokeWidth={2.5} stroke="currentColor" style={{ filter: 'drop-shadow(1px 2px rgb(0 0 0))' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        }
                    </button>

                </div>

                <div className={`${s.statblock} ${!stat ? s.hiddenstat : null}`}>
                    <h2>Initial stats</h2>
                    <div className={s.stattable}>
                        <p style={{ fontWeight: 'bold' }}>{card?.profession} {name}</p>
                        <div style={{ color: 'silver', marginTop: '0.5vh' }}> <b>Lvl: 0</b>  | 0/100 exp</div>
                        <br />

                        <p style={{ color: 'lightgray' }}>Balance: <span style={{ opacity: grade !== 'gray' ? '0.5' : '1', color: 'rgb(154, 154, 154)', fontSize: grade === 'gray' ? 'larger' : 'small', fontWeight: grade === 'gray' ? 'bold' : 'normal', borderBottom: grade === 'gray' ? '1px solid gray' : 'none' }}>{statGrades[name]["gray"]["balance_hp"]}</span> <span style={{ opacity: grade !== 'bronze' ? '0.5' : '1', color: 'rgb(205, 127, 50)', fontSize: grade === 'bronze' ? 'larger' : 'small', fontWeight: grade === 'bronze' ? 'bold' : 'normal', borderBottom: grade === 'bronze' ? '1px solid rgb(205, 127, 50)' : 'none' }}>{statGrades[name]["bronze"]["balance_hp"]}</span> <span style={{ opacity: grade !== 'silver' ? '0.5' : '1', color: 'lightgray', fontSize: grade === 'silver' ? 'larger' : 'small', fontWeight: grade === 'silver' ? 'bold' : 'normal', borderBottom: grade === 'silver' ? '1px solid rgb(211, 211, 211)' : 'none' }}>{statGrades[name]["silver"]["balance_hp"]}</span> <span style={{ opacity: grade !== 'gold' ? '0.5' : '1', color: 'rgb(204, 153, 0)', fontSize: grade === 'gold' ? 'larger' : 'small', fontWeight: grade === 'gold' ? 'bold' : 'normal', borderBottom: grade === 'gold' ? '1px solid rgb(204, 153, 0)' : 'none' }}>{statGrades[name]["gold"]["balance_hp"]}</span></p>

                        <p style={{ color: 'lightgray' }}>Energy: <span style={{ opacity: grade !== 'gray' ? '0.5' : '1', color: 'rgb(154, 154, 154)', fontSize: grade === 'gray' ? 'larger' : 'small', fontWeight: grade === 'gray' ? 'bold' : 'normal', borderBottom: grade === 'gray' ? '1px solid gray' : 'none' }}>{statGrades[name]["gray"]["energy_mp"]}</span> <span style={{ opacity: grade !== 'bronze' ? '0.5' : '1', color: 'rgb(205, 127, 50)', fontSize: grade === 'bronze' ? 'larger' : 'small', fontWeight: grade === 'bronze' ? 'bold' : 'normal', borderBottom: grade === 'bronze' ? '1px solid rgb(205, 127, 50)' : 'none' }}>{statGrades[name]["bronze"]["energy_mp"]}</span> <span style={{ opacity: grade !== 'silver' ? '0.5' : '1', color: 'lightgray', fontSize: grade === 'silver' ? 'larger' : 'small', fontWeight: grade === 'silver' ? 'bold' : 'normal', borderBottom: grade === 'silver' ? '1px solid rgb(211, 211, 211)' : 'none' }}>{statGrades[name]["silver"]["energy_mp"]}</span> <span style={{ opacity: grade !== 'gold' ? '0.5' : '1', color: 'rgb(204, 153, 0)', fontSize: grade === 'gold' ? 'larger' : 'small', fontWeight: grade === 'gold' ? 'bold' : 'normal', borderBottom: grade === 'gold' ? '1px solid rgb(204, 153, 0)' : 'none' }}>{statGrades[name]["gold"]["energy_mp"]}</span></p>

                        <p style={{ color: 'lightgray' }}>Mind: <span style={{ opacity: grade !== 'gray' ? '0.5' : '1', color: 'rgb(154, 154, 154)', fontSize: grade === 'gray' ? 'larger' : 'small', fontWeight: grade === 'gray' ? 'bold' : 'normal', borderBottom: grade === 'gray' ? '1px solid gray' : 'none' }}>{statGrades[name]["gray"]["stats"]["mind"]}</span> <span style={{ opacity: grade !== 'bronze' ? '0.5' : '1', color: 'rgb(205, 127, 50)', fontSize: grade === 'bronze' ? 'larger' : 'small', fontWeight: grade === 'bronze' ? 'bold' : 'normal', borderBottom: grade === 'bronze' ? '1px solid rgb(205, 127, 50)' : 'none' }}>{statGrades[name]["bronze"]["stats"]["mind"]}</span> <span style={{ opacity: grade !== 'silver' ? '0.5' : '1', color: 'lightgray', fontSize: grade === 'silver' ? 'larger' : 'small', fontWeight: grade === 'silver' ? 'bold' : 'normal', borderBottom: grade === 'silver' ? '1px solid rgb(211, 211, 211)' : 'none' }}>{statGrades[name]["silver"]["stats"]["mind"]}</span> <span style={{ opacity: grade !== 'gold' ? '0.5' : '1', color: 'rgb(204, 153, 0)', fontSize: grade === 'gold' ? 'larger' : 'small', fontWeight: grade === 'gold' ? 'bold' : 'normal', borderBottom: grade === 'gold' ? '1px solid rgb(204, 153, 0)' : 'none' }}>{statGrades[name]["gold"]["stats"]["mind"]}</span></p>

                        <br />
                        <p>Attack:  <span>{statGrades[name][grade]['stats'][card?.key_power]}</span></p>
                        <i>({swichLang(userLang, 'depend')}: <b>{card?.key_power}</b>)</i>
                        <p>Defense:  <span>{statGrades[name][grade].stats.mind}</span></p>
                        <i>({swichLang(userLang, 'depend')}: <b>mind</b>)</i>
                    </div>
                </div>

                <div className={s.desblock}>

                    <p className={s.description}>
                        <span style={{ fontWeight: 'bold', margin: '0' }}>{card?.profession} {name}</span> {swichLang(userLang, card?.id || 1)/* card?.description */}
                    </p>

                    <div style={{ marginBottom: '0.5rem 0' }}>
                        <p>{swichLang(userLang, 'main_power')}:&nbsp;
                            <span style={{ fontWeight: 'bold' }}>
                                {card?.key_power.toUpperCase()}
                            </span>
                        </p>
                    </div>
                </div>


                {/* <div className={ss.bars}>
                    <div className={ss.hpbar}></div>
                    <div className={ss.mpbar}></div>
                </div>

                <div className={ss.pcui}>
                    <div className={ss.pcuitabs}>
                        <div className={ss.pcuitab}>s</div>
                        <div className={ss.pcuitab}>i</div>

                    </div>
                    <div className={ss.usearea}>
                        <div className={ss.playeritem}>1</div>
                        <div className={ss.playeritem}>2</div>
                        <div className={ss.playeritem}>3</div>
                        <div className={ss.playeritem}>4</div>
                    </div>
                </div> */}

            </div>

        </div>
    )
}
