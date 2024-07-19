export interface User {
    id: number | null;
    userName: string;
    languageCode: string;
    userFriendlyAddress: string,
    rawAddress: string,
}

export interface UseStore {
    user: User;
    setUser: (user: User) => void;
    addAddresses: (addresses: { userFriendlyAddress: string; rawAddress: string }) => void;

    /* increasePopulation: (num: number) => void;
    removeAllBears: () => void; */
}
