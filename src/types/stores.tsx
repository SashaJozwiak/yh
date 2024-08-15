export interface User {
    id: number | null;
    internalId: number | null;
    userName: string;
    languageCode: string;
    userFriendlyAddress: string,
    rawAddress: string,
}

export interface Statuses {
    isLoading: boolean;
    isError: boolean;
}

export interface UseStore {
    user: User;
    balance: BalanceObj;
    statuses: Statuses;
    setUser: (user: Partial<User>) => void;
    addAddresses: (addresses: { userFriendlyAddress: string; rawAddress: string }) => void;
    setBalanceData: (balance: Partial<BalanceObj>) => void;
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
    src: string;
}

export interface UseStonFi {
    pools: PoolsSFState[];
    loadStatus: boolean;
    updateBalanceSF: (rawAddress: string) => void;
    updateSpeedSF: (name: string, speed: number) => void;
    totalSpeedSF: () => number;
}

//=== tasks

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

//=== top100

export interface UserFromTop100 {
    username: string;
    balance: number;
    internal_id: number;
}

export interface UsersFromTop100 {
    top100: UserFromTop100[];
    getTop100: () => void;
}

//=== TEAMS

export interface Team {
    team_id: number;
    owner_id: number;
    team_name: string;
    src: string;
    team_balance: number;
}

export interface UseTeams {
    teams: Team[];
    getTeams: () => void;
    joinOrLeaveTeam: (id: number, isJoin: boolean) => void;
}

