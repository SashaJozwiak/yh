//import React from 'react'
import { useAirdropStore } from "../../earnStore/airdrop";
import s from './awindow.module.css'

export const Awindow = () => {

    const { closeModal, data } = useAirdropStore();

    console.log('ad data: ', data)


    return (
        <div
            //onClick={() => { setAwindow(false) }}
            className={s.container}>
            <div
                //onClick={(e) => { e.stopPropagation() }}
                className={s.window}>
                <h2 style={{ textDecoration: 'underline' }}>AIRDROP</h2>
                <h3 style={{ marginTop: '1rem' }}>You Get</h3>
                <h2 style={{ margin: '1rem', border: '1px solid gray', borderRadius: '0.3rem', color: 'white' }}>{(data?.total_sum ?? 0).toFixed(2)} UHS</h2>

                <button
                    onClick={() => closeModal()}
                    style={{ margin: '0 auto', marginBottom: '1rem', width: '30vw' }}

                    className={s.depBtn}>OK</button>

            </div>
        </div >
    )
}
