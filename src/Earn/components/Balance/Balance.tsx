import { useEffect, useState } from 'react'

import s from './balance.module.css'
import { useEarnNav } from '../../earnStore/nav'
import { useUHSWallet } from '../../earnStore/UHSWallet'
import { useTradeAssets } from '../../../Trade/tradeStore/assets'
import { useAuth } from '../../../store/main'

import { useTonAddress/* , useTonConnectUI */ } from '@tonconnect/ui-react';

export const Balance = () => {
    //const [loading] = useState(false)
    const uhsId = useAuth(state => state.userId)
    const rawAddress = useTonAddress(false);

    const { isOpenWallet, setIsOpenWallet } = useEarnNav(state => state);
    const { assets, status, shares } = useUHSWallet(state => state);
    const readyTrade = useTradeAssets(state => state.setReady)
    const giftHB = useTradeAssets(state => state.giftHB)
    const setGiftHB = useTradeAssets(state => state.setGiftHB)

    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        if (!assets || assets.length === 0) return;

        const total = assets.reduce((sum, asset) => {
            const balanceInUnits = Number(asset.balance) / (10 ** asset.jetton.decimals);
            const balanceFormatted = Number(balanceInUnits.toFixed(2)); // Округление до 2 знаков
            const assetValue = balanceFormatted * (asset.priceUsd ?? 0);
            return sum + assetValue;
        }, 0);

        const totalShares = shares.reduce((sum, share) => sum + Number(share.shares), 0);

        setTotalValue(total + totalShares);
        readyTrade();

    }, [assets, readyTrade, shares]);

    useEffect(() => {
        if (!giftHB && uhsId && rawAddress) {
            setGiftHB(uhsId, rawAddress);
        }
    }, [giftHB, rawAddress, setGiftHB, uhsId])


    return (
        <div className={s.balance}>
            {totalValue < 10000 && <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="50.000000pt" height="50.000000pt" viewBox="0 0 250.000000 250.000000">
                <g transform="translate(0.000000, 210.000000) scale(0.100000,-0.100000)"
                    fill="lightgray" stroke="none">
                    <path d="M350 1550 c-65 -22 -130 -86 -148 -147 -9 -29 -12 -179 -12 -529 0
                        -470 1 -491 21 -534 24 -54 43 -75 91 -106 67 -43 136 -46 832 -42 711 4 681
                        2 755 64 19 15 44 51 57 79 20 43 24 66 24 157 l0 107 31 18 c63 37 69 60 69
                        264 0 205 -7 231 -70 264 l-30 16 0 110 c0 71 -5 121 -14 143 -24 57 -83 113
                        -142 136 -53 19 -74 20 -732 20 -637 -1 -680 -2 -732 -20z m1447 -61 c79 -30
                        112 -98 113 -231 l0 -98 -162 0 c-150 0 -167 -2 -213 -24 -183 -85 -224 -326
                        -77 -458 77 -69 89 -73 280 -76 l172 -4 0 -94 c0 -134 -24 -185 -104 -226 -38
                        -19 -61 -20 -725 -22 -684 -1 -686 -1 -726 20 -49 27 -70 49 -90 97 -23 55
                        -23 959 0 1015 20 46 51 81 90 98 39 17 1397 20 1442 3z m180 -413 l28 -24 0
                        -170 c0 -231 19 -214 -235 -210 -196 3 -197 3 -239 31 -161 107 -112 349 79
                        388 19 4 103 7 187 8 147 1 153 0 180 -23z"/>
                    <path d="M1607 969 c-23 -13 -47 -62 -47 -95 0 -40 59 -94 104 -94 54 0 98 43
                        100 99 1 36 -4 47 -32 72 -34 31 -89 39 -125 18z m77 -62 c28 -21 12 -59 -22
                        -55 -30 3 -41 30 -22 53 15 18 21 19 44 2z"/>
                </g>
                <text x="35" y="110" fill='white' fontWeight="bold" fontSize='42'>🟢</text>
            </svg>}
            <p>{status === 'loading' ? <span className={s.loader}></span> : <span>{(totalValue).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<span style={{ fontSize: '1rem' }}> USD</span></span>}</p>

            {/* {status === 'loading' ? (
                <span className={s.loader}></span>
            ) : (
                (() => {
                    const formatted = (totalValue).toLocaleString('en', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
                    const mainPart = formatted.slice(0, -1); // всё кроме последнего символа
                    const lastChar = formatted.slice(-1);    // последний символ

                    return (
                        <span>
                            {mainPart}
                            <span style={{ color: 'gray', fontSize: '1rem', }}>{lastChar}</span>
                            <span style={{ fontSize: '1rem', marginLeft: '4px' }}>USD</span>
                        </span>
                    );
                })()
            )} */}
            <button
                onClick={() => setIsOpenWallet(!isOpenWallet)}
                style={{ backgroundColor: 'rgb(71 85 105)', color: 'white', padding: '0.2rem 0.5rem', alignItems: 'center', borderRadius: '0.3rem', boxShadow: '0px 0px 20px 0px rgb(0 0 0 / 50%)', height: '2.5rem', marginLeft: '1rem', border: isOpenWallet ? '1px solid white' : '1px solid transparent' }}>

                {isOpenWallet ? <svg xmlns="http://www.w3.org/2000/svg" width={'1.5rem'} fill="none" viewBox="0 -2 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" width={'1.5rem'} fill="none" viewBox="0 -2 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                }
            </button>
        </div>
    )
}
