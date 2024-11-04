import { charDeck } from "../exmpl/charDeck_big"
import { Grades } from "../types/forGameState";

export const getCards = (num: number) => {
    const result: Array<{ id: number; name: string; img: string; grades: Grades, key_power: string }> = [];

    for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * charDeck.length);
        const card = charDeck[randomIndex];

        result.push({
            id: card.id,
            name: card.name,
            img: card.image,
            key_power: card.key_power,
            grades: {
                gray: 1,
                bronze: 0,
                silver: 0,
                gold: 0,
            },
        });
    }

    return result;
}
