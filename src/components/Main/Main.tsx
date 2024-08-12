//import { useEffect } from 'react'
//import { useUserData, useUserBalances, useJettonsBalances } from '../../store/main'

import { Balance } from './Balance/Balance'
import { StatBar } from './StatBar/StatBar'
import { List } from './List/List'



export const Main: React.FC = () => {

    return (
        <>
            <Balance />
            <StatBar />
            <List />
        </>
    )
}
