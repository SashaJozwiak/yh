import { useGameNav } from '../../../state/gameNav'

import s from './showaddcards.module.css'
import { Card } from '../../../types/forGameState'

export const ShowAddCards = ({ cards }) => {

    const showGetCards = useGameNav(state => state.setShowGetCard)
    console.log('ShowAddCards: ', cards)
    return (
        <div className={`${s.container} ${s.list} scrollable`}>
            <h3>You got it</h3>

            <div
                onClick={() => showGetCards()}
                style={{ padding: '0.2rem', position: 'fixed' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width={30} style={{ position: 'fixed', right: '0.6rem' }} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
            <div className={`${s.list} scrollable`}
                style={{ height: '100%' }}
            >
                {cards.map((card: Card, id: number) => (
                    <div key={id}
                        style={{ textAlign: 'left', marginLeft: '1rem' }}
                    > <span style={{ color: 'gray' }}>{id + 1}. {(card.img)[0].toUpperCase() + (card.img).slice(1)}:</span> {card.name}</div>
                ))}
            </div>
        </div >
    )
}
