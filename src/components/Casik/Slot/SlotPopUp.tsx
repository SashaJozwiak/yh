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

import s from './pop.module.css';

type PopProps = {
    setInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

const symbolMultipliers: Record<string, number> = {
    developer: 1.2,
    whale: 1.5,
    founder: 1.6,
    trader: 1.8,
    hamster: 3,
    influencer: 5,
    inst: 7,
    support: 10,
    inv3: 20,
    ludoman: 40,
    NFTartist: 60,
    scamer: 100
};

const symbolImages: Record<string, string> = {
    developer,
    whale,
    founder,
    trader,
    hamster,
    influencer,
    inst,
    support,
    inv3,
    ludoman,
    NFTartist,
    scamer
};

export const SlotPopUp = ({ setInfo }: PopProps) => {

    // Собираем массив объектов:
    // [{ name: 'developer', img: developer, mult: 1.2 }, ...]
    const data = Object.keys(symbolImages).map((key) => ({
        name: key,
        img: symbolImages[key],
        mult: symbolMultipliers[key]
    }));

    return (
        <div
            onClick={() => setInfo(false)}
            className={s.container}>
            <div className={s.window}>

                <h2 style={{ padding: '0.3rem' }}>Multipliers <span style={{ color: 'gray', fontSize: '0.8rem' }}>(RTP 95%)</span> </h2>

                <div className={s.grid}>
                    {data.map((item) => (
                        <div className={s.cell} key={item.name}>
                            <img
                                src={item.img}
                                className={s.img}
                                alt={item.name}
                            />
                            <div className={s.multiplier}>x{item.mult}</div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setInfo(false)}
                    className={s.btnok}
                    style={{ height: '10vh', borderRadius: '1rem', margin: '1rem', padding: '0.3rem' }}
                >
                    <h3>OK</h3>
                </button>

            </div>
        </div>
    )
}
