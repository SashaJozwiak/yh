
import { useEffect, useState } from 'react';
import s from './web2.module.css'
import { useUHSWallet } from '../../../earnStore/UHSWallet';
import { useStartupStore } from '../../../earnStore/launch';

export const Web2 = () => {
    const [info, setinfo] = useState(false)

    const prices = useUHSWallet(state => state.assets)
    const { startups, isLoading, fetchStartups } = useStartupStore(state => state)

    console.log('prices: ', prices[0].priceUsd, prices[1].priceUsd)
    console.log('starups: ', startups)

    const calculateDaysRemaining = () => {
        const now = new Date();
        const targetDate = new Date('2025-04-15');

        // Убедимся, что обе даты являются числами
        const differenceInTime = targetDate.getTime() - now.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

        return differenceInDays;
    };

    const daysRemaining = calculateDaysRemaining();

    useEffect(() => {
        fetchStartups();
    }, [fetchStartups])

    return (
        <div style={{ overflowY: 'auto', marginTop: '0.5rem', marginBottom: '5rem' }}>
            {isLoading ? <span className={s.loader}></span> :
                <ul style={{ backgroundColor: 'rgb(58, 70, 88)' }}>
                    {startups.map((startup) => {
                        return (
                            <li key={startup.id} style={{ padding: '0.6rem 0.6rem 0 0.6rem', listStyle: "none", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>

                                <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                                    <h4 style={{ alignContent: 'flex-end', color: 'gray' }}>Game</h4>
                                    <h3 style={{ alignContent: 'flex-end' }}>Dive Cat</h3>
                                    <h4 style={{ border: '1px solid', borderRadius: '0.3rem', padding: '0 0.2rem' }}>{((startup.amount_collected / startup.amount_need) * 100).toFixed(2)}%</h4>
                                </div>

                                <div className={s.progressbar}>
                                    <div className={s.progress} style={{ width: `${((startup.amount_collected / startup.amount_need) * 100) < 2 ? 2 : ((startup.amount_collected / startup.amount_need) * 100).toFixed(2)}%` }}></div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', gap: '1rem' }}>
                                    <div style={{ display: 'flex', flex: '1', flexDirection: 'column', border: '1px solid', borderRadius: '0.3rem', padding: '0.5rem', gap: '0.5rem', justifyContent: 'space-between' }}>
                                        <h4 style={{ color: 'lightgray' }}>Raised</h4>
                                        <h5>{Number(startup.amount_collected).toFixed(0)}/{Number(startup.amount_need).toFixed(0)} USD</h5>
                                    </div>

                                    <div style={{ display: 'flex', flex: '1', flexDirection: 'column', border: '1px solid', borderRadius: '0.3rem', padding: '0.5rem', gap: '0.5rem', justifyContent: 'space-between' }}>
                                        <h4 style={{ color: 'lightgray' }}>Days left</h4>
                                        <h5>{daysRemaining}</h5>
                                    </div>

                                    <div style={{ display: 'flex', flex: '1', flexDirection: 'column', border: '1px solid', borderRadius: '0.3rem', padding: '0.5rem', gap: '0.5rem', justifyContent: 'space-between' }}>
                                        <h4 style={{ color: 'lightgray' }}>Insurance</h4>
                                        <h5>100%</h5>
                                    </div>
                                </div>

                                {info && <div>
                                    <p style={{ textAlign: 'left', fontWeight: '300' }}>
                                        Первый лаунч проект — небольшая казуальная игра с рабочим названием "Dive Cat" где кот ловит рыбок. С механиками классической змейки и три в ряд. Для публикации на российских и зарубежных игровых площадках - RU/EN. Часть привлеченных средств пойдет в рекламу на этих игровых площадках. Основная монетизация через рекламу.
                                    </p>

                                    <p style={{ textAlign: 'left', fontWeight: '300', paddingTop: '1rem' }}>
                                        Сбор софинансирования $680 за 70% прибыли. 15% - юхолд, 15% - Фаундер, 70% - держатели акций игры. В этом стартапе YouHold помимо страхования тела вклада дополнительно дофинансирует, если APR будет ниже 12% — за счёт прибыли с уже размещенной игры aim trainer и своей части в 15%. Один инвестор может вложить от 10 до 200 USD. Принимаемые валюты: UHS, USDT.
                                    </p>

                                    <p style={{ textAlign: 'left', fontWeight: '300', paddingTop: '1rem' }}>
                                        Фаундер проекта: https://t.me/cog_builds
                                    </p>
                                </div>}

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button
                                        onClick={() => setinfo(!info)}
                                        style={{ fontSize: '1rem', margin: '0.6rem', padding: '0.5rem 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>{info ? 'Hide ' : 'Info '}
                                        <span>
                                            {info ? <svg xmlns="http://www.w3.org/2000/svg" width={'1rem'} fill="none" viewBox="0 0 24 20" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                                            </svg>
                                                : <svg xmlns="http://www.w3.org/2000/svg" width={'1rem'} fill="none" viewBox="0 0 24 20" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
                                                </svg>}

                                        </span>
                                    </button>

                                    <button style={{ fontSize: '1rem', margin: '0.6rem', padding: '0.5rem 1rem', backgroundColor: 'rgb(22 163 74)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>
                                        Invest
                                    </button>
                                </div>
                            </li>
                        )
                    })}



                </ul >}


        </div>
    )
}
