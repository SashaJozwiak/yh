//import { ArenaCard } from "../types/Arena";

const enemies = [
    { id: 1, name: 'Badbug', type: 'enemies', bp: [40.7, 3.8], balance: 110, attack: 20 },
    { id: 2, name: 'Bitpink', type: 'enemies', bp: [59.3, 3.8], balance: 90, attack: 22 },
    { id: 3, name: 'Blockbeast', type: 'enemies', bp: [78, 3.2], balance: 160, attack: 16 },
    { id: 4, name: 'Demasell', type: 'enemies', bp: [96.8, 3], balance: 150, attack: 17 },
    { id: 5, name: 'Hellchain', type: 'enemies', bp: [3, 22.2], balance: 60, attack: 35 },
    { id: 6, name: 'Apper', type: 'enemies', bp: [22, 22], balance: 130, attack: 21 },
    { id: 7, name: 'Gregpay', type: 'enemies', bp: [40.6, 22.3], balance: 100, attack: 20 },
    { id: 8, name: 'Hairyk', type: 'enemies', bp: [59.5, 22], balance: 120, attack: 20 },
    { id: 9, name: 'Minik', type: 'enemies', bp: [78, 22], balance: 40, attack: 35 },
    { id: 10, name: 'Ganger', type: 'enemies', bp: [96.7, 20], balance: 170, attack: 16 },
    { id: 11, name: 'Toothy', type: 'enemies', bp: [22, 40.8], balance: 200, attack: 13 },
    { id: 12, name: 'Chainlien', type: 'enemies', bp: [40.8, 40.8], balance: 90, attack: 35 },
    { id: 13, name: 'Zol', type: 'enemies', bp: [59.4, 40.8], balance: 120, attack: 25 },
    { id: 14, name: 'Yeton', type: 'enemies', bp: [78.3, 40.5], balance: 170, attack: 21 },
    { id: 15, name: 'Skull', type: 'enemies', bp: [97, 39.1], balance: 150, attack: 15 },
    { id: 16, name: 'Badlik', type: 'enemies', bp: [3, 58], balance: 170, attack: 15 },
    { id: 17, name: 'Moophy', type: 'enemies', bp: [22, 59], balance: 50, attack: 36 },
    { id: 18, name: 'Icer', type: 'enemies', bp: [40.8, 59], balance: 170, attack: 15 },
    { id: 19, name: 'Bubik', type: 'enemies', bp: [59.7, 59.5], balance: 170, attack: 22 },
    { id: 20, name: 'Scarl', type: 'enemies', bp: [78, 59.5], balance: 170, attack: 15 },
    { id: 21, name: 'Watur', type: 'enemies', bp: [97, 59.5], balance: 130, attack: 21 },
    { id: 22, name: 'Moneat', type: 'enemies', bp: [3, 77], balance: 50, attack: 36 },
    { id: 23, name: 'Ocul', type: 'enemies', bp: [22, 78], balance: 170, attack: 15 },
    { id: 24, name: 'Silenot', type: 'enemies', bp: [40.7, 78], balance: 120, attack: 21 },
    { id: 25, name: 'Smiler', type: 'enemies', bp: [59.3, 78], balance: 160, attack: 18 },
    { id: 26, name: 'Shagger', type: 'enemies', bp: [78, 78], balance: 170, attack: 15 },
    { id: 27, name: 'Beecash', type: 'enemies', bp: [97, 77.8], balance: 40, attack: 40 },
    { id: 28, name: 'Besik', type: 'enemies', bp: [3.3, 96], balance: 170, attack: 15 },
    { id: 29, name: 'Hash', type: 'enemies', bp: [22, 96], balance: 150, attack: 19 },
    { id: 30, name: 'Fridos', type: 'enemies', bp: [40.5, 96], balance: 130, attack: 22 },
    { id: 31, name: 'Pinkchain', type: 'enemies', bp: [59.5, 96.5], balance: 100, attack: 21 },
    { id: 32, name: 'Bilder', type: 'enemies', bp: [78.3, 96.3], balance: 130, attack: 22 },
    { id: 33, name: 'Loshak', type: 'enemies', bp: [97, 95], balance: 50, attack: 40 },
];

