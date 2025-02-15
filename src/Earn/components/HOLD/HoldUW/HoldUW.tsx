import { useEffect } from 'react'
import { useHoldUH } from '../../../earnStore/hold'

import s from './holduw.module.css'
import { roundToFixed, formatNumber, formatNumberToo2 } from './../../../../utils/formats/bigNumbers';

export const HoldUW = () => {
    const assets = useHoldUH(state => state.assets)
    const updateAssetsUH = useHoldUH(state => state.updateHoldAssets)

    useEffect(() => {
        updateAssetsUH()
    }, [updateAssetsUH])

    return (
        <>
            {assets.filter(asset => asset.value >= asset.range[0]).length <= 0 && <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'gray' }}>not enough assets</div>}

            {assets.filter(asset => asset.value >= asset.range[0]).length > 0 &&

                <ul style={{ overflowY: 'auto',/*  paddingBottom: '1rem', */ margin: '0.6rem', border: '2px solid', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', borderBottomLeftRadius: '0.3rem', borderBottomRightRadius: '0.3rem', backgroundColor: 'rgb(58, 70, 88)' }}>

                    {assets.filter(asset => asset.value >= asset.range[0]).map((asset) => {

                        return (
                            <li key={asset.address} style={{ /* marginBottom: "0.5rem", */ padding: '0.3rem 0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', /* alignItems: 'center', */ backgroundColor: 'rgb(58 70 88)', borderTop: '1px solid gray' }}>
                                <div className={s.block}>
                                    <div>
                                        {asset.name}
                                    </div>
                                    <img style={{ borderRadius: '50%' }} src={asset.src} width={50} alt="" />
                                </div>

                                <div className={s.block}>
                                    <span style={{ fontSize: '1.1rem' }}>Balance</span>
                                    <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                                        {formatNumberToo2(asset.value).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                </div>

                                <div className={s.block}>
                                    <span style={{ fontSize: '1.1rem' }}>Range</span>
                                    <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                                        {asset.range[0]} - {formatNumber(asset.range[1])}
                                    </div>
                                </div>

                                <div className={s.block}>
                                    <span style={{ fontSize: '1.1rem' }}>APY</span>
                                    <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6', color: 'white' }}>
                                        {roundToFixed((asset.APY * 100), 10)}%
                                    </div>
                                </div>

                                <div className={s.block}>
                                    <span style={{ fontSize: '1.1rem' }}>Reward</span>
                                    <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '1' }}>
                                        {((asset.value > asset.range[1] ? asset.range[1] : asset.value) * asset.APY / (365 / 1)).toLocaleString('en', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} {asset.name}
                                    </div>
                                </div>
                            </li>
                        )
                    })}

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* <div style={{ fontSize: '0.8rem', fontStyle: 'italic', padding: '0 0.6rem', alignContent: 'center' }}>Claim:
                {
                    assets
                        .filter(asset => asset.value >= asset.range[0]) // Фильтруем assets
                        .map(asset => {
                            // Ограничиваем asset.value значением asset.range[1], если оно превышено
                            const cappedValue = Math.min(asset.value, asset.range[1]);
                            // Вычисляем доходность для текущего asset
                            const dailyYield = (cappedValue * asset.APY) / 365;
                            // Возвращаем строку с именем asset и его доходностью
                            return ` +${dailyYield.toLocaleString('en', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} ${asset.name} ${asset.name} ${asset.name} ${asset.name}`;
                        })
                        .join(', ') // Объединяем строки через запятую
                }

            </div> */}
                        <button style={{ fontSize: '1.3rem', padding: '0 0.5rem', backgroundColor: 'rgb(71, 85, 105)', color: 'white', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 10px 0px', border: '1px solid lightgray', marginBottom: '0.3rem' }}>Claim all</button>
                    </div>
                </ul>
            }


            <ul>
                {assets.filter(asset => asset.value < asset.range[0]).map((asset) => {
                    return (
                        <li key={asset.address} style={{ marginTop: "0.5rem", padding: '0.3rem 1.2rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', opacity: '0.5' }}>
                            <div className={s.block}>
                                <div>
                                    {asset.name}
                                </div>
                                <img style={{ borderRadius: '50%' }} src={asset.src} width={50} alt="" />
                            </div>

                            <div className={s.block}>
                                <span style={{ fontSize: '1.1rem' }}>Balance</span>
                                <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                                    {formatNumberToo2(asset.value).toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                            </div>

                            <div className={s.block}>
                                <span style={{ fontSize: '1.1rem' }}>Range</span>
                                <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6' }}>
                                    {asset.range[0]} - {formatNumber(asset.range[1])}
                                </div>
                            </div>

                            <div className={s.block}>
                                <span style={{ fontSize: '1.1rem' }}>APY</span>
                                <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '0.6', color: 'white' }}>
                                    {roundToFixed((asset.APY * 100), 10)}%%
                                </div>
                            </div>

                            <div className={s.block}>
                                <span style={{ fontSize: '1.1rem' }}>Reward</span>
                                <div style={{ fontStyle: 'italic', fontSize: '0.8rem', opacity: '1' }}>
                                    0.000 {asset.name}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
