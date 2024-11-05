//import React from 'react'
//import investor from '../../../assets/Game/inv3.jpg'

import { useGameNav } from '../../../state/gameNav'
import { useArena } from '../../../state/mainArena'
import { usePlayCard } from '../../../state/playCard'


import s from './cardindeck.module.css'

export const CardInDeck = ({ grades, name, img, handleClose }) => {
    const Grade = useGameNav(state => state.deckGrade)
    const floor = useArena(state => state.floor);

    const choose = usePlayCard(state => state.chooseHero)

    console.log('handleclose: ', handleClose)

    return (
        <>
            <div className={s.pcimg}>
                {img && <img className={s.cardimg} src={img} alt="character pic" />}
                {floor === 0 && name && <button className={s.choose}
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(img)
                        choose(name)
                        handleClose();
                        //fn for choosing hero card
                    }}>
                    Choose</button>}
            </div>
            <div style={{ fontWeight: 'bold', fontSize: 'calc(1.5vw + 1.5vh)' }}>
                {name}
            </div>
            {Grade === 'all' ?
                <ul className={s.gradelist}>
                    {grades.gray !== 0 && <li className={s.gray}>{grades.gray}</li>}
                    {grades.bronze !== 0 && <li className={s.bronze}>{grades.bronze}</li>}
                    {grades.silver !== 0 && <li className={s.silver}>{grades.silver}</li>}
                    {grades.gold !== 0 && <li className={s.gold}>{grades.gold}</li>}
                </ul> : Grade === 'gray' ?
                    <ul className={s.gradelist}>
                        {grades.gray !== 0 && <li className={s.gray}>{grades.gray}</li>}
                    </ul> : Grade === 'bronze' ?
                        <ul className={s.gradelist}>
                            {grades.bronze !== 0 && <li className={s.bronze}>{grades.bronze}</li>}
                        </ul> : Grade === 'silver' ?
                            <ul className={s.gradelist}>
                                {grades.silver !== 0 && <li className={s.silver}>{grades.silver}</li>}
                            </ul> : <ul className={s.gradelist}>
                                {grades.gold !== 0 && <li className={s.gold}>{grades.gold}</li>}
                            </ul>
            }
        </>
    )
}
