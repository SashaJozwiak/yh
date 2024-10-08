import React, { useEffect, useState } from 'react'
import { useUserData } from '../../../store/main';
import { swichLang } from '../../../lang/lang.js';

import WebApp from '@twa-dev/sdk';
import { useTeams } from '../../../store/teams';

import s from './invite.module.css'
import { useInvites10 } from '../../../store/invites';
//import { ClaimInv } from './ClaimInv.tsx';

//import { Top10Inv } from './top10/Top10Inv';
//import { Claim } from './Claim.tsx'

export const Invite: React.FC = () => {
    const [userClaimStatus, setUserClaimStatus] = useState<boolean | null>(null);

    const { id, userName, languageCode, internalId } = useUserData(state => state.user)
    const teamId = useTeams(state => state.myTeam.team_id)

    const top10 = useInvites10(state => state.top10);
    const getTop10 = useInvites10(state => state.getTop10);

    const winners = useInvites10(state => state.winners);
    const getWinners = useInvites10(state => state.getWinners);
    const claim = useInvites10(state => state.addReward)


    const total = useInvites10(state => state.total);

    const loadStatus = useInvites10(state => state.loadStatus);

    const [link, setLink] = useState<string>(`https://t.me/youhold_bot?start=${id}`);
    const [copied, setCopied] = useState<boolean>(false);
    const [checked, setCheked] = useState<boolean>(!!teamId);

    const changeLink = () => {
        setCheked(prev => {
            const newIsTeam = !prev;
            if (newIsTeam) {
                setLink(`https://t.me/youhold_bot?start=${id}_${teamId}`);
            } else {
                setLink(`https://t.me/youhold_bot?start=${id}`);
            }
            return newIsTeam;
        });
    }

    const handleCopyClick = () => {
        //console.log('handleCopyClick')
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

    //console.log(link)

    useEffect(() => {
        // Здесь обновляем статус после получения данных
        const userInWinners = winners.find(winner => +(winner.id) === id);
        setUserClaimStatus(userInWinners ? userInWinners.is_claim : null);
    }, [winners, id]);

    useEffect(() => {
        if (teamId && teamId !== 0) {
            //console.log('authData team: ', authData.ref_team_by);
            setCheked(true);
            const linkWithTeam = `https://t.me/youhold_bot?start=${id}_${teamId}`;
            setLink(linkWithTeam)
        } else {
            setCheked(false);
            //console.log('authData no team:', authData);
            const link = `https://t.me/youhold_bot?start=${id}`;
            setLink(link)
        }
    }, [id, teamId])

    useEffect(() => {
        if (!top10.length) {
            getTop10();
        }
    }, [getTop10, top10])

    useEffect(() => {
        if (total > 992) {
            getWinners();
        }
    }, [getWinners, total])

    const userInWinners = winners.find(winner => +(winner.id) === id);
    //const userClaimStatus = userInWinners ? userInWinners.is_claim : null;

    console.log('winner!!: ', userInWinners?.reward)

    const handleClaim = async () => {
        if (userInWinners?.reward !== undefined) {
            await claim(id, internalId, userInWinners?.reward);// reward всегда будет числом
            getWinners();
        } else {
            console.error("Reward is undefined");
        }
    }

    return (
        <>
            <h2 style={{ marginTop: '0.6rem' }}>{swichLang(languageCode, 'hi')} 👋 {userName}!</h2>
            <h3 >{swichLang(languageCode, 'invite')}</h3>

            <div style={{ marginTop: '1em', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
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

                {/* <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
                    <input type="checkbox" id='withteam' readOnly={true} disabled={!teamId || teamId === 0} checked={checked}
                        style={{
                            border: '1px solid rgba(14, 165, 233, 0.4)',
                            borderRadius: '0.25rem',
                            transform: 'scale(1.3)',
                            backgroundColor: checked ? 'rgb(22, 163, 74)' : 'transparent',
                        }}
                        onChange={changeLink} />
                    <label htmlFor="withteam" style={{ fontSize: 'calc(1.2vh + 1.2vw)' }}>&nbsp; {swichLang(languageCode, 'inviteand')}</label>
                </div> */}

                <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
                    <input
                        type="checkbox"
                        id="withteam"
                        readOnly={true}
                        disabled={!teamId || teamId === 0}
                        checked={checked}
                        onChange={changeLink}
                        style={{ display: 'none' }}
                    />
                    <label
                        htmlFor="withteam"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            fontSize: 'calc(1.2vh + 1.2vw)',
                        }}
                    >
                        <span
                            style={{
                                padding: '0 0.25rem',
                                color: checked ? 'rgb(22, 163, 74)' : 'transparent',
                                border: checked ? '1px solid rgb(22, 163, 74)' : '1px solid rgb(255, 255, 255)',
                                borderRadius: '0.25rem',
                                display: 'inline-block',
                                marginRight: '0.5rem',
                                backgroundColor: checked ? 'lightgray' : 'transparent',
                                transition: 'background-color 0.3s, border 0.3s',
                                fontWeight: 'bold',
                                margin: '0 auto'

                            }}
                        >✓</span>
                        &nbsp; {swichLang(languageCode, 'inviteand')}
                    </label>
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

            <h2 className={s.headerlist}> {swichLang(languageCode, 'contest')} <span style={{ color: 'rgb(22 163 74)' }}>38,000B</span></h2>

            <div className={s.progressbar}>
                <div className={s.progress} style={{ width: `${((total / 1000) * 100) < 2 ? 2 : ((total / 1000) * 100)}%` }}></div>
            </div>
            <div style={{ color: total > 999 ? 'rgb(22 163 74)' : 'gray' }}> {total > 999 ? 'Completed!' : swichLang(languageCode, 'contest_desc')} {total > 999 ? null : total}{total > 999 ? null : '/1000'}</div >

            {/* <Top10Inv top10={top10} /> */}
            {/* {id === 0 && <Claim />} */}
            {total > 999 ?
                <div>
                    {userClaimStatus === null ? (
                        <p style={{ margin: '1rem 1rem' }}>{swichLang(languageCode, 'not_part')}</p>
                    ) : userClaimStatus ? (
                        <p style={{ margin: '1rem 1rem' }}>{swichLang(languageCode, 'after_claim')}</p>
                    ) : (
                        <>
                            <button
                                style={{ border: '1px solid lightgray', background: 'rgb(103 119 142)', borderRadius: '0.25rem', padding: '0.3rem 0.5rem', margin: '1rem auto', height: '2rem', fontSize: 'calc(1.3vh + 1.3vw)', fontWeight: 'bold', color: 'white' }}
                                onClick={handleClaim}
                            // eslint-disable-next-line no-unsafe-optional-chaining
                            >{swichLang(languageCode, 'claim_btn')} {(userInWinners?.reward)?.toLocaleString('ru')} <span style={{ color: 'rgb(22 163 74)' }}>B</span></button>
                        </>
                    )}
                </div> :
                <>
            <div className={s.listtitle}>
                <p>{swichLang(languageCode, 'user')}</p>
                <p >{swichLang(languageCode, 'afriends')}</p>
                <p style={{ fontWeight: 'bold' }}>{swichLang(languageCode, 'reward')}</p>
            </div>
            {loadStatus && <span className={s.loader}></span>}
            {top10.length < 1 ? (
                <span className={s.loader}></span>
            ) : (
                <div className={`${s.list} scrollable`}>
                    {top10.map((item, indx) => (
                        <div className={s.listitem} key={item.ref_by | indx}>
                            <div
                                className={s.btn}
                            >
                                <span className={s.btnspan}>
                                    {(item.username || 'anonymous').substring(0, 12)}
                                </span>
                            </div>
                            <div>{item.active_friends_count}</div>
                            <div style={{ color: 'rgb(22 163 74)', fontWeight: 'bold' }} className="div">
                                {indx === 0 ? '12,000 B' : indx === 1 ? '8,000 B' : indx === 2 ? '6,000 B' : indx === 3 ? '4,000 B' : indx === 4 ? '3000 B' : indx === 5 ? '2000 B' : indx === 6 ? '1000 B' : indx === 7 ? '800 B' : indx === 8 ? '600 B' : indx === 9 ? '400 B' : null}
                            </div>
                        </div>
                    ))}
                </div>
            )}
                </>
            }

        </>
    )
}
