import { useState } from 'react';
import s from './popup.module.css';
import { useTeams } from '../../../store/teams';

interface PopUpProps {
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopUp: React.FC<PopUpProps> = ({ setPopUp }) => {
    const [teamName, setTeamName] = useState('');
    const [teamLink, setTeamLink] = useState('');

    const [error, setError] = useState('');

    const createTeam = useTeams(state => state.createTeam);

    const handleCreate = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (teamName && teamName !== ' ' && teamName.toLowerCase() !== 'none' && teamLink && teamLink.startsWith('https://t.me/')) {
            createTeam({ teamName, teamLink, setError });
            if (!error) {
                setPopUp(false);
            }
        } else {
            setError('Please fill in all fields correctly.')
        }
    };

    //console.log('team: ', teamName, teamLink)

    return (
        <div className={s.popupoverlay}>
            <h2>Create Team</h2>
            <form onSubmit={handleCreate}>
                <div className={s.inputform}>
                    <label htmlFor="teamName"></label>
                    <input
                        className={s.input}
                        placeholder='Team Name'
                        type="text"
                        id="teamName"
                        value={teamName}
                        onChange={(e) => {
                            setTeamName(e.target.value)
                            if (error) {
                                setError('')
                            }
                        }}
                        required
                    />
                </div>
                <div className={s.inputform}>
                    <label htmlFor="teamLink"></label>
                    <input
                        className={s.input}
                        placeholder='Team Link - https://t.me/example'
                        type="text"
                        id="teamLink"
                        value={teamLink}
                        onChange={(e) => {
                            setTeamLink(e.target.value)
                            if (error) {
                                setError('')
                            }
                        }}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <div className={s.btns}>
                    <button className={s.btn} type="submit">Create</button>
                    <button className={s.btn} type="button" onClick={() => setPopUp(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
