import { useEffect, useRef, useState } from 'react';
import { useSlotStore } from './store/slot';
import { useAuth } from '../../../store/main';
import { useUHSWallet } from '../../../Earn/earnStore/UHSWallet';

import { useTonAddress } from '@tonconnect/ui-react';
import useSound from "use-sound";

import spinClick from '../assets/spin-btn.mp3'
import spinRoll from '../assets/spin-roll.mp3'
import spinWin from '../assets/spin-win.mp3'

import {
    developer,
    founder,
    hamster,
    influencer,
    inst,
    inv3,
    ludoman,
    NFTartist,
    scamer,
    support,
    trader,
    whale
} from '../assets';

import s from './slot.module.css';
import { SlotPopUp } from './SlotPopUp';
import { Error } from './Error';

// MAPPER
const SYMBOL_MAP: Record<string, string> = {
    developer,
    founder,
    hamster,
    influencer,
    inst,
    inv3,
    ludoman,
    NFTartist,
    scamer,
    support,
    trader,
    whale
};

// ---------- TYPES ----------
export type WeightedSymbol = {
    symbol: string;
    weight: number;
};

// ---------- WEIGHT CONFIG ----------
const weightedSymbols: WeightedSymbol[] = [
    { symbol: developer, weight: 30 },
    { symbol: whale, weight: 25 },
    { symbol: founder, weight: 20 },
    { symbol: trader, weight: 25 },
    { symbol: hamster, weight: 25 },
    { symbol: influencer, weight: 25 },
    { symbol: inst, weight: 25 },
    { symbol: support, weight: 25 },
    { symbol: inv3, weight: 25 },
    { symbol: ludoman, weight: 25 },
    { symbol: NFTartist, weight: 25 },
    { symbol: scamer, weight: 25 },
];

// ---------- RANDOM PICK ----------
const getWeightedRandomSymbol = (weights: WeightedSymbol[]): WeightedSymbol => {
    const total = weights.reduce((acc, w) => acc + w.weight, 0);
    let rand = Math.random() * total;
    for (let i = 0; i < weights.length; i++) {
        if (rand < weights[i].weight) return weights[i];
        rand -= weights[i].weight;
    }
    return weights[weights.length - 1];
};

