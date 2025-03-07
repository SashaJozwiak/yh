import { ChangeEvent, useEffect, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
//import { Address } from '@ton/core';

import { Close } from '../../../svgs';
import { useWallet } from '../../../earnStore/wallet';
import { Asset } from '../../../earnStore/types';

import s from './depositUp.module.css'
import { getJettonSendTransactionRequest } from '../../../../utils/transfers/jettonTransfer';
import { useAuth } from '../../../../store/main';
import { useUHSWallet } from '../../../earnStore/UHSWallet';

export const DepositUp = ({ setDepWindow, currentAsset }) => {
    const [amount, setAmount] = useState('');
    const balance = useWallet(state => state.assets);

    const [jettonToTx, setJettonToTx] = useState<Asset | null>(null);

    const [inWallet, setInWallet] = useState(0);

    const [tonConnectUI] = useTonConnectUI();
    const ufAddress = useTonAddress();

    const uhsId = useAuth(state => state.userId)

    const saveTx = useUHSWallet(state => state.saveTx);

    function getReadableBalance(assets: Array<Asset>, currentAssets: Asset) {
        const matchingAsset = assets.find(asset => asset.jetton.address === currentAssets.jetton.address);

        if (matchingAsset) {
            setJettonToTx(matchingAsset)
            const balance = Number(matchingAsset.balance);
            const readableBalance = Number(balance) / Math.pow(10, currentAssets.jetton.decimals);
            return readableBalance; 
        } else {
            return 0;
        }
    }

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

    console.log('assets: ', balance);
    console.log('currentAsset: ', currentAsset);
    console.log('ufAddress: ', ufAddress, typeof ufAddress);

    async function sendJetton(jetton: Asset) {

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
    }

    useEffect(() => {
        const m = getReadableBalance(balance, currentAsset)
        console.log('m:', m, typeof m)
        //const cleanedString = m.replace(/,/g, '');
        setInWallet(m)

    }, [balance, currentAsset])


    console.log('amount: ', amount, typeof amount);

    return (
        <div onClick={() => { setDepWindow(false) }}
            className={s.container}>
            <div
                onClick={(e) => { e.stopPropagation() }}
                className={s.window}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1rem auto' }}>
                    <img width={'50rem'} src={currentAsset.jetton.image} alt="jetton icon" />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ alignContent: 'center', textAlign: 'left' }}>{currentAsset.jetton.symbol}</h2>
                        <p style={{ color: 'lightgray', textAlign: 'left', fontSize: '0.8rem', fontStyle: 'italic' }}>TONwallet: {inWallet.toLocaleString('en', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</p>
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
                <button
                    onClick={() => sendJetton(currentAsset)}
                    disabled={!amount || inWallet < Number(amount)}
                    className={s.depBtn} style={{ margin: '1rem auto', fontSize: '1rem', opacity: !amount || (inWallet < Number(amount)) ? '0.3' : '1' }}>{inWallet < Number(amount) ? 'not enough' : 'Deposit'}</button>
            </div>
        </div>
    )
}
