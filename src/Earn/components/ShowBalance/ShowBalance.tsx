import { useState } from "react";
import { useUHSWallet } from "../../earnStore/UHSWallet"
//import { useTonConnectUI } from "@tonconnect/ui-react";
//import { Address, beginCell } from "@ton/ton";

import { Asset } from "../../earnStore/types";

import { DepositUp } from "./windows/DepUp";

//import s from "./showbalance.module.css"

/* const JETTON_WALLET = Address.parse("EQDG4NzL0tLGuobhVBypJlb-HT7JjsKer6drUy4v5OV-NVB4"); // Адрес Jetton Wallet (не Minter!)
const RECIPIENT = Address.parse("UQBgPBEzOvxXzv9k8IMGEGHULcBn4KTnnQSN2HZ7Wz0qUC-8"); // Адрес получателя
const AMOUNT_JETTON = "1.5"; // Количество Jetton
const TON_FEE = "0.05"; // Минимальная комиссия в TON */

export const ShowBalance = () => {

    const UHSWalletAssets = useUHSWallet(state => state.assets)

    //const [tonConnectUI] = useTonConnectUI();

    const [depWindow, setDepWindow] = useState(false);
    const [currentAsset, setCurrentAsset] = useState<Asset | null>(null);

    /* async function sendJetton1() {
        const nanoAmount = +((parseFloat(AMOUNT_JETTON) * 1e9).toFixed(0)); // Перевод в nanoTON
        const tonFeeInNano = parseFloat(TON_FEE) * 1e9; // Преобразование TON_FEE в нано-тонны

        // Создаём payload для Jetton Transfer
        const payload = beginCell()
            .storeUint(0xf8a7ea5, 32) // OP-код transfer
            .storeUint(0, 64) // Query ID (можно 0)
            .storeCoins(nanoAmount) // Количество Jetton
            .storeAddress(RECIPIENT) // Кошелёк получателя
            .storeAddress(null) // Нет кастомного отправителя
            .storeBit(0) // Нет payload'а
            .storeCoins(tonFeeInNano) // Комиссия
            .storeBit(0) // Нет доп. payload'а
            .endCell();

        const transaction = {
            validUntil: Math.floor(Date.now() / 1000) + 60,
            messages: [
                {
                    address: JETTON_WALLET.toString(),
                    amount: tonFeeInNano.toFixed(0), // 0.05 TON на комиссию
                    payload: payload.toBoc().toString("base64"),
                },
            ],
        };

        try {
            await tonConnectUI.sendTransaction(transaction);
            console.log("Jetton отправлен!");
        } catch (error) {
            console.error("Ошибка:", error);
        }
    } */

    async function sendJetton(jetton: Asset) {
        console.log('asset: ', jetton)
        setCurrentAsset(jetton);
        setDepWindow(true);
    }

    return (
        <>
            <h2 style={{ borderBottom: '1px solid gray' }}>Assets</h2>
            <ul style={{ overflowY: 'auto', margin: '0 0 6rem 0', paddingBottom: '1rem' }}>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width={'1.5rem'} fill="none" viewBox="0 -2 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>

                <h2 style={{ marginTop: '1rem', borderBottom: '1px solid gray' }}>Startups</h2>

                <p style={{ margin: '1rem', color: 'gray' }}>You haven't invested yet.</p>

                <button
                    //onClick={() => setIsOpenWallet(!isOpenWallet)}
                    style={{ backgroundColor: 'rgb(71 85 105)', color: 'white', padding: '0.2rem 0.5rem', alignItems: 'center', borderRadius: '0.3rem', boxShadow: '0px 0px 20px 0px rgb(0 0 0 / 50%)', marginTop: '0.5rem', height: '2.5rem', width: '20vw' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={'1.5rem'} fill="none" viewBox="0 -2 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </ul>

            {depWindow && <DepositUp setDepWindow={setDepWindow} currentAsset={currentAsset} />}

        </>
    )
}
