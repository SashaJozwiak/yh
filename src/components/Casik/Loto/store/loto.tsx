import { create } from "zustand";
import { useSlotStore } from "../../Slot/store/slot";
import { useAuth } from "../../../../store/main";

import { useUHSWallet } from '../../../../Earn/earnStore/UHSWallet';

// Типы данных от сервера
export interface LotoRound {
    id: number;
    buyers: Record<number, number>; // ключ = номер билета, значение = user_id
    created_at: string;
    finished_at: string | null;
    winning_tickets: number[] | null;
}

export interface LotoResponse {
    ok: true;
    round: LotoRound;
}

export interface LotoHistoryResponse {
    ok: true;
    history: LotoRound[];
}

// Интерфейс стора
interface LotoState {
    round: LotoRound | null;
    history: LotoRound[]; // массив истории
    loading: boolean;
    isError: boolean;
    selected: number | null;
    yourBought: number[];
    boughtByOthers: number[];
    getHistory: () => Promise<void>;
    setRound: () => Promise<void>;
    setSelected: (id: number | null) => void;
    buyTicket: (userId: number, rawAddress: string, ticketId: number) => Promise<void>;
    setError: (val: boolean) => void;
}

export const useLotoStore = create<LotoState>((set, get) => ({
    round: null,
    history: [],
    loading: false,
    isError: false,
    selected: null,
    yourBought: [],
    boughtByOthers: [],

    setError: (val) => set({ isError: val }),

    buyTicket: async (userId, rawAddress, ticketId) => {
        const { selected, round, setRound, setError } = get();
        //const userId = useAuth.getState().userId;
        const token = localStorage.getItem(rawAddress + 'uhs');
        //const wallet = useAuth.getState().wallet;

        if (!selected || !round || !userId || !token || !rawAddress) {
            console.warn("Missing required fields for buying ticket");
            return;
        }

        set({ loading: true, isError: false });

        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}cazik/loto/buy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    userId,
                    rawAddress,
                    ticketId,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.ok) {
                console.error("Buy ticket error:", data);
                setError(true);
                return;
            }

            console.log("Ticket bought:", data);

            // 🔄 Перезагружаем раунд после покупки (round обновится серверным)
            await setRound();

        } catch (err) {
            console.error("Error during ticket buy:", err);
            setError(true);
        } finally {
            set({ loading: false, selected: null });
            useUHSWallet.getState().getBalance(userId);
        }
    },


    // Получение истории завершённых раундов
    getHistory: async () => {
        set({ loading: true, isError: false });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}cazik/loto/history`);
            if (!response.ok) throw new Error("Failed to fetch loto history");

            const data: LotoHistoryResponse = await response.json();

            if (!data.ok || !data.history) {
                set({ history: [] });
                return;
            }

            set({ history: data.history });
            console.log("loto history: ", data.history);
        } catch (err) {
            console.error("Error fetching loto history:", err);
            useSlotStore.getState().setError(true);
        } finally {
            set({ loading: false });
        }
    },

    // Получение текущего раунда
    setRound: async () => {
        set({ loading: true, isError: false });
        try {
            const response = await fetch(`${import.meta.env.VITE_SECRET_HOST}cazik/loto/current`);
            if (!response.ok) throw new Error("Failed to fetch current round");

            const data: LotoResponse = await response.json();

            if (!data.ok || !data.round) {
                set({ isError: true, round: null, yourBought: [], boughtByOthers: [] });
                return;
            }

            const buyersObj = data.round.buyers || {};
            //const userId = 3; // текущий пользователь, можно заменить динамически
            const userId = useAuth.getState().userId;

            const yourTickets = Object.entries(buyersObj)
                .filter(([, uid]) => uid === userId)
                .map(([ticket]) => Number(ticket));

            const othersTickets = Object.entries(buyersObj)
                .filter(([, uid]) => uid !== userId)
                .map(([ticket]) => Number(ticket));

            set({
                round: data.round,
                yourBought: yourTickets,
                boughtByOthers: othersTickets,
                selected: null,
            });

            console.log("current loto round: ", data.round);
        } catch (err) {
            console.error("Error fetching loto round:", err);
            useSlotStore.getState().setError(true);
            set({ isError: true });
        } finally {
            set({ loading: false });
        }
    },

    // Выбор билета
    setSelected: (id: number | null) => {
        if (id === null) {
            set({ selected: null });
            return;
        }

        const { selected, yourBought, boughtByOthers } = get();
        if (boughtByOthers.includes(id) || yourBought.includes(id)) return;
        set({ selected: selected === id ? null : id });
    },

    // Покупка билета (локально, можно будет добавить POST на сервер)
    /* buyTicket: () => {
        const { selected, yourBought } = get();
        if (!selected) return;
        set({ yourBought: [...yourBought, selected], selected: null });
    }, */
}));
