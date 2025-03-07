//import React from 'react'

import { useEffect } from "react"
import { useHistory } from "../../../earnStore/history"
import { useAuth } from "../../../../store/main"

import s from './history.module.css';

export const History = () => {
    const uhsId = useAuth(state => state.userId)
    const { transactions, loading, getHistory } = useHistory(state => state)

    const formatAmount = (amount, decimals = 9) => {
        const num = Number(amount) / Math.pow(10, decimals);
        return num.toFixed(2);
    };

    /*     const formatDate = (timestamp) => {
            return new Date(timestamp).toLocaleString();
        }; */

    /*     function TransactionHistory({ transactions }) {
            if (!transactions || transactions.length === 0) {
                return <div>История транзакций пуста</div>;
            }
        } */

    useEffect(() => {
        if (uhsId) {
            getHistory(uhsId);
        }

    }, [getHistory, uhsId])


    return (
        <>
            {loading ? <div style={{ display: 'flex', justifyContent: 'center', gap: '3vw', height: '12vh', margin: '1vh 0' }}><span className={s.loader} style={{ margin: '0 auto' }}></span></div> :
                <div style={{ overflowY: 'auto', marginBottom: '5rem' }}>
                    <table className={s.table}>
                        <thead>
                            <tr className={s.tr}>
                                <th className={s.th}>Amount</th>
                                <th className={s.th}>Currency</th>
                                <th className={s.th}>Type</th>
                                <th className={s.th}>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? transactions.filter(tx => Number(tx.amount) > 0).map((tx, id) => {
                                return (
                                    <tr key={id} className={s.tr}>
                                        <td className={s.td}>{formatAmount(tx.amount, tx.currency_symbol === 'UHS' ? 9 : 6)}</td>
                                        <td className={s.td}>{tx.currency_symbol}</td>
                                        <td className={s.td}>{tx.transaction_type}</td>
                                        <td className={s.td}>{tx.status}</td>
                                    </tr>
                                )
                            }) :
                                <tr className={s.tr}>
                                    <td className={s.td}>No transactions</td>
                                </tr>}

                        </tbody>
                    </table>
                </div>
            }


        </>

    )
}
