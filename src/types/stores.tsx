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

//===

export interface Balances {
    name: string;
    value: number;
    range: [number, number];
    inH: number;
    speed: number;
    src: string;
}

export interface UseUserBalances {
    bal: Balances[];
    setUserBalance: (currency: string, value: number) => void;
    updateBalance: (rawAddress: string) => void;
    updateSpeed: (name: string, speed: number) => void;
    totalSpeed: () => number;
}

//===

export interface BalancesJ {
    name: string;
    address: string;
    value: number;
    range: [number, number];
    inH: number;
    speed: number;
    src: string;
}

export interface UseUserBalancesJ {
    jettons: BalancesJ[];
    loadStatus: boolean;
    updateBalanceJ: (rawAddress: string) => void;
    updateSpeedJ: (name: string, speed: number) => void;
    totalSpeedJ: () => number;
}

//===

export interface NavObj {
    list: boolean;
    main: string;
}

export interface UseNav {
    nav: NavObj;
    setNavList: (bool: boolean) => void;
    setMainNav: (tabName: string) => void;
}

//=== main balance and state

export interface BalanceObj {
    balance: number;
    isHold: boolean;
    speed: number;
    period: number,
    finishData: string;
    startData: string;
}

export interface UseBalance {
    balance: BalanceObj;
    setBalanceData: (balance: Partial<BalanceObj>) => void;
    setBalance: (value: number) => void;
}

export interface PoolsSFState {
    name: string;
    address: string;
    value: number;
    range: [number, number];
    inH: number;
    speed: number;
}

export interface UseStonFi {
    pools: PoolsSFState[];
    loadStatus: boolean;
    updateBalanceSF: (rawAddress: string) => void;
    updateSpeedSF: (name: string, speed: number) => void;
    totalSpeedSF: () => number;
}


export interface Task {
    id: number;
    title: string;
    price: number;
    completed: boolean;
    src: string;
    type: string;
}

export interface UseTasks {
    tasks: Task[];
    completeTask: (id: number) => void;
}
