import { useState } from 'react'
import { useUserData } from '../../../../store/main'
import { useArena } from '../../../state/mainArena'
import { usePlayCard } from '../../../state/playCard'
import s from '../../Arena/PopUp/winpopup.module.css'

export const EAReward = () => {
    //const { UH, B, cards } = usePlayCard(state => state.forSave)
    const [blockBtn, setBlockBtn] = useState(false);

    const userId = useUserData(state => state.user.internalId)
    const getReward = useArena(state => state.getReward)

    const toggleReward = usePlayCard(state => state.toggleReward)

    const getEaReward = () => {
        setBlockBtn(true)
        getReward(userId, 5000, 2000, 20);
        toggleReward(false);
    }

    console.log('userId EAReward: ', userId)

    return (
        <div className={s.container}>
            <div className={s.window}>
                <h2 style={{ padding: '1rem' }}>EA Reward</h2>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div> <h2>UH</h2> <h2>5000</h2></div>
                    <div> <h2 >B</h2> <h2>2000</h2></div>
                    <div> <h2>Cards</h2><h2>20</h2></div>
                </div>
                <p style={{ margin: '1.9rem' }}>

                    Congratulations! You early user of <b>YouHold</b> Game.
                    <span style={{ display: 'block', marginTop: '1rem' }}>Claim your reward.</span>
                </p>
                <button
                    onClick={getEaReward}
                    disabled={blockBtn}
                    className={s.btnok}
                    style={{ height: '5vh', borderRadius: '1rem', margin: '1rem' }}
                ><h3>Claim</h3></button>
            </div>
        </div>
    )
}
