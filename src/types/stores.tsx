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
}

export interface Balances {
    name: string;
    value: number;
    range: [number, number];
    inH: number;
    speed: number;
}

export interface UseUserBalances {
    bal: Balances[];
    setUserBalance: (currency: string, value: number) => void;
    updateBalance: (rawAddress: string,) => void;
    updateSpeed: (name: string, speed: number) => void;
}
