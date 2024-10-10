export interface User {
    id: number;
    internalId: number;
    userName: string;
    languageCode: string;
    userFriendlyAddress: string | null;
    rawAddress: string | null;
    team_id: number | null;
    refs: number;
    refs_active: number;
    active_usernames: string[];
    anonim: boolean;
    //team: string;
}

export interface Statuses {
    isLoading: boolean;
    isError: boolean;
}

export interface UseStore {
    user: User;
    balance: BalanceObj;
    statuses: Statuses;
    miningError: string;
    miningLoader: boolean;
    balanceLoader: boolean;
    handleReferral: (userId: number, startParam: string) => Promise<void>;
    setUser: (user: Partial<User>) => void;
    addAddresses: (addresses: { userFriendlyAddress: string | null; rawAddress: string | null }) => void;
    setBalanceData: (balance: Partial<BalanceObj>) => void;
    setAnonim: (userId: number, anonim: boolean) => void;
    setMiningError: () => void;
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
    getBonuses: () => void;
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
    cab: string;
}

export interface UseNav {
    nav: NavObj;
    setNavList: (bool: boolean) => void;
    setMainNav: (tabName: string) => void;
    setCabNav: (tabName: string) => void;
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

export interface UseDedust {
    pools: PoolsSFState[];
    loadStatus: boolean;
    updateBalanceDedust: (rawAddress: string) => void;
    updateSpeedDD: (name: string, speed: number) => void;
    totalSpeedDD: () => number;
}

//=== tasks

export interface Task {
    id: number;
    title: string;
    price: number;
    completed: boolean;
    src: string;
    type: string;
    timer: string | null;
}

export interface TaskAd {
    id: number;
    title: string;
    price: number;
    completed: boolean;
    src: string;
    type: string;
    timer: string | null;
    counter: number;
}

export interface UseTasks {
    activeFriends: Task;
    dailyReward: Task;
    adReward: TaskAd;
    tasks: Task[];
    loadStatus: boolean;
    completeTask: (id: number) => void;
    completeAdTask: (userId: number) => void;
    getAllTasks: (userId: number) => void;
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

export interface MyTeam {
    team_id: number;
    team_name: string;
    src: string;
    owner_id: number;
    isOwner: boolean;
    team_balance: number;
}

export interface CreateTeam {
    teamName: string;
    teamLink: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

export interface UseTeams {
    teams: Team[];
    myTeam: MyTeam;
    getTeams: () => void;
    joinOrLeaveTeam: (id: number, isJoin: boolean) => void;
    getMyTeam: (team_id: number) => void;
    createTeam: (data: CreateTeam) => void;
    searchTeam: (name: string) => void;
}

// ==== INVITES

export interface UserInvites {
    username: string;
    ref_by: number;
    active_friends_count: number;
}

export interface Winners {
    id: string;
    reward: number;
    is_claim: boolean;
}

export interface UseInvites10 {
    top10: UserInvites[];
    winners: Winners[],
    total: number;
    loadStatus: boolean;
    getTop10: () => Promise<void>;
    getWinners: () => Promise<void>;
    addReward: (externalId: number, internalId: number, reward: number) => Promise<void>;
}

// ==== useStartups

export interface Startup {
    name: string;
    address: string;
    value: number;
    range: [number, number];
    inH: number;
    speed: number;
    src: string;
}

export interface UseStartups {
    bal: Startup[];
    loadStatus: boolean;
    getStartupBal: () => void;
    updateSpeed: (name: string, speed: number) => void;
    totalSpeed: () => number;
}

/// EAlist

export interface EAlistState {
    inList: boolean;
    isLoading: boolean;
}

export interface UseEAlist {
    state: EAlistState;
    getInList: (userId: number) => Promise<void>;
    addInList: (userId: number, userName: string, balance: number) => Promise<void>;
}
