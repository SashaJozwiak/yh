//import React from 'react'

import s from './elka.module.css'

export const Elka = ({ setOpenWindow }) => {
    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                setOpenWindow('');
            }}
            className={s.container}>
            <div
                /*  onClick={(e) => {
                     e.stopPropagation()
                     //setPopUp(false);
                 }} */
                className={s.window}>

                <h2>Happy New Year!</h2>
            </div>
        </div>
    )
}
