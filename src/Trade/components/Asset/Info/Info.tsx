import { useUserData } from "../../../../store/main"

export const Info = () => {
    const lang = useUserData((state) => state.user.languageCode)

    return (
        <div style={{ overflowY: 'auto', marginBottom: '5rem', padding: '0.5rem', textAlign: 'left' }}>
            <p>
                {lang === 'ru' ? 'Добро пожаловать на свободный рынок активов. Здесь можно приобрести или продать доли. У каждого актива отображается годовая доходность (APR).' : 'Welcome to the free asset market. Here you can sell share or buy. Each asset displays the annual return (APR).'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'APR меняется раз в месяц после очередной выплаты процентов (~каждое 10 число). APR меняется в зависимости от успехов проекта/сезонности/публикаций на новых площадках (в случае с играми)/etc..' : 'APR changes once a month after the next interest payment (~every 10th). APR changes depending on the success of the project/seasonality/publications on new platforms (in the case of games)/etc..'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'Полный список проектов с их актуальным статусом, этапом, ссылками на них - можно найти в разделе EARN => во вкладке LAUNCH. Там же можно приобрести доли проектов по их номинальной стоимости пока они на этапе сбора средств.' : 'A full list of projects with their current status, stage, links to them - can be found in the section in the EARN section => in the LAUNCH tab. There you can also buy shares of projects at their nominal value while they are at the fundraising stage.'}
            </p>
        </div>
    )
}
