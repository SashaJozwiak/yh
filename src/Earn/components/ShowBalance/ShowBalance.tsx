import { useUHSWallet } from "../../earnStore/UHSWallet"

//import s from "./showbalance.module.css"

export const ShowBalance = () => {

    const UHSWalletAssets = useUHSWallet(state => state.assets)

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
                            <button style={{ backgroundColor: 'rgb(71, 85, 105)', border: '1px solid gray', borderRadius: '0.3rem', marginBottom: '0.5rem', padding: '0.3rem', fontWeight: 'normal', fontSize: '1rem' }}>deposit</button>
                            <button style={{ backgroundColor: 'rgb(71, 85, 105)', border: '1px solid gray', borderRadius: '0.3rem', padding: '0.3rem', fontWeight: 'normal', fontSize: '1rem' }}>withdraw</button>
                        </div>
                    </li>

                ))}
                <button
                    //onClick={() => setIsOpenWallet(!isOpenWallet)}
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




        </>
    )
}
