export interface ArenaCard {
    id: number;
    name: string;
    type: string,
    bp: [number, number];
    multiplier: number;
    balance: number;
    attack: number;
}

export interface Arena {
    row1: ArenaCard[];
    row2: ArenaCard[];
    row3: ArenaCard[];
    house: number;
    floor: number;
    addHouse: () => void;
    reset: () => void;
    setRow1: (row1: ArenaCard[]) => void;
    setRow2: (row1: ArenaCard[]) => void;
    setRow3: (row1: ArenaCard[]) => void;
    addFloor: () => void;
}
