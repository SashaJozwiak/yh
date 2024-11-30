//import React from 'react'

import { useState } from 'react'
import { useUserRewardStore } from '../../../state/nyf_rewards'

import s from './winpopup.module.css'
import { useArena } from '../../../state/mainArena'
import { useUserData } from '../../../../store/main'


import useSound from 'use-sound';
import ny_sound from '../../../assets/Game/ny/ny_sound_3s.mp3'

export const NYFrewards = () => {

    const achiev = useUserRewardStore(state => state.userReward)
    const loading = useUserRewardStore(state => state.isLoading)

    const userLang = useUserData(state => state.user.languageCode)
    const user_id = useUserData(state => state.user.internalId)
    const getReward = useArena(state => state.getReward)
    const addInRewardList = useUserRewardStore(state => state.addInRewardList)

    const [blockBtn, setBlockBtn] = useState(false)
    const [play] = useSound(ny_sound);

    const getAll = () => {
        play();
        setBlockBtn(true);
        const cards = (Math.ceil(Number(achiev?.house || 0) / 2)) + (Math.ceil(Number(achiev?.total_cards || 0) / 10))
        const UH = + (Math.ceil(Number(achiev?.total_bonuses || 0) / 10))
        const B = 0;

        console.log('cards: ', cards)
        console.log('UH: ', UH)

        getReward(user_id, UH, B, cards);
        addInRewardList(user_id, cards, UH);
        setBlockBtn(false);
    }

    return (
        <div className={s.container}>

            {loading ? 'loading...'
                :
                <div className={s.window}>
                    <h2 style={{ padding: '1rem' }}>{userLang === 'ru' ? 'Подарки для первых игроков' : 'Gifts for first players'} </h2>

                    {Number(achiev?.house || 0) > 0 &&
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
                    }

                    <button
                        onClick={getAll}
                        disabled={blockBtn}
                        className={s.btnok}
                        style={{ height: '5vh', borderRadius: '1rem', margin: '1rem', opacity: blockBtn ? '0.5' : '1' }}
                    ><h3>GET ALL</h3></button>
                </div>
            }

        </div>
    )
}
