//import React from 'react'

import { useNav } from "../../store/nav"
import s from './game.module.css'


export const Game = () => {
    const changeNav = useNav(state => state.setMainNav)
    return (
        <div>
            <div className={s.circle}>

            </div>
            <div style={{ margin: '45vh auto' }}>
                <h1>🤫</h1>
                <p style={{ color: 'gray', opacity: '0.3' }}>November, 2024</p>
            </div>

            <svg width={100} height={100}>
                <filter id="wavy">
                    <feTurbulence x="0" y="0" baseFrequency="0.009" numOctaves="5" speed="2">
                        <animate attributeName="baseFrequency" dur="60s" values="0.02; 0.005; 0.02" repeatCount="indefinite" />

                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale="30" />
                </filter>
            </svg>

            <button
                style={{ position: 'fixed', zIndex: '100', bottom: '3vh', left: '40vw', width: '20vw', height: '5vh' }}
                className={s.back}
                onClick={() => changeNav('hold')}
            >back</button>
        </div>
    )
}
