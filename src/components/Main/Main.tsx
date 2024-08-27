import { useEffect } from 'react'
import { useUserData } from '../../store/main'
import WebApp from '@twa-dev/sdk'

import { Balance } from './Balance/Balance'
import { StatBar } from './StatBar/StatBar'
import { List } from './List/List'

export const Main: React.FC = () => {

    const useError = useUserData(state => state.miningError)

    useEffect(() => {
        if (useError) {
            WebApp.showAlert(useError)
        }
    }, [useError]);

    return (
        <>
            <Balance />
            <StatBar />
            <List />
        </>
    )
}
