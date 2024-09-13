import { useState } from 'react';
import s from './popup.module.css';

import { swichLang } from '../../../lang/lang.js'
import { useUserData } from '../../../store/main'

import { useTeams } from '../../../store/teams';

interface PopUpProps {
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PopUp: React.FC<PopUpProps> = ({ setPopUp }) => {
    const userLang = useUserData((state) => state.user.languageCode)

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
            <h2>{swichLang(userLang, 'title_create_team')}</h2>
            <form onSubmit={handleCreate}>
                <div className={s.inputform}>
                    <label htmlFor="teamName"></label>
                    <input
                        className={s.input}
                        placeholder={swichLang(userLang, 'team_name')}
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
                        placeholder={swichLang(userLang, 'team_link') + '- https://t.me/example'}
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
                    <button className={s.btn} type="submit">{swichLang(userLang, 'create')}</button>
                    <button className={s.btn} type="button" onClick={() => setPopUp(false)}>{swichLang(userLang, 'cancel')}</button>
                </div>
            </form>
        </div>
    )
}
