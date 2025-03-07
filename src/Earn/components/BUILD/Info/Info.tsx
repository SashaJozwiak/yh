//import React from 'react'
import { useUserData } from "../../../../store/main"

export const Info = () => {
    const lang = useUserData(state => state.user.languageCode)
    return (
        <div style={{ overflowY: 'auto', marginBottom: '5rem', padding: '0.5rem', textAlign: 'left' }}>
            <p>
                {lang === 'ru' ? 'team1 — основная команда YouHold' : 'team1 — main team'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'team2 — быстроразвивающаяся команда @cog_builds' : 'team2 — fast-growing team @cog_builds'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'Вы можете отправить заявку на разработку своего IT проекта, мы обсудим ваши идеи, посчитаем стоимость разработки. Можно оплатить самостоятельно для полного владения либо привлечь часть средств через раздел Launch, выступив фаундером.' : 'You can send a request to develop your IT project, we will discuss your ideas, calculate the cost of development. You can pay or raise funds through the Launch section, acting as a founder.'}
            </p>
        </div>
    )
}
