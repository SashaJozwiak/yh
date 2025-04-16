import { create } from 'zustand';
import { InviteStore } from './types';
import { useUHSWallet } from './UHSWallet';

const useInviteStore = create<InviteStore>((set, get) => ({
    inviteData: null,          // результат /getMy
    invitedUsers: [],          // результат /getMyInvited
    status: 'idle',            // idle | loading | success | error
    error: null,

    checkHardTask: async (uhs_id, lvl) => {
        console.log(uhs_id, lvl)
    },

    updateLevels: async (uhs_id, level) => {
        set({ status: 'loading', error: null });

        try {
            const res = await fetch(`${import.meta.env.VITE_SECRET_HOST}preRegAdd/updateLevels`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ uhs_id, level }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || 'Failed to update level');

            // Обновляем локальный inviteData (если есть) — только ту lvl, что передали
            const current = get().inviteData;
            if (current && current.uhs_id === uhs_id) {
                set({
                    inviteData: {
                        ...current,
                        [`lvl${level}`]: true,
                    },
                });
            }

            set({ status: 'success' });
            const { getBalance } = useUHSWallet.getState();
            getBalance(uhs_id);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Unknown error');
            set({ error: error.message, status: 'error' });
        }
    },


    fetchMy: async (uhs_id) => {
        set({ status: 'loading', error: null });
        try {
            const res = await fetch(`${import.meta.env.VITE_SECRET_HOST}preRegAdd/getMy?uhs_id=${uhs_id}`);
            if (!res.ok) throw new Error('Failed to fetch invite');
            const data = await res.json();
            set({ inviteData: data, status: 'success' });
        } catch (err) {
            const error = err as Error;
            console.error(error);
            set({ error: error.message, status: 'error' });
        }
    },

    fetchInvitedUsers: async (uhs_id) => {
        set({ status: 'loading', error: null });
        try {
            const res = await fetch(`${import.meta.env.VITE_SECRET_HOST}preRegAdd/getMyInvited?uhs_id=${uhs_id}`);
            if (!res.ok) throw new Error('Failed to fetch invited users');
            const data = await res.json();
            set({ invitedUsers: data, status: 'success' });
        } catch (err) {
            const error = err as Error;
            console.error(error);
            set({ error: error.message, status: 'error' });
        }
    },

    /* addInvite: async (userId, refId) => {
      set({ status: 'loading', error: null });
      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, refId }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Failed to add invite');
  
        set({ status: 'success' });
        return result;
      } catch (err) {
        console.error(err);
        set({ error: err.message, status: 'error' });
      }
    },
  
    reset: () => set({
      inviteData: null,
      invitedUsers: [],
      status: 'idle',
      error: null
    }) */
}));

export default useInviteStore;
