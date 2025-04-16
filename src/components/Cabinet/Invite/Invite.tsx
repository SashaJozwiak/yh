import React, { useEffect, useState } from 'react'
import { useAuth, useUserData } from '../../../store/main';
import { swichLang } from '../../../lang/lang.js';

import WebApp from '@twa-dev/sdk';
import useInviteStore from '../../../Earn/earnStore/UHS_invites.js';

import s from './invite.module.css'

export const Invite: React.FC = () => {
    const { userName, languageCode } = useUserData(state => state.user)
    const UHSId = useAuth(state => state.userId)

    const [link, setLink] = useState<string>(`https://t.me/youhold_bot/youhold_app?startapp=${UHSId}`);
    const [copied, setCopied] = useState<boolean>(false);

    const { status, invitedUsers, fetchInvitedUsers } = useInviteStore(state => state)

    const handleCopyClick = () => {
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

    useEffect(() => {
        const link = `https://t.me/youhold_bot/youhold_app?startapp=${UHSId}`;
        setLink(link)
    }, [UHSId])

    useEffect(() => {
        if (UHSId) {
            fetchInvitedUsers(UHSId)
        }
    }, [UHSId, fetchInvitedUsers])

    //console.log('invitedUsers: ', invitedUsers)

    return (
        <>
            <div style={{ overflowY: 'auto' }}>
            <h2 style={{ marginTop: '0.6rem' }}>{swichLang(languageCode, 'hi')} 👋 {userName}!</h2>
            <h3 >{swichLang(languageCode, 'invite')}</h3>

            <div style={{ marginTop: '1em',/*  marginBottom: '1vh', */ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
                    <input
                        type="text"
                        readOnly={true}
                        style={{ margin: '0.4rem', border: '1px solid rgba(14, 165, 233, 0.4)', borderRadius: '0.25rem', padding: '0.5rem 0.3rem', width: '60vw', textAlign: 'center', background: 'lightgray', color: 'rgb(71 85 105)', fontSize: '0.65rem' }}
                        value={link}
                    />

                    <button
                        onClick={handleCopyClick}
                        style={{ border: '1px solid lightgray', background: 'rgb(103 119 142)', borderRadius: '0.25rem', padding: '0rem 0.5rem', height: '1.8rem', fontSize: 'calc(1.3vh + 1.3vw)', fontWeight: 'bold', color: 'white' }}
                    >{copied ? '✅' : '📋'}</button>
                </div>

                <button onClick={(e) => {
                    e.preventDefault();
                    const tolink: string = `https://t.me/share/url?url=${link}&text=Hi 👋 Join the holders app`;
                    //window.open(tolink, "_blank");
                    WebApp.openTelegramLink(tolink);
                }}
                    style={{ border: '1px solid lightgray', background: 'rgb(103 119 142)', borderRadius: '0.25rem', padding: '0rem 0.5rem', margin: '2vh 4rem', height: '2rem', fontSize: 'calc(1.3vh + 1.3vw)', fontWeight: 'bold', color: 'white' }}
                ><h3 style={{ display: 'inline-block' }}>{swichLang(languageCode, 'invitebtn')}</h3></button>
            </div>

                {status === 'loading' ? <span style={{ margin: '2vh auto' }} className={s.loader}></span> :
                <div>
                        <p style={{ marginBottom: '0.5rem' }}>Total friends: {invitedUsers.length}</p>
                        <p>Level 1 tasks (+10 UHS): {invitedUsers.filter(user => user.lvl1).length}</p>
                        <p>Level 2 tasks (+20 UHS): {invitedUsers.filter(user => user.lvl2).length}</p>
                        <p style={{ marginBottom: '0.5rem' }}>Level 3 task (+40 UHS): {invitedUsers.filter(user => user.lvl3).length}</p>
                        <h3 >Earned: {invitedUsers.filter(user => user.lvl1).length * 10 + invitedUsers.filter(user => user.lvl2).length * 20 + invitedUsers.filter(user => user.lvl3).length * 40} UHS</h3>
                    </div >}
            </div>

        </>
    )
}
