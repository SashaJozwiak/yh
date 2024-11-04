import React from 'react'
import { Card } from './Card/Card'

import { useGameNav } from '../../state/gameNav'
import { usePlayCard } from '../../state/playCard'

import s from './playerarea.module.css'


export const PlayerArea: React.FC = () => {
    const setNav = useGameNav(state => state.setPageNav)

    const { toggleCollect } = usePlayCard(state => state)
    //const [collect, setCollect] = React.useState(false)


    return (
        <div className={s.playerarea}>
            {/* playerarea */}
            <div className={s.left}>
                <button
                    onClick={() => setNav('deck')}
                    style={{ border: '1px solid gray', margin: '20% 20% 0 20%', background: 'rgb(75 94 121)', borderRadius: '0.3rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width={30}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                    </svg>
                    <p>Deck</p>
                </button>

                <button
                    onClick={() => toggleCollect(true)}
                    style={{ border: '1px solid gray', margin: '20% 20% 0 20%', background: 'rgb(75 94 121)', borderRadius: '0.3rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={30} >
                        < path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
                    </svg >
                    <p>Collect</p>
                </button>
            </div>



            <Card />



            <div className={s.right}>
                <button
                    onClick={() => setNav('shop')}
                    style={{ border: '1px solid gray', margin: '20% 20% 0 20%', background: 'rgb(75 94 121)', borderRadius: '0.3rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width={30}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                    <p>Shop</p>
                </button>
                <button style={{ border: '1px solid gray', margin: '20% 20% 0 20%', background: 'rgb(75 94 121)', borderRadius: '0.3rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={30}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                    <p>Trade</p>
                </button>
            </div>
        </div >
    )
}
