import { Plus, Close, Question } from '../../../Earn/svgs'
import { useTradeAssets } from '../../tradeStore/assets'
import { useTradeNav } from '../../tradeStore/nav'

import s from './assets.module.css'
import { AssetsList } from './AssetsList/AssetsList'
import { Info } from './Info/Info'
import { Sell } from './Sell/Sell'

export const Assets = () => {

    const assetsNav = useTradeNav(state => state.assetsNav)
    const setAssetsNav = useTradeNav(state => state.setAssetsNav)

    const curr = useTradeAssets(state => state.currency)
    const setCurrency = useTradeAssets(state => state.setCurrency)

    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                    onClick={assetsNav === 'info' ? () => setAssetsNav('assets') : () => setAssetsNav('info')}
                    style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', border: assetsNav === 'info' ? '1px solid #bbbbbb' : '1px solid transparent' }}>
                    <div>{assetsNav === 'info' ? <Close /> : <Question />}</div>
                    <div>info</div>
                </button>

                {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={s.switch}>
                        <h3>Project assets</h3>
                    </div>
                </div> */}

                <div style={{ display: 'flex', }}>
                    <div className={s.switch}>
                        <button onClick={() => setCurrency('UHS')} className={`${s.tabs} ${curr === 'UHS' ? s.ontab : null}`}>{curr === 'UHS' ? '🟢 UHS' : '⚪ UHS'}</button>
                        <button onClick={() => setCurrency('USDT')} className={`${s.tabs} ${curr == 'USDT' ? s.ontab : null}`}>{curr === 'USDT' ? '🔵 USDT' : '⚪ USDT'}</button>
                    </div>
                </div>

                <button
                    onClick={assetsNav === 'sell' ? () => setAssetsNav('assets') : () => setAssetsNav('sell')}
                    style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', border: assetsNav === 'sell' ? '1px solid #bbbbbb' : '1px solid transparent' }}>
                    <div>{assetsNav === 'sell' ? <Close /> : <Plus />}</div>
                    <div>sell</div>
                </button>
            </header>

            <>
                {assetsNav === 'info' && <Info />}
                {assetsNav === 'sell' && <Sell />}
                {assetsNav === 'assets' && <AssetsList />}
                {/* {assetsNav === 'web3' && <h3 style={{ color: 'gray' }}>No web3 startups now</h3>} */}
            </>


        </>
    )
}
