import { useState, useEffect } from 'react';
import { useStonFi, useJettonsBalances, useUserBalances, useUserData, useDedust } from '../../../store/main'
import { useNav } from '../../../store/nav';

import WebApp from '@twa-dev/sdk';
import s from './list.module.css'

const formatNumber = (num: number) => {

    if (num > 999999) {
        return `${Math.floor(num / 1000000)}kk`;
    }

    if (num > 999) {
        return `${Math.floor(num / 1000)}k`;
    }

    return num.toLocaleString('ru');
};

export const List: React.FC = () => {
    const [showButton, setShowButton] = useState(false);

    const userId = useUserData(state => state.user.internalId);
    const rawAddress = useUserData(state => state.user.rawAddress);

    const balance = useUserBalances(state => state.bal)
    const balanceJ = useJettonsBalances(state => state.jettons)
    const balancePoolsSF = useStonFi(state => state.pools);
    const balancePoolsDD = useDedust(state => state.pools);

    const getBonuses = useUserBalances((state) => state.getBonuses);

    const updateSpeed = useUserBalances((state) => state.updateSpeed);
    const updateSpeedJ = useJettonsBalances((state) => state.updateSpeedJ);
    const updateSpeedSF = useStonFi(state => state.updateSpeedSF);
    const updateSpeedDD = useDedust(state => state.updateSpeedDD);

    const loadStatus = useJettonsBalances(state => state.loadStatus);
    const loadStatusSFPools = useStonFi(state => state.loadStatus)
    const loadStatusDDPools = useDedust(state => state.loadStatus)

    const nav = useNav(state => state.nav.list)

    useEffect(() => {
        balance.forEach((currency) => {
            const calculatedSpeed = currency.value < currency.range[1] ? ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH) : ((currency.range[1] - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);

            const finishSpeed = calculatedSpeed > 0.00 ? calculatedSpeed : 0.00;
            if (currency.speed !== finishSpeed) {
                updateSpeed(currency.name, finishSpeed);
            }
        });
    }, [balance, updateSpeed]);

    //console.log('loadStatus: ', loadStatus);

    useEffect(() => {
        balanceJ.forEach((currency) => {
            const calculatedSpeed = currency.value < currency.range[1] ? ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH) : ((currency.range[1] - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            const finishSpeed = calculatedSpeed > 0.00 ? calculatedSpeed : 0.00;
            //console.log('finish speed: ', finishSpeed)
            if (currency.speed !== finishSpeed) {
                updateSpeedJ(currency.name, finishSpeed);
            }
        });
    }, [balanceJ, updateSpeedJ]);

    useEffect(() => {
        balancePoolsSF.forEach((currency) => {
            const calculatedSpeed = currency.value < currency.range[1] ? ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH) : ((currency.range[1] - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            const finishSpeed = calculatedSpeed > 0.00 ? calculatedSpeed : 0.00;
            //console.log('finish speed: ', finishSpeed)
            if (currency.speed !== finishSpeed) {
                updateSpeedSF(currency.name, finishSpeed);
            }
        });
    }, [balancePoolsSF, updateSpeedSF]);

    useEffect(() => {
        balancePoolsDD.forEach((currency) => {
            const calculatedSpeed = currency.value < currency.range[1] ? ((currency.value - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH) : ((currency.range[1] - currency.range[0]) / (currency.range[1] - currency.range[0]) * currency.inH);
            const finishSpeed = calculatedSpeed > 0.00 ? calculatedSpeed : 0.00;
            //console.log('finish speed: ', finishSpeed)
            if (currency.speed !== finishSpeed) {
                updateSpeedDD(currency.name, finishSpeed);
            }
        });
    }, [balancePoolsDD, updateSpeedDD]);

    const handleScrollUp = () => {
        const scrollElement = document.querySelector('.scrollable');
        if (scrollElement) {
            scrollElement.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollElement = document.querySelector('.scrollable');
            if (scrollElement) {
                setShowButton(scrollElement.scrollTop > 20); // Показывать кнопку, если прокрутили на 100px вниз
            }
        };

        const scrollElement = document.querySelector('.scrollable');
        if (scrollElement) {
            scrollElement.addEventListener('scrollable', handleScroll);
            return () => scrollElement.removeEventListener('scrollable', handleScroll);
        }
    }, []);

    //console.log('balance: ', balance, 'balanceJ: ', balanceJ);

    useEffect(() => {
        if (userId && userId !== 0) {
            getBonuses();
        }
    }, [getBonuses, userId])

    //console.log('balance:', balance)

    return (
        <div className={`${s.list} scrollable`}>
            {/* {balance.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).length > 0 && <h3 style={{ color: 'lightgray', borderBottom: '2px dashed', width: '4rem', margin: '0 auto' }}>Holds</h3>} */}
            {balance.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).map((currency) => {
                return (
                    <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(25,180,21)' : nav ? 'white' : 'lightgrey' }}>
                        <h4 className={s.currname}>{currency.name}</h4>
                        <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> {(currency.name).toLowerCase()}</div>
                        <div style={{ color: 'rgb(25,180,21)' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/h</div>
                        <div className={s.progressbar}>
                            <div className={s.progress} style={{ width: `${((currency.speed) / currency.inH) * 100}%` }}></div>
                        </div>
                        <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}</div>
                        {currency.name !== 'BONUS' && <button
                            onClick={(e) => {
                                e.preventDefault();
                                //window.location.href = currency.src;
                                WebApp.openTelegramLink(currency.src);

                            }}
                            className={s.news}>news</button>}
                        <div className={s.range1}>till {formatNumber(currency.inH)}/h</div>
                    </div>
                );
            })}

            {
                loadStatus ? <span className={s.loader}></span> : rawAddress ? balanceJ.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).map((currency) => {
                    return (
                        <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(25,180,21)' : nav ? 'white' : 'lightgrey' }}>
                            <h4 className={s.currname}>{currency.name}</h4>
                            <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> {(currency.name).toLowerCase()}</div>
                            <div style={{ color: 'rgb(25,180,21)' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/h</div>
                            <div className={s.progressbar}>
                                <div className={s.progress} style={{ width: `${((currency.speed) / currency.inH) * 100}%` }}></div>
                            </div>
                            <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}</div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    //window.location.href = currency.src;
                                    WebApp.openTelegramLink(currency.src);
                                }}
                                className={s.news}>news</button>
                            <div className={s.range1}>till {formatNumber(currency.inH)}/h</div>
                        </div>
                    );
                }) : <h2 className={s.connectwallet}>Connect your wallet!</h2>
            }

            {balancePoolsSF.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).length > 0 && rawAddress && <h3 style={{ color: 'lightgray', borderBottom: '2px solid', width: '8rem', margin: '0 auto' }}>Stonfi Pools</h3>}
            {rawAddress &&
                balancePoolsSF.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).map((currency) => {
                    return (
                        <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(25,180,21)' : nav ? 'white' : 'lightgrey' }}>
                            <h4 className={s.currname}>{currency.name}</h4>
                            <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> Lp</div>
                            <div style={{ color: 'rgb(25,180,21)' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/h</div>
                            <div className={s.progressbar}>
                                <div className={s.progress} style={{ width: `${((currency.speed) / currency.inH) * 100}%` }}></div>
                            </div>
                            <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}Lp</div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    //window.location.href = currency.src;
                                    window.open(currency.src);
                                }}
                                className={s.news}>pool</button>
                            <div className={s.range1}>till {formatNumber(currency.inH)}/h</div>
                        </div>
                    )
                })}

            {balancePoolsDD.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).length > 0 && rawAddress && <h3 style={{ color: 'lightgray', borderBottom: '2px solid', width: '8rem', margin: '0 auto' }}>DeDust Pools</h3>}
            {rawAddress &&
                balancePoolsDD.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).map((currency) => {
                    return (
                        <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(25,180,21)' : nav ? 'white' : 'lightgrey' }}>
                            <h4 className={s.currname}>{currency.name}</h4>
                            <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> Lp</div>
                            <div style={{ color: 'rgb(25,180,21)' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/h</div>
                            <div className={s.progressbar}>
                                <div className={s.progress} style={{ width: `${((currency.speed) / currency.inH) * 100}%` }}></div>
                            </div>
                            <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}Lp</div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    //window.location.href = currency.src;
                                    window.open(currency.src);
                                }}
                                className={s.news}>pool</button>
                            <div className={s.range1}>till {formatNumber(currency.inH)}/h</div>
                        </div>
                    )
                })}

            {(loadStatusSFPools || loadStatusDDPools) && (
                <div>
                    <p className={s.loading}>...</p>
                </div>
            )}

            {showButton && <div
                onClick={handleScrollUp}
                className={s.goTop}
            >↑</div>}
        </div>
    )
}
