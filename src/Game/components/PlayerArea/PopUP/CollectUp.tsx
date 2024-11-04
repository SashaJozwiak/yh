import { usePlayCard } from '../../../state/playCard'
import s from '../../Arena/PopUp/winpopup.module.css'

export const CollectUp: React.FC = () => {

    const { UH, B, cards } = usePlayCard(state => state.forSave)
    const toggleCollect = usePlayCard(state => state.toggleCollect)

    return (
        <div className={s.container}>
            <div className={s.window}>
                <h2 style={{ padding: '1rem' }}>For saving</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div> <h2>UH</h2> {UH}</div>
                    <div> <h2>B</h2> {B}</div>
                    <div> <h2>Cards</h2>{cards}</div>
                </div>
                <p style={{ margin: '1rem' }}>All collected values are transferred to your balance and saved after every <b>10th floor.</b></p>
                <button
                    onClick={() => toggleCollect(false)}
                    className={s.btnok}
                    style={{ height: '5vh', borderRadius: '1rem', margin: '1rem' }}
                ><h3>OK</h3></button>
            </div>
        </div>
    )
}
