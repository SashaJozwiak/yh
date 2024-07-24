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
    updateBalance: (rawAddress: string) => void;
    updateSpeed: (name: string, speed: number) => void;
    totalSpeed: () => number;
}

export interface BalancesJ {
    name: string;
    address: string;
    value: number;
    range: [number, number];
    inH: number;
    speed: number;
}

export interface UseUserBalancesJ {
    jettons: BalancesJ[];
    updateBalanceJ: (rawAddress: string) => void;
    updateSpeedJ: (name: string, speed: number) => void;
    totalSpeedJ: () => number;
}

export interface NavObj {
    list: boolean;
    main: boolean;
}

export interface UseNav {
    nav: NavObj;
    setNavList: (bool: boolean) => void;
}


export interface BalanceObj {
    balance: number;
    isHold: boolean;
    speed: number;
    period: 24,
    finishData: string;
    startData: string;
}

export interface UseBalance {
    balance: BalanceObj;
    setBalanceData: (balance: Partial<BalanceObj>) => void;
    setBalance: (value: number) => void;
}
