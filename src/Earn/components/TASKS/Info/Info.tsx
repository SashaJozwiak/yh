//import React from 'react'
import { useUserData } from "../../../../store/main"

export const Info = () => {
    const lang = useUserData(state => state.user.languageCode)
    return (
        <div style={{ overflowY: 'auto', marginBottom: '5rem', padding: '0.5rem', textAlign: 'left' }}>
            <p>
                {lang === 'ru' ? 'Easy — легкие задания для телеграма с проверкой подписки.' : 'Easy — easy tasks for telegram with subscription verification.'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'Hard — более сложные  и дорогие задания с подтверждениями (будут позже).' : 'Hard — more complex and expensive tasks with confirmations (will be later).'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'По кнопке "Go" вы переходите к выполнению, по кнопке "Check" проверяется выполнение. Все награды приходят на UH Wallet.' : 'By clicking the "Go" button, you proceed to execution, by clicking the "Check" button, the completion is checked. All rewards come to the UH Wallet.'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'По кнопке "Add" можно добавить своё задание за UHS или USDT, комиссия ~$0.01 за выполнение помимо награды для подписчика. Можно добавить от 500 выполнений.' : 'By clicking the Add button, you can add your own task for UHS or USDT, the commission is ~$0.01 for completion in addition to the reward for the subscriber. You can add from 500 completions.'}
            </p>
        </div>
    )
}
