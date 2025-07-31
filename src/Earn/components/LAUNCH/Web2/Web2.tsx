
import { useEffect, useState } from 'react';
import { useUHSWallet } from '../../../earnStore/UHSWallet';
import { useStartupStore } from '../../../earnStore/launch';

import { Invest } from './windows/Invest'

import WebApp from '@twa-dev/sdk';

import s from './web2.module.css'
import { useUserData } from '../../../../store/main';

import { langLib, swichLang } from '../translate.js'

export const Web2 = () => {
    const [info, setinfo] = useState(0)
    const [investWindow, setInvestWindow] = useState(false)

    const prices = useUHSWallet(state => state.assets)
    const { startups, isLoading, isGetStartups, fetchStartups } = useStartupStore(state => state)

    console.log('prices: ', prices[0].priceUsd, prices[1].priceUsd)
    console.log('starups: ', startups)

    const lang = useUserData(state => state.user.languageCode)

    const calculateDaysRemaining = () => {
        const now = new Date();
        const targetDate = new Date('2025-08-01');

        // Убедимся, что обе даты являются числами
        const differenceInTime = targetDate.getTime() - now.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

        return differenceInDays;
    };

    const daysRemaining = calculateDaysRemaining();

    useEffect(() => {
        if (!isGetStartups) {
            fetchStartups();
        }
    }, [fetchStartups, isGetStartups])

    //console.log('startups: ', startups)

    console.log('lang: ', langLib)

    return (
        <>
            <div style={{ overflowY: 'auto', /* marginTop: '0.5rem', */ marginBottom: '5rem' }}>
                {isLoading ? <span className={s.loader}></span> :
                <ul style={{ backgroundColor: 'rgb(58, 70, 88)' }}>
                        {startups
                            .filter(startup => startup.id > 2)
                            .map((startup) => {
                        return (
                            <li key={startup.id} style={{ padding: '0.6rem 0.6rem 0 0.6rem', listStyle: "none", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>

                                <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                                    <h4 style={{ alignContent: 'flex-end', color: 'gray' }}>{swichLang(lang, (startup.id), 'type')}</h4>
                                    <h3 style={{ alignContent: 'flex-end' }}>{startup.title}</h3>
                                    <h4 style={{ border: '1px solid', borderRadius: '0.3rem', padding: '0 0.2rem' }}>{((startup.amount_collected / startup.amount_need) * 100).toFixed(2)}%</h4>
                                </div>

                                <div className={s.progressbar}>
                                    <div className={s.progress} style={{ width: `${((startup.amount_collected / startup.amount_need) * 100) < 2 ? 2 : ((startup.amount_collected / startup.amount_need) * 100).toFixed(2)}%` }}></div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', gap: '1rem' }}>
                                    <div style={{ display: 'flex', flex: '1', flexDirection: 'column', border: '1px solid', borderRadius: '0.3rem', padding: '0.5rem', gap: '0.5rem', justifyContent: 'space-between' }}>
                                        <h4 style={{ color: 'lightgray' }}>{swichLang(lang, (startup.id), 'raised')}</h4>
                                        <h5>{Number(startup.amount_collected).toFixed(0)}/{Number(startup.amount_need).toFixed(0)} USD</h5>
                                    </div>

                                    <div style={{ display: 'flex', flex: '1', flexDirection: 'column', border: '1px solid', borderRadius: '0.3rem', padding: '0.5rem', gap: '0.5rem', justifyContent: 'space-between' }}>
                                        <h4 style={{ color: 'lightgray' }}>{lang === 'ru' ? 'Дней ост.' : 'Days left'}</h4>
                                        <h5>{startup.id === 3 ? daysRemaining : '~20 May'}</h5>
                                    </div>

                                    <div style={{ display: 'flex', flex: '1', flexDirection: 'column', border: '1px solid', borderRadius: '0.3rem', padding: '0.5rem', gap: '0.5rem', justifyContent: 'space-between' }}>
                                        <h4 style={{ color: 'lightgray' }}>{lang === 'ru' ? 'Страхов.' : 'Insurance'}</h4>
                                        <h5>{swichLang(lang, (startup.id), 'percent')}</h5>
                                    </div>
                                </div>

                                {info === startup.id && <div>
                                    <p style={{ textAlign: 'left', fontWeight: '300' }}>
                                        {swichLang(lang, (startup.id), 'one')}
                                    </p>

                                    <p style={{ textAlign: 'left', fontWeight: '300', paddingTop: '1rem' }}>
                                        {swichLang(lang, (startup.id), 'two')}
                                    </p>

                                    <p style={{ textAlign: 'left', fontWeight: '300', paddingTop: '1rem' }}>
                                        Project founder: {swichLang(lang, (startup.id), 'founder')}
                                    </p>

                                    <p style={{ textAlign: 'left', fontWeight: '300', paddingTop: '1rem' }}>
                                        Nominee owner: {swichLang(lang, (startup.id), 'owner')}
                                    </p>
                                    <p style={{ textAlign: 'left', fontWeight: '300' }}>
                                        Guarantor: {swichLang(lang, (startup.id), 'guarantor')}
                                    </p>
                                </div>}

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button
                                        onClick={() => setinfo((prev) => prev === startup.id ? 0 : startup.id)}
                                        style={{ fontSize: '1rem', margin: '0.6rem', padding: '0.5rem 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>{info === startup.id ? 'Hide ' : 'Info '}
                                        <span>
                                            {info === startup.id ? <svg xmlns="http://www.w3.org/2000/svg" width={'1rem'} fill="none" viewBox="0 0 24 20" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                                            </svg>
                                                : <svg xmlns="http://www.w3.org/2000/svg" width={'1rem'} fill="none" viewBox="0 0 24 20" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                                                </svg>}
                                        </span>
                                    </button>

                                    <button
                                        onClick={() => setInvestWindow(true)}
                                        style={{ fontSize: '1rem', margin: '0.6rem', padding: '0.5rem 1rem', backgroundColor: 'rgb(22 163 74)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>
                                        Invest
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                    </ul >}

                <h3 style={{ color: 'lightgray', opacity: '0.5', marginBottom: '0.5rem' }}>Collected:</h3>

                {isLoading ? <span className={s.loader}></span> :
                    <ul style={{ backgroundColor: 'rgb(58, 70, 88)' }}>
                        {startups
                            .filter((startup) => startup.id < 3)
                            .map((startup) => {
                                return (
                                    <li key={startup.id} style={{ padding: '0.6rem 0.6rem 0 0.6rem', listStyle: "none", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                                            <h4 style={{ alignContent: 'flex-end', color: 'gray' }}>{swichLang(lang, (startup.id), 'type')}</h4>
                                            <h3 style={{ alignContent: 'flex-end' }}>{startup.title}</h3>
                                            <h4 style={{ border: '1px solid', borderRadius: '0.3rem', padding: '0 0.2rem' }}>{((startup.amount_collected / startup.amount_collected) * 100).toFixed(2)}%</h4>
                                        </div>

                                        {/* <div className={s.progressbar}>
                                            <div className={s.progress} style={{ width: `${((startup.amount_collected / startup.amount_need) * 100) < 2 ? 2 : ((startup.amount_collected / startup.amount_need) * 100).toFixed(2)}%` }}></div>
                                        </div> */}

                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', gap: '1rem' }}>
                                            <div style={{ display: 'flex', flex: '1', flexDirection: 'column', border: '1px solid', borderRadius: '0.3rem', padding: '0.5rem', gap: '0.5rem', justifyContent: 'space-between' }}>
                                                <h4 style={{ color: 'lightgray' }}>{swichLang(lang, (startup.id), 'raised')}</h4>
                                                <h5>{Number(startup.amount_need).toFixed(0)}/{Number(startup.amount_need).toFixed(0)} USD</h5>
                                            </div>

                                            <div style={{ display: 'flex', flex: '1', flexDirection: 'column', border: '1px solid', borderRadius: '0.3rem', padding: '0.5rem', gap: '0.5rem', justifyContent: 'space-between' }}>
                                                <h4 style={{ color: 'lightgray' }}>{lang === 'ru' ? 'Дней ост.' : 'Days left'}</h4>
                                                <h5>end</h5>
                                            </div>

                                            <div style={{ display: 'flex', flex: '1', flexDirection: 'column', border: '1px solid', borderRadius: '0.3rem', padding: '0.5rem', gap: '0.5rem', justifyContent: 'space-between' }}>
                                                <h4 style={{ color: 'lightgray' }}>{lang === 'ru' ? 'Страхов.' : 'Insurance'}</h4>
                                                <h5>{swichLang(lang, (startup.id), 'percent')}</h5>
                                            </div>
                                        </div>

                                        {info === startup.id && <div>
                                            <p style={{ textAlign: 'left', fontWeight: '300' }}>
                                                {swichLang(lang, (startup.id), 'one')}
                                            </p>

                                            <p style={{ textAlign: 'left', fontWeight: '300', paddingTop: '1rem' }}>
                                                {swichLang(lang, (startup.id), 'two')}
                                            </p>

                                            <p style={{ textAlign: 'left', fontWeight: '300', paddingTop: '1rem' }}>
                                                Project founder: {swichLang(lang, (startup.id), 'founder')}
                                            </p>

                                            <p style={{ textAlign: 'left', fontWeight: '300', paddingTop: '1rem' }}>
                                                Nominee owner: {swichLang(lang, (startup.id), 'owner')}
                                            </p>
                                            <p style={{ textAlign: 'left', fontWeight: '300' }}>
                                                Guarantor: {swichLang(lang, (startup.id), 'guarantor')}
                                            </p>
                                        </div>}

                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <button
                                                onClick={() => setinfo((prev) => prev === startup.id ? 0 : startup.id)}
                                                style={{ fontSize: '1rem', margin: '0.6rem', padding: '0.5rem 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>{info === startup.id ? 'Hide ' : 'Info '} 
                                                <span>
                                                    {info === startup.id ? <svg xmlns="http://www.w3.org/2000/svg" width={'1rem'} fill="none" viewBox="0 0 24 20" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                                                    </svg>
                                                        : <svg xmlns="http://www.w3.org/2000/svg" width={'1rem'} fill="none" viewBox="0 0 24 20" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                                                        </svg>}

                                                </span>
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (startup.id === 1) {
                                                        WebApp.openTelegramLink('https://t.me/cog_builds/6?single')
                                                    }
                                                }

                                                }

                                                style={{ fontSize: '1rem', margin: '0.6rem', padding: '0.5rem 1rem', backgroundColor: 'rgb(22 163 74)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', opacity: startup.id <= 1 ? '1' : '0.5' }}>
                                                {lang === 'ru' ? (
                                                    startup.id === 2 ? 'В разработке' : 'Готово'
                                                ) : (
                                                        startup.id === 2 ? 'In Development' : 'Ready'
                                                )}
                                            </button>
                                        </div>
                                    </li>
                                )
                            })}
                </ul >}



        </div>
            {investWindow && <Invest setInvestWindow={setInvestWindow} id={3} name={startups[2].title} need={startups[2].amount_need} collected={startups[2].amount_collected} />}
        </>
    )
}
