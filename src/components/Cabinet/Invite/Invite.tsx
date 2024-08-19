import React, { useEffect, useState } from 'react'
import { useUserData } from '../../../store/main';

//import WebApp from '@twa-dev/sdk';

export const Invite: React.FC = () => {
    const { id, userName, team_id } = useUserData(state => state.user)


    const [link, setLink] = useState<string>(`https://t.me/youhold_bot?start=${id}`);
    const [copied, setCopied] = useState<boolean>(false);
    const [checked, setCheked] = useState<boolean>(!!team_id);

    const changeLink = () => {
        //console.log(e.target.value)
        setCheked(prev => {
            const newIsTeam = !prev;
            if (newIsTeam) {
                setLink(`https://t.me/youhold_bot?start=${id}_${team_id}`);
            } else {
                setLink(`https://t.me/youhold_bot?start=${id}`);
            }
            return newIsTeam;
        });

    }

    const handleCopyClick = () => {
        console.log('handleCopyClick')
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true)
            const timerId = setTimeout(() => {
                setCopied(false);
            }, 2000);

            return () => clearTimeout(timerId);
        }).catch(err => {
            setCopied(false)
            console.error('Error copying link', err);
        });

    }

    console.log(link)

    useEffect(() => {
        if (team_id) {
            //console.log('authData team: ', authData.ref_team_by);
            setCheked(true);
            const linkWithTeam = `https://t.me/youhold_bot?start=${id}_${team_id}`;
            setLink(linkWithTeam)
        } else {
            setCheked(false);
            //console.log('authData no team:', authData);
            const link = `https://t.me/youhold_bot?start=${id}`;
            setLink(link)
        }
    }, [id, team_id])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', /* gap: '1rem', */ margin: '1rem' }}>

            <h2>Hi 👋 {userName}!</h2>
            <h3 >Invite your friends</h3>

            <div style={{ marginTop: '1em', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>

                <div>
                    <input
                        type="text"
                        readOnly={true}
                        style={{ margin: '0.4rem', border: '1px solid rgba(14, 165, 233, 0.4)', borderRadius: '0.25rem', padding: '0.5rem 0.3rem', width: '60vw', textAlign: 'center', background: 'lightgray', color: 'rgb(71 85 105)', fontSize: '0.65rem' }}
                        value={link}
                    />

                    <button
                        onClick={handleCopyClick}
                        style={{ background: 'rgb(14, 165, 233)', borderRadius: '0.25rem', padding: '0rem 0.5rem', height: '2rem', fontSize: 'calc(1.3vh + 1.3vw)', fontWeight: 'bold', color: 'white' }}
                    >{copied ? '✅' : '📋'}</button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
                    <input type="checkbox" id='withteam' readOnly={true} disabled={!team_id} checked={checked}
                        style={{ border: '1px solid rgba(14, 165, 233, 0.4)', borderRadius: '0.25rem', transform: 'scale(1.3)' }}
                        onChange={changeLink} />
                    <label htmlFor="withteam" style={{ fontSize: 'calc(1.2vh + 1.2vw)' }}>&nbsp; and invite to your team</label>

                </div>

                <button onClick={(e) => {
                    e.preventDefault();
                    const tolink: string = `tg://msg_url?url=${link}&text=Hi 👋 Join the holders app`;
                    window.open(tolink, "_blank");
                }}
                    style={{ background: 'rgb(14, 165, 233)', borderRadius: '0.25rem', padding: '0rem 0.5rem', margin: '2vh 0.35rem', height: '2rem', fontSize: 'calc(1.3vh + 1.3vw)', fontWeight: 'bold', color: 'white' }}
                ><h3 style={{ display: 'inline-block' }}>invite</h3></button>

                {/* <a
                    style={{ background: 'rgb(14, 165, 233)', borderRadius: '0.25rem', padding: '0rem 0.5rem', margin: '2vh 0.35rem', height: '2rem', fontSize: '1rem', fontWeight: 'bold', color: 'white' }}
                    href={`tg://msg_url?url=${link}&text=Hi 👋 Join the holders app`}>
                    <p style={{ marginTop: '1.5%' }}>Invite</p>
                </a> */}

                {/* <a href={"tg://msg_url?url=https://t.me/youhold_bot?start=946292829_5&text=Hi 👋 Join the holders app"} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>link</a> */}
            </div>

        </div>
    )
}
