import { create } from 'zustand'
import { AirdropStore } from './types';

import { useUHSWallet } from './UHSWallet';

const uhsWalletStore = useUHSWallet;

export const useAirdropStore = create<AirdropStore>((set) => ({
    data: null,
    loading: false,
    error: null,
    showModal: false, // Состояние для отображения окна
    isFetch: false,

    fetchAirdrop: async (uhs_id: number, internal_id: number, external_id: number) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}uhsairdrop/airdrop`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uhs_id, internal_id, external_id }),
            });

            const result = await response.json();

            console.log('airdrop res: ', result);

            if (!response.ok) {
                throw new Error(result.error || "Failed to fetch airdrop data");
            }

            // Показываем модальное окно только если была добавлена новая запись
            const isNewEntry = result.message !== "Record already exists, no action taken";

            set({ data: result.data, loading: false, showModal: isNewEntry, isFetch: true });
            const { getBalance } = uhsWalletStore.getState();
            await getBalance(uhs_id);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            set({ error: errorMessage, loading: false });
        }
    },

    closeModal: () => set({ showModal: false }) // Метод для скрытия окна
}));

