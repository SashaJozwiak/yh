import React from 'react'

import { useNav } from "../../../store/nav"

import s from './header.module.css'
import { useArena } from './../../state/mainArena';
import { useGameNav } from './../../state/gameNav';

export const Header: React.FC = () => {
    const changeNav = useNav(state => state.setMainNav)
    const changeGameNav = useGameNav(state => state.setPageNav)

    const { floor, house } = useArena(state => state)

    return (
        <div className={s.headgame}>
            <button
                className={s.back}
                onClick={() => changeNav('hold')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1.5rem'} strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>

            </button>

            <span className={s.stagetitle}>HOUSE<p className={s.stage}>{house}</p></span>
            <span className={s.stagetitle}>FLOOR<p className={s.stage}>{floor}</p></span>

            <button onClick={() => changeGameNav('map')} className={s.top}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1.5rem'} strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg> */}

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={'1.5rem'}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>


            </button>
        </div>
    )
}
