//import React from 'react'

//import { useEffect, useState } from 'react';

import { useNav } from "../../store/nav"
import { useUserData } from '../../store/main';

//import { useListData } from '../../store/EAlist'
import { swichLang } from '../../lang/lang';

import investor from '../../assets/game/img/inv3_11zon_1.webp'

import s from './betapage1.module.css'
//import { Tooltip } from './Tooltip';

/* interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
} */

export const BetaPage1 = () => {
    const userLang = useUserData(state => state.user.languageCode);
    const changeNav = useNav(state => state.setMainNav)

    return (
        <>

            <div className={s.container}>
                <h2 className={s.title}>{swichLang(userLang, 'beta_title')}</h2>

                <div className={s.playercard}>
                    <div className={s.pcimg}>
                        <h2 className={s.early}>{swichLang(userLang, 'beta_subtitle')}</h2>
                        <img
                            className={s.cardimg} src={investor}
                            alt="investor pic" />

                    </div>
                    <div>some text</div>
                </div>

                <button
                    className={s.back}
                    onClick={() => changeNav('hold')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={'1.5rem'} strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>

            </div>

        </>
    )
}
