import { useEffect, useState } from "react"
import { useHold } from "../../../earnStore/hold"

import { formatNumber, formatNumberToo2, roundToFixed } from "../../../../utils/formats/bigNumbers"

import { Rewards } from "../../../earnStore/types"

import s from './hold.module.css'
import { useUHSWallet } from "../../../earnStore/UHSWallet"
import { useAuth } from "../../../../store/main"
import { useWallet } from "../../../earnStore/wallet"
import { useNav } from "../../../../store/nav"

export const HoldTW = () => {
    const assets = useHold(state => state.assets)
    const updateAssets = useHold(state => state.updateHoldAssets)
    const balStatus = useWallet(state => state.status)

    const uhsId = useAuth(state => state.userId)
    const limit = useAuth(state => state.limit)
    const claim = useUHSWallet(state => state.claim)

    const { lastClaimTimestamp, loading, isFetchClaimData, fetchLastClaim } = useHold(state => state)
    const [disableButton, setDisableButton] = useState(false)

    const changeNav = useNav(state => state.setMainNav)

    const differentTime = () => {
        const lastClaimDate = new Date(lastClaimTimestamp);
        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        const lastClaimTimeInSeconds = Math.floor(lastClaimDate.getTime() / 1000);
        const differenceInSeconds = currentTimeInSeconds - lastClaimTimeInSeconds;

        return differenceInSeconds;
    }

    const remainingTime = () => {
        const limitInSeconds = limit * 3600; // Переводим часы в секунды
        const elapsedSeconds = differentTime();
        const remainingSeconds = limitInSeconds - elapsedSeconds;

        // Если оставшееся время меньше или равно нулю, значит, время уже истекло
        return remainingSeconds > 0 ? remainingSeconds : 0;
    };

    const formatRemainingTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    console.log('lastClaim: ', lastClaimTimestamp)
    console.log('lastClaim math: ', formatRemainingTime(remainingTime()))
    console.log('remainingTime: ', remainingTime())
    console.log('differentTime: ', differentTime())
    console.log('loading: ', loading)

    const handleClaim = () => {
        setDisableButton(true);
        const rewards: Rewards = assets.reduce((acc, asset) => {
            const reward = (Math.min(asset.value, asset.range[1]) * asset.APY / (365 / (limit / 24)));
            const decimals = asset.name === "UHS" ? 9 : 6;

            // Переименовываем "USD₮" в "USDT"
            const assetName = asset.name === "USD₮" ? "USDT" : asset.name;

            if (!acc[assetName]) {
                acc[assetName] = 0;
            }
            acc[assetName] += reward * (10 ** decimals);
            return acc;
        }, {});

        console.log('Rewards:', rewards);
        if (uhsId) {
            claim(uhsId, rewards, "twClaim", setDisableButton)
        }

        //setDisableButton(false);
    };


    useEffect(() => {
        if (balStatus === 'loaded') {
            updateAssets();
        }
    }, [updateAssets, balStatus])

    useEffect(() => {
        if (uhsId && !isFetchClaimData) {
            fetchLastClaim(uhsId)
        }
    }, [fetchLastClaim, isFetchClaimData, uhsId])

    const isClaimDisabled = lastClaimTimestamp ? remainingTime() > 0 : false;

    return (<div style={{ overflowY: 'auto', marginBottom: '5rem' }}>
        {assets.filter(asset => asset.value >= asset.range[0]).length <= 0 && <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'gray' }}>not enough assets</div>}

        {assets.filter(asset => asset.value >= asset.range[0]).length > 0 &&

            <ul style={{ /* overflowY: 'auto', *//*  paddingBottom: '1rem', */ margin: '0.6rem', border: '2px solid', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', borderBottomLeftRadius: '0.3rem', borderBottomRightRadius: '0.3rem', backgroundColor: 'rgb(58, 70, 88)' }}>

                {assets.filter(asset => asset.value >= asset.range[0]).map((asset) => {

                    return (
                        <li key={asset.address} style={{ /* marginBottom: "0.5rem", */ padding: '0.3rem 0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', /* alignItems: 'center', */ /* backgroundColor: 'rgb(58 70 88)',*/ borderBottom: '1px solid gray' }}>
                            <div className={s.block}>
                                <div>
                                    {asset.name}
                                </div>
                                <img style={{ borderRadius: '50%' }} src={asset.src} width={50} alt="" />
                            </div>

                            <div className={s.block}>
                                <span style={{ fontSize: '1.1rem' }}>Balance</span>
                                <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                                    {formatNumberToo2(asset.value).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                            </div>

                            <div className={s.block}>
                                <span style={{ fontSize: '1.1rem' }}>Range</span>
                                <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                                    {asset.range[0]} - {formatNumber(asset.range[1])}
                                </div>
                            </div>

                            <div className={s.block}>
                                <span style={{ fontSize: '1.1rem' }}>APR</span>
                                <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6', color: 'white' }}>
                                    {roundToFixed((asset.APY * 100), 10)}%+
                                </div>
                            </div>

                            <div className={s.block}>
                                <span style={{ fontSize: '1.1rem' }}>Reward</span>
                                <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '1' }}>
                                    {((asset.value > asset.range[1] ? asset.range[1] : asset.value) * asset.APY / (365 / (limit / 24))).toLocaleString('en', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} {asset.name}
                                </div>
                            </div>
                        </li>
                    )
                })}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <div style={{ fontSize: '0.8rem', fontStyle: 'italic', padding: '0 0.6rem', alignContent: 'center' }}>Claim:
                        {
                            assets
                                .filter(asset => asset.value >= asset.range[0]) // Фильтруем assets
                                .map(asset => {
                                    // Ограничиваем asset.value значением asset.range[1], если оно превышено
                                    const cappedValue = Math.min(asset.value, asset.range[1]);
                                    // Вычисляем доходность для текущего asset
                                    const dailyYield = (cappedValue * asset.APY) / 365;
                                    // Возвращаем строку с именем asset и его доходностью
                                    return ` +${dailyYield.toLocaleString('en', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} ${asset.name} ${asset.name} ${asset.name} ${asset.name}`;
                                })
                                .join(', ') // Объединяем строки через запятую
                        }

                    </div> */}
                    <button
                        onClick={() => handleClaim()}
                        disabled={isClaimDisabled || loading || disableButton}
                        style={{ fontSize: '1.3rem', padding: '0 0.5rem', backgroundColor: 'rgb(71, 85, 105)', color: isClaimDisabled ? 'gray' : loading ? 'gray' : disableButton ? 'gray' : 'white', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 10px 0px', border: '1px solid lightgray', marginBottom: '0.3rem' }}>{isClaimDisabled ? formatRemainingTime(remainingTime()) : loading ? '...' : disableButton ? '...' : 'Claim all'}
                    </button>

                    <button
                        onClick={() => changeNav('cabinet')}
                        style={{ fontSize: '1.3rem', padding: '0 0.3rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 10px 0px', border: '1px solid lightgray', marginBottom: '0.3rem', marginLeft: '0.3rem' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={16}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                        </svg>
                    </button>
                </div>
            </ul>
        }


        <ul>
            {assets.filter(asset => asset.value < asset.range[0]).map((asset) => {
                return (
                    <li key={asset.address} style={{ marginTop: "0.5rem", padding: '0.3rem 1.2rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', opacity: '0.5' }}>
                        <div className={s.block}>
                            <div>
                                {asset.name}
                            </div>
                            <img style={{ borderRadius: '50%' }} src={asset.src} width={50} alt="" />
                        </div>

                        <div className={s.block}>
                            <span style={{ fontSize: '1.1rem' }}>Balance</span>
                            <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                                {formatNumberToo2(asset.value).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div className={s.block}>
                            <span style={{ fontSize: '1.1rem' }}>Range</span>
                            <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                                {asset.range[0]} - {formatNumber(asset.range[1])}
                            </div>
                        </div>

                        <div className={s.block}>
                            <span style={{ fontSize: '1.1rem' }}>APR</span>
                            <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6', color: 'white' }}>
                                {roundToFixed((asset.APY * 100), 10)}%+
                            </div>
                        </div>

                        <div className={s.block}>
                            <span style={{ fontSize: '1.1rem' }}>Reward</span>
                            <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '1' }}>
                                0.000 {asset.name}
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
    )
}