const items = [
    { id: 1001, name: 'Balance', type: 'items', bp: [0, 0], balance: 100, attack: 0, },
    { id: 1002, name: 'Energy', type: 'items', bp: [0, 0], balance: 0, attack: 100 },
    { id: 1003, name: 'Experience', type: 'items', bp: [0, 0], balance: 100, attack: 0 },
    { id: 1004, name: 'Bal+Enrg', type: 'items', bp: [0, 0], balance: 100, attack: 100 },
];

const rewards = [
    { id: 2001, name: 'Free 50 UH', type: 'rewards', bp: [0, 0], balance: 0, attack: 0 },
    { id: 2002, name: 'Free 100 UH', type: 'rewards', bp: [0, 0], balance: 0, attack: 0 },
    { id: 2003, name: 'Free 50B', type: 'rewards', bp: [0, 0], balance: 0, attack: 0 },
    { id: 2004, name: 'Free Card', type: 'rewards', bp: [0, 0], balance: 0, attack: 0 },
];

const initialChances = { enemies: 20, items: 55, rewards: 25 };
const initialChancesItems = { 1001: 25, 1002: 25, 1003: 25, 1004: 25 };
const initialChancesRewards = { 2001: 31, 2002: 31, 2003: 31, 2004: 7 };

// Функция для случайного выбора типа карточки
function getCardType(floor: number) {
    console.log('Функция для случайного выбора типа карточки, этаж: ', floor, initialChances.enemies + floor, initialChances.items - floor / 2, initialChances.rewards - floor / 2);

    const adjustedChances = {
        enemies: initialChances.enemies + floor,
        items: initialChances.items - floor / 2,
        rewards: initialChances.rewards - floor / 2,
    };

    adjustedChances.items = Math.max(adjustedChances.items, 3);
    adjustedChances.rewards = Math.max(adjustedChances.rewards, 3);

    console.log('adjustedChances: ', adjustedChances)

    const totalChance = adjustedChances.enemies + adjustedChances.items + adjustedChances.rewards;
    const randomValue = Math.random() * totalChance;

    if (randomValue < adjustedChances.enemies) {
        return 'enemies';
    } else if (randomValue < adjustedChances.enemies + adjustedChances.items) {
        return 'items';
    } else {
        return 'rewards';
    }
}

// Функция для выбора карточки по типу и вероятности
function selectCardByType(type: string) {
    if (type === 'enemies') {
        // Случайный выбор из массива enemies
        return enemies[Math.floor(Math.random() * enemies.length)];
    } else if (type === 'items') {
        return selectCardWithChance(initialChancesItems, items);
    } else if (type === 'rewards') {
        return selectCardWithChance(initialChancesRewards, rewards);
    }
}

type Chances = { [key: number]: number };
type Card = { id: number; name: string };

// Вспомогательная функция для выбора карточки на основе вероятности
function selectCardWithChance(chances: Chances, cardArray: Card[]) {
    const totalChance = Object.values(chances).reduce((acc, chance) => acc + chance, 0);
    const randomValue = Math.random() * totalChance;

    let accumulatedChance = 0;
    for (const cardId in chances) {
        accumulatedChance += chances[cardId];
        if (randomValue < accumulatedChance) {
            return cardArray.find(card => card.id === parseInt(cardId, 10));
        }
    }
}

// Генерация карточки с учетом этажа
export function generateCard(floor: number) {
    const type = getCardType(floor);
    return selectCardByType(type);
}

// Пример использования
/* const floor = 5;
const card = generateCard(floor);
console.log(card); */
// for load Arenastate:

export const findArenaObjectById = (id: number) => {
    return enemies.find(obj => obj.id === id)
        || items.find(obj => obj.id === id)
        || rewards.find(obj => obj.id === id)
        || {
        id: 0,
        name: '',
        type: 'empty',
        bp: [0, 0],
        balance: 0,
        attack: 0,
    };
};
