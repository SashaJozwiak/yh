import { useState } from "react";

import s from './assetsList.module.css'

export const AssetsList = () => {
    const [isLoading,] = useState(false);

    return (
        <div
            style={{ overflowY: 'auto',/*  overflowX: 'hidden',  *//* marginTop: '0.5rem', */ marginBottom: '5rem' }}
        >
            {isLoading ? <span className={s.loader}></span> :
                <ul
                    style={{ backgroundColor: 'rgb(58, 70, 88)' }}
                >
                    {/* <li style={{ padding: '0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>

                        <h3>name</h3>
                        <h3>share</h3>
                        <h3>APR</h3>
                        <h3>price</h3>
                    </li> */}

                    <li style={{ padding: '0.6rem', listStyle: "none", display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', /* width: '90vw' */ }} >
                            <div>
                                <h3>DiveCat</h3>
                                <img style={{ display: 'block' }} src="" alt="img" />

                            </div>

                            <div>
                                <h3 style={{ textDecoration: 'underline', background: 'white', padding: '0 0.3rem', color: 'black', borderRadius: '0.3rem' }}>Share</h3>
                                <p>UHS</p>
                                <p>1253</p>

                            </div>

                            <div>
                                <h3 style={{ textDecoration: 'underline', background: 'white', padding: '0 0.3rem', color: 'black', borderRadius: '0.3rem' }}>APR</h3>
                                <h3>25%</h3>
                            </div>

                            <div>
                                <h3 style={{ textDecoration: 'underline', background: 'white', padding: '0 0.3rem', color: 'black', borderRadius: '0.3rem' }}>Price</h3>
                                <p>UHS</p>
                                <p>2500</p>

                            </div>
                        </div>


                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderTop: '1px solid gray' }}>
                            <button
                                style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', padding: '0.3rem 0' }}
                            >About</button>
                            <p style={{ fontStyle: 'italic', opacity: '0.7', alignContent: 'center' }}>Fee: <span style={{ textDecoration: 'line-through', color: 'gray' }}>3 UHS</span> 0 UHS </p>
                            <button
                                style={{ width: '4rem', fontSize: '1rem', margin: '0.3rem 0', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', padding: '0.3rem 0' }}
                            >BUY</button>
                        </div>
                    </li>

                    <li style={{ padding: '0.6rem', listStyle: "none", display: 'flex', justifyContent: 'space-between', backgroundColor: 'rgb(58 70 88)', border: '1px solid gray', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem'/* , width: '95vw' */ }}>
                            <div>
                                <img style={{ display: 'block' }} src="" alt="img" />
                                <h3>name</h3>
                            </div>

                            <h3>share</h3>
                            <h3>APR</h3>
                            <h3>price</h3>



                        </div>


                    </li>


                </ul>}

        </div>
    )
}
