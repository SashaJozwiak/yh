//import React from 'react'

import { useEffect, useState } from 'react'
import { useUserRewardStore } from '../../../state/nyf_rewards'

import s from './winpopup.module.css'
import { useArena } from '../../../state/mainArena'
import { useUserData } from '../../../../store/main'


import useSound from 'use-sound';
import ny_sound from '../../../assets/Game/ny/ny_sound_3s.mp3'

import elka from '../../Map/City/assets/elka.gif'

/* const tops = {
    8401: 134,
    10095: 34,
    7032: 67,
    3607: 1334,
    9908: 67,
    8650: 400,
    95: 67,
    3603: 34,
    3342: 334,
    10491: 134,
    10569: 67,
    10239: 167,
    3375: 67,
    10226: 67,
    10421: 234,
    8399: 67,
    8793: 67,
    10861: 67,
    9521: 34,
    8664: 67,
    10322: 34,
    8673: 200,
    5638: 67,
    6067: 200,
    //test
    //3441: 100,
    //9: 33
} */

const tops = {
    10378: 600,
    8673: 550,
    4403: 500,
    9937: 450,
    3398: 400,
    7578: 350,
    8175: 300,
    9908: 250,
    2396: 200,
    4899: 200,
    3607: 200
};

export const NYFrewards = () => {

    const achiev = useUserRewardStore(state => state.userReward)
    const loading = useUserRewardStore(state => state.isLoading)

    const house = useArena(state => state.house)

    const userLang = useUserData(state => state.user.languageCode)
    const user_id = useUserData(state => state.user.internalId)
    const address = useUserData(state => state.user.userFriendlyAddress)
    const getReward = useArena(state => state.getReward)
    const addInRewardList = useUserRewardStore(state => state.addInRewardList)

    const [blockBtn, setBlockBtn] = useState(false)
    const [play] = useSound(ny_sound);

    const [top] = useState(tops[user_id] ? tops[user_id] : 0)
    const [noTop, setNotTop] = useState(house > 1 ? 50 : 0)
    const [bon] = useState(achiev ? Number(achiev.total_bonuses) + Number(achiev.total_cards) : 0)


    const [sumUhs, setSumUhs] = useState(0);

    const getAll = () => {
        play();
        setBlockBtn(true);
        const cards = 10;
        const UHS = +sumUhs
        const UH = 0;
        const B = 0;

        console.log('cards: ', cards)
        console.log('UH: ', UH)

        getReward(user_id, UH, B, cards);
        addInRewardList(user_id, cards, UHS, address);
        setBlockBtn(false);
    }



    useEffect(() => {
        setNotTop(house > 1 ? 50 : 0);
        if (typeof top === 'undefined' || top === 0) {
            setSumUhs(noTop + Math.ceil((bon / 100 / 1.5) * 100))
        } else {
            setSumUhs(top + Math.ceil((bon / 100 / 1.5) * 100))
        }

    }, [bon, noTop, top, house])

    console.log('tops + bon: ', (top + Math.ceil((bon / 100 / 1.5) * 100)));
    console.log('top: ', tops[user_id]);
    console.log('address: ', address);
    console.log('noTop: ', noTop);

    return (
        <div
            //onClick={ }
            className={s.container}>

            {loading ? 'loading...'
                :
                <div className={s.window}>
                    <h2 style={{ padding: '1rem 1rem 0 1rem' }}>YearDrop</h2>

                    <img width='100vw' style={{ margin: '0 auto' }} src={elka} alt="elka picture" />

                    <div>HOUSES & STARS: <b>+{sumUhs} UHS</b>
                        <p style={{ fontSize: '0.8rem', padding: '0 1rem' }}>{userLang === 'ru' ? 'UHS будут начисленны на текущий подключенный кошелек с 1 по 10 января' : 'UHS will be transferred to your connected wallet between January 1 and January 10'}</p>
                    </div>
                    <div>{userLang === 'ru' ? 'За майнинг: ' : 'Mining gift: '} <b>+10 cards</b></div>

                    {!address && <p style={{ margin: '0 1rem', fontSize: '0.8rem', color: 'gray', borderBottom: '1px solid red', fontStyle: 'italic' }}>Reload app and connect your wallet, plz</p>}

                    {/* {Number(achiev?.house || 0) > 0 &&
                        <div>
                            <p>Houses passed: {achiev?.house || 0}</p>
                            <h3>You get: {Math.ceil(Number(achiev?.house || 0) / 2)} cards</h3>
                        </div>
                    }


                    {Number(achiev?.total_cards || 0) > 0 &&
                        <div>
                            <p>Cards purchased: {achiev?.total_cards || 0}</p>
                            <h3>You get: {Math.ceil(Number(achiev?.total_cards || 0) / 10)} cards</h3>
                        </div>
                    }

                    {Number(achiev?.total_bonuses || 0) > 0 &&
                        <div>
                            <p>Bonuses purchased: {achiev?.total_bonuses || 0}</p>
                            <h3>You get: {Math.ceil(Number(achiev?.total_bonuses || 0) / 10)} UH</h3>
                        </div>
                    } */}

                    <button
                        onClick={getAll}
                        disabled={blockBtn || !address}
                        className={s.btnok}
                        style={{ height: '5vh', borderRadius: '1rem', margin: '1rem', opacity: blockBtn ? '0.5' : !address ? '0.5' : '1' }}
                    ><h3>{userLang === 'ru' ? 'ПОЛУЧИТЬ' : 'GET ALL'}</h3></button>
                </div>
            }

        </div>
    )
}
