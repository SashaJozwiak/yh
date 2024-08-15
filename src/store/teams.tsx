import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { UseTeams } from '../types/stores';

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
    getTeams: async () => {
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
        } catch (e) {
            console.error('ошибка выдачи teams', e)
        }
    },
    joinOrLeaveTeam: async (team_id: number, isJoin: boolean) => {
        const { internalId } = useUserData.getState().user;

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


        } catch (e) {
            console.error('ошибка join teams', e)
        }
        console.log('join team:', team_id, internalId)
    }
})))
