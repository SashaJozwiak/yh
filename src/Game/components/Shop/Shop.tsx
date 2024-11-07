//import React from 'react'

import { useState } from 'react'
import s from './shop.module.css'
import { useGameNav } from '../../state/gameNav'
import { Potion } from '../Some/PotionSvg';
import { usePlayCard } from '../../state/playCard';

import { StateForBuy } from '../../types/playCard'
import { useUserData } from '../../../store/main';

export const Shop: React.FC = () => {

    const buyItems = usePlayCard(state => state.buyItems);
    const setNav = useGameNav(state => state.setPageNav);
    const [close, setClose] = useState<boolean>(false);
    const [cart, setCart] = useState<StateForBuy>({
        1001: 0,
        1002: 0,
        1003: 0,
        1004: 0,
        sum: 0,
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [ok, setOk] = useState<boolean>(false);

    const balance = useUserData(state => state.balance.balance);
    const minusBalance = useUserData(state => state.minusBalance) 

    const changeCart = (id: number, type: string) => {
        const prices = {
            1001: 100,
            1002: 50,
            1003: 200,
            1004: 150,
        }

        if (type === 'plus') {
            setCart({
                ...cart,
                [id]: cart[id] + 1,
                sum: cart.sum + prices[id]
            });
        } else if (type === 'minus') {
            if (cart[id] > 0) {
                setCart({
                    ...cart,
                    [id]: cart[id] - 1,
                    sum: cart.sum - prices[id]
                });
            }
        }
    }

    const handleBuy = () => {
        console.log('start handle buy: ', cart)
        setLoading(true);//start loader 

        buyItems(cart)
        //set cart state
        minusBalance(cart['sum']);

        setTimeout(() => {
            setLoading(false)
            setOk(true)
            setCart({
                1001: 0,
                1002: 0,
                1003: 0,
                1004: 0,
                sum: 0,
            })

            setTimeout(() => {
                setOk(false)

            }, 2000)

        }, 1500);
    };

    console.log('loading: ', loading);

    const handleClose = () => {
        setClose(true);
        setTimeout(() => {
            setNav('main');
            //setClose(false);
        }, 500);
    }

    return (
        <div className={`${s.container} ${close ? s.containerclosing : null}`}>
            <h1>Shop</h1>

            <div style={{ marginTop: '1rem' }}>
                {/* <h3>Balance Poition</h3> */}
                <div className={s.potionline}>

                    <div className={s.pic}>
                        <Potion color={'rgb(204, 153, 0)'} />
                        <p className={s.name}>Balance</p>
                    </div>

                    <div className={s.count}>
                        <button onClick={() => changeCart(1001, 'minus')} className={s.btnamount}>-</button>
                        {cart[1001]}
                        <button onClick={() => changeCart(1001, 'plus')} className={s.btnamount}>+</button>
                    </div>
                    <div className={s.price}> 100 <p>UH</p></div>
                </div>
                <div>
                    {/* <h3>Energy Potion</h3> */}
                    <div className={s.potionline}>

                        <div className={s.pic}>
                            <Potion color={'rgb(22 163 74)'} />
                            <p className={s.name}>Energy</p>
                        </div>

                        <div className={s.count}>
                            <button onClick={() => changeCart(1002, 'minus')} className={s.btnamount}>-</button>
                            {cart[1002]}
                            <button onClick={() => changeCart(1002, 'plus')} className={s.btnamount}>+</button></div>
                        <div className={s.price}>50 <p>UH</p></div>
                    </div>
                </div>

                <div>
                    {/* <h3>Experience Potion</h3> */}
                    <div className={s.potionline}>
                        <div className={s.pic}>
                            <Potion color={'silver'} />
                            <p className={s.name}>Exp</p>
                        </div>
                        <div className={s.count}>
                            <button onClick={() => changeCart(1003, 'minus')} className={s.btnamount}>-</button>
                            {cart[1003]}
                            <button onClick={() => changeCart(1003, 'plus')} className={s.btnamount}>+</button></div>
                        <div className={s.price}>200 <p>UH</p></div>
                    </div>
                </div>

                <div>
                    {/* <h3>Bal+Enrg Potion</h3> */}
                    <div className={s.potionline}>
                        <div className={s.pic}>
                            <Potion color={'gray'} />
                            <p className={s.name}>Bal+Enrg</p>
                        </div>
                        <div className={s.count}>
                            <button onClick={() => changeCart(1004, 'minus')} className={s.btnamount}>-</button>
                            {cart[1004]}
                            <button onClick={() => changeCart(1004, 'plus')} className={s.btnamount}>+</button>
                        </div>
                        <div className={s.price}>150 <p>UH</p></div>
                    </div>
                </div>


            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0 0.5rem' }}>
                <div style={{ marginTop: '1rem' }}>Balance: <b>{Math.floor(balance)}</b> UH</div>

                {loading && <span className={s.loader}></span>}
                {ok && <h4 style={{ color: 'rgb(22 163 74)', fontWeight: 'bold' }}>Successful!</h4>}

                <div style={{ marginTop: '1rem' }}>Total cost: <b>{cart['sum']}</b> UH</div>
            </div>


            <footer className={s.footer}>
                <button
                    className={s.fbtn}
                    onClick={handleClose}
                >BACK</button>

                <button
                    disabled={balance < cart['sum'] || loading}
                    style={{ opacity: balance < cart['sum'] || loading ? '0.5' : '1' }}
                    className={s.fbtn}
                    onClick={handleBuy}
                >BUY</button>
            </footer>
        </div>
    )
}
