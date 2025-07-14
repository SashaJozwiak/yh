import { ChangeEvent, useState } from "react"
import { useUHSWallet } from "../../../../Earn/earnStore/UHSWallet"
//import { Close } from "../../../../Earn/svgs"
import { useAuth, useUserData } from "../../../../store/main"
import { useTradeAssets } from "../../../tradeStore/assets"

import { useTonAddress } from '@tonconnect/ui-react';


const currNum = {
    'USDT': 6,
    'UHS': 9
}

export const Sell = () => {
    const [amounts, setAmounts] = useState<Record<number, string>>({});

    const lang = useUserData(state => state.user.languageCode)
    const userId = useAuth(state => state.userId)
    const rawAddress = useTonAddress(false);

    const { shares } = useUHSWallet(state => state)

    const currency = useTradeAssets(state => state.currency)
    const addAssets = useTradeAssets(state => state.addAssets)

    //
    const assetsAtTrade = useTradeAssets(state => state.assets)



    const handleChange = (e: ChangeEvent<HTMLInputElement>, shareId: number) => {
        const value = e.target.value;
        const formattedValue = value.replace(/[^0-9.]/g, '');
        const parts = formattedValue.split('.');
        if (parts.length <= 2) {
            setAmounts(prev => ({
                ...prev,
                [shareId]: formattedValue
            }));
        }
    };

    const handleSell = (startupId: number, shareId: number) => {
        if (amounts[shareId] && userId) {
            const numSharedId = Number(shareId)
            const price = Number(amounts[shareId]);
            addAssets(userId, startupId, numSharedId, price, rawAddress)
        }
    }

    console.log('assetsAtTrade: ', assetsAtTrade)
    return (

        <div
            style={{ overflowY: 'auto',/*  overflowX: 'hidden',  *//* marginTop: '0.5rem', */ marginBottom: '5rem' }}
        >
            {!shares.filter(share => share.currency === currency).length && <p>You have no assets.</p>}
            {shares
                .filter(share => share.currency === currency &&
                    !assetsAtTrade.some(asset => asset.share_id === share.id))
                .map((share) => {
                    return (
                        <li key={share.id} style={{ marginBottom: "0.5rem", padding: '0.3rem 0.6rem', listStyle: "none", /* display: 'flex', */ /* justifyContent: 'space-between', */ alignItems: 'center', backgroundColor: 'rgb(58 70 88)', borderTop: '1px solid gray', borderBottom: '1px solid gray' }}>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <p style={{ color: 'gray' }}>{lang === 'ru' ? 'Название' : 'Title'}</p>
                                    <p>{share.startup_id === 1 ? 'Dive Cat' : share.startup_id === 2 ? 'Balls' : 'UH Game'}</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <p style={{ color: 'gray' }}>{lang === 'ru' ? 'Доля' : 'Share'}</p>
                                    <p>{+share.amount / 10 ** currNum[share.currency]} {share.currency}</p>
                                </div>

                                {/* <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <p style={{ color: 'gray' }}>{lang === 'ru' ? 'Всего' : 'Total'}</p>
                                <p>${share.total_shares}</p>
                            </div> */}

                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <p style={{ color: 'gray' }}>APR</p>
                                    <p>{share.startup_id === 1 ? '21%' : '12%'}</p>
                                </div>
                            </div>


                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', alignContent: 'center', marginTop: '0.5rem' }}>
                                <h4 style={{ alignContent: 'center' }}>{share.currency}: </h4>
                                <input
                                    style={{
                                        margin: 'auto 0 auto',
                                        height: '1.5rem',
                                        width: '45vw',
                                        textAlign: 'center',
                                        background: 'transparent',
                                        borderRadius: '1rem',
                                        fontSize: '1rem',
                                        color: 'white',
                                        outline: 'none',
                                        boxShadow: 'inset rgba(0, 0, 0, 0.5) 0px 0px 20px 0px',

                                    }}
                                    onChange={(e) => handleChange(e, share.id)}
                                    value={amounts[share.id] ?? ''}
                                    autoComplete='off'
                                    placeholder='       0.00'
                                    pattern="^\d*(\.\d{0,2})?$"
                                    type="text"
                                />
                                {/* {amount &&  (<button
                                onClick={handleClear}
                                style={{ position: 'absolute', margin: '0 0 auto', background: 'transparent', height: '3rem', width: '2rem', fontSize: '1.5rem' }}>
                                {<Close />}
                            </button>)} */}

                                <button
                                    onClick={() => handleSell(share.startup_id, share.id)}
                                    disabled={!amounts[share.id]}
                                    style={{ width: '5rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(22, 163, 74)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', padding: '0.3rem 0', opacity: !amounts[share.id] ? '0.5' : '1' }}
                                >{lang === 'ru' ? 'Продать' : 'Sell'}</button>
                            </div>

                        </li>
                    )
                })}
        </div>
    )
}
