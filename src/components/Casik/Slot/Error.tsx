import { useSlotStore } from './store/slot'
import s from './error.module.css'

export const Error = () => {

    const setError = useSlotStore(state => state.setError)

    return (
        <div
            onClick={() => setError(false)}
            className={s.container}>
            <div className={s.window}>
                <h2 style={{ padding: '1rem' }}>Error</h2>
                <button
                    onClick={() => setError(false)}
                    className={s.btnok}
                    style={{ height: '5vh', borderRadius: '1rem', margin: '0.5rem', padding: '0 0.5rem' }}
                >
                    <h3>OK</h3>
                </button>
            </div>
        </div>
    )
}
