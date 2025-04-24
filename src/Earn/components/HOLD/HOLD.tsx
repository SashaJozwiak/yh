import { useEffect } from "react";
import { useAuth, useUserData } from "../../../store/main";
import { useUHSWallet } from "../../earnStore/UHSWallet";
import { useEarnNav } from "../../earnStore/nav";
import { Plus, Close, Question } from "../../svgs";

import { HoldTW } from './HoldTW/HoldTW';
import { HoldUW } from "./HoldUW/HoldUW";
import { Info } from "./Info/Info";
import { Add } from "./Add/Add";

import s from './hold.module.css'
import { useAirdropStore } from "../../earnStore/airdrop";
import { Awindow } from "./Awindow";

export const HOLD = () => {

    const { isFetch, showModal, /* closeModal, */ fetchAirdrop } = useAirdropStore();

    const { hold, setHold } = useEarnNav(state => state)
    const uhsId = useAuth(state => state.userId)
    const internal_id = useUserData(state => state.user.internalId)
    const external_id = useUserData(state => state.user.id)
    //const allAuthData = useAuth(state => state)

    const { recBalance, recShares, getBalance, getShares } = useUHSWallet(state => state)

    useEffect(() => {
        if (uhsId && !isFetch) {
            fetchAirdrop(uhsId, internal_id, external_id);
        }
    }, [external_id, fetchAirdrop, internal_id, isFetch, uhsId]);

    useEffect(() => {
        if (!recBalance) {
            getBalance(uhsId);
        }
    }, [getBalance, recBalance, uhsId])

    useEffect(() => {
        if (!recShares) {
            getShares(uhsId);
        }
    }, [uhsId, getShares, recShares])


    console.log('uhsId, internal_id, external_id :', uhsId, internal_id, external_id);

    return (
        < /* style={{ overflowY: 'auto' }} */>
            <header style={{ display: 'flex', justifyContent: 'space-between'/* , border: '1px solid' */ }}>
                <button
                    onClick={hold === 'info' ? () => setHold('twallet') : () => setHold('info')}
                    style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', border: hold === 'info' ? '1px solid #bbbbbb' : '1px solid transparent' }}>
                    <div>{hold === 'info' ? <Close /> : <Question />}</div>
                    <div>info</div>
                </button>

                <div style={{ display: 'flex', }}>
                    <div className={s.switch}>
                        <button onClick={() => setHold('twallet')} className={`${s.tabs} ${hold === 'twallet' ? s.ontab : null}`}>{hold === 'twallet' ? '🔵 TON Wallet' : '⚪ TON Wallet'}</button>
                        <button onClick={() => setHold('uwallet')} className={`${s.tabs} ${hold == 'uwallet' ? s.ontab : null}`}>{hold === 'uwallet' ? '🟢 UH Wallet' : '⚪ UH Wallet'}</button>
                    </div>
                </div>

                <button
                    onClick={hold === 'add' ? () => setHold('twallet') : () => setHold('add')}
                    style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px', border: hold === 'add' ? '1px solid #bbbbbb' : '1px solid transparent' }}>
                    <div>{hold === 'add' ? <Close /> : <Plus />}</div>
                    <div>add</div>
                </button>
            </header>

            {hold === 'twallet' && <HoldTW />}
            {hold === 'uwallet' && <HoldUW />}
            {hold === 'info' && <Info />}
            {hold === 'add' && <Add />}

            {showModal && <Awindow />}


        </>
    )
}
