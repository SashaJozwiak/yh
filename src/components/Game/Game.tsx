//import React from 'react'

//import { useNav } from "../../store/nav"
import s from './game.module.css'


export const Game = () => {
    //const changeNav = useNav(state => state.setMainNav)
    return (
        <div className={s.gamewrapper}>
            <div className={s.headgame}>
                footer
            </div>

            <div className={s.mainarea}>
                mainarea
            </div>

            <div className={s.playerarea}>
                playerarea
            </div>



            {/* <button
                style={{ position: 'fixed', zIndex: '100', bottom: '0', left: '0', width: '20vw', height: '5vh' }}
                className={s.back}
                onClick={() => changeNav('hold')}
            >back</button> */}
        </div>
    )
}
