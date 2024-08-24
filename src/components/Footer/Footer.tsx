import { useUserData } from '../../store/main';
import { useNav } from '../../store/nav';
import s from './footer.module.css'

export const Footer: React.FC = () => {
    const nav = useNav((state) => state.nav.main)
    const changeNav = useNav((state) => state.setMainNav)
    const userId = useUserData(state => state.user.internalId)

    return (
        <div className={s.footer}>
            <button onClick={() => changeNav('hold')} className={`${s.btn} ${nav === 'hold' ? s.btnOn : null}`}><p>JUST</p>HOLD</button>

            {userId === 1 && <button disabled={false} onClick={() => changeNav('game')} className={`${s.btn} ${nav === 'game' ? s.btnOn : null}`} style={{ /* color: 'gray' */ }}><p>JUST</p>PLAY</button>}

            <button onClick={() => changeNav('bonus')} className={`${s.btn} ${nav === 'bonus' ? s.btnOn : null}`}><p>EARN</p>BONUSES</button>



            {/* <button disabled={true} onClick={() => changeNav('loan')} className={`${s.btn} ${nav === 'loan' ? s.btnOn : null}`} style={{ color: 'gray' }}><p>TOP</p>SECRET</button> */}

            <button onClick={() => changeNav('stage')} className={`${s.btn} ${nav === 'stage' ? s.btnOn : null}`}><p>VIEW</p>STAGE</button>
        </div >
    )
}