// ---------- COMPONENT ----------
export const Slot = () => {
    const { bet, setBet, lastResult, showResult, setShowResult, spin: getSpin } = useSlotStore();
    const [grid, setGrid] = useState<WeightedSymbol[][]>([
        [
            { symbol: developer, weight: 25 },
            { symbol: whale, weight: 25 },
            { symbol: founder, weight: 25 },
        ],
        [
            { symbol: trader, weight: 25 },
            { symbol: hamster, weight: 25 },
            { symbol: influencer, weight: 25 },
        ],
        [
            { symbol: inst, weight: 25 },
            { symbol: support, weight: 25 },
            { symbol: inv3, weight: 25 },
        ]
    ]);
    const containerRef = useRef<(HTMLDivElement | null)[]>([]);
    const [spinning, setSpinning] = useState(false);
    //const [winner, setWinner] = useState(false);
    //const [balance, setBalance] = useState(1000);

    const userId = useAuth(state => state.userId);
    const rawAddress = useTonAddress(false);

    const getBalance = useUHSWallet(state => state.getBalance)

    const [info, setInfo] = useState(false);
    const isError = useSlotStore(state => state.isError);

    //const setAudioHandlers = useSlotStore(state => state._setAudioHandlers);

    const playClickRef = useRef<() => void>(() => { });
    const playRollRef = useRef<() => void>(() => { });
    const stopRollRef = useRef<() => void>(() => { });
    const playWinRef = useRef<() => void>(() => { });

    const [playClick] = useSound(spinClick, { volume: 0.5 });
    const [playRoll, rollControls] = useSound(spinRoll, { volume: 0.5, loop: true });
    const [playWin] = useSound(spinWin, { volume: 0.7 });

    useEffect(() => {
        playClickRef.current = playClick;
        playRollRef.current = playRoll;
        stopRollRef.current = rollControls.stop;
        playWinRef.current = playWin;

        useSlotStore.getState()._setAudioHandlers({
            playClick: () => playClickRef.current(),
            playRoll: () => playRollRef.current(),
            stopRoll: () => stopRollRef.current(),
            playWin: () => playWinRef.current(),
        });
    }, [playClick, playRoll, playWin, rollControls.stop]);

    // -------------------------------------------------------
    // Генерация финальной сетки по ответу бэкенда
    // -------------------------------------------------------
    const generateFinalGrid = (result: { win: boolean; symbol: string | null; amount: number; }): WeightedSymbol[][] => {
        const randomSymbol = () => getWeightedRandomSymbol(weightedSymbols);
        const top = [randomSymbol(), randomSymbol(), randomSymbol()];
        const bottom = [randomSymbol(), randomSymbol(), randomSymbol()];
        let center: WeightedSymbol[];
        if (result.win && result.symbol) {
            const img = SYMBOL_MAP[result.symbol];
            center = [
                { symbol: img, weight: 1 },
                { symbol: img, weight: 1 },
                { symbol: img, weight: 1 },
            ];
            console.log("Generated center (win):", center);
        } else {
            const set = new Set<string>();
            center = [];
            while (center.length < 3) {
                const s = randomSymbol();
                if (!set.has(s.symbol)) {
                    set.add(s.symbol);
                    center.push(s);
                }
            }
            console.log("Generated center (lose):", center);
        }
        const finalGrid = [
            [top[0], center[0], bottom[0]],
            [top[1], center[1], bottom[1]],
            [top[2], center[2], bottom[2]],
        ];
        console.log("Final grid:", finalGrid);
        return finalGrid;
    };

    // -------------------------------------------------------
    // Генерация анимационной сетки с финальным результатом
    // -------------------------------------------------------
    const generateAnimationGridWithFinalResult = (finalResult: WeightedSymbol[][]) => {
        const grid: WeightedSymbol[][] = [[], [], []];
        for (let col = 0; col < 3; col++) {
            const strip: WeightedSymbol[] = [];
            // Добавляем 30 случайных символов
            for (let j = 0; j < 30; j++) {
                strip.push(getWeightedRandomSymbol(weightedSymbols));
            }
            // Добавляем финальный результат в конец ленты
            strip.unshift(...finalResult[col]);
            grid[col] = strip;
        }
        console.log("Animation grid with final result:", grid);
        return grid;
    };

    // -------------------------------------------------------
    // Анимация барабанов
    // -------------------------------------------------------
    const animateReels = (newGrid: WeightedSymbol[][]) => {
        for (let i = 0; i < 3; i++) {
            const reel = containerRef.current[i];
            if (reel) {
                reel.style.transition = "none";
                // Смещаем ленту так, чтобы финальный результат был в центре видимой области
                reel.style.transform = `translateY(-${(newGrid[i].length - 3) * 50}px)`;
                void reel.offsetHeight;
                const duration = 0.9 + i * 0.25;
                reel.style.transition = `transform ${duration}s cubic-bezier(0, 0, 0.9, 1)`;
                reel.style.transform = `translateY(0)`;
            }
        }
    };

    // -------------------------------------------------------
    // Основная логика SPIN
    // -------------------------------------------------------
    const spin = async () => {
        if (spinning) return;

        setSpinning(true);
        //setWinner(false);
        //setBalance(prev => prev - bet);

        // 1. Запрос на сервер
        if (userId) {
            await getSpin(userId, rawAddress);
        }


        // 2. Получаем результат из zustand
        const result = useSlotStore.getState().lastResult;
        if (!result) {
            setSpinning(false);
            return;
        }
        console.log("Server result:", result);

        // 3. Генерируем финальную сетку
        const finalGrid = generateFinalGrid(result);

        // 4. Генерируем анимационную ленту с финальным результатом
        const animGrid = generateAnimationGridWithFinalResult(finalGrid);

        // 5. Устанавливаем анимационную ленту
        setGrid(animGrid);

        // 6. Запускаем анимацию
        animateReels(animGrid);

        // 7. Ждём окончания анимации
        const maxDuration = 0.9 + 0.25 * 2;
        await new Promise(res => setTimeout(res, (maxDuration + 0.1) * 1000));

        if (useSlotStore.getState().playRoll) useSlotStore.getState().playRoll();
        if (useSlotStore.getState().stopRoll) useSlotStore.getState().stopRoll();
        //useSlotStore.getState().stopRoll();
        // 8. Обновляем состояние после анимации
        if (result.win) {
            useSlotStore.getState().playWin();
            //setWinner(true);
            //setBalance(prev => prev + result.amount);
        }
        setSpinning(false);
        setShowResult(true);
        getBalance(userId);

    };

    return (
        <>
            {/* REELS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem', fontSize: '1rem' }}>
                <div style={{ alignContent: 'center', color: 'transparent' }}>|||</div>
                <div
                    className={showResult ? `${s.popScale}` : ""}
                    style={{
                        alignContent: 'center', opacity: showResult ? 1 : 0,
                        transition: 'opacity 0.6s ease-in-out',
                    }}>
                    {lastResult && (
                        <h3>
                            {lastResult.win && showResult ? `+ $${lastResult.amount.toFixed(2)}` : ""}
                        </h3>
                    )}
                </div>
                <div style={{ alignContent: 'center' }}>
                    {/* <h3>$0.56</h3>
                    <button style={{ padding: '0 0.3rem', backgroundColor: 'rgb(40, 167, 69)', borderRadius: '0.3rem' }}>get</button> */}
                    <button
                        onClick={() => setInfo(true)}
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={'1.5rem'}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                    </button>


                </div>
            </div >

            <div className={s.reelscontainer}>
                <div style={{ position: 'absolute', right: '0px', top: '45%' }}> ◀  </div>
                <div style={{ position: 'absolute', left: '0px', top: '45%' }}> ▶  </div>
                {grid.map((reel, i) => (
                    <div key={i} className={s.reelwindow}>
                        <div
                            className={s.reelstrip}
                            ref={el => (containerRef.current[i] = el)}
                        >
                            {reel.map((item, j) => {
                                // j === 1 — это СРЕДНЯЯ клетка колонны
                                const isCenterRow = j === 1;

                                // Выиграли и символы совпадают
                                const isWinningSymbol =
                                    showResult &&
                                    lastResult?.win &&
                                    isCenterRow &&
                                    item.symbol === SYMBOL_MAP[lastResult.symbol!];

                                return (
                                    <div
                                        key={j}
                                        className={`${s.symbol} ${isWinningSymbol ? s.winningSymbol : ""}`}
                                    >
                                        <img
                                            src={item.symbol}
                                            alt="symbol"
                                            style={{
                                                borderRadius: "0.1rem",
                                                border: "0.1rem solid gray",
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* PANEL */}
            <div className={s.panel}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5em" }}>
                    {[0.1, 1.00, 5.00, 10.00].map(value => (
                        <button
                            key={value}
                            className={s.button}
                            onClick={() => setBet(value)}
                            style={{
                                padding: "0.5rem",
                                border: `0.1rem solid ${bet === value ? "rgb(0 211 48)" : "#959595"}`,
                                color: bet === value ? "rgb(0 255 58)" : "white",
                            }}
                        >
                            ${value.toFixed(2)}
                        </button>
                    ))}
                </div>
                <button
                    onClick={spin}
                    disabled={spinning}
                    className={s.button}
                    style={{ background: spinning ? "#28a745" : "#28a745", fontWeight: "bold", boxShadow: spinning ? 'none' : 'rgba(0, 0, 0, 0.5) 0px 0px 13px 0px', color: spinning ? 'gray' : 'white', transform: spinning ? 'scale(0.96)' : 'scale(1)' }}
                >
                    Spin!
                </button>
            </div>
            {info && <SlotPopUp setInfo={setInfo} />}
            {!isError && <Error />}

        </>
    );
};
