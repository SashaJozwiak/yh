import { useEffect, useState } from 'react';
import { useUserData } from '../../../store/main';
import { useTop100 } from '../../../store/top100';

import { swichLang } from '../../../lang/lang.js';

import { formatNumberBal, formatNumberToo } from './../../../utils/formats/bigNumbers';

import s from './cabdata.module.css'
import { usePartners } from '../../../store/partners.js';
//import WebApp from '@twa-dev/sdk';

import { CalculatedPayment, calculatePartnerPayments, PaymentStats } from '../../../utils/math/calculateUserValue.js';
import { WithdrawTimer } from './WithdrawTimer.js';
import { WithdrawPopUp } from './WithdrawPopUp.js';

const defaultAvatar = '/yh/gnom_full_tr_150_compressed.png';

export interface CalcData {
    payments: CalculatedPayment[];
    stats: PaymentStats;
}

export const CabData = () => {
    const { internalId, userName, refs, refs_active, active_usernames, anonim, languageCode } = useUserData(state => state.user);

    const balance = useUserData(state => state.balance.balance);
    const setAnonim = useUserData(state => state.setAnonim);

    const [isChecked, setIsChecked] = useState(anonim);
    const [isDisabled, setIsDisabled] = useState(false);
    const [refetchTop100, setRefetchTop100] = useState(false);

    const [reflist, setReflist] = useState(false);

    const top100 = useTop100(state => state.top100);
    const getTop100 = useTop100(state => state.getTop100);

    const userDetails = usePartners(state => state.userDetails);
    const withdrwan = usePartners(state => state.withdraw);
    const fetchUserDetails = usePartners(state => state.fetchUserDetails);
    const loading = usePartners(state => state.loading);

    const [calcData, setCalcData] = useState<CalcData | null>(null);
    const [popUp, setPopUp] = useState<boolean>(false);


    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        setIsDisabled(true);

        try {
            await setAnonim(internalId, newValue);
            setIsChecked(newValue);
            setRefetchTop100(true);
        } catch (error) {
            console.error('Ошибка обновления анонимности:', error);
            setIsChecked(anonim);
        } finally {
            setTimeout(() => {
                setIsDisabled(false);
            }, 1200);
        }

        setTimeout(() => {
            setIsDisabled(false);
        }, 1200);
    }

    //console.log('active_usernames: ', active_usernames.length);

    useEffect(() => {
        if (!top100.length || refetchTop100) {
            setRefetchTop100(false)
            getTop100();
        }
    }, [getTop100, refetchTop100, top100.length])

    useEffect(() => {
        setIsChecked(anonim);
    }, [anonim]);

    useEffect(() => {
        if (active_usernames.length >= 10 && userDetails.length === 0) {
            const internalIds = active_usernames.map(user => user.internal_id);
            fetchUserDetails(internalId, internalIds);
        }
        if (userDetails.length >= 10 && userDetails.length !== 0 && calcData === null) {
            setCalcData(calculatePartnerPayments(userDetails));
        }
    }, [active_usernames, calcData, fetchUserDetails, internalId, userDetails, userDetails.length]);

    console.log('userDetails', calculatePartnerPayments(userDetails));

    return (
        <>
            {popUp && <WithdrawPopUp /* onWithdraw={onWithdraw} */ setPopUp={setPopUp} calcData={calcData} languageCode={languageCode} />}
            {reflist ? <div className={`${s.list} scrollable`}>
                <div
                    onClick={() => setReflist(false)}
                    style={{ padding: '0.2rem', }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width={30} style={{ position: 'fixed', right: '0.6rem' }} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
                {active_usernames.length < 10 ?
                    active_usernames.map((ref) => (
                        <div key={ref.internal_id}>
                            {/* ID: {ref.internal_id}, */} {ref.username}
                        </div>
                    )) :
                    <div>
                        {calcData ? (
                            <div style={{ textAlign: 'left' }}>
                                <h3>Total Active Friends: <b style={{ color: 'green' }}>{calcData.stats.totalUsers}</b></h3>
                                <br />
                                <p>
                                    {`— house > 10: `}  <b style={{ color: 'green' }}>{calcData.stats.houseAbove10}</b> = <span style={{ fontWeight: 'bold', textAlign: 'right' }}>{(calcData.stats.houseAbove10 * 0.06).toFixed(2)} USDT</span>
                                </p>

                                <p>
                                    {`— balance > 500: `}
                                    <b style={{ color: 'green' }}>{calcData.stats.balanceAbove500HouseBelow10}</b> = <span style={{ fontWeight: 'bold', textAlign: 'right' }}>{(calcData.stats.balanceAbove500HouseBelow10 * 0.04).toFixed(2)} USDT</span>
                                </p>

                                <p>
                                    — others: <b style={{ color: 'green' }}>{calcData.stats.totalUsers - calcData.stats.balanceAbove500HouseBelow10 - calcData.stats.houseAbove10}</b> = <span style={{ fontWeight: 'bold', textAlign: 'right' }}>{((calcData.stats.totalUsers - calcData.stats.balanceAbove500HouseBelow10 - calcData.stats.houseAbove10) * 0.02).toFixed(2)} USDT</span>
                                </p>

                                <p>
                                    — purchases: <b style={{ color: 'green' }}>{calcData.stats.totalPurchasesSum.toFixed()}⭐</b> = <span style={{ fontWeight: 'bold', textAlign: 'right' }}>{(calcData.stats.totalPurchasesSum * 0.002).toFixed(2)} USDT</span>
                                </p>

                                <br />
                                {!loading && <div>
                                    <p style={{ fontSize: '0.8rem', color: 'gray' }}>{withdrwan > 0 && `-${withdrwan.toFixed(2)} USDT`}</p>
                                    <h3>Profit: {(((calcData.stats.houseAbove10 * 0.06) + (calcData.stats.balanceAbove500HouseBelow10 * 0.04) + ((calcData.stats.totalUsers - calcData.stats.balanceAbove500HouseBelow10 - calcData.stats.houseAbove10) * 0.02) + (calcData.stats.totalPurchasesSum * 0.002)) - (withdrwan > 0 ? withdrwan : 0)).toFixed(2)} USDT</h3>
                                    {(((calcData.stats.houseAbove10 * 0.04) + (calcData.stats.balanceAbove500HouseBelow10 * 0.03) + ((calcData.stats.totalUsers - calcData.stats.balanceAbove500HouseBelow10 - calcData.stats.houseAbove10) * 0.02) + (calcData.stats.totalPurchasesSum * 0.002)) - (withdrwan > 0 ? withdrwan : 0)) > 10 ? <WithdrawTimer latestPurchaseDate={calcData?.stats.latestPurchaseDate} setPopUp={setPopUp} /> : <button
                                        style={{ height: '2rem', padding: '0rem 0.5rem', margin: '1rem auto', backgroundColor: 'rgb(103, 119, 142)', opacity: '0.8' }}
                                    > {`Profit < 10.00 USDT`}</button>}
                                </div>}


                                <br />

                                <i style={{ fontSize: '0.8rem', color: 'gray' }}>{languageCode === 'ru' ?
                                    <>
                                        Для вывода доступно не менее <b>10 USDT</b> и <b>25 дней</b> после последней покупки друга.<br />
                                        Если вы ни разу не вывели накопленные средства до on-chain этапа, вы будете включены в <b>программу аллокации пропорционально вашему балансу, а мы проследим чтобы это было выгоднее.</b>
                                    </>
                                    : <>
                                        At least <b>10 USDT</b> is available for withdrawal and <b>25 days</b> after the last purchase by an active friend.<br />
                                        If you never withdraw funds before the on-chain stage, you will be included in the <b>allocation program proportional to your balance, and this will be more profitable.</b>
                                    </>}</i>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                }

            </div> : <>
            <div className={s.data}>
                        <img className={s.gnom} style={{ borderRadius: '0.3rem', pointerEvents: "none" }}
                    width='150' height='118' src={defaultAvatar} alt={``} />
                <div className={s.info}>
                    <p className={s.line}>{swichLang(languageCode, 'user')}: <span style={{ color: 'white' }}>{userName.substring(0, 10)}</span></p>
                    <p className={s.line}>{swichLang(languageCode, 'friends')}: <span style={{ color: 'white' }}>{refs}</span></p>
                            <p className={s.line}>{swichLang(languageCode, 'afriends')}: <span
                                onClick={() => refs_active > 0 ? setReflist(true) : null}
                                style={{ color: 'white', fontWeight: 'bold', borderBottom: '1px solid lightgray' }}>{refs_active}</span></p>
                    {/* <p className={s.line}>Fr. reward: <span style={{ color: 'white' }}>0</span></p> */}
                    {/* <p className={s.line}>Team: <span style={{ color: 'white' }}>{team || `none`}</span></p> */}
                    <p className={s.line}>{swichLang(languageCode, 'balance')}: <span style={{ color: 'white' }}>{formatNumberBal(balance)}</span></p>
                    {/* <p className={s.line}>аноним: <span style={{ color: 'white' }}>{anonim}</span></p> */}
                    <div style={{ textAlign: 'left', display: 'flex', gap: '0.2rem' }}>
                        <input type="checkbox"
                            checked={isChecked}
                            disabled={isDisabled}
                            onChange={handleCheckboxChange}
                            id="anonim-checkbox"
                            name="anonim"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="anonim-checkbox">
                            {swichLang(languageCode, 'anonim')}&nbsp;
                            <span
                                style={{
                                    padding: '0 0.25rem',
                                    color: isDisabled ? 'gray' : isChecked ? 'rgb(22, 163, 74)' : 'transparent',
                                    border: isDisabled ? '1px solid lightgray' : isChecked ? '1px solid rgb(22, 163, 74)' : '1px solid rgb(255, 255, 255)',
                                    borderRadius: '0.25rem',
                                    display: 'inline-block',
                                    marginRight: '0.5rem',
                                    backgroundColor: isDisabled ? 'lightgray' : isChecked ? 'lightgray' : 'transparent',
                                    transition: 'background-color 0.3s, border 0.3s',
                                    fontWeight: 'bold',
                                    margin: '0 auto',
                                    fontSize: '0.8rem',

                                }}
                            >✓</span>
                            &nbsp;
                        </label>
                    </div>
                </div>
            </div>

            <h2 className={s.headerlist}>{swichLang(languageCode, 'top100')}</h2>

            {!top100.length ? <span className={s.loader}></span> :
                <div className={`${s.list} scrollable`}/*  style={{ padding: '0 1rem' }} */>
                    {top100.sort((a, b) => b.balance - a.balance).map((item, index) => (
                        <div className={s.listitem} key={item.internal_id}>
                            <div
                                /* onClick={(e) => {
                                    e.preventDefault();
                                    WebApp.openTelegramLink(`https://t.me/${item.username}`);
                                }} */
                                className={s.btn}>{/* {index + 1}. */}<span className={s.btnspan}>{index + 1}. {(item.username).substring(0, 20)}</span></div>
                            <div>{formatNumberToo(item.balance)} <b>UH</b></div>
                        </div>
                    ))}
                </div>
            }
            </>}

        </>
    )
}
