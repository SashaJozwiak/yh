import { useEarnNav } from "../../earnStore/nav";
import { Plus, Question } from "../../svgs";

import { HoldTW } from './HoldTW/HoldTW';

import s from './hold.module.css'


export const HOLD = () => {
    const { hold, setHold } = useEarnNav(state => state)

    return (
        < /* style={{ overflowY: 'auto' }} */>
            <header style={{ display: 'flex', justifyContent: 'space-between'/* , border: '1px solid' */ }}>
                <button style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>
                    <div><Question /></div>
                    <div>info</div>
                </button>

                <div style={{ display: 'flex', }}>
                    <div className={s.switch}>
                        <button onClick={() => setHold('twallet')} className={`${s.tabs} ${hold === 'twallet' ? s.ontab : null}`}>{hold === 'twallet' ? '🔵 Ton Wallet' : '⚪ Ton Wallet'}</button>
                        <button onClick={() => setHold('uwallet')} className={`${s.tabs} ${hold == 'uwallet' ? s.ontab : null}`}>{hold === 'uwallet' ? '🟢 UH Wallet' : '⚪ UH Wallet'}</button>
                    </div>
                </div>

                <button style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>
                    <div><Plus /></div>
                    <div>add</div>
                </button>
            </header>

            {hold === 'twallet' && <HoldTW />}

        </>
    )
}
