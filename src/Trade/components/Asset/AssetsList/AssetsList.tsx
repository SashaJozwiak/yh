import { useEffect, useState } from "react";

import { useTradeAssets } from "../../../tradeStore/assets";
import { useAuth, useUserData } from "../../../../store/main";

import { useTonAddress } from '@tonconnect/ui-react';

import cat from '../../../pics/1.png';
import s from './assetsList.module.css'
import { useNav } from "../../../../store/nav";
import { useEarnNav } from "../../../../Earn/earnStore/nav";
import { Asset } from "../../../tradeStore/types";
import { Accept } from "./Accept";
import { useUHSWallet } from "../../../../Earn/earnStore/UHSWallet";


const currNum = {
    'USDT': 6,
    'USD₮': 6,
    'UHS': 9
}

const imgs = {
    1: 'cat',
}

//const realCurr = (curr: string) => curr === 'USD₮' ? 'USDT' : 'UHS';

export const AssetsList = () => {
    const myid = useAuth(state => state.userId)
    const lang = useUserData(state => state.user.languageCode)
    const rawAddress = useTonAddress(false);

    const [accept, setAccept] = useState(false);
    const [assetForBuy, setAssetForBuy] = useState<Asset | unknown>({});

    const changeNav = useNav((state) => state.setMainNav)
    const setTool = useEarnNav(state => state.setTool)

    const assets = useTradeAssets(state => state.assets)
    const curr = useTradeAssets(state => state.currency)
    const isLoadAssets = useTradeAssets(state => state.isLoadAssets)
    const getAssets = useTradeAssets(state => state.getAssets)

    const removeAsset = useTradeAssets(state => state.removeAssets)

    const UHSWalletAssets = useUHSWallet(state => state.assets)

    useEffect(() => {
        if (!isLoadAssets) {
            getAssets();
        }
    }, [getAssets, isLoadAssets])

    console.log('my id: ', myid);

    const handleBuy = (asset: Asset) => {
        setAssetForBuy(asset)
        setAccept(true)
    }

    /* const checkButtonActivity = (currency:string, price:string) => {
        //const assetSymbol = asset.currency;
        const realCurrency = currency === 'USD₮' ? 'USDT' : 'UHS';
        const foundAsset = UHSWalletAssets.find(a => a.jetton.symbol === realCurrency);


    }; */

    const isBuyButtonActive = (currency: string, price: string) => {
        const realCurrency = currency === 'USDT' ? 'USD₮' : currency;
        const foundAsset = UHSWalletAssets.find(a => a.jetton.symbol === realCurrency);

        if (foundAsset) {
            const balance = parseInt(foundAsset.balance, 10);
            const priceValue = parseInt(price, 10);

            return balance >= priceValue;
        }

        return false;
    };

    //console.log('isBuyButtonActive', isBuyButtonActive('USD₮', '80000.00'))

    return (
        <div
            style={{ overflowY: 'auto',/*  overflowX: 'hidden',  *//* marginTop: '0.5rem', */ marginBottom: '5rem' }}
        >
            {!isLoadAssets && !assets.filter(asset => curr === asset.currency).length && <p>No assets for sale now</p>}
            {accept && <Accept setAccept={setAccept} assetForBuy={assetForBuy} rawAddress={rawAddress} />}

            {isLoadAssets ? <span className={s.loader}></span> :
                <ul
                    style={{ backgroundColor: 'rgb(58, 70, 88)' }}
                >
                    {assets
                        .filter(asset => curr === asset.currency)
                        .sort((a, b) => Number(a.price) - Number(b.price))
                        .map((asset) => {
                            return (
                                <li key={asset.trade_asset_id} style={{ padding: '0.6rem', listStyle: "none", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: myid === asset.user_id ? '2px solid white' : '2px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', /* width: '90vw' */ }} >
                                        <div>
                                            <h3>{asset.title}</h3>
                                            {imgs[asset.startup_id] ?
                                                <img style={{ display: 'block', width: '3rem', margin: '0 auto' }} src={cat} alt="img" /> :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width={'4rem'} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                                                </svg>
                                            }

                                        </div>

                                        <div>
                                            <h3 style={{ border: '1px solid gray', padding: '0 0.3rem', borderRadius: '0.3rem', color: 'gray' }}>{lang === 'ru' ? 'Доля' : 'Share'}</h3>
                                            <p>{asset.currency}</p>
                                            <p>{(+asset.amount) / 10 ** currNum[asset.currency]}</p>

                                        </div>

                                        <div>
                                            <h3 style={{ border: '1px solid gray', padding: '0 0.3rem', borderRadius: '0.3rem', color: 'gray' }}>APR</h3>
                                            <h3>{asset.apr}%</h3>
                                        </div>

                                        <div>
                                            <h3 style={{ border: '1px solid gray', padding: '0 0.3rem', borderRadius: '0.3rem', color: 'gray' }}>{lang === 'ru' ? 'Цена' : 'Price'}</h3>
                                            <p>{asset.currency}</p>
                                            <p>{(+asset.price) / 10 ** currNum[asset.currency]}</p>
                                        </div>
                                    </div>


                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop: '1px solid gray' }}>
                                        <button
                                            onClick={() => {
                                                changeNav('UHS')
                                                setTool('launch')
                                            }}
                                            style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', padding: '0.3rem 0' }}
                                        >Details</button>
                                        <p style={{ fontStyle: 'italic', opacity: '0.7', alignContent: 'center' }}>{lang === 'ru' ? 'Газ: ' : 'Fee: '}<span style={{ textDecoration: 'line-through', color: 'gray' }}>3 UHS</span> 0 UHS </p>

                                        {myid === asset.user_id ? 
                                            <button
                                                onClick={() => {
                                                    console.log('remove asset: ', asset)
                                                    removeAsset(myid, asset.share_id, rawAddress)
                                                }}
                                                disabled={false}
                                                style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'transparent', border: '1px solid #c15e5e', color: '#c15e5e', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', padding: '0.3rem 0' }}
                                            >{lang === 'ru' ? 'Снять' : 'Remove'}</button> :
                                            <button
                                                disabled={!isBuyButtonActive(asset.currency, asset.price)}
                                                onClick={() => handleBuy(asset)}
                                                style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(22, 163, 74)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', padding: '0.3rem 0', opacity: isBuyButtonActive(asset.currency, asset.price) ? '1' : '0.5' }}
                                            >{lang === 'ru' ? 'Купить' : 'Buy'}</button>}



                                    </div>
                                    {!isBuyButtonActive(asset.currency, asset.price) && myid !== asset.user_id && <p style={{ color: 'gray', fontSize: '0.8rem', marginTop: '-0.8rem', marginLeft: 'auto', fontStyle: 'italic' }}>{lang === 'ru' ? 'не хватает' : 'not enough'}</p>}

                                </li>
                            )
                        })}


                </ul>}

        </div>
    )
}
