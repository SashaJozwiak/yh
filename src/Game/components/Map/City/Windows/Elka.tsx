//import React from 'react'

import { useEffect, useState } from 'react';
import { useUserData } from '../../../../../store/main'
import s from './elka.module.css'
import { useMap } from '../../../../state/map';
import { useCity } from '../../../../state/city';
import WebApp from '@twa-dev/sdk';


export const Elka = ({ setOpenWindow, selectedLocation }) => {
    const playerData = useUserData(state => state.user);

    const [isOwner, setIsOwner] = useState(false)

    const [channelName, setChannelName] = useState('');
    const [noChannel, setNoChannel] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isSave, setIsSave] = useState(false);

    const updateChannel = useMap(state => state.updateChannel)
    const checkReward = useCity(state => state.checkReward)
    const addReward = useCity(state => state.addReward)
    const getReward = useCity(state => state.getReward)
    //const setSelectedLocation = useMap(state => state.setSelectedLocation)

    const handleSave = () => {
        if (!channelName && !noChannel) {
            alert('Заполните все обязательные поля.');
            return;
        }

        updateChannel(selectedLocation.city_id, channelName)

        setIsSave(true);


        // Логика для сохранения данных (например, API запрос)
        console.log({ channelName: noChannel ? 'youhold' : channelName });
    };

    useEffect(() => {
        if (playerData.internalId === selectedLocation.user_id) {
            setIsOwner(true);
        }
        setChannelName(selectedLocation.channel)
        checkReward(playerData.internalId, selectedLocation.city_id)

    }, [checkReward, playerData, selectedLocation])

    //console.log('selectedLocation: ', selectedLocation);

    return (
        <div 
            onClick={() => {
                setOpenWindow(false)
            }}
            className={s.container}>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={s.window}>
                <h2 style={{ color: selectedLocation.color }}>Happy New Year!</h2>

                {isOwner ? (
                    <>
                        <h2 style={{ padding: '0 0.5rem' }}>
                            {playerData.languageCode === 'ru' ? `Мэр ${selectedLocation?.username} поздравляет Вас с наступающим Новым Годом!🎉` : `Mayor ${selectedLocation?.username} wishes you a Happy New Year!🎉`}
                        </h2>

                        <div>
                            <label>
                                Your tg channel:
                                <br />
                                <input
                                    style={{ height: '1.5rem', padding: '0 0.5rem' }}
                                    type="text"
                                    value={noChannel ? 'youhold' : channelName}
                                    onChange={(e) => setChannelName(e.target.value)}
                                    disabled={noChannel || isSave}
                                />
                            </label>
                            <br />
                            <label>
                                <input
                                    style={{ marginTop: '0.5rem' }}
                                    type="checkbox"
                                    checked={noChannel}
                                    disabled={isSave}
                                    onChange={(e) => setNoChannel(e.target.checked)}
                                />
                                &#32;I don't have a channel
                            </label>
                        </div>
                        <div>
                            <h3>Present for users:</h3>
                            <span style={{ margin: '0.5rem' }}>300 B</span>
                        </div>
                        <button
                            disabled={isSave}
                            onClick={handleSave} style={{ backgroundColor: 'rgb(93 121 160)', marginTop: '1rem', padding: '0.5rem 0', opacity: isSave ? '0.5' : '1' }}>
                            <h2>Save</h2>
                        </button>
                    </>
                ) : (
                    <>
                        <h3 style={{ padding: '0 0.5rem' }}>
                            {playerData.languageCode === 'ru' ? `Мэр ${selectedLocation?.username} поздравляет вас с наступающим Новым Годом!🎉` : `Mayor ${selectedLocation?.username} wishes you a Happy New Year!🎉`}
                        </h3>
                        <h2 style={{ fontWeight: 'bold', color: 'rgb(93, 121, 160)' }}>
                                Reward <br /> <span style={{ color: selectedLocation.color }}>300 B</span>
                        </h2>

                            <h3>
                                Channel  <br />
                                <span style={{ color: selectedLocation.color }}>{'@' + channelName}</span>
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsSubscribed(true);
                                        WebApp.openTelegramLink(`https://t.me/${selectedLocation.channel || 'youhold'}`);
                                        addReward(playerData.internalId, selectedLocation.city_id, 300)

                                        //setTimeout(() => setIsSubscribed(false), 3000);
                                    }}
                                    disabled={isSubscribed || getReward}
                                    style={{ backgroundColor: 'rgb(93 121 160)', marginTop: '1rem', padding: '0.5rem 0', opacity: isSubscribed || getReward ? '0.5' : '1' }}>
                                    <h2>{getReward ? 'already received gift' : 'Subscribe'}</h2>
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setOpenWindow('');
                                    }}
                                    style={{ backgroundColor: 'rgb(93 121 160)', marginTop: '1rem', padding: '0.5rem 0' }}
                                ><h2>{'Later'}</h2>
                                </button>
                            </div>
                    </>
                )}

            </div>
        </div>
    )
}
