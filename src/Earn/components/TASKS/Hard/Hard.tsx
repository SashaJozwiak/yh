import { useEffect, useState } from "react"
import { useAuth, useUserData, /* useUserData */ } from "../../../../store/main"
import useInviteStore from "../../../earnStore/UHS_invites"
import { useWallet } from "../../../earnStore/wallet"


import s from "./hard.module.css"
import { useUHSWallet } from "../../../earnStore/UHSWallet"

export const Hard = () => {
    const UHSId = useAuth(state => state.userId)
    const lang = useUserData(state => state.user.languageCode) 

    const { status, inviteData, fetchMy, updateLevels } = useInviteStore(state => state)

    const { assets } = useWallet(state => state)
    const UHSAssets = useUHSWallet(state => state.assets)
    const { shares } = useUHSWallet(state => state)

    const [checkProcess, setCheckProcess] = useState<boolean>(false);

    const handleCheck = (lvl: number) => {
        //checkHardTask(UHSId, lvl)
        setCheckProcess(true);
        if (lvl === 1) {
            const UHS_ADDRESS = "0:3c4aac2fb4c1dee6c0bacbf86505f6bc7c31426959afd34c09e69ef3eae0dfcc";
            const USDT_ADDRESS = "0:b113a994b5024a16719f69139328eb759596c38a25f59028b146fecdc3621dfe";

            let total = 0;

            for (const item of assets) {
                const { address } = item.jetton;
                const rawBalance = BigInt(item.balance);

                if (address === UHS_ADDRESS) {
                    // UHS: * 10^9 * 100
                    const adjusted = Number(rawBalance) / 1e9;
                    console.log('uhs: ', adjusted)
                    total += Number(adjusted) / 100;
                }

                if (address === USDT_ADDRESS) {
                    // USDT: * 10^6
                    const adjusted = Number(rawBalance) / 1e6;
                    total += Number(adjusted);
                }
            }
            console.log('total: ', total);
            if (total >= 10 && UHSId) {
                updateLevels(UHSId, 1)
            }

        }

        if (lvl === 2) {
            const total = UHSAssets.reduce((sum, asset) => {
                const balanceInUnits = Number(asset.balance) / (10 ** asset.jetton.decimals);
                const balanceFormatted = Number(balanceInUnits.toFixed(2)); // Округление до 2 знаков
                const assetValue = balanceFormatted * (asset.priceUsd ?? 0);
                return sum + assetValue;
            }, 0);

            const totalShares = shares.reduce((sum, share) => sum + Number(share.shares), 0);

            if (total + totalShares >= 10 && UHSId) {
                updateLevels(UHSId, 2)
            }
        }

        if (lvl === 3 && shares.length > 0 && UHSId) {
            updateLevels(UHSId, 3)
        }
        setTimeout(() => { setCheckProcess(false) }, 1500)
    };

    useEffect(() => {
        if (inviteData === null && UHSId) {
            console.log('fetch hard tasks')
            fetchMy(UHSId)
        }
    }, [UHSId, fetchMy, inviteData])

    //console.log('UHSId:', typeof UHSId)
    //console.log('inviteData:', inviteData)
    //console.log('shares:', shares)

    return (
        <>
            {status === 'loading' ? <span style={{ margin: '2vh auto' }} className={s.loader}></span> : <div style={{ color: 'gray', overflowY: 'auto', /* marginTop: '0.5rem', */ marginBottom: '5rem' }}>
                <ul style={{ backgroundColor: 'rgb(58, 70, 88)' }}>
                    <li style={{ padding: '0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.3rem', color: inviteData?.lvl1 ? 'gray' : 'white' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>TON wallet balance (Lvl1)</h3>
                            </div>

                            <p style={{ fontStyle: 'normal', fontWeight: '400', fontSize: '1rem', textAlign: 'left' }}>
                                {lang === 'ru' ? 'На твоем TON кошельке в сумме USDT и UHS больше чем на $10' : 'Your total TON-wallet balance USDT + UHS more than $10'}

                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', color: 'white' }}>
                            <span style={{ border: '1px solid', padding: '0 0.1rem', borderRadius: '0.3rem', margin: '0.3rem 0', fontSize: '0.8rem', color: inviteData?.lvl1 ? 'gray' : 'white' }}>+10 UHS</span>
                            <div style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>{inviteData?.lvl1 ? '🟢' : '🟡'}
                            </div>
                            <button
                                onClick={() => {
                                    handleCheck(1)
                                }}
                                disabled={inviteData?.lvl1 || checkProcess}
                                style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', fontWeight: 'bold', color: inviteData?.lvl1 || checkProcess ? 'gray' : 'white' }}>Check</button>
                        </div>
                    </li>

                    {/* 2 */}

                    <li style={{ padding: '0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.3rem', color: inviteData?.lvl2 ? 'gray' : 'white' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>UH wallet balance (Lvl2)</h3>
                            </div>

                            <p style={{ fontStyle: 'normal', fontWeight: '400', fontSize: '1rem', textAlign: 'left' }}>
                                {lang === 'ru' ? 'На твоем UH-кошельке в сумме USDT и UHS больше чем на $10' : 'Your total UH-wallet balance more than $10'}
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', color: 'white' }}>
                            <span style={{ border: '1px solid', padding: '0 0.1rem', borderRadius: '0.3rem', margin: '0.3rem 0', fontSize: '0.8rem', color: inviteData?.lvl2 ? 'gray' : 'white' }}>+20 UHS</span>
                            <div style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>{inviteData?.lvl2 ? '🟢' : '🟡'}
                            </div>
                            <button
                                onClick={() => {
                                    handleCheck(2)
                                }}
                                disabled={inviteData?.lvl2 || checkProcess}
                                style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', fontWeight: 'bold', color: inviteData?.lvl2 || checkProcess ? 'gray' : 'white' }}>Check</button>
                        </div>

                    </li>

                    {/* 3 */}

                    <li style={{ padding: '0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.3rem', color: inviteData?.lvl3 ? 'gray' : 'white' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>Invest in LAUNCH (Lvl3)</h3>
                            </div>

                            <p style={{ fontStyle: 'normal', fontWeight: '400', fontSize: '1rem', textAlign: 'left' }}>
                                {lang === 'ru' ? 'Вы инвестировали в разделе LAUNCH в любой проект' : 'You invested in any project in the LAUNCH section'}
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', color: 'white' }}>
                            <span style={{ border: '1px solid', padding: '0 0.1rem', borderRadius: '0.3rem', margin: '0.3rem 0', fontSize: '0.8rem', color: inviteData?.lvl3 ? 'gray' : 'white' }}>+40 UHS</span>
                            <div style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>{inviteData?.lvl3 ? '🟢' : '🟡'}
                            </div>
                            <button
                                onClick={() => {
                                    handleCheck(3)
                                }}
                                disabled={inviteData?.lvl3 || checkProcess}
                                style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', fontWeight: 'bold', color: inviteData?.lvl3 || checkProcess ? 'gray' : 'white' }}>Check</button>
                        </div>
                    </li>
                </ul>
            </div>}
        </>
    )
}
