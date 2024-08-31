//import React from 'react'

import { useNav } from "../../store/nav"


export const Game = () => {
    const changeNav = useNav(state => state.setMainNav)
    return (
        <div>
            {/* <img width={200} src="/yh/gigapixelai.png" alt="png" /> */}
            <h1>🤫</h1> 
            <button
                onClick={() => changeNav('hold')}
            >back</button>


        </div>
    )
}
