import { useEffect, useState, /* useState */ } from "react";

import { useLotoStore } from "./store/loto";
import { useTonAddress } from '@tonconnect/ui-react';

import { History } from './History'
import { Error } from "../Slot/Error"
import { useAuth } from "../../../store/main";

const TOTAL_TICKETS = 12;

// Имитируем билеты, купленные другими игроками
//const PRE_BOUGHT: number[] = [2, 5, 9]; // пример

export const Loto = () => {
    const [isHistory, setIsHistory] = useState(false);

    const { setRound,/* loading ,*/ selected, setSelected, yourBought, boughtByOthers, /* getHistory */ buyTicket } = useLotoStore((state) => state);
    const { isError } = useLotoStore((state) => state);

    const userId = useAuth(state => state.userId);
    const rawAddress = useTonAddress(false);

    const handleSelect = (id: number) => {
        // если билет занят — не даём выбрать
        if (boughtByOthers.includes(id)) return;

        // если билет уже ваш — тоже не выбираем
        if (yourBought.includes(id)) return;

        if (selected === id) {
            setSelected(null)
            return;
        }

        setSelected(id);
    };

    const handleBuy = async () => {
        if (!selected) return;

        //setYourBought([...yourBought, selected]);
        //изменение данных о купленных билетах, прокупка
        if (userId) {
            await buyTicket(userId, rawAddress, selected)
        }

        setSelected(null);
    };

    const getColor = (id: number) => {
        if (boughtByOthers.includes(id)) return "#cccccc"; // серый — куплен другими
        if (yourBought.includes(id)) return "#4caf50";     // зелёный — куплен вами
        if (selected === id) return "#94dd96ff";             // синий — выбран
        return "#ffffff";                                  // белый — свободен
    };

    const onHistory = () => {
        setIsHistory(!isHistory);
    }

    useEffect(() => {
        setRound();
    }, [setRound])

    return (
        <>
            <div
                style={{
                    width: "100%",
                    maxWidth: 400,
                    //border: "1px solid #ccc",
                    borderRadius: 8,
                    padding: '0.3rem',
                    margin: "0 auto",
                }}
            >
                {/* <h2 style={{ marginTop: 0 }}>Лото</h2> */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <button
                        onClick={() => onHistory()}
                        style={{ padding: '0.3rem', borderRadius: '0.3rem', backgroundColor: 'rgb(71, 85, 105)', fontStyle: 'italic' }}>history
                    </button>
                    <h3 style={{ alignContent: 'center' }}>Tickets</h3>
                    <span style={{ color: 'gray', fontSize: '0.8rem', alignContent: 'center' }}><p>chance 50%</p><p>win: x1.9</p></span>
                </div>

                {/* таблица 12 билетов */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gridTemplateRows: "repeat(3, 1fr)",
                        gap: 10,
                        width: "100%",
                        height: '45vh',
                    }}
                >
                    {Array.from({ length: TOTAL_TICKETS }).map((_, i) => {
                        const number = i + 1;

                        return (
                            <div
                                key={number}
                                onClick={() => handleSelect(number)}
                                style={{
                                    flexDirection: 'column',
                                    color: 'gray',
                                    border: "1px solid #999",
                                    borderRadius: 6,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    background: getColor(number),
                                    userSelect: "none",
                                    transform: selected === number ? "scale(1.1)" : "scale(1)",
                                }}
                            >
                                {boughtByOthers.includes(number) && <div>
                                    <span>№ {number}</span><span></span>
                                    <span style={{ display: 'block', fontSize: '0.8rem' }}>sold</span>
                                </div>}

                                {!boughtByOthers.includes(number) && !yourBought.includes(number) && <div>
                                    <span>№ {number}</span><span></span>
                                    <span style={{ display: 'block', fontSize: '0.8rem' }}>$1</span>
                                </div>}

                                {yourBought.includes(number) && <div style={{ color: 'black' }}>
                                    <span>№ {number}</span><span></span>
                                    <span style={{ display: 'block', fontSize: '0.8rem' }}>Your</span>
                                </div>}



                            </div>
                        );
                    })}
                </div>

                {/* купить */}
                <button
                    onClick={handleBuy}
                    style={{
                        width: "100%",
                        padding: "12px 0",
                        fontSize: 18,
                        cursor: "pointer",
                        marginTop: '0.5rem',
                        opacity: selected ? 1 : 0.5,
                        backgroundColor: selected ? "green" : "black",
                    }}
                    disabled={!selected}
                >
                    {selected ? 'Get a ticket ($1)' : 'Select a tiket'}
                </button>
            </div>
            {isError && <Error />}
            {isHistory && <History onHistory={onHistory} />}
        </>
    );
}
