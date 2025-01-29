
import { useUserData } from '../../../../../store/main'
import s from './elka.module.css'

export const CityHall = ({ setOpenWindow, selectedLocation }) => {
    const userLang = useUserData(state => state.user.languageCode)

    return (
        <div
            onClick={() => {
                setOpenWindow(false)
            }}
            className={s.container}>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={s.window}>
                <h2 style={{ color: selectedLocation.color }}>Square</h2>
                <h3 style={{ padding: '0 0.5rem' }}>{userLang === 'ru' ? 'Нет мероприятий в настоящее время' : 'There are no events at the moment'}</h3>
                {/* <h3 style={{ padding: '0 0.5rem' }}>{userLang === 'ru' ? 'С Новым годом!' : 'Happy New Year!'}</h3> */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpenWindow('');
                    }}
                    style={{ backgroundColor: 'rgb(93 121 160)', marginTop: '1rem', padding: '0.5rem 0' }}
                ><h2>{userLang === 'ru' ? 'ок' : 'ok'}</h2>
                </button>
            </div>
        </div>
    )
}
