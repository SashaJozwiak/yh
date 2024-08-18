import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CreateTeam, UseTeams } from '../types/stores';

import { useUserData } from './main';

export const useTeams = create<UseTeams>()(devtools((set) => ({
    teams: [/* {
        team_id: 1,
        owner_id: 1,
        team_name: 'Команда 1',
        src: 'src',
        team_balance: 0,
    },*/
    ],
    myTeam: {
        team_id: 0,
        team_name: 'No team',
        src: 'src',
        owner_id: 1,
        isOwner: false,
        team_balance: 0,
    },
    getTeams: async () => {
        console.log('getteams start')
        try {
            const response = await fetch(`http://localhost:3000/api/profile/teams`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('get teams');
            }

            const data = await response.json();
            set(() => (
                { teams: data }
            ))
            //console.log('get teams finish');
        } catch (e) {
            console.error('ошибка выдачи teams', e)
        }
    },
    joinOrLeaveTeam: async (team_id: number, isJoin: boolean) => {
        const { internalId } = useUserData.getState().user;
        console.log('team_id for fetch', team_id, internalId, isJoin)
        const getTeams = useTeams.getState().getTeams;
        const getMyTeam = useTeams.getState().getMyTeam;

        try {
            const response = await fetch(`http://localhost:3000/api/profile/teams/joinOrLeave`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    internalId: internalId, team_id: team_id, isJoin: isJoin
                }),
            });

            if (!response.ok) {
                throw new Error('get teams');
            }

            const updatedTeams = await response.json();
            console.log('updatedTeams: ', updatedTeams);

            // Обновляем состояние команд на клиенте
            /*  set(() => ({
                 teams: updatedTeams,
             })); */

            await Promise.all([
                getMyTeam(team_id),
                getTeams()
            ])

            if (!isJoin) {
                await set(() => ({
                    myTeam: {
                        team_id: 0,
                        team_name: 'No team',
                        src: 'src',
                        owner_id: 1,
                        isOwner: false,
                        team_balance: 0,
                    }
                }))
            }

        } catch (e) {
            console.error('ошибка join teams', e)
        }
    },
    getMyTeam: async (team_id: number) => {
        console.log('getmyteam start')
        try {
            const response = await fetch(`http://localhost:3000/api/profile/teams/my?team_id=${team_id}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('error get my team');
            }

            const data = await response.json();

            console.log('myteam from server: ', data);
            set(() => (
                {
                    myTeam: data
                }
            ))
        } catch (e) {
            console.error('ошибка выдачи my team', e)
        }
    },
    createTeam: async (data: CreateTeam) => {
        const { internalId } = useUserData.getState().user;
        const { teamName, teamLink, setError } = data;

        const getTeams = useTeams.getState().getTeams;
        const getMyTeam = useTeams.getState().getMyTeam;

        console.log('data for create team ', teamName, teamLink);
        try {
            const response = await fetch(`http://localhost:3000/api/profile/teams/createTeam`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    internalId: internalId, teamName: teamName, teamLink: teamLink
                }),
            });

            if (!response.ok) {
                throw new Error('get teams');
            }

            const data = await response.json();
            if (data.message === 'Team with this name already exists') {
                setError('Team with this name already exists');
            }
            console.log('data for create team ', data);



            await Promise.all([
                getMyTeam(data.team.team_id),
                getTeams()
            ]);



        } catch (e) {
            console.error('ошибка создания команды', e)
        }
    },
    searchTeam: async (teamName: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/profile/teams/search?teamName=${teamName}`,
                {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json'
                    }
                });

            if (!response.ok) {
                throw new Error('get teams');
            }

            const data = await response.json();
            set(() => (
                { teams: data }
            ))
            console.log('data for search team ', data);
            return data;

        } catch (e) {
            console.error('ошибка поиска команды', e)
        }
    }
})
))
