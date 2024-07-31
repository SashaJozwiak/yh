

import s from './stages.module.css'

export const Stages = () => {
    return (
        <>
            <h2 style={{ paddingTop: '0.6rem', marginTop: '0.6rem' }}>Off-Chain</h2>
            <ul className={s.stagelist}>
                <li className={`${s.listelement} ${s.ok}`}>🟢 Beta launch </li>
                <li className={s.listelement}>🟡 Launch app</li>
                <li className={s.listelement}>⚪ Marketing and partnership</li>
                <li className={s.listelement}>⚪ Collecting liquidity</li>
                <li className={s.listelement}>⚪ Product presentation</li>
                <li className={s.listelement}>⚪ Airdrop</li>
            </ul >
            <h2>On-Chain</h2>
            <ul className={s.stagelist}>
                <li className={s.listelementonchain}>After product presentation...</li>
            </ul>
        </>
    )
}
