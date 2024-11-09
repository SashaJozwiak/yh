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

export interface DeckState {
    cards: Card[];
    randomCards: number;
}

export interface UseDeck {
    cards: Card[];
    randomCards: number;
    sellGoldCard: (card_id: number, city_id: number, price: number) => Promise<void>;
    saveDeck: () => void;
    loadDeck: (deck_state: DeckState) => void;
    getCards: () => void;
    addCards: (newCards: Card[]) => void;
    addRandomCards: (count: number) => void;
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
