//import React from 'react'
import { useEarnNav } from "../../earnStore/nav";
import { Plus, Close, Question } from "../../svgs";
import { Add } from "./Add/Add";
import { Info } from "./Info/Info";

import s from './launch.module.css'
import { Web2 } from "./Web2/Web2";

export const Launch = () => {
    const { launch, setLaunch } = useEarnNav(state => state)
    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                    onClick={launch === 'info' ? () => setLaunch('web2') : () => setLaunch('info')}
                    style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>
                    <div>{launch === 'info' ? <Close /> : <Question />}</div>
                    <div>info</div>
                </button>

                <div style={{ display: 'flex', }}>
                    <div className={s.switch}>
                        <button onClick={() => setLaunch('web2')} className={`${s.tabs} ${launch === 'web2' ? s.ontab : null}`}>{launch === 'web2' ? '🔵 web2' : '⚪ web2'}</button>
                        <button onClick={() => setLaunch('web3')} className={`${s.tabs} ${launch == 'web3' ? s.ontab : null}`}>{launch === 'web3' ? '🟢 web3' : '⚪ web3'}</button>
                    </div>
                </div>

                <button
                    onClick={launch === 'add' ? () => setLaunch('web2') : () => setLaunch('add')}
                    style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>
                    <div>{launch === 'add' ? <Close /> : <Plus />}</div>
                    <div>add</div>
                </button>
            </header>

            <>
                {launch === 'info' && <Info />}
                {launch === 'add' && <Add />}
                {launch === 'web2' && <Web2 />}
                {launch === 'web3' && <h3 style={{ color: 'gray' }}>No web3 startups now</h3>}
            </>
        </>
    )
}
