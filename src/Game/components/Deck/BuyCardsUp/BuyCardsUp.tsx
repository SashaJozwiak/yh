import { useState } from 'react'
import s from './buycardsup.module.css'
import { useDeck } from '../../../state/deck'
import { useUserData } from '../../../../store/main'

export const BuyCardsUp = ({ setBuyCardsUp }) => {

    const [payOptions] = useState([{ amount: 50, price: 50 }, { amount: 100, price: 100 }, { amount: 500, price: 500 }, { amount: 1000, price: 1000 }, { amount: 5000, price: 5000 }, { amount: 10000, price: 10000 }, /* { amount: 15000, price: 15000 } */])
    const [forBuy, setForBuy] = useState({ amount: 0, price: 0 })
    const [blockBtn, setBlockBtn] = useState(false);

    const userId = useUserData(state => state.user.internalId)
    const userLang = useUserData(state => state.user.languageCode)
    const buy = useDeck(state => state.buyRandomCards)

    const handleBuyuy = () => {
        setBlockBtn(true)
        console.log('test')
        buy(forBuy, userId);
        setBuyCardsUp(false);
    }

    return (
        <div className={s.container}>
            <div onClick={e => e.stopPropagation()} className={s.window}>


                <h2 style={{ color: 'gray',/*  marginBottom: '1rem', */ marginTop: '1vh' }}>{userLang === 'ru' ? 'Количество карт' : 'Number of cards'}</h2>
                <ul style={{ marginBottom: '1rem' }}>
                    {payOptions.map((option, index: number) => (
                        <li
                            onClick={() => setForBuy(option)}
                            style={{ backgroundColor: option.amount === forBuy.amount ? 'rgb(75, 94, 121)' : 'transparent', padding: '1vh 0', fontWeight: 'normal',/* color: '#CC9900' */ }}
                            key={index}>
                            {option.amount} Gray Cards = {option.price}⭐
                        </li>))}
                </ul>

                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1vh 1vh' }}>
                    <button
                        onClick={() => setBuyCardsUp(false)}
                        style={{/*  display: 'flex', position: 'absolute', bottom: '1vh', left: '1vh', */ backgroundColor: 'rgb(93 121 160)', height: '2rem', width: '30vw', borderRadius: '0.3rem', opacity: '1', }}
                    >{userLang === 'ru' ? 'Отмена' : 'Cancel'}
                    </button>

                    <button
                        onClick={() => handleBuyuy()}
                        disabled={forBuy.price === 0 || blockBtn}

                        style={{ /* display: 'flex', position: 'absolute', bottom: '1vh', right: '1vh', */ backgroundColor: 'rgb(93 121 160)', height: '2rem', width: '30vw', borderRadius: '0.3rem', opacity: forBuy.price === 0 ? '0.5' : blockBtn ? '0.5' : '1', fontWeight: 'bold', }}
                    >{userLang === 'ru' ? 'Выбрать' : 'Choose'}
                    </button>
                </div>
            </div>


        </div>
    )
}
