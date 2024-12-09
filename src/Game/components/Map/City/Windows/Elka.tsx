//import React from 'react'

import { useEffect, useState } from 'react';
import { useUserData } from '../../../../../store/main'
import s from './elka.module.css'

export const Elka = ({ setOpenWindow, selectedLocation }) => {
    const playerData = useUserData(state => state.user);

    const [isOwner, setIsOwner] = useState(false)



    const [channelName, setChannelName] = useState('');
    const [noChannel, setNoChannel] = useState(false);
    const [rewardAmount, setRewardAmount] = useState(100);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if (playerData.internalId === selectedLocation.user_id) {
            setIsOwner(true);
        }
    }, [playerData, selectedLocation.user_id])

    const handleRewardChange = (amount) => {
        if ([100, 200, 300].includes(amount)) {
            setRewardAmount(amount);
        }
    };

    const handleSave = () => {
        if (!channelName && !noChannel) {
            alert('Заполните все обязательные поля.');
            return;
        }
        // Логика для сохранения данных (например, API запрос)
        console.log({ channelName: noChannel ? 'youhold' : channelName, rewardAmount });
    };

    return (
        <div className={s.container}>
            <div

                className={s.window}>
                <h2 style={{ color: 'rgb(93, 121, 160)' }}>Happy New Year!</h2>
                {/* {isOwner ? 'yes' : 'no'} */}

                {!isOwner ? (
                    <>
                        <h2 style={{ padding: '0 0.5rem' }}>
                            {playerData.languageCode === 'ru' ? `Мэр ${selectedLocation?.username} поздравляет вас с наступающим Новым Годом!🎉` : `Mayor ${selectedLocation?.username} wishes you a Happy New Year!🎉`}
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
                                    disabled={noChannel}
                                />
                            </label>
                            <br />

                            <label>
                                <input
                                    type="checkbox"
                                    checked={noChannel}
                                    onChange={(e) => setNoChannel(e.target.checked)}
                                />
                                &#32;I don't have a channel
                            </label>
                        </div>
                        <div>
                            <h3>Present:</h3>
                            <button style={{ backgroundColor: 'rgb(93 121 160)', padding: '0.2rem 0.7rem', opacity: rewardAmount === 100 ? '0.5' : '1' }} onClick={() => handleRewardChange(rewardAmount - 100)}>-</button>
                            <span style={{ margin: '0.5rem' }}>{rewardAmount} B</span>
                            <button style={{ backgroundColor: 'rgb(93 121 160)', padding: '0.2rem 0.7rem', opacity: rewardAmount === 300 ? '0.5' : '1' }} onClick={() => handleRewardChange(rewardAmount + 100)}>+</button>
                        </div>
                        <button onClick={handleSave} style={{ backgroundColor: 'rgb(93 121 160)', marginTop: '1rem', padding: '0.5rem 0' }}>
                            <h2>Save</h2>
                        </button>
                    </>
                ) : (
                    <>
                        <h3 style={{ padding: '0 0.5rem' }}>
                            {playerData.languageCode === 'ru' ? `Мэр ${selectedLocation?.username} поздравляет вас с наступающим Новым Годом!🎉` : `Mayor ${selectedLocation?.username} wishes you a Happy New Year!🎉`}
                        </h3>
                        <h2 style={{ fontWeight: 'bold', color: 'rgb(93, 121, 160)' }}>
                            Reward <br /> {rewardAmount} B
                        </h2>
                        <h2>
                            <a href={`https://t.me/${channelName}`} target="_blank" rel="noopener noreferrer">
                                Channel  <br /> {channelName}
                            </a>
                        </h2>
                        <button
                            onClick={() => {
                                setIsSubscribed(true);
                                setTimeout(() => setIsSubscribed(false), 3000);
                            }}
                            style={{ backgroundColor: 'rgb(93 121 160)', marginTop: '1rem', padding: '0.5rem 0' }}>
                            <h2>{isSubscribed ? 'Забрать награду' : 'Подписаться'}</h2>
                        </button>
                        <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setOpenWindow('');
                                }}
                            style={{ backgroundColor: 'rgb(93 121 160)', marginTop: '1rem', padding: '0.5rem 0' }}
                        ><h2>{'Позже'}</h2>
                        </button>
                    </>
                )}





                {/* <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1vh 1vh' }}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpenWindow('');
                        }}
                        style={{ backgroundColor: 'rgb(93 121 160)', height: '2rem', width: '30vw', borderRadius: '0.3rem', opacity: '1', }}
                    > <h2>{'Later'} </h2>
                    </button>

                    <button
                        onClick={() => {
                            setIsSubscribed(true);
                            setTimeout(() => setIsSubscribed(false), 3000);
                        }}
                        style={{ backgroundColor: 'rgb(93 121 160)', height: '2rem', width: '30vw', borderRadius: '0.3rem', opacity: '1', }}>
                        <h2>{isSubscribed ? 'Забрать награду' : 'Подписаться'}</h2>
                    </button>
                </div> */}
            </div>
        </div>
    )
}
