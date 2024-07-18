export interface User {
    id: number | null;
    userName: string;
    languageCode: string;
}

export interface UseStore {
    user: User;
    setUser: (user: User) => void;

    /* increasePopulation: (num: number) => void;
    removeAllBears: () => void; */
}
