import { useUserData } from '../../../../store/main'
import { usePlayCard } from '../../../state/playCard'
import s from '../../Arena/PopUp/winpopup.module.css'

export const CollectUp: React.FC = () => {

    const { UH, B, cards } = usePlayCard(state => state.forSave)
    const toggleCollect = usePlayCard(state => state.toggleCollect)
    const lang = useUserData(state => state.user.languageCode)

    console.log(lang)

    return (
        <div className={s.container}>
            <div className={s.window}>
                <h2 style={{ padding: '1rem' }}>Save system</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div> <h2>UH</h2> {UH}</div>
                    <div> <h2>B</h2> {B}</div>
                    <div> <h2>Cards</h2>{cards}</div>
                </div>
                {lang === 'ru' ? <p style={{ margin: '1rem' }}>После каждого <b>10 этажа (босса)</b> все собранные здесь активы переводятся на постоянный баланс, а игровой прогресс сохраняется.</p> : <p style={{ margin: '1rem' }}>After every <b>10th floor (boss)</b>, all assets collected here are transferred to a permanent balance and game progress is saved.</p>}

                <button
                    onClick={() => toggleCollect(false)}
                    className={s.btnok}
                    style={{ height: '5vh', borderRadius: '1rem', margin: '1rem' }}
                ><h3>OK</h3></button>
            </div>
        </div>
    )
}
