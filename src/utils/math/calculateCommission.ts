import { Card } from "../../Game/types/forGameState";


export const calculateCommission = (cards: Card[]) => {
    if (!Array.isArray(cards) || cards.length === 0) return 40;
    let commission = 40;
    let hasGold = false;
    let hasSilver = false;
    let hasBronze = false;

    cards.forEach((card) => {
        if (card.grades.gold > 0) hasGold = true;
        if (card.grades.silver > 0) hasSilver = true;
        if (card.grades.bronze > 0) hasBronze = true;
    });

    if (hasGold) commission = 0;
    else if (hasSilver) commission = 15;
    else if (hasBronze) commission = 30;

    return commission;
};
