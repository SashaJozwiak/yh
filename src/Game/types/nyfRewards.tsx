export interface UserReward {
    house: string;
    total_bonuses: string;
    total_cards: string;
}

export interface NyfRewards {
    userReward: UserReward | null;
    isLoading: boolean;
    hasClaimed: boolean;
    fetchUserReward: (userId: number) => Promise<void>,
    addInRewardList: (userId: number, cards: number, uh: number, address: string | null) => Promise<void>,
}
