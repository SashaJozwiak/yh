
import WebApp from '@twa-dev/sdk'
import { useUserData } from '../../../../store/main'
import s from './deckinfo.module.css'
export const DeckInfo = ({ setDeckInfo }) => {

    const userLang = useUserData(state => state.user.languageCode)

    return (
        <div
            onClick={() => setDeckInfo(false)}
            className={s.container}>
            {/* containter */}
            <div onClick={e => e.stopPropagation()} className={s.window}>
                <div
                    style={{ padding: '0 2vw' }}
                ><h2 style={{ marginTop: '1vh' }}>{userLang === 'ru' ? 'Коллекция карт' : 'Collection of cards'}</h2>
                    <p style={{ color: 'gray', fontSize: '1rem' }}>{userLang === 'ru' ? 'Серые карты выпадают в игре или ещё их можно купить за звезды' : 'Gray cards are dropped in the game or can be purchased for stars'}</p></div>

                <div style={{ padding: '0 2vw', display: 'flex', flexDirection: 'column', gap: '1vh' }}>
                    {/* <div>
                        <p style={{ color: 'gray', fontSize: '1rem' }}>{userLang === 'ru' ? 'Серые карты выпадают в игре или покупаются за звезды' : '10 grey cards → 1 bronze'}</p>
                    </div> */}
                    {/* <br /> */}
                    <div>
                        <h3>{userLang === 'ru' ? 'Как улучшаются?' : 'How to level up'}</h3>
                        <p>{userLang === 'ru' ? '10 серых → 1 бронзовая' : '10 grey cards → 1 bronze'}</p>
                        <p>{userLang === 'ru' ? '10 бронзовых → 1 серебряная' : '10 bronze cards → 1 silver'}</p>
                        <p>{userLang === 'ru' ? '10 серебряных → 1 золотая' : '10 silver cards → 1 gold card'}</p>
                    </div>
                    <br />

                    <div>
                        <h3>{userLang === 'ru' ? 'Для чего?' : 'For what?'}</h3>
                        <p>— {userLang === 'ru' ? 'Увеличивает айрдроп' : 'Increase the airdrop size'};</p>
                        <p>— {userLang === 'ru' ? 'снижают комиссию за переводы UH в чатах' : 'all card classes reduce fees for UH transfers in chats'} ;</p>
                        <p>— {userLang === 'ru' ? 'за золотую карту можно приобрести город на карте мира, а позже заклеймить за ним NFT' : 'for a gold card you can buy a city on the world map and later mint NFT'}.</p>
                        {/* <p>— {userLang === 'ru' ? 'фан' : 'fun'} ☺</p> */}
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        if (userLang === 'ru') {
                            WebApp.openTelegramLink('https://t.me/youhold_chat/2340/2351')
                        } else {
                            WebApp.openTelegramLink('https://t.me/youhold_chat/2340/2350')
                        }

                    }}
                    style={{ backgroundColor: 'rgb(93 121 160)', height: '2rem', width: '30vw', borderRadius: '0.3rem', fontWeight: 'bold', margin: '0 auto', marginBottom: '1vh' }}>{userLang === 'ru' ? 'Больше инфо' : 'More info'}</button>
            </div>
        </div>
    )
}
