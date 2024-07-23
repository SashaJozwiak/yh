import { useEffect } from 'react'
import { useUserData, useUserBalances } from '../../store/main'

import { Balance } from './Balance/Balance'
import { StatBar } from './StatBar/StatBar'
import { List } from './List/List'



export const Main: React.FC = () => {
    const rawAddress = useUserData(state => state.user.rawAddress);
    const updateBalance = useUserBalances((state) => state.updateBalance);

    console.log('Main render')
    useEffect(() => {
        console.log('render change rawaddres in LIST')
        if (rawAddress) {
            updateBalance(rawAddress);
        }
    }, [rawAddress, updateBalance]);

    return (
        <>
            <Balance />
            <StatBar />
            <List />
        </>
    )
}
