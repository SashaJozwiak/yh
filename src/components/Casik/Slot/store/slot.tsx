import { create } from 'zustand'
import { useUHSWallet } from '../../../../Earn/earnStore/UHSWallet';



interface SpinResult {
    win: boolean;
    symbol: string | null;
    amount: number;
}

interface SlotState {
    balance: number;
    bet: number;
    loading: boolean;
    lastResult: SpinResult | null;
    showResult: boolean;
    isError: boolean;

    setBalance: (balance: number) => void;
    setError: (error: boolean) => void;
    setShowResult: (show: boolean) => void;

    setBet: (bet: number) => void;

    spinRoulette: (userId: number, rawAddress: string) => Promise<void>;
    spin: (userId: number, rawAddress: string) => Promise<void>;

    // ❤️ звук
    playClick: () => void;
    playRoll: () => void;
    stopRoll: () => void;
    playWin: () => void;
    playRoulette: () => void;

    // сюда мы положим реальные функции из useSound
    _setAudioHandlers: (handlers: {
        playClick: () => void;
        playRoll: () => void;
        stopRoll: () => void;
        playWin: () => void;
        playRoulette: () => void;
    }) => void;
}

export const useSlotStore = create<SlotState>((set, get) => ({
    balance: 0,
    bet: 0.10,
    loading: false,
    lastResult: null,
    showResult: false,
    isError: false,

    setBalance: (bal) => set({ balance: bal }),
    setShowResult: (show) => set({ showResult: show }),
    setBet: (bet) => set({ bet }),

    // звуковые команды по умолчанию (заглушки)
    playClick: () => { },
    playRoll: () => { },
    stopRoll: () => { },
    playWin: () => { },
    playRoulette: () => { },

    _setAudioHandlers: (handlers) => set({
        playClick: handlers.playClick,
        playRoll: handlers.playRoll,
        stopRoll: handlers.stopRoll,
        playWin: handlers.playWin,
        playRoulette: handlers.playRoulette,
    }),

    setError: (error) => set({ isError: error }),




    spinRoulette: async (userId, rawAddress) => {
        const state = get();
        //state.setShowResult(false);

        //const bet = 0.50; // фиксированная ставка
        set({ loading: true });

        const token = localStorage.getItem(rawAddress + 'uhs');

        // 🔊 звук клика по кнопке
        state.playClick();

        // 🔊 звук вращения колеса
        state.playRoulette();

        try {
            const res = await fetch(`${import.meta.env.VITE_SECRET_HOST}cazik/roulette/spin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token, userId, rawAddress })
            });

            const data = await res.json();

            console.log('roulette response: ', data);

            // data = { win: number, index: number, newBalance: number }

            /* set({
                lastRouletteResult: data,
                loading: false
            }); */

            return data;

        } catch (err) {
            console.error("Roulette spin error:", err);
            set({ loading: false });
            set({ isError: true });
            return null;
        } finally {
            console.log('finally roulette spin');
            //state.stopRoll(); // ← ОСТАНАВЛИВАЕМ ЗДЕСЬ
            useUHSWallet.getState().getBalance(userId);
        }
    },


    spin: async (userId, rawAddress) => {
        const state = get();
        state.setShowResult(false)
        const { bet } = state;

        set({ loading: true });
        const token = localStorage.getItem(rawAddress + 'uhs');


        // 🔊 запускаем звук клика на кнопку
        state.playClick();

        // 🔊 запускаем звук вращения
        state.playRoll();

        try {
            const res = await fetch(`${import.meta.env.VITE_SECRET_HOST}cazik/slot/spin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bet, token, userId, rawAddress })
            });

            const data: SpinResult = await res.json();

            console.log('response: ', data)

            set({ lastResult: data, loading: false });

        } catch (err) {
            console.error("Spin error:", err);
            set({ loading: false });
            set({ isError: true })
        } finally {
            console.log('fianlly spin')
            //state.stopRoll();   // ← ОСТАНАВЛИВАЕМ ЗДЕСЬ
            //await useUHSWallet.getState().getBalance(userId);
        }
    }
}));
