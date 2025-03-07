import { ChangeEvent, useState } from 'react'
import { useTonAddress/* , useTonConnectUI */ } from '@tonconnect/ui-react';
//import { Address } from '@ton/core';

import { Close } from '../../../svgs';
import { useWallet } from '../../../earnStore/wallet';
//import { Asset } from '../../../earnStore/types';

import s from './depositUp.module.css'
//import { getJettonSendTransactionRequest } from '../../../../utils/transfers/jettonTransfer';
import { useAuth } from '../../../../store/main';
import { useUHSWallet } from '../../../earnStore/UHSWallet';

const curr = {
    "UHS": "UHS",
    "USD₮": "USDT",
}

export const Withdraw = ({ setWithWindow, currentAsset }) => {
    const [amount, setAmount] = useState('');
    const balance = useWallet(state => state.assets);

    //const [jettonToTx, setJettonToTx] = useState<Asset | null>(null);

    //const [inWallet, setInWallet] = useState(0);

    //const [tonConnectUI] = useTonConnectUI();
    const ufAddress = useTonAddress();

    const uhsId = useAuth(state => state.userId)
    const { withdrawIsLoading, addWithdraw } = useUHSWallet(state => state);

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

    /*     if (amount === null) {
            console.error('Amount is null. Cannot proceed with the transaction.');
            return;
        }
    
        if (uhsId === null) {
            console.error('Amount is null. Cannot proceed with the transaction.');
            return;
        } */

    //console.log('amount: ', amount, typeof amount);

    const addWith = () => {
        console.log('addWith: ', uhsId, curr[currentAsset.jetton.symbol], Number(amount), ufAddress)
        if (uhsId && amount !== '' && ufAddress) {
            addWithdraw(uhsId, curr[currentAsset.jetton.symbol], Number(amount), ufAddress)
            setWithWindow(false)
        }
    }

    return (
        <div onClick={() => { setWithWindow(false) }}
            className={s.container}>
            <div
                onClick={(e) => { e.stopPropagation() }}
                className={s.window}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '1rem auto' }}>
                    <img width={'50rem'} src={currentAsset.jetton.image} alt="jetton icon" />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h2 style={{ alignContent: 'center', textAlign: 'left' }}>{currentAsset.jetton.symbol}</h2>
                        <p style={{ color: 'lightgray', textAlign: 'left', fontSize: '0.8rem', fontStyle: 'italic' }}>UHSwallet: {(currentAsset.balance / 10 ** (currentAsset.jetton.decimals)).toLocaleString('en', {
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
                    <p style={{ width: '45vw', margin: '0 auto', fontSize: '0.6rem', textAlign: 'end' }}>Fee ~$0.15</p>

                </div>

                {!amount || ((currentAsset.balance / 10 ** currentAsset.jetton.decimals) < Number(amount)) && <p style={{ fontStyle: 'italic', color: '#ff8d8d' }}>not enough</p>}

                {!amount || (currentAsset.jetton.symbol === "UHS") && (Number(amount) < 1000) && <p style={{ fontStyle: 'italic', color: '#ff8d8d' }}>minimum 1000 UHS</p>}

                {!amount || (currentAsset.jetton.symbol === "USD₮") && (Number(amount) < 10) && <p style={{ fontStyle: 'italic', color: '#ff8d8d' }}>minimum 10 USD₮</p>}


                <button
                    onClick={() => addWith()}
                    disabled={!amount || ((currentAsset.balance / 10 ** currentAsset.jetton.decimals) < Number(amount)) || (currentAsset.jetton.symbol === "UHS") && (Number(amount) < 1000) || (currentAsset.jetton.symbol === "USD₮") && (Number(amount) < 10)}
                    className={s.depBtn} style={{ margin: '1rem auto', fontSize: '1rem', opacity: !amount || ((currentAsset.balance / 10 ** currentAsset.jetton.decimals) < Number(amount)) || (currentAsset.jetton.symbol === "USD₮") && (Number(amount) < 10) || (currentAsset.jetton.symbol === "UHS") && (Number(amount) < 1000) ? '0.3' : '1' }}>{withdrawIsLoading ? '...' : 'Withdraw'}</button>
            </div>
        </div>
    )
}
