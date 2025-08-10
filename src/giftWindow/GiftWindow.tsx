

import { useUserData } from '../store/main'
import { useTradeAssets } from '../Trade/tradeStore/assets'
import s from './giftwindow.module.css'

export const GiftWindow = () => {

    const lang = useUserData(state => state.user.languageCode)
    const setGiftWindow = useTradeAssets(state => state.setGiftWindow)

    return (
        <div className={s.container}>
            <div className={s.window}>
                <h2 style={{ padding: '1rem' }}>Take 🥳 Gift</h2>
                <h2 style={{ color: 'rgb(22, 163, 74)', boxShadow: '4px 4px 100px 100px rgba(40, 114, 48, 0.2)' }}>+1.23 USDT</h2>
                <div style={{ padding: '1rem' }}>
                    {lang === 'ru' ? 'Спасибо, что остаетесь с нами!' : 'Thanks for sticking with us'}

                </div>
                <button
                    className={s.depBtn}
                    style={{ margin: '1rem auto' }}
                    onClick={() => setGiftWindow()}
                >
                    OK
                </button>
            </div>
        </div>
    )
}
