import { useUserData } from "../../../../store/main"

export const Info = () => {
    const lang = useUserData((state) => state.user.languageCode)

    return (
        <div style={{ overflowY: 'auto', marginBottom: '5rem', padding: '0.5rem', textAlign: 'left' }}>
            <p>
                {lang === 'ru' ? 'web2 — IT проекты без криптовалют.' : 'web2 — IT projects without cryptocurrencies.'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'web3 — криптовалютные и блокейн проекты не ограничивающиеся TON блокчейном.' : 'web3 — cryptocurrency and blockchain projects not limited to TON blockchain.'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'Вы можете проинвестировать в стартапы, которые YouHold сопровождает и выступает гарантом. В карточке каждого стартапа есть полоса сбора средств, сколько дней до окончания сбора и % страхования от YouHold (подробнее об этом можно почитать в описании каждого стартапа по кнопке).' : 'You can invest in projects that YouHold supports and acts as a guarantor. In the shortcut of each startup there is a fundraising strip, how many days until the end of the collection, and % insurance from YouHold (you can read more about this in the description of each startup by clicking on the button).'}
            </p>

            <p style={{ marginTop: '1rem' }}>
                {lang === 'ru' ? 'По кнопке "Add" вы можете в роли фаундера отправить заявку на сбор средств для своего стартапа.' : 'By clicking on the "Add" button, you can, as a founder, send an application to raise funds for your startup.'}
            </p>
        </div>
    )
}
