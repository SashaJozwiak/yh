import React, { useEffect } from 'react'
import s from './teams.module.css'
import { useTeams } from '../../../store/teams'

export const Teams: React.FC = () => {
    const teams = useTeams((state) => state.teams)
    const getTeams = useTeams((state) => state.getTeams)

    const joinOrLeaveTeam = useTeams((state) => state.joinOrLeaveTeam)



    useEffect(() => {
        if (!teams.length) {
            getTeams();
        }
    }, [getTeams, teams.length])

    return (
        <>
            <div className={s.myteam}>
                <div>No team</div>
                <div>0</div>
                <button className={s.btn_team}>Leave</button>
            </div>
            <div className={s.inputform}>
                <input
                    //value={searchTerm}
                    //onChange={handleInputChange}
                    className={s.input}
                    type="text" /* value={userId} */ placeholder='Search' />
                <p style={{ top: '1rem', margin: '0 auto' }}>or</p>
                <button
                    //onClick={handleCreateTeam}
                    //disabled={!(filteredTeams.length === 0)}
                    className={s.btn} style={{ /* opacity: filteredTeams.length === 0 ? 1 : 0.5 */ }}><h3>Create</h3>
                </button>
            </div>
            {!teams.length ? <span className={s.loader}></span> : <div className={`${s.list} scrollable`}>
                {teams.map((team) => (
                    <div key={team.team_id} className={s.teamitem}>
                        <button
                            onClick={() => joinOrLeaveTeam(team.team_id, true)}
                            style={{ flex: '0.3' }} className={s.btn_team}>Join</button>
                        <div style={{ flex: '1.3', textAlign: 'left' }}>{team.team_name}</div>
                        <div style={{ flex: '1' }}>{team.team_balance || 0}</div>
                    </div>
                ))}
            </div>}
        </>
    )
}
