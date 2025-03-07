
import { useEarnNav } from '../../earnStore/nav'
import { Plus, Close, Question } from "../../svgs";
import { Add } from './Add/Add';

import s from './build.module.css'
import { Info } from './Info/Info';
import { Team1 } from './Team1/Team1';
import { Team2 } from './Team2/Team2';

export const Build = () => {
    const { build, setBuild } = useEarnNav(state => state)


    return (
        <>
            <header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                    onClick={build === 'info' ? () => setBuild('team1') : () => setBuild('info')}
                    style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>
                    <div>{build === 'info' ? <Close /> : <Question />}</div>
                    <div>info</div>
                </button>

                <div style={{ display: 'flex', }}>
                    <div className={s.switch}>
                        <button onClick={() => setBuild('team1')} className={`${s.tabs} ${build === 'team1' ? s.ontab : null}`}>{build === 'team1' ? '🔵 team1' : '⚪ team1'}</button>
                        <button onClick={() => setBuild('team2')} className={`${s.tabs} ${build == 'team2' ? s.ontab : null}`}>{build === 'team2' ? '🟢 team2' : '⚪ team2'}</button>
                    </div>
                </div>

                <button
                    onClick={build === 'add' ? () => setBuild('team1') : () => setBuild('add')}
                    style={{ fontSize: '1rem', margin: '0.6rem', padding: '0 1rem', backgroundColor: 'rgb(71, 85, 105)', borderRadius: '0.3rem', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 3px 0px' }}>
                    <div>{build === 'add' ? <Close /> : <Plus />}</div>
                    <div>add</div>
                </button>
            </header>

            {build === 'info' && <Info />}
            {build === 'add' && <Add />}
            {build === 'team1' && <Team1 />}
            {build === 'team2' && <Team2 />}
        </>
    )
}
