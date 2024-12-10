
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
                <h2 style={{ color: selectedLocation.color }}>City Hall</h2>
                <h3 style={{ padding: '0 0.5rem' }}>{userLang === 'ru' ? 'Мэрия ушла на новогодние каникулы и возобновит свою работу в январе 2025 года.' : 'The City Hall has gone on holiday break and will resume its work in January 2025.'}</h3>
                <h3 style={{ padding: '0 0.5rem' }}>{userLang === 'ru' ? 'С Наступающим Новым годом!' : 'Happy New Year!'}</h3>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setOpenWindow('');
                    }}
                    style={{ backgroundColor: 'rgb(93 121 160)', marginTop: '1rem', padding: '0.5rem 0' }}
                ><h2>{userLang === 'ru' ? 'С Наступающим!' : 'Happy New Year!'}</h2>
                </button>

            </div>
        </div>
    )
}
