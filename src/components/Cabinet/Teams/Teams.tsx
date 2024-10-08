import React, { useEffect, useState } from 'react'
import s from './teams.module.css'
import { useTeams } from '../../../store/teams'
import { useUserData } from '../../../store/main'
import { PopUp } from './PopUp';

import { swichLang } from '../../../lang/lang.js'

import WebApp from '@twa-dev/sdk';

export const Teams: React.FC = () => {
    const userLang = useUserData((state) => state.user.languageCode)
    const team_id = useUserData((state) => state.user.team_id)

    const myTeam = useTeams((state) => state.myTeam)
    const teams = useTeams((state) => state.teams)

    const getTeams = useTeams((state) => state.getTeams)
    const getMyTeam = useTeams((state) => state.getMyTeam)
    const joinOrLeaveTeam = useTeams((state) => state.joinOrLeaveTeam)
    const searchTeamInBd = useTeams((state) => state.searchTeam)

    const [searchTeam, setSearchTeam] = useState('');
    const [popUp, setPopUp] = useState(false)

    const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setSearchTeam(event.target.value);
    }

    const handleCreateTeam = () => {
        setPopUp(true)
    }

    const handleSearchTeam = () => {
        searchTeamInBd(searchTeam);
    }

    useEffect(() => {
        if (!teams.length) {
            getTeams();
        } else if (searchTeam === '') {
            getTeams();
        }
    }, [getTeams, teams.length, searchTeam])

    useEffect(() => {
        if (team_id && myTeam.team_id === 0) {
            getMyTeam(team_id);
        }
    }, [getMyTeam, myTeam.team_id, team_id])

    //console.log('teams: ', teams)
    //console.log('myTeam: ', myTeam)

    return (
        <>
            {popUp && <PopUp setPopUp={setPopUp} />}
            <div className={s.myteam}>
                {myTeam.team_id === 0 ? <span style={{ margin: '0 auto' }}>{swichLang(userLang, 'not_team')}</span> :
                    <>
                        <button
                            className={s.btnspan}
                            onClick={(e) => {
                                e.preventDefault();
                                //console.log(`https://t.me/${team.src}`)
                                WebApp.openTelegramLink(myTeam.src);
                            }}
                        >{myTeam.team_name}</button>
                        <div>{Number(myTeam.team_balance).toFixed()}</div>
                        <button
                            onClick={() => {
                                joinOrLeaveTeam(myTeam.team_id, false)
                            }}
                            className={s.btn_team}>{swichLang(userLang, 'leave')}
                        </button>
                    </>
                }
            </div>

            <div className={s.inputform}>
                <input
                    value={searchTeam}
                    onChange={handleInputChange}
                    className={s.input}
                    type="text" /* value={userId} */ /* placeholder='Search' */ />
                {/* <p style={{ top: '1rem', margin: '0 auto' }}>or</p> */}
                <button
                    onClick={searchTeam ? handleSearchTeam : handleCreateTeam}
                    //disabled={!(filteredTeams.length === 0)}
                    className={s.btn} style={{ /* opacity: filteredTeams.length === 0 ? 1 : 0.5 */ }}><h3>{searchTeam ? swichLang(userLang, 'search') : swichLang(userLang, 'create')}</h3>
                </button>
            </div>
            {!teams.length ? <span className={s.loader}></span> :
                <div className={`${s.list} scrollable`}>
                    {teams.sort((a, b) => b.team_balance - a.team_balance).map((team) =>
                    <div key={team.team_id} className={s.teamitem}>
                        <button
                                onClick={() => {
                                    team.team_id === myTeam.team_id ? joinOrLeaveTeam(team.team_id, false) : joinOrLeaveTeam(team.team_id, true)
                                }}
                                style={{ flex: '0.4' }} className={s.btn_team}>{team.team_id === myTeam.team_id ? swichLang(userLang, 'leave') : swichLang(userLang, 'join')}</button>
                            <button className={s.btnspan}
                                onClick={(e) => {
                                    e.preventDefault();
                                    //console.log(`https://t.me/${team.src}`)
                                    WebApp.openTelegramLink(team.src);
                                }}
                            >{team.team_name}</button>
                            <div style={{ flex: '1' }}>{Number(team.team_balance).toFixed() || 0}</div>
                    </div>
                    )}
            </div>}
        </>
    )
}
