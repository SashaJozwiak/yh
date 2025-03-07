import WebApp from "@twa-dev/sdk";
import { useUserData } from "../../../../store/main"


export const Add = () => {
    const lang = useUserData(state => state.user.languageCode)

    return (
        <>
            <h3 style={{ margin: '0.6rem' }}>
                {lang === 'ru' ? 'Вы можете отправить заявку на запуск сбора и сопровождения для вашего стартапа.' : 'You can submit an app to start collecting and supporting your startup.'}
            </h3>

            <button
                onClick={() => {
                    WebApp.openLink('https://forms.gle/GUeodWoxFeVJJa5u8');
                }}
                style={{ fontSize: '1rem', margin: '0.6rem', padding: '0.5rem 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>
                {lang === 'ru' ? 'Отправить заявку' : 'Submit a request'}
            </button>
        </>

    )
}
