import { useEffect, useState } from "react";

import { useUserData } from "../../../store/main";
import { useFees } from "../../../store/fees";

import { GradesSvg } from "../../../Game/components/Some/GradesSvg"

import s from './transfers.module.css'
import WebApp from "@twa-dev/sdk";


export const Transfers = () => {

    const userLang = useUserData(state => state.user.languageCode);

    const [feeInfo, setFeeInfo] = useState(false);
    const [historyInfo, setHistoryInfo] = useState(false);

    const userId = useUserData(state => state.user.internalId);
    //const userExternalId = useUserData(state => state.user.id);

    const deckState = useFees(state => state.deckState);
    const fees = useFees(state => state.commission);
    const fetchDeckState = useFees(state => state.fetchDeckState);
    const isLoading = useFees(state => state.isLoading);

    const transactions = useFees(state => state.transactions);
    const fetchTransactionHistory = useFees(state => state.fetchTransactionHistory);
    const isLoadingHistory = useFees(state => state.isLoadingHistory);


    useEffect(() => {
        if (deckState === null) {
            fetchDeckState(userId);
        }
    }, [deckState, fetchDeckState, userId])

    useEffect(() => {
        if (transactions.length === 0) {
            fetchTransactionHistory(userId)
        }

    }, [fetchTransactionHistory, transactions.length, userId])

    console.log('transactions: ', transactions)

    return (
        <>
            <div>
                <h2 style={{ display: 'inline' }}>{userLang === 'ru' ? 'Комиссия' : 'Your transfer fee'} </h2> <button
                    onClick={() => setFeeInfo(prev => !prev)}
                    className={s.info}>
                    ?
                </button>

                {isLoading ? <div style={{ display: 'flex', justifyContent: 'center', gap: '3vw', height: '12vh', margin: '1vh 0' }}><span className={s.loader} style={{ margin: '0 auto' }}></span></div> : !feeInfo ?

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3vw', height: '12vh', margin: '1vh 0' }}>
                        <button
                            //onClick={() => setGrade('gray')}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', opacity: '1', border: fees === 40 ? '1px solid grey' : 'none', borderRadius: '0.3rem', padding: '0.5rem' }}
                            /* className={`${s.gradeBtn} ${Grade === 'gray' ? s.gradeBtnOn : null}`} */>
                            <GradesSvg color={'transparent'} stroke={'gray'} /> <p style={{ color: 'gray' }}>Gray <span style={{ display: 'block' }}>40%</span></p>
                        </button>

                        <button
                            //onClick={() => setGrade('bronze')}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', border: fees === 30 ? '1px solid grey' : 'none', borderRadius: '0.3rem', padding: '0.5rem' }}
                            /* className={`${s.gradeBtn} ${Grade === 'bronze' ? s.gradeBtnOn : null}`} */><GradesSvg color={'#cd7f32'} stroke={'white'} /><p style={{ color: '#cd7f32' }}>Bronze <span style={{ display: 'block' }}>30%</span></p>
                        </button>

                        <button
                            //onClick={() => setGrade('silver')}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', border: fees === 15 ? '1px solid grey' : 'none', borderRadius: '0.3rem', padding: '0.5rem' }}
                            /* className={`${s.gradeBtn} ${Grade === 'silver' ? s.gradeBtnOn : null}`} */><GradesSvg color={'#9a9a9a'} stroke={'white'} /> <p style={{ color: '#9a9a9a' }}>Silver <span style={{ display: 'block' }}>15%</span></p>
                        </button>

                        <button
                            //onClick={() => setGrade('gold')}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', border: fees === 0 ? '1px solid grey' : 'none', borderRadius: '0.3rem', padding: '0.5rem' }}
                            /* className={`${s.gradeBtn} ${Grade === 'gold' ? s.gradeBtnOn : null}`} */><GradesSvg color={'#CC9900'} stroke={'white'} /> <p style={{ color: '#CC9900' }}>Gold <span style={{ display: 'block' }}>0%</span></p>
                        </button>
                    </div> : <div style={{ height: '12vh', margin: '1vh 0.6rem' }} onClick={() => setFeeInfo(prev => !prev)}>
                        <p >{userLang === 'ru' ? 'Наличие коллекционных карт соответствующего грейда в игре снижает комиссии ваших переводов' : 'Having collectible cards of the corresponding grade in the game reduces the fees for your transfers'}</p></div>}


                <h2 style={{ display: 'inline' }}>{userLang === 'ru' ? 'История' : 'History'} </h2>
                <button
                    onClick={() => setHistoryInfo(prev => !prev)}
                    className={s.info}>
                    ?
                </button>
            </div >
            {/* <div> */}

            {isLoadingHistory ? <div style={{ display: 'flex', justifyContent: 'center', gap: '3vw', height: '12vh', margin: '1vh 0' }}><span className={s.loader} style={{ margin: '0 auto' }}></span></div> : !historyInfo ?
                <div
                    style={{ /* border: '1px solid grey', borderRadius: '0.3rem', */ padding: '0.5rem', fontSize: 'calc(1vh + 1vw' }}
                    className={`${s.list} scrollable`}>
                    <table className={s.table}>
                        <thead>
                            <tr className={s.tr}>
                                <th className={s.th}>Date</th>
                                <th className={s.th}>Type</th>
                                <th className={s.th}>UH</th>
                                <th className={s.th}>Fee</th>
                                <th className={s.th}>User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ?

                                transactions.map((transaction) => {
                                    const isSender = Number(transaction.sender_id) === userId; // Проверяем, отправитель ли текущий пользователь
                                    console.log(isSender);
                                    const transactionTypeText = isSender ? 'Sent' : 'Received';
                                    const transactionAmountColor = isSender ? 'red' : 'green';
                                    const counterpartUsername = isSender ? transaction.receiver_username : transaction.sender_username;

                                    return (
                                        <tr className={s.tr} key={transaction.id}>
                                            <td className={s.td}>{new Date(transaction.transaction_timestamp).toLocaleString()}</td>
                                            <td className={s.td} style={{ color: transactionAmountColor }}>{transactionTypeText}</td>
                                            <td className={s.td}>{transaction.amount}</td>
                                            <td className={s.td}>{transaction.fee}</td>
                                            <td className={s.td}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    WebApp.openTelegramLink(`https://t.me/${counterpartUsername}`);
                                                }}
                                                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                            >
                                                {counterpartUsername?.slice(0, 6) || 'N/A'}
                                            </td>
                                        </tr>
                                    );
                                })
                                : <tr className={s.tr}>
                                    <td className={s.td}>No transactions</td>
                                </tr>}
                        </tbody>
                    </table>

                </div> :
                userLang === 'ru' ?
                    <div style={{ margin: '1vh 0.6rem' }}>Вы можете переводить <b>UH</b> другим пользователям  в <span
                        style={{ textDecoration: 'underline' }}
                        onClick={(e) => {
                            e.preventDefault();
                            WebApp.openTelegramLink(`https://t.me/youhold_chat`);
                        }}>YouHold чатах</span> c помощью команды '/send', указания username получателя и суммы перевода. Пример полной команды: <b><i>/send zwiak 100</i></b> </div > :
                    <div style={{ margin: '1vh 0.6rem' }}>You can transfer <b>UH</b> to other users in our YouHold chats using the '/send' command, specifying the recipient's username and the transfer amount. Example of a full command: <b><i>/send zwiak 100</i></b> </div >

            }
            {/* </div> */}


        </>
    )
}
