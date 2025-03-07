//import React from 'react'
import { useUserData } from "../../../../store/main"

export const Info = () => {
    const lang = useUserData(state => state.user.languageCode)
    return (
        <div style={{ overflowY: 'auto', marginBottom: '5rem', padding: '0.5rem', textAlign: 'left' }}>
            <p>
                {lang === 'ru' ? 'TON Wallet — ваш подключенный TON кошелек.' : 'TON WALLET — a wallet connected to the TON application.'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'UH Wallet — инвестиционный YouHold кошелек.' : 'UH Wallet — investment YouHold wallet.'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'APR — годовая процентная ставка без учета сложных процентов, реальная доходность выше. В случае с фармом на UH Wallet сложные проценты работают автоматически (больше награды с увеличивающегося баланса). Все награды сразу приходят на UH Wallet.' : 'APR — annual interest rate excluding compound interest, the real yield is higher. In the case of farming on the UH Wallet, compound interest works automatically (more reward from an increasing balance).All rewards come to the UH wallet.'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'Откуда берется заработок?' : 'Where does the income come from?'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'Помимо сторонних проектов, каждый инструмент YouHold предполагает платные услуги, которыми можно воспользоваться: добавить свой токен, добавить свое задание, запустить сбор для стартапа или заказать его разработку. Проценты будут меняться в зависимости от состоянии дел.' : 'In addition to third-party projects, each YouHold tool involves paid services that you can use: add your token, add your task, launch your startup or order the development of your project. The percentages will change depending on the state of affairs'}
            </p>
        </div>
    )
}
