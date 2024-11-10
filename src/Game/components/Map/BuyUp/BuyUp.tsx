//import React from 'react'

import { useState } from 'react';
import { Card } from '../../../types/forGameState'
import s from './buyup.module.css'
import { useDeck } from '../../../state/deck';

export const BuyUp = ({ cardsWithGold, setBuyUp, selectedLocation, setSelectedLocation }) => {
    const [cardForSell, setCardFerSell] = useState(0);
    const [blockBtn, setBlockBtnBtn] = useState(false);
    //console.log(cardsWithGold, setBuyUp)
    const sellGoldCard = useDeck(state => state.sellGoldCard)

    const sellCard = (id: number) => {
        console.log('card id: ', id)
        console.log('selected Location Id: ', selectedLocation.city_id)
        if (id === 0) return;
        setBlockBtnBtn(true);
        sellGoldCard(id, selectedLocation.city_id, selectedLocation.price)
        setSelectedLocation(null);
        setBuyUp(false)
    }

    return (
        <div onClick={() => setBuyUp(false)} className={s.container}>
            <div onClick={e => e.stopPropagation()} className={s.window}>
                <h2 style={{ color: 'gray', marginBottom: '1rem' }}>Select card</h2>
                <ul style={{ marginBottom: '1rem' }}>
                    {cardsWithGold.map((card: Card, index: number) => (
                        <li
                            onClick={() => setCardFerSell(card.id)}
                            style={{ backgroundColor: card.id === cardForSell ? 'rgb(75, 94, 121)' : 'transparent', padding: '1vh 0', fontWeight: 'normal', color: '#CC9900' }}
                            key={index}>
                            {card.img} {card.name}: <b>{card.grades.gold}</b> cards
                        </li>))}
                </ul>

                <button
                    onClick={() => sellCard(cardForSell)}
                    disabled={cardForSell === 0 || blockBtn}

                    style={{ position: 'absolute', bottom: '0', backgroundColor: 'rgb(93 121 160)', height: '2rem', width: '70vw', borderRadius: '0.3rem', opacity: cardForSell === 0 ? '0.5' : blockBtn ? '0.5' : '1' }}
                >Apply</button>
            </div>
        </div>


    )
}
