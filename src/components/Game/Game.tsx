//import React from 'react'

import { useNav } from "../../store/nav"


export const Game = () => {
    const changeNav = useNav(state => state.setMainNav)
    return (
        <div>
            <h1>🤫</h1> 
            <button
                onClick={() => changeNav('hold')}
            >back</button>


        </div>
    )
}
