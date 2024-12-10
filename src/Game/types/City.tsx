export interface CityReward {
    user_id: number;
    city_id: number;
    reward: number;
}

export interface UseCityState {
    getReward: boolean;
    isLoading: boolean;
    error: string | null;
    checkReward: (user_id: number, city_id: number) => Promise<boolean>;
    addReward: (user_id: number, city_id: number, reward: number) => Promise<void>;
}
