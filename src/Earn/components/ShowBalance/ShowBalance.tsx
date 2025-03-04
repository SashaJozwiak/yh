import { useEffect, useState } from "react";
import { useUHSWallet } from "../../earnStore/UHSWallet"
//import { useTonConnectUI } from "@tonconnect/ui-react";
//import { Address, beginCell } from "@ton/ton";

import { Asset } from "../../earnStore/types";

import { DepositUp } from "./windows/DepUp";
import { History } from "./history/History";

//import s from "./showbalance.module.css"


export const ShowBalance = () => {
    const UHSWalletAssets = useUHSWallet(state => state.assets)

    const [depWindow, setDepWindow] = useState(false);
    const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);

    const [history, setHistory] = useState<boolean>(false);

    async function sendJetton(jetton: Asset) {
        console.log('asset: ', jetton)
        setCurrentAsset(jetton);
        setDepWindow(true);
    }

    const [isDisabled, setIsDisabled] = useState(true);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        let timer;
        if (isDisabled) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        setIsDisabled(false);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isDisabled]);

    const handleClick = () => {
        if (!isDisabled) {
            setHistory((prev) => !prev);
            if (history) {
                setIsDisabled(true);
                setCountdown(5);
            }

        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 0.6rem' }}>
                <button
                    style={{ width: '5rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', marginBottom: '0.5rem', padding: '0.3rem', fontWeight: 'normal', fontSize: '1rem', fontStyle: 'italic' }}>
                    Buy UHS</button>
                <h2 style={{ borderBottom: '1px solid gray' }}>{history ? 'History' : 'Assets'}</h2>

                {/* {history && <button
                    style={{ width: '2rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', marginBottom: '0.5rem', padding: '0.3rem', fontWeight: 'normal', fontSize: '1rem', fontStyle: 'italic' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={'1rem'} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>} */}


                <button
                    onClick={handleClick}
                    disabled={isDisabled}
                    //onClick={() => setHistory(prev => !prev)}
                    style={{ width: '5rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', marginBottom: '0.5rem', padding: '0.3rem', fontWeight: 'normal', fontSize: '1rem', fontStyle: 'italic', position: 'relative' }}>
                    {history ? <svg xmlns="http://www.w3.org/2000/svg" width={'1rem'} fill="none" viewBox="0 -2 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg> : 'History'}
                    {isDisabled && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '0.3rem',
                                color: 'white',
                                fontSize: '1rem',
                            }}
                        >
                            <span style={{ color: 'lightgray' }}>{countdown}</span>
                        </div>
                    )}
                </button>
            </div>

            {history && <History />}

            {!history && <ul style={{ overflowY: 'auto', margin: '0 0 6rem 0', paddingBottom: '1rem' }}>
                {UHSWalletAssets.map((asset, index) => (
                    <li key={index} style={{ marginBottom: "0.5rem", padding: '0.3rem 0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', alignItems: 'center', /* border: '1px solid gray', */ /* borderRadius: '0.3rem',  */backgroundColor: 'rgb(58 70 88)', /* boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 50%)', */ borderTop: '1px solid gray', borderBottom: '1px solid gray' }}>
                        <div>
                            <div>
                                {asset.jetton.symbol}
                            </div>
                            <img style={{ borderRadius: '50%' }} src={asset.jetton.image} width={50} alt="" />
                        </div>

                        <div>
                            <span style={{ fontSize: '1.1rem' }}>{Number((Number(asset.balance) / (10 ** asset.jetton.decimals)).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} {asset.jetton.symbol}</span>

                            <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                                ~ {Number((Number(asset.balance) / (10 ** asset.jetton.decimals) * (asset.priceUsd ?? 0)).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} USD</div>

                            {/* {asset.jetton.symbol === 'UHS' && <button
                                style={{ backgroundColor: 'rgb(71, 85, 105)', border: '1px solid gray', borderRadius: '0.3rem', marginTop: '0.3rem', padding: '0.1rem 0.5rem', fontWeight: 'normal', fontSize: '1rem' }}
                            >buy/sell</button>} */}

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <button
                                onClick={() => sendJetton(asset)}
                                style={{ backgroundColor: 'rgb(71, 85, 105)', border: '1px solid gray', borderRadius: '0.3rem', marginBottom: '0.5rem', padding: '0.3rem', fontWeight: 'normal', fontSize: '1rem' }}>deposit</button>
                            <button style={{ backgroundColor: 'rgb(71, 85, 105)', border: '1px solid gray', borderRadius: '0.3rem', padding: '0.3rem', fontWeight: 'normal', fontSize: '1rem' }}>withdraw</button>
                        </div>
                    </li>

                ))}
                <button
                    //onClick={() => sendJetton(asset)}
                    style={{ backgroundColor: 'rgb(71 85 105)', color: 'white', padding: '0.2rem 0.5rem', alignItems: 'center', borderRadius: '0.3rem', boxShadow: '0px 0px 20px 0px rgb(0 0 0 / 50%)', height: '2.5rem', width: '20vw' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={'1.5rem'} fill="none" viewBox="0 -2 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>

                <h2 style={{ marginTop: '1rem', borderBottom: '1px solid gray' }}>Startups</h2>

                <p style={{ margin: '1rem', color: 'gray' }}>You haven't invested yet.</p>

                <button
                    //onClick={() => setIsOpenWallet(!isOpenWallet)}
                    style={{ backgroundColor: 'rgb(71 85 105)', color: 'white', padding: '0.2rem 0.5rem', alignItems: 'center', borderRadius: '0.3rem', boxShadow: '0px 0px 20px 0px rgb(0 0 0 / 50%)', marginTop: '0.5rem', height: '2.5rem', width: '20vw' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={'1.5rem'} fill="none" viewBox="0 -2 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </ul>}

            {depWindow && <DepositUp setDepWindow={setDepWindow} currentAsset={currentAsset} />}

        </>
    )
}
