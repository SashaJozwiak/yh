import React, { /* useEffect, */ useState } from 'react'

import { useGameNav } from '../../../state/gameNav'
import { charDeck } from '../../../exmpl/charDeck_big';

import imgs from '../charimg'

import s from './showcard.module.css'
import ss from '../../PlayerArea/Card/card.module.css'

interface ShowCardProps {
    name: string;
}

export const ShowCard: React.FC<ShowCardProps> = ({ name }) => {
    const [card] = useState(charDeck.find((c: ShowCardProps) => c.name === name));
    const [stat, setStat] = useState(false);

    const setShowCard = useGameNav(state => state.setShowCard);

    return (
        <div onClick={() => setShowCard()} className={s.container}>
            <div onClick={e => e.stopPropagation()}
                className={s.playercard}>
                <div className={ss.pcimg}>
                    <h3 className={s.name}>{card?.profession} {name}</h3>

                    {<img className={ss.cardimg} src={imgs[card?.image || 'empty']} alt="character pic" />}

                    <button
                        onClick={() => setStat((prev) => !prev)}
                        className={ss.stat}>
                        {!stat ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1rem'} strokeWidth={1.5} stroke="currentColor" className="svgstat" style={{ filter: 'drop-shadow(1px 2px rgba(0 0 0))' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1rem'} strokeWidth={2.5} stroke="currentColor" style={{ filter: 'drop-shadow(1px 2px rgb(0 0 0))' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        }
                    </button>

                    <div className={`${ss.statblock} ${!stat ? ss.hiddenstat : null}`}>
                        <h4 className={ss.name}>Investor</h4>
                    </div>
                </div>

                <div className={ss.bars}>
                    <div className={ss.hpbar}></div>
                    <div className={ss.mpbar}></div>
                </div>

                <div className={ss.pcui}>
                    <div className={ss.pcuitabs}>
                        <div className={ss.pcuitab}>s</div>
                        <div className={ss.pcuitab}>i</div>
                        {/* <div className={s.pcuitab}>i</div> */}
                    </div>
                    <div className={ss.usearea}>
                        <div className={ss.playeritem}>1</div>
                        <div className={ss.playeritem}>2</div>
                        <div className={ss.playeritem}>3</div>
                        <div className={ss.playeritem}>4</div>
                    </div>
                </div>

            </div>

        </div>
    )
}
