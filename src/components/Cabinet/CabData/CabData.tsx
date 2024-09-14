import { useEffect, useState } from 'react';
import { useUserData } from '../../../store/main';
import { useTop100 } from '../../../store/top100';

import { swichLang } from '../../../lang/lang.js';

import s from './cabdata.module.css'
//import WebApp from '@twa-dev/sdk';

const defaultAvatar = '/yh/gnom_full_tr_150_compressed.png';

export const CabData = () => {
    const { internalId, userName, refs, refs_active, anonim, languageCode } = useUserData(state => state.user);

    const balance = useUserData(state => state.balance.balance);
    const setAnonim = useUserData(state => state.setAnonim);

    const [isChecked, setIsChecked] = useState(anonim);
    const [isDisabled, setIsDisabled] = useState(false);
    const [refetchTop100, setRefetchTop100] = useState(false);

    const top100 = useTop100(state => state.top100);
    const getTop100 = useTop100(state => state.getTop100);

    useEffect(() => {
        if (!top100.length || refetchTop100) {
            setRefetchTop100(false)
            getTop100();
        }
    }, [getTop100, refetchTop100, top100.length])

    useEffect(() => {
        setIsChecked(anonim);
    }, [anonim]);

    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked;
        setIsDisabled(true);

        try {
            await setAnonim(internalId, newValue);
            setIsChecked(newValue);
            setRefetchTop100(true);
        } catch (error) {
            console.error('Ошибка обновления анонимности:', error);
            setIsChecked(anonim);
        } finally {
            setTimeout(() => {
                setIsDisabled(false);
            }, 2000);
        }

        setTimeout(() => {
            setIsDisabled(false);
        }, 2000);
    }

    return (
        <>
            <div className={s.data}>
                <img className={s.gnom} style={{ borderRadius: '0.3rem' }}
                    width='150' height='118' src={defaultAvatar} alt={``} />
                <div className={s.info}>
                    <p className={s.line}>{swichLang(languageCode, 'user')}: <span style={{ color: 'white' }}>{userName.substring(0, 10)}</span></p>
                    <p className={s.line}>{swichLang(languageCode, 'friends')}: <span style={{ color: 'white' }}>{refs}</span></p>
                    <p className={s.line}>{swichLang(languageCode, 'afriends')}: <span style={{ color: 'white' }}>{refs_active}</span></p>
                    {/* <p className={s.line}>Fr. reward: <span style={{ color: 'white' }}>0</span></p> */}
                    {/* <p className={s.line}>Team: <span style={{ color: 'white' }}>{team || `none`}</span></p> */}
                    <p className={s.line}>{swichLang(languageCode, 'balance')}: <span style={{ color: 'white' }}>{Number(balance.toFixed(1)).toLocaleString('ru-Ru')}</span></p>
                    {/* <p className={s.line}>аноним: <span style={{ color: 'white' }}>{anonim}</span></p> */}
                    <div style={{ textAlign: 'left', display: 'flex', gap: '0.2rem' }}>
                        <input type="checkbox"
                            checked={isChecked}
                            disabled={isDisabled}
                            onChange={handleCheckboxChange}
                            id="anonim-checkbox"
                            name="anonim" />
                        <label htmlFor="anonim-checkbox"> {swichLang(languageCode, 'anonim')}</label>
                    </div>
                </div>
            </div>

            <h2 className={s.headerlist}>{swichLang(languageCode, 'top100')}</h2>

            {!top100.length ? <span className={s.loader}></span> :
                <div className={`${s.list} scrollable`}/*  style={{ padding: '0 1rem' }} */>
                    {top100.sort((a, b) => b.balance - a.balance).map((item, index) => (
                        <div className={s.listitem} key={item.internal_id}>
                            <div
                                /* onClick={(e) => {
                                    e.preventDefault();
                                    WebApp.openTelegramLink(`https://t.me/${item.username}`);
                                }} */
                                className={s.btn}>{/* {index + 1}. */}<span className={s.btnspan}>{index + 1}. {(item.username).substring(0, 25)}</span></div>
                            {/* https://t.me/ */}
                            <div>{item.balance}</div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}
