//import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { swichLang } from '../../lang/lang.js';
import { useJettonsBalances, useUserData, useTonco } from '../../store/main';
import { useNav } from './../../store/nav';

import s from './stages.module.css'


export const Stages = () => {
    const userLang = useUserData(state => state.user.languageCode);
    const username = useUserData(state => state.user.userName);

    const stages = useNav(state => state.nav.stage);
    const setStages = useNav(state => state.setStages);

    const UHS = useJettonsBalances(state => state.jettons)
    const UHSPool = useTonco(state => state.pools[0])

    console.log('UHS: ', UHS[0], UHSPool.value);

    return (
        <div className={`${s.list} scrollable`}>
            <header style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}
            >
                <h2 style={{ flex: '0.1' }}></h2>
                {stages === 'stages' ? <h2 style={{ flex: '0.8' }}>{swichLang(userLang, 'off_chain')}</h2> : <h2 style={{ flex: '0.8' }}>DAO</h2>}
                <button
                    onClick={() => {
                        setStages(stages === 'stages' ? 'dao' : 'stages')
                    }}
                    style={{
                        //height: '2.5rem',
                        flex: '0.1',
                        width: '5rem',
                        padding: '0 0.5rem',
                        borderRadius: '0.3rem',
                        backgroundColor: 'rgb(51 65 85)'
                    }}

                >{stages === 'stages' ? 'DAO' : 'STAGES'}</button>
            </header>

            {stages === 'stages' ?
                <div>
                    <ul className={s.stagelist}>
                        <li className={s.listelement}>🟢 {swichLang(userLang, 'beta_launch')} </li>
                        <li className={s.listelement}>🟢 {swichLang(userLang, 'launch_app')}</li>
                        <li className={s.listelement}>🟢 {swichLang(userLang, 'launch_game')}</li>
                        <li className={`${s.listelement} ${s.ok}`}>🟡 {swichLang(userLang, 'marketing')}</li>
                        <li className={s.listelement}>⚪ {swichLang(userLang, 'presa')}</li>
                        <li className={s.listelement}>⚪ {swichLang(userLang, 'airdrop')}</li>
                        <li style={{ fontSize: '1rem', marginTop: '-1rem', fontStyle: 'italic' }}>&emsp; &emsp; inviting friends</li>
                        <li style={{ fontSize: '1rem', fontStyle: 'italic' }}>&emsp; &emsp; cards in the game</li>
                        <li style={{ fontSize: '1rem', fontStyle: 'italic' }}>&emsp; &emsp; purchases ★</li>
                        <li style={{ fontSize: '1rem', fontStyle: 'italic' }}>&emsp; &emsp; houses in the game</li>
                        <li style={{ fontSize: '1rem', fontStyle: 'italic', marginBottom: '1rem' }}>&emsp; &emsp; UH</li>
                    </ul >
                    <h2>{swichLang(userLang, 'on_chain')}</h2>
                    <ul className={s.stagelist}>
                        <li className={s.listelementonchain}>{swichLang(userLang, 'after')}</li>
                    </ul> 
                </div> :
                <div style={{ marginTop: '1rem' }}>
                    <p style={{ marginTop: '1rem' }}>You have {UHS[0].value} <b>UHS</b></p>
                    <div style={{ marginTop: '1rem' }}> Private group:&nbsp;
                        {UHS[0].value + UHSPool.value > 9999 && username !== 'anonymous' ? <button
                            style={{ padding: '0 1rem', backgroundColor: 'rgb(51, 65, 85)' }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                WebApp.openTelegramLink('https://t.me/+d0USGaH7gJViZGQy');
                            }}
                        >
                            link
                        </button> : <p> {userLang === 'ru' ? 'Чтобы получить ссылку на приватную группу инвесторов, ваш баланс должен быть не менее 10000 UHS и установлен username в телеграм профиле.' : 'To receive a link to a private group of investors, your balance must be at least 10,000 UHS and the selected username in your telegram profile.'} </p>}

                        <div style={{ margin: '1rem auto', display: 'flex', justifyContent: 'center', height: '10rem' }}>
                            <span style={{ alignSelf: 'center' }}><i>
                                {userLang === 'ru' ? 'список голосования пуст' : 'voting list is empty'}
                            </i></span>

                        </div>

                    </div>
                </div>
            }

        </div>
    )
}
