//import { useState, useEffect } from 'react';
//import { useStonFi, useJettonsBalances, useUserBalances, useUserData, useDedust } from '../../../store/main'
import { useNav } from '../../../store/nav';

//import WebApp from '@twa-dev/sdk';
import s from './list.module.css'
import { ListCurrency } from './ListCurrency';
import { ListApps } from './ListApps';

/* const formatNumber = (num: number) => {
    if (num > 999999) {
        return `${Math.floor(num / 1000000)}kk`;
    }

    if (num > 999) {
        return `${Math.floor(num / 1000)}k`;
    }

    return num.toLocaleString('ru');
}; */

export const List: React.FC = () => {
    const nav = useNav(state => state.nav.list);
    return (
        <div className={`${s.list} scrollable`}>
            {nav && <ListCurrency />}
            {!nav && <ListApps />}
        </div>
    )
}
