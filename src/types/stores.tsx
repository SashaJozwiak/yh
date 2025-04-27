import { DeckState } from "../Game/types/forGameState";

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
    active_usernames: {
        internal_id: number;
        username: string;
    }[];
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
    isAuth: boolean;
    authError: boolean;
    plusLocalBalance: (bal: number) => void;
    setAuthError: (isTrue: boolean) => void;
    minusBalance: (price: number) => Promise<void>;
    handleReferral: (externalId: number, userId: number, startParam: string | null, rawAddress: string) => Promise<void>;
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
    stage: string;
}

export interface UseNav {
    //[x: string]: unknown;
    nav: NavObj;
    setNavList: (bool: boolean) => void;
    setMainNav: (tabName: string) => void;
    setCabNav: (tabName: string) => void;
    setStages: (tabName: string) => void;
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

export interface UseTonco {
    pools: PoolsSFState[];
    loadStatus: boolean;
    updateBalanceTonco: (rawAddress: string) => void;
    updateSpeedTonco: (name: string, speed: number) => void;
    totalSpeedTonco: () => number;
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
    saveBonusesTransaction: (user_id: number, bonuses: number, amount: number) => void;
    buyBonuses: (user_id: number, amount: number) => void;
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

interface Rewards {
    reward_3000: boolean;
    reward_6000: boolean;
    reward_12000: boolean;
}

export interface UseInvites10 {
    top10: UserInvites[];
    winners: Winners[],
    rewards: Rewards,
    total: number;
    loadStatus: boolean;
    checkRewards: (id: number) => Promise<void>;
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
    removeInList: () => void;
    getInList: (userId: number) => Promise<void>;
    addInList: (userId: number, userName: string, balance: number) => Promise<void>;
}

//COMMISIONS 

export interface Transactions {
    id: number;
    sender_id: number;
    receiver_id: number;
    transaction_timestamp: string;
    transaction_type: boolean;
    amount: number;
    fee: number;
    sender_username: string | null;
    receiver_username: string | null;
}

export interface UseFees {
    deckState: DeckState | null;
    commission: number;
    isLoading: boolean;
    transactions: Transactions[],
    isLoadingHistory: boolean;
    fetchTransactionHistory: (userId: number) => Promise<void>;
    fetchDeckState: (userId: number) => Promise<void>;
}


// PARTNERS

export interface UserPurchase {
    price: number;
    date: string;
}

export interface RawUserDetails {
    internal_id: string;
    username: string;
    balance: string;
    card_purchases: { price: string; date: string }[];
    bonus_purchases: { price: string; date: string }[];
    house: string | null;
}

export interface UserDetails {
    internal_id: number;
    username: string;
    balance: number;
    card_purchases: UserPurchase[];
    bonus_purchases: UserPurchase[];
    house?: number | null;
}

export interface UsePartners {
    userDetails: UserDetails[];
    withdraw: number;
    loading: boolean;
    error: string | null;
    fetchUserDetails: (user_id: number, internalIds: number[]) => Promise<void>;
    createWithdraw: (user_id: number, amount: number, address: string) => Promise<void>;
}

//====c AUTH

export interface Proof {
    timestamp: number;
    domain: { lengthBytes: number; value: string }
    payload: string;
    signature: string
}

export interface Account {
    address: string;
    chain: string;
    publicKey?: string;
    walletStateInit: string;
}

export interface UseAuth {
    userId: number | null;
    token: string;
    address: string;
    limit: number;
    isAuth: boolean;
    isError: boolean;
    isLoading: boolean;
    isRefreshing: boolean;
    updateLimit: (uhs_id: number, newLimit: number, amount: number) => Promise<void>;
    refreshToken: (token: string) => Promise<void>;
    checkNonce: (proof: Proof, account: Account) => Promise<void>;
}
