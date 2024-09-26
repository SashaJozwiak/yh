import { /* useState, */ useEffect } from 'react';
import { useStonFi, useJettonsBalances, useUserBalances, useUserData, useDedust } from '../../../store/main'
import { useNav } from '../../../store/nav';

import { swichLang } from '../../../lang/lang.js';

import WebApp from '@twa-dev/sdk';
import s from './list.module.css'
import { TooltipYWA } from './../../Some/Tooltip/TooltipYWA';


const formatNumber = (num: number) => {
    if (num > 999999) {
        return `${Math.floor(num / 1000000)}kk`;
    }
    if (num > 999) {
        return `${Math.floor(num / 1000)}k`;
    }
    return num.toLocaleString('ru');
};

export const ListCurrency = () => {

    const userId = useUserData(state => state.user.internalId);
    const userLang = useUserData(state => state.user.languageCode);
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

    const navMain = useNav(state => state.setMainNav)
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

    useEffect(() => {
        if (userId && userId !== 0) {
            getBonuses();
        }
    }, [getBonuses, userId])

    return (
        <>
            {/* <div className={s.onBalances}> */}
            {balance.filter(currency => currency.speed > 0.00099 && currency.name === 'BONUS').map((currency) => {
                return (
                    <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(22 163 74)' : 'white' }}>
                        {/* <div className={s.firstline}> */}
                        <h4 className={s.currname}>{currency.name}</h4>
                        <div ><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> {(currency.name).toUpperCase()}</div>
                        <div style={{ color: currency.speed > 0.00 ? 'rgb(22 163 74)' : 'gray' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/{swichLang(userLang, 'hours')}</div>
                        {/* </div> */}
                        <div className={s.progressbar}>
                            <div className={s.progress} style={{ width: `${(((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100) < 2 ? 2 : (((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100)}%` }}></div>
                        </div>
                        <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}</div>
                        {currency.name !== 'BONUS' && <button
                            onClick={(e) => {
                                e.preventDefault();
                                //window.location.href = currency.src;
                                WebApp.openTelegramLink(currency.src);

                            }}
                            className={s.news}>{swichLang(userLang, 'news')}</button>}
                        {currency.name === 'BONUS' && <button
                            onClick={() => navMain('bonus')}
                            className={s.news}
                            style={{ color: 'rgb(22 163 74)', fontWeight: 'bold' }}
                        >{swichLang(userLang, 'get_more')}</button>}
                        <div className={s.range1}>{swichLang(userLang, 'till')} {formatNumber(currency.inH)}/{swichLang(userLang, 'hours')}</div>
                    </div>
                );
            })}

            {rawAddress && /* (!loadStatusSFPools && !loadStatusDDPools) && */ <h3 className={s.donthave} style={{ color: 'lightgray', marginBottom: '0.5rem', marginTop: '2rem' }}>< TooltipYWA /></h3>}


            {balance.filter(currency => currency.speed > 0.00099 && currency.name === 'TON').map((currency) => {
                    return (
                        <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(22 163 74)' : 'white' }}>
                            {/* <div className={s.firstline}> */}
                            <h4 className={s.currname}>{currency.name}</h4>
                            <div ><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> {(currency.name).toUpperCase()}</div>
                            <div style={{ color: currency.speed > 0.00 ? 'rgb(22 163 74)' : 'gray' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/{swichLang(userLang, 'hours')}</div>
                            {/* </div> */}
                            <div className={s.progressbar}>
                                <div className={s.progress} style={{ width: `${(((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100) < 2 ? 2 : (((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100)}%` }}></div>
                            </div>
                            <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}</div>
                            {currency.name !== 'BONUS' && <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    //window.location.href = currency.src;
                                    WebApp.openTelegramLink(currency.src);

                                }}
                                className={s.news}>{swichLang(userLang, 'news')}</button>}
                            {currency.name === 'BONUS' && <button
                                onClick={() => navMain('bonus')}
                                className={s.news}
                                style={{ color: 'rgb(22 163 74)', fontWeight: 'bold' }}
                            >{swichLang(userLang, 'get_more')}</button>}
                            <div className={s.range1}>{swichLang(userLang, 'till')} {formatNumber(currency.inH)}/{swichLang(userLang, 'hours')}</div>
                        </div>
                    );
                })}

            {balanceJ.filter(currency => currency.speed > 0.00099).length > 0 && rawAddress && <h4 style={{ color: 'lightgray', borderBottom: '2px solid', width: '8rem', margin: '0 auto' }}>{swichLang(userLang, 'jettons')}</h4>}
                {
                !rawAddress ?
                    <div>
                        <h2 className={s.connectwallet}>{swichLang(userLang, 'connect')}</h2>
                        <h4 className={s.connectwallettosee}>{swichLang(userLang, 'connect2')}</h4>
                        <h4 className={s.connectwallettomine}>{swichLang(userLang, 'connect3')}</h4>
                    </div>
                    : loadStatus ? <span className={s.loader}></span> : balanceJ.filter(currency => currency.speed > 0.00099).map((currency) => {
                        return (
                            <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(22 163 74)' : nav ? 'white' : 'lightgrey' }}>
                                <h4 className={s.currname}>{currency.name}</h4>
                                <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> {(currency.name).toUpperCase()}</div>
                                <div style={{ color: currency.speed ? 'rgb(22 163 74)' : 'gray' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/{swichLang(userLang, 'hours')}</div>
                                <div className={s.progressbar}>
                                    <div className={s.progress} style={{ width: `${((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100 < 2 ? 2 : ((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100}%` }}></div>
                                </div>
                                <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}</div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        //window.location.href = currency.src;
                                        WebApp.openTelegramLink(currency.src);
                                    }}
                                    className={s.news}>{swichLang(userLang, 'news')}</button>
                                <div className={s.range1}>{swichLang(userLang, 'till')} {formatNumber(currency.inH)}/{swichLang(userLang, 'hours')}</div>
                            </div>
                        );
                }) 
                }

            {balancePoolsSF.filter(currency => currency.speed > 0.00099).length > 0 && rawAddress && <h4 style={{ color: 'lightgray', borderBottom: '2px solid', width: '8rem', margin: '0 auto' }}>Stonfi {swichLang(userLang, 'pools')}</h4>}
                {rawAddress &&
                    balancePoolsSF.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).map((currency) => {
                        return (
                            <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(22 163 74)' : nav ? 'white' : 'lightgrey' }}>
                                <h4 className={s.currname}>{currency.name}</h4>
                                <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> Lp</div>
                                <div style={{ color: currency.speed ? 'rgb(22 163 74)' : 'gray' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/{swichLang(userLang, 'hours')}</div>
                                <div className={s.progressbar}>
                                    <div className={s.progress} style={{ width: `${((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100 < 2 ? 2 : ((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100}%` }}></div>
                                </div>
                                <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}Lp</div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        //window.location.href = currency.src;
                                        window.open(currency.src);
                                    }}
                                    className={s.news}>{swichLang(userLang, 'pool')}</button>
                                <div className={s.range1}>{swichLang(userLang, 'till')} {formatNumber(currency.inH)}/{swichLang(userLang, 'hours')}</div>
                            </div>
                        )
                    })}

            {balancePoolsDD.filter(currency => currency.speed > 0.00099).length > 0 && rawAddress && <h4 style={{ color: 'lightgray', borderBottom: '2px solid', width: '8rem', margin: '0 auto' }}>DeDust {swichLang(userLang, 'pools')}</h4>}
                {rawAddress &&
                    balancePoolsDD.filter(currency => nav ? currency.speed > 0.00099 : currency.speed < 0.00099).map((currency) => {
                        return (
                            <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(22 163 74)' : nav ? 'white' : 'lightgrey' }}>
                                <h4 className={s.currname}>{currency.name}</h4>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span>Lp</div>
                                <div style={{ color: currency.speed ? 'rgb(22 163 74)' : 'gray' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/{swichLang(userLang, 'hours')}</div>
                                <div className={s.progressbar}>
                                    <div className={s.progress} style={{ width: `${((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100 < 2 ? 2 : ((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100}%` }}></div>
                                </div>
                                <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}Lp</div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        //window.location.href = currency.src;
                                        window.open(currency.src);
                                    }}
                                    className={s.news}>{swichLang(userLang, 'pool')}</button>
                                <div className={s.range1}>{swichLang(userLang, 'till')} {formatNumber(currency.inH)}/{swichLang(userLang, 'hours')}</div>
                            </div>
                        )
                    })}
            {/* </div> */}

            {/*  */}
            {/* {(!loadStatusSFPools && !loadStatusDDPools && !loadStatus) && <div className={s.offBalances}> */}
            {(loadStatusSFPools || loadStatusDDPools) && (
                <div>
                    <p className={s.loading}>...</p>
                </div>
            )}

            {rawAddress && (!loadStatusSFPools && !loadStatusDDPools) && <h3 className={s.donthave} style={{ color: 'gray', marginBottom: '0.5rem', marginTop: '2rem' }}>{swichLang(userLang, 'donthave')}</h3>}

            {rawAddress && (!loadStatusSFPools && !loadStatusDDPools) && balance.filter(currency => currency.speed < 0.00099).map((currency) => {
                    return (
                        <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(22 163 74)' : 'grey' }}>
                            <h4 className={s.currname}>{currency.name}</h4>
                            <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> {(currency.name).toLowerCase()}</div>
                            <div style={{ color: currency.speed > 0.00 ? 'rgb(22 163 74)' : 'gray' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/{swichLang(userLang, 'hours')}</div>
                            <div className={s.progressbar}>
                                <div className={s.progress} style={{ width: `${((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100}%` }}></div>
                            </div>
                            <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}</div>
                            {currency.name !== 'BONUS' && <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    //window.location.href = currency.src;
                                    WebApp.openTelegramLink(currency.src);

                                }}
                                className={s.news}
                            >{swichLang(userLang, 'news')}</button>}
                            <div className={s.range1}>{swichLang(userLang, 'till')} {formatNumber(currency.inH)}/{swichLang(userLang, 'hours')}</div>
                        </div>
                    );
                })}

                {
                    /* loadStatus ? <span className={s.loader}></span> : */ rawAddress && (!loadStatusSFPools && !loadStatusDDPools) && balanceJ.filter(currency => currency.speed < 0.00099).map((currency) => {
                        return (
                            <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(22 163 74)' : 'gray' }}>
                                <h4 className={s.currname}>{currency.name}</h4>
                                <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> {(currency.name).toLowerCase()}</div>
                                <div style={{ color: currency.speed ? 'rgb(22 163 74)' : 'gray' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/{swichLang(userLang, 'hours')}</div>
                                <div className={s.progressbar}>
                                    <div className={s.progress} style={{ width: `${((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100}%` }}></div>
                                </div>
                                <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}</div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        //window.location.href = currency.src;
                                        WebApp.openTelegramLink(currency.src);
                                    }}
                                    className={s.news}>{swichLang(userLang, 'news')}</button>
                                <div className={s.range1}>{swichLang(userLang, 'till')} {formatNumber(currency.inH)}/{swichLang(userLang, 'hours')}</div>
                            </div>
                        );
                    })
                }

            {balancePoolsSF.filter(currency => currency.speed < 0.000099).length > 0 && rawAddress && (!loadStatusSFPools && !loadStatusDDPools) && <h4 style={{ color: 'gray', borderBottom: '2px solid', width: '8rem', margin: '0 auto' }}>Stonfi {swichLang(userLang, 'pools')}</h4>}
            {rawAddress && (!loadStatusSFPools && !loadStatusDDPools) &&
                    balancePoolsSF.filter(currency => currency.speed < 0.00099).map((currency) => {
                        return (
                            <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(22 163 74)' : 'grey' }}>
                                <h4 className={s.currname}>{currency.name}</h4>
                                <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> Lp</div>
                                <div style={{ color: currency.speed ? 'rgb(22 163 74)' : 'gray' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/{swichLang(userLang, 'hours')}</div>
                                <div className={s.progressbar}>
                                    <div className={s.progress} style={{ width: `${((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100}%` }}></div>
                                </div>
                                <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}Lp</div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        //window.location.href = currency.src;
                                        window.open(currency.src);
                                    }}
                                    className={s.news}>{swichLang(userLang, 'pool')}</button>
                                <div className={s.range1}>{swichLang(userLang, 'till')} {formatNumber(currency.inH)}/{swichLang(userLang, 'hours')}</div>
                            </div>
                        )
                    })}

            {balancePoolsDD.filter(currency => currency.speed < 0.00099).length > 0 && rawAddress && (!loadStatusSFPools && !loadStatusDDPools) && <h4 style={{ color: 'gray', borderBottom: '2px solid', width: '8rem', margin: '0 auto' }}>DeDust {swichLang(userLang, 'pools')}</h4>}
            {rawAddress && (!loadStatusSFPools && !loadStatusDDPools) &&
                    balancePoolsDD.filter(currency => currency.speed < 0.00099).map((currency) => {
                        return (
                            <div key={currency.name} className={s.listitem} style={{ color: currency.name === 'BONUS' ? 'rgb(22 163 74)' : 'grey' }}>
                                <h4 className={s.currname}>{currency.name}</h4>
                                <div><span style={{ fontWeight: 'bold' }}>{(currency.value).toLocaleString('ru')}</span> Lp</div>
                                <div style={{ color: currency.speed ? 'rgb(22 163 74)' : 'gray' }}><span style={{ fontWeight: 'bold' }}>+{(currency.speed).toFixed(2)}</span>/{swichLang(userLang, 'hours')}</div>
                                <div className={s.progressbar}>
                                    <div className={s.progress} style={{ width: `${((currency.speed) / currency.inH) * 100 > 100 ? 100 : ((currency.speed) / currency.inH) * 100}%` }}></div>
                                </div>
                                <div className={s.range0}>{formatNumber(currency.range[0])}-{formatNumber(currency.range[1])}Lp</div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        //window.location.href = currency.src;
                                        window.open(currency.src);
                                    }}
                                    style={{ opacity: '1' }}
                                    className={s.news}>{swichLang(userLang, 'pool')}</button>
                                <div className={s.range1}>{swichLang(userLang, 'till')} {formatNumber(currency.inH)}/{swichLang(userLang, 'hours')}</div>
                            </div>
                        )
                    })}
            {/* </div> */}
        </>
    )
}
