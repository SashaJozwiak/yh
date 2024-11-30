//import { useState/* , useEffect */ } from 'react';

//import char from './assets/char.png'
//import elka from './assets/elka.gif'
//import city_arena from './assets/arena.jpg'

import s from './incity.module.css'

export const InCity = ({ setCity }) => {

    return (
        <div
            className={s.container}>
            <div
                style={{ height: '5vh', display: 'flex', justifyContent: 'space-around' }}
                onClick={() => setCity(false)}
            >

                <p style={{ alignContent: 'center' }}>City #1504</p>
                <p style={{ alignContent: 'center' }}>Mayor: @zwiak</p>
            </div>

            <div
                onClick={(e) => console.log('e: ', e.clientX, e.clientY)}
                className={s.area}>
                {/* AREA */}
            </div>

            <button
                style={{ height: '5vh' }}
                onClick={() => setCity(false)}
            >EXIT</button>
        </div>
    )
}
