import { useEffect } from 'react'
import { useUserData, useUserBalances, useJettonsBalances } from '../../store/main'

import { Balance } from './Balance/Balance'
import { StatBar } from './StatBar/StatBar'
import { List } from './List/List'



export const Main: React.FC = () => {
    const rawAddress = useUserData(state => state.user.rawAddress);
    const updateBalance = useUserBalances((state) => state.updateBalance);
    const updateBalanceJ = useJettonsBalances((state) => state.updateBalanceJ);

    console.log('Main render')
    useEffect(() => {
        console.log('render change rawaddres in LIST')
        if (rawAddress) {
            updateBalance(rawAddress);
        }
    }, [rawAddress, updateBalance]);

    useEffect(() => {
        console.log('render change rawaddres in LIST jettons')
        if (rawAddress) {
            updateBalanceJ(rawAddress);
        }
    }, [rawAddress, updateBalanceJ]);

    return (
        <>
            <Balance />
            <StatBar />
            <List />
        </>
    )
}
