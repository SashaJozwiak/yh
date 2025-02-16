//import { useUserData } from '../../store/main';
import { useAuth } from '../../store/main';
import { useNav } from '../../store/nav';
import s from './footer.module.css'

export const Footer: React.FC = () => {
    const nav = useNav((state) => state.nav.main)
    const changeNav = useNav((state) => state.setMainNav)
    //const userId = useUserData(state => state.user.internalId)

    const isAuth = useAuth(state => state.userId)

    return (
        <div className={s.footer}>
            <button onClick={() => changeNav('hold')} className={`${s.btn} ${nav === 'hold' ? s.btnOn : null}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={'2rem'} className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
                <p>HOLD</p>
            </button>

            <button
                disabled={!isAuth}
                style={{ opacity: !isAuth ? '0.5' : '1' }}
                onClick={() => changeNav('earn')}
                className={`${s.btn} ${nav === 'earn' ? s.btnOn : nav === 'UHS' ? s.btnOn : null}`}>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width={'2rem'} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>

                <p>EARN</p>
            </button>

            {/* <button disabled={true} onClick={() => changeNav('loan')} className={`${s.btn} ${nav === 'loan' ? s.btnOn : null}`} style={{ color: 'gray' }}><p>TOP</p>SECRET</button> */}

            <button disabled={false} onClick={() => changeNav('game1')} className={`${s.btn} ${nav === 'game' ? s.btnOn : null}`} style={{ border: '1px solid white' }} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" width={'2rem'} className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
                <p style={{ color: 'white' }}>GAME</p>
            </button>

            <button onClick={() => changeNav('invite')} className={`${s.btn} ${nav === 'invite' ? s.btnOn : null}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={'2rem'} className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>

                <p>FRENS</p>
            </button>




            <button onClick={() => changeNav('stage')} className={`${s.btn} ${nav === 'stage' ? s.btnOn : null}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} width={'2rem'} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
                <p>R-MAP</p></button>
        </div >
    )
}
