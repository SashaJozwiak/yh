export interface ArenaCard {
    id: number;
    name: string;
    type: string,
    bp: [number, number];
    multiplier: number;
    balance: number;
    attack: number;
}

export interface ArenaState {
    floor: number;
    house: number;
    rows: number[];
}

export interface Arena {
    row1: ArenaCard[];
    row2: ArenaCard[];
    row3: ArenaCard[];
    house: number;
    floor: number;
    isNeedInit: boolean;
    getReward: (user_id: number, UH: number, B: number, cards: number) => void;
    saveGame: (userId: number) => void;
    changeNeedInit: (isNeed: boolean) => void;
    loadArena: (arena_state: ArenaState) => void;
    gameInit: (userId: number) => void;
    addHouse: () => void;
    reset: () => void;
    setRow1: (row1: ArenaCard[]) => void;
    setRow2: (row1: ArenaCard[]) => void;
    setRow3: (row1: ArenaCard[]) => void;
    addFloor: () => void;
}
