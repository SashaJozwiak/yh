

import { useState } from 'react'
import { useAuth, useUserData } from '../../../../store/main'
import { useTradeAssets } from '../../../tradeStore/assets'
import s from './assetsList.module.css'

const currNum = {
    'USDT': 6,
    'UHS': 9
}

export const Accept = ({ setAccept, assetForBuy, rawAddress }) => {

    const [ok, setOk] = useState(false);

    const userId = useAuth(state => state.userId)
    const lang = useUserData(state => state.user.languageCode)

    const buy = useTradeAssets(state => state.buy)
    const isBuy = useTradeAssets(state => state.isBuy)

    const HandleBuy = () => {
        if (userId) {
            buy(userId, assetForBuy.share_id, rawAddress, setOk)
        }
    }

    console.log('assetForBuy :', assetForBuy)

    return (
        <div
            onClick={() => setAccept(false)}
            className={s.container}>

            <div
                onClick={(e) => { e.stopPropagation() }}
                className={s.window}>

                <h3 style={{ marginBottom: '0.3rem' }}>{assetForBuy.title}</h3>

                {ok ? <h2 style={{ margin: '1rem auto' }}>✔️OK</h2> : isBuy ? <h2 style={{ color: 'gray' }}>Pending...</h2> : <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: 'auto' }}>
                    <div>
                        <h3 style={{ border: '1px solid gray', padding: '0 0.3rem', borderRadius: '0.3rem', color: 'gray' }}>{lang === 'ru' ? 'Доля' : 'Share'}</h3>
                        <p>{assetForBuy.currency}</p>
                        <p>{(+assetForBuy.amount) / 10 ** currNum[assetForBuy.currency]}</p>

                    </div>

                    <div>
                        <h3 style={{ border: '1px solid gray', padding: '0 0.3rem', borderRadius: '0.3rem', color: 'gray' }}>APR</h3>
                        <h3>{assetForBuy.apr}%</h3>
                    </div>

                    <div>
                        <h3 style={{ border: '1px solid gray', padding: '0 0.3rem', borderRadius: '0.3rem', color: 'gray' }}>{lang === 'ru' ? 'Цена' : 'Price'}</h3>
                        <p>{assetForBuy.currency}</p>
                        <p style={{ fontWeight: 'bold', color: 'rgb(22, 163, 74)' }}>{(+assetForBuy.price) / 10 ** currNum[assetForBuy.currency]}</p>

                    </div>
                </div>}

                <div style={{ display: 'flex', justifyContent: 'centernter', gap: '1rem' }}>
                    {!ok && <button
                        onClick={() => HandleBuy()}
                        disabled={isBuy}
                        className={s.depBtn}
                        style={{ margin: '0.5rem auto', fontSize: '1rem', backgroundColor: 'rgb(22, 163, 74)', opacity: isBuy ? '0.5' : '1' }}
                    >
                        {lang === 'ru' ? 'Купить' : 'Buy'}
                    </button>}


                    <button
                        onClick={() => setAccept(false)}
                        disabled={false}
                        className={s.depBtn}
                        style={{ margin: '0.5rem auto', fontSize: '1rem', backgroundColor: 'gray' }}>
                        {lang === 'ru' ? 'Закрыть' : 'Close'}
                    </button>
                </div>


            </div>
        </div>
    )
}
