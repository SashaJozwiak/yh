export interface Grades {
    gray: number;
    bronze: number;
    silver: number;
    gold: number;
}

export interface Card {
    id: number;
    name: string;
    grades: Grades;
    img: string;
    key_power: string;
}

export interface UseDeck {
    cards: Card[];
    randomCards: number;
    getCards: () => void;
    addCards: (newCards: Card[]) => void;
    clearRandomCards: () => void;
    removeCards: (cardsToRemove: Card[]) => void;
}


//==========NAV

export interface UseNav {
    page: string;
    deckGrade: string;
    showCard: boolean;
    showGetCards: boolean;
    setPageNav: (page: string) => void;
    setDeckGrade: (grade: string) => void;
    setShowCard: () => void;
    setShowGetCard: () => void;
}
