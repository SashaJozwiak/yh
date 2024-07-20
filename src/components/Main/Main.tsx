//import React from 'react'

import { Balance } from './Balance/Balance'
import s from './main.module.css'

export const Main: React.FC = () => {


    return (
        <>
            <Balance />

            <div className={s.manage}>

                <div className={s.statbar}>
                    <button className={s.tabs}>У тебя <h3>Есть</h3> </button>
                    <button className={s.tabs}>У тебя <h3>Нет</h3></button>
                    <p style={{ margin: 'auto', fontSize: '1rem' }}> 13.54/ч</p>
                    <button className={s.hold}><h3>HOLD</h3></button>
                    <button className={s.refresh}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '25px', height: '38px' }} className={s.refreshicon}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                </div>

                <div className={s.list}>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                    <p style={{ border: '1px solid', padding: '0.5rem 0', margin: '0.5rem 0' }}>text1</p>
                </div>
            </div>

        </>
    )
}
