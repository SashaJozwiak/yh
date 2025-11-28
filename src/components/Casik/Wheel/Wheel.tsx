import { useState } from "react";
import { Wheel } from "react-custom-roulette";

import { useSlotStore } from "../Slot/store/slot";

import finger from '../assets/white_finger_tr_cmp.png'

// Пример: колесо получает результат от бэкенда и крутится под него
export const PrizeWheel = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const balance = useSlotStore((state) => state.balance);

    // данные колеса
    const data = [
        { option: "$0.50" },
        { option: "$0.25" },
        { option: "$0.75" },
        { option: "$0.35" },
        { option: "$1.00" },
        { option: "$5.00" },
        { option: "$10.00" },
        { option: "$20.00" },
        { option: "$50.00" },
        { option: "$100.00" },
    ];

    const colors = [
        "#4166E9",
        "#27B1DD",
        "#DD5570",
        "#028C84",
        "#1DC25F",
        "#C96014",
        "#E3C216",
        "#BB83F4",
        "#6A32CB",
        "#27419fff",
    ];

    const handleSpinClick = async () => {
        // запрос к бэкенду, который вернёт индекс выигрыша
        // пример: const res = await fetch("/api/spin");
        // const json = await res.json();
        // const winIndex = json.index;

        // временная имитация бэкенда
        const winIndex = Math.floor(Math.random() * data.length);

        setPrizeNumber(winIndex);
        setMustSpin(true);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 20,
            }}
        >
            <div style={{ transform: "rotate(45deg)", marginBottom: 20 }}>
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    backgroundColors={colors}
                    outerBorderWidth={0}
                    textColors={["white"]}
                    pointerProps={{
                        src: finger,
                        style: { transform: "rotate(225deg)" },
                    }}
                    onStopSpinning={() => {
                        setMustSpin(false);
                        console.log("Выпало: " + data[prizeNumber].option);
                    }}
                />
            </div>

            <button
                onClick={handleSpinClick}
                disabled={balance < 0.5}
                style={{
                    padding: "10px 20px",
                    fontSize: 16,
                    borderRadius: 8,
                    border: "none",
                    background: "rgb(40, 167, 69)",
                    color: `${balance > 0.5 ? 'white' : 'gray'}`,
                    cursor: "pointer",
                    zIndex: "1000",
                }}
            >
                SPIN ($0.50)
            </button>
        </div>
    );
}
