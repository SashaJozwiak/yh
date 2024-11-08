import { ArenaCard } from "./Arena";

export interface Stats {
    balance: number;
    mind: number;
    energy: number;
}

export interface Skill {
    name: string;
    id: number;
    description: string;
    //image: string;
    cost: number;
    target: string;
    multiplier: number;
    bp: [number, number];
    amount: number;
}

export interface Item {
    id: number;
    name: string;
    color: string;
    amount: number;
    description: string;
    cost: number;
    multiplier: number;
    target: string;
    bp: [number, number];
}

export interface PlayCard {
    id: number;
    lvl: number;
    exp: number;
    exp_points: number;
    name: string;
    profession: string;
    description: string;
    image: string;
    key_power: string;
    balance_hp: number;
    energy_mp: number;
    stats: Stats;
    skills: Skill[];
    inventory: string[];
    items: Item[];
}
export interface BattleState {
    step: number;
    getDamage: string;
    enemy: ArenaCard;
}

export interface ForSave {
    gameProgress: boolean;
    cards: number;
    UH: number;
    B: number;
    count: number;
}

export interface StateForBuy {
    1001: number;
    1002: number;
    1003: number;
    1004: number;
    sum: number;
}

export interface PlayCardState {
    playCard: PlayCard;
    tabNav: string;
    selectedSkill: Skill | Item | null;
    forSave: ForSave;
    lose: boolean;
    winUp: boolean;
    rewardUp: boolean;
    collectUp: boolean;
    nextFloor: boolean;
    inBattle: boolean;
    battleState: BattleState;
    buyItems: (state: StateForBuy) => void;
    resetForSave: () => void;
    loadCharacter: (character_state: { playCard: PlayCard }) => void;
    chooseHero: (name: string) => void;
    nextHouse: () => void;
    setLose: (isTrue: boolean) => void;
    losing: () => void;
    addForSave: (id: number) => void;
    toggleReward: (isTrue: boolean) => void;
    toggleCollect: (isTrue: boolean) => void;
    goNextFloor: (isTrue: boolean) => void;
    closeWin: () => void;
    endBattle: () => void;
    startBattle: (card: ArenaCard, /* getDamage: string, setGetDamage: React.Dispatch<React.SetStateAction<string>> */) => void;
    setGetDamage: (who: string) => void;
    addItem: (itemId: number) => void;
    useItem: (itemId: number) => void;
    addExp: (exp: number) => void;
    addStat: (stat: string) => void;
    setTabNav: (isTab: string) => void;
    selectSkill: (skill: Skill | null) => void;
}
