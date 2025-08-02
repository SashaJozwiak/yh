import { ChangeEvent, useEffect, /* useEffect, */ useState } from 'react'
import { /*useTonAddress , useTonConnectUI */ } from '@tonconnect/ui-react';
//import { Address } from '@ton/core';

import { Close } from '../../../../svgs';
//import { useWallet } from '../../../../earnStore/wallet';
import { useUHSWallet } from '../../../../earnStore/UHSWallet';
//import { Asset } from '../../../../earnStore/types';

import s from './invest.module.css'
import { Asset } from '../../../../earnStore/types';
//import { getJettonSendTransactionRequest } from '../../../../../utils/transfers/jettonTransfer';
import { useAuth } from '../../../../../store/main';
import { useStartupStore } from '../../../../earnStore/launch';
//import { useUHSWallet } from '../../../../earnStore/UHSWallet';
import { useTonAddress } from '@tonconnect/ui-react';

const curr = {
    "UHS": "UHS",
    "USD₮": "USDT",
}

export const Invest = ({ setInvestWindow, id, name, need, collected }) => {
    const [amount, setAmount] = useState('');
    const [currentAsset, setCurrentAsset] = useState('UHS')
    const [currentFullAsset, setCurrentFullAsset] = useState<Asset>();
    const [checkBalance, setCheckBalance] = useState(0);

    const [sumNeed, setSumNeed] = useState(0);

    const rawAddress = useTonAddress(false);

    const balanceUH = useUHSWallet(state => state.assets);
    const userId = useAuth(state => state.userId);
    const { addIsLoading, addInvest, addInvestForStars } = useStartupStore(state => state)


    //const [jettonToTx, setJettonToTx] = useState<Asset | null>(null);
    //const [inWallet, setInWallet] = useState(0);
    //const [tonConnectUI] = useTonConnectUI();
    //const ufAddress = useTonAddress();

    //const saveTx = useUHSWallet(state => state.saveTx);

    /* function getReadableBalance(assets: Array<Asset>, currentAssets: Asset) {
        const matchingAsset = assets.find(asset => asset.jetton.address === currentAssets.jetton.address);

        if (matchingAsset) {
            setJettonToTx(matchingAsset)
            const balance = Number(matchingAsset.balance);
            const readableBalance = Number(balance) / Math.pow(10, currentAssets.jetton.decimals);
            return readableBalance;
        } else {
            return 0;
        }
    } */

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formattedValue = value.replace(/[^0-9.]/g, '');
        const parts = formattedValue.split('.');
        if (parts.length > 2) {
            return;
        }
        setAmount(formattedValue);
    };

    const handleClear = () => {
        setAmount('');
    };

    console.log('assets: ', balanceUH);
    //console.log('currentAsset: ', currentAsset);
    //console.log('ufAddress: ', ufAddress, typeof ufAddress);

    /*  async function sendJetton(jetton: Asset) {
 
         if (amount === null) {
             console.error('Amount is null. Cannot proceed with the transaction.');
             return;
         }
 
         if (uhsId === null) {
             console.error('Amount is null. Cannot proceed with the transaction.');
             return;
         }
 
 
         const currency = jetton.jetton.symbol;
         const amountForDb = Number(amount) * Math.pow(10, jetton.jetton.decimals);
         console.log('asset: ', uhsId, typeof uhsId, currency, amountForDb);
         saveTx(uhsId, ufAddress, currency, amountForDb);
 
         setDepWindow(false)
 
         try {
             if (!jettonToTx) return;
             const transaction = getJettonSendTransactionRequest(jettonToTx, amount, 'UQCErfaAo0Hv2UWW8oWYb3LllMjLZGmVtV_yu3SJwolV95tD', ufAddress);
 
             console.log('transaction: ', uhsId, transaction)
 
             tonConnectUI.sendTransaction(transaction)
                 .then(() => {
                     //setError(null);
                     //onClose();
                     console.log('transaction then')
                 })
                 .catch((e: unknown) => {
                     if (e instanceof Error) {
                         console.log("Transaction failed: ", e.message)
                     } else {
                         console.log("Transaction failed: ", String(e))
                     }
                 });
         } catch (e: unknown) {
             if (e instanceof Error) {
                 console.log("Unexpected error occurred: ", e.message);
             } else {
                 console.log("Unexpected error occurred: ", String(e));
             }
         }
     } */

    /* useEffect(() => {
        const m = getReadableBalance(balance, currentAsset)
        console.log('m:', m, typeof m)
        //const cleanedString = m.replace(/,/g, '');
        setInWallet(m)

    }, [balance, currentAsset]) */

    const sendInvest = () => {
        //console.log('sendInvest: ', userId, id, currentAsset, Number(amount), ((Number(amount) * Number(currentFullAsset?.priceUsd))), need)
        if (userId) {
            addInvest(userId, id, currentAsset, Number(amount), ((Number(amount) * Number(currentFullAsset?.priceUsd))), need, rawAddress)
        }
        setInvestWindow(false);

    }

    const sendInvestForStars = () => {

        if (userId) {
            addInvestForStars(userId, id, 'UHS', Math.round(Number(amount)), ((Number(amount) * 0.02)), need, rawAddress)
        }
        setInvestWindow(false);

    }

    useEffect(() => {
        const curAsset = balanceUH.find(asset => curr[asset.jetton.symbol] === currentAsset)
        if (curAsset) {
            console.log('curBallance: ', curAsset)
            setCurrentFullAsset(curAsset)
        }

        if (curAsset && currentAsset === 'UHS') {
            setCheckBalance(Number(curAsset.balance) / 10 ** 9)
        } else if (curAsset) {
            setCheckBalance(Number(curAsset.balance) / 10 ** 6)
        }

    }, [balanceUH, currentAsset])

    useEffect(() => {
        if (need && collected) {
            setSumNeed(Number(need) - Number(collected))
        }
    }, [collected, need])

    console.log('amount: ', amount, typeof amount);
    console.log('currentFullAsset: ', currentFullAsset)

    return (
        <div onClick={() => { setInvestWindow(false) }}
            className={s.container}>
            <div
                onClick={(e) => { e.stopPropagation() }}
                className={s.window}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1rem auto' }}>
                    {/* <img width={'50rem'} src={currentAsset.jetton.image} alt="jetton icon" /> */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <h2 style={{ marginBottom: '0.5rem' }}>{name}</h2>
                            <button
                                onClick={() => setCurrentAsset('UHS')}
                                className={`${s.tabs} ${currentAsset === 'UHS' ? s.ontab : null}`}
                                style={{ alignContent: 'center', textAlign: 'left', fontSize: '1.5rem' }}><span style={{ display: 'block', marginBottom: '0.2rem' }}>UHS</span></button>
                            <button
                                onClick={() => setCurrentAsset('USDT')}
                                className={`${s.tabs} ${currentAsset === 'USDT' ? s.ontab : null}`}
                                style={{ alignContent: 'center', textAlign: 'left', fontSize: '1.5rem' }}><span style={{ display: 'block', marginBottom: '0.2rem' }}>USDT</span></button>
                            <button
                                onClick={() => setCurrentAsset('STARS')}
                                className={`${s.tabs} ${currentAsset === 'STARS' ? s.ontab : null}`}
                                style={{ alignContent: 'center', textAlign: 'left', fontSize: '1.5rem' }}><span style={{ display: 'block', marginBottom: '0.2rem' }}>⭐!</span></button>
                        </div>

                        {currentAsset === 'STARS' ? <p style={{ color: 'lightgray', textAlign: 'left', fontSize: '0.8rem', fontStyle: 'italic', marginTop: '0.5rem' }}>100⭐ = ~200UHS</p> : <p style={{ color: 'lightgray', textAlign: 'left', fontSize: '0.8rem', fontStyle: 'italic', marginTop: '0.5rem' }}>In UHwallet: {checkBalance.toFixed(2)} {currentAsset}</p>}

                    </div>
                </div>

                <div style={{ alignItems: 'center', width: '70vw' }}>

                    <input
                        style={{
                            margin: '0 0 auto',
                            height: '3rem',
                            width: '45vw',
                            textAlign: 'center',
                            background: 'transparent',
                            borderRadius: '1rem',
                            fontSize: '2rem',
                            color: 'white',
                            outline: 'none',
                            boxShadow: 'inset rgba(0, 0, 0, 0.5) 0px 0px 20px 0px'
                        }}
                        onChange={handleChange}
                        value={amount ?? ''}
                        autoComplete='off'
                        placeholder='       0.00'
                        pattern="^\d*(\.\d{0,2})?$"
                        type="text"
                    />
                    {amount && (<button
                        onClick={handleClear}
                        style={{ position: 'absolute', margin: '0 0 auto', background: 'transparent', height: '3rem', width: '2rem', fontSize: '1.5rem' }}>
                        {<Close />}
                    </button>)}

                </div>
                {currentAsset === 'STARS' ?
                    <h4 style={{ marginTop: '0.5rem', color: 'lightgray' }}>In USD: ~${(Number(amount) * 0.02 || 0).toFixed(2)} </h4>
                    : <h4 style={{ marginTop: '0.5rem', color: 'lightgray' }}>In USD: ${(Number(amount) * Number(currentFullAsset?.priceUsd) || 0).toFixed(2)} </h4>}

                {currentAsset === 'STARS' ?
                    <div>
                        {!amount || (Number(amount) * 0.02 < 4.99) && <p style={{ fontStyle: 'italic', color: '#ff8d8d' }}>minimum required $5</p>}
                        {!amount || (Number(amount) * 0.02 > 500) && <p style={{ fontStyle: 'italic', color: '#ff8d8d' }}>maximum possible $500</p>}

                        {!amount || ((Number(amount) * 0.02) > Number(sumNeed)) && <p style={{ fontStyle: 'italic', color: '#ff8d8d' }}>maximum left ${sumNeed}</p>}

                    </div> :



                    <div>
                        {!amount || (Number(amount) * Number(currentFullAsset?.priceUsd) < 4.99) && <p style={{ fontStyle: 'italic', color: '#ff8d8d' }}>minimum required $5</p>}
                        {!amount || (Number(amount) * Number(currentFullAsset?.priceUsd) > 500) && <p style={{ fontStyle: 'italic', color: '#ff8d8d' }}>maximum possible $500</p>}

                        {!amount || (Number(amount) > checkBalance) && <p style={{ fontStyle: 'italic', color: '#ff8d8d' }}>not enough {currentAsset}</p>}

                        {!amount || ((Number(amount) * Number(currentFullAsset?.priceUsd)) > Number(sumNeed)) && <p style={{ fontStyle: 'italic', color: '#ff8d8d' }}>maximum left ${sumNeed}</p>}
                    </div>
                }

                {currentAsset === 'STARS' ?
                    <button
                        onClick={() => sendInvestForStars()}
                        /* disabled={
                            !amount || (Number(amount) * 0.02 < 5) || (Number(amount) * 0.02 > 500) || (Number(amount) * 0.02) > Number(sumNeed) || addIsLoading
                        } */
                        disabled={false}
                        className={s.depBtn} style={{ margin: '1rem auto', fontSize: '1rem', padding: '0.5rem 1rem', backgroundColor: 'rgb(22 163 74)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', opacity: !amount || (Number(amount) * 0.02 < 5) || (Number(amount) * 0.02 > 500) || (Number(amount) * 0.02) > Number(sumNeed) || addIsLoading ? '0.5' : '1' }}>{addIsLoading ? '...' : 'soon'}</button>
                    :
                    <button
                        onClick={() => sendInvest()}
                        disabled={!amount || (Number(amount) * Number(currentFullAsset?.priceUsd) < 5) || (Number(amount) * Number(currentFullAsset?.priceUsd) > 500) || (Number(amount) > checkBalance) || (Number(amount) * Number(currentFullAsset?.priceUsd)) > Number(sumNeed) || addIsLoading}
                        className={s.depBtn} style={{ margin: '1rem auto', fontSize: '1rem', padding: '0.5rem 1rem', backgroundColor: 'rgb(22 163 74)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', opacity: !amount || (Number(amount) * Number(currentFullAsset?.priceUsd) < 5) || (Number(amount) * Number(currentFullAsset?.priceUsd) > 500) || (Number(amount) > checkBalance) || (Number(amount) * Number(currentFullAsset?.priceUsd)) > Number(sumNeed) || addIsLoading ? '0.5' : '1' }}>{addIsLoading ? '...' : 'Buy'}</button>}
            </div>
        </div >
    )
}
