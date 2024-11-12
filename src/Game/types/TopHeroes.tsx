export interface TopList {
    user_id: number;
    username: string;
    house: number;
}

export interface UseTopHeroes {
    topList: TopList[];
    isLoading: boolean;
    error: string | null;
    fetchTopList: () => Promise<void>;
    setLoading: (isTrue: boolean) => void;
}
