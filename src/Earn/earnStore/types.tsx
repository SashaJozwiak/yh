
//=== TON WAALET ===

interface WalletAddress {
    address: string;
    is_scam: boolean;
    is_wallet: boolean;
}

interface Jetton {
    address: string;
    decimals: number;
    image: string;
    name: string;
    score: number;
    symbol: string;
    verification: string;
}

export interface Asset {
    balance: string;
    wallet_address: WalletAddress;
    jetton: Jetton;
    priceUsd?: number;
}

export interface UseWallet {
    address: string | null;
    assets: Array<Asset>;
    status: string;
    setWallet: (payload: { address: string | null; assets: Array<Asset> }) => void;
    //fetchPrices: () => Promise<void>;
}

// === UHS WALLET ===


export interface Rewards {
    [key: string]: number;
}

export interface UserInvestment {
    id: number;
    userId: number;
    startupId: number;
    currency: string;
    amount: number;
    shares: number;
    total_shares: number;
}


export interface UseUHSWallet {
    address: string | null;
    assets: Array<Asset>;
    shares: Array<UserInvestment>;
    status: string;
    recPriceUSDT: boolean,
    recPriceUHS: boolean,
    recBalance: boolean;
    recShares: boolean;
    withdrawIsLoading: boolean;
    claim: (uhsId: number, rewards: Rewards, wallType: string, setDisableButton: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>;
    addWithdraw: (userId: number, currency: string, amount: number, walletAddress: string) => Promise<void>;
    saveTx: (uhsId: number, ufAddress: string, currency: string, amount: number) => Promise<void>;
    getShares: (userId: number | null) => Promise<void>;
    getBalance: (uhsId: number | null) => Promise<void>;
    setWallet: (payload: { address: string | null; assets: Array<Asset> }) => void;
    fetchPrices: () => Promise<void>;
    fetchUHSPrice: () => Promise<void>;
}


//=== EARN NAV ===

export interface Nav {
    isOpenWallet: boolean;
    tool: string;
    hold: string;
    tasks: string;
    launch: string;
    build: string;
    setBuild: (build: string) => void;
    setLaunch: (launch: string) => void;
    setTasks: (tasks: string) => void;
    setHold: (hold: string) => void;
    setTool: (tool: string) => void;
    setIsOpenWallet: (isOpen: boolean) => void;
}

//==== HOLD JETTONS ====

export interface assets {
    name: string;
    address: string;
    value: number;
    range: [number, number];
    APY: number;
    speed: number;
    src: string;
}

export interface UseHold {
    assets: Array<assets>;
    lastClaimTimestamp: string;
    isFetchClaimData: boolean;
    loading: boolean;
    fetchLastClaim: (userId: number) => Promise<void>;
    updateHoldAssets: () => void;
}

// =========== UseHistory ============

export interface Transaction {
    id: number;
    timestamp: string; // ISO-строка даты
    currency_symbol: string;
    transaction_type: string;
    amount: string; // Сумма как строка, так как приходит в виде "152000000000"
    status: string;
    tx_hash: string | null; // Может быть null
    uf_address: string;
    user_id: number;
}

export interface UseHistory {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
    getHistory: (userId: number) => Promise<void>;
}


// ========= CLAIM ===========



// ========== TASKS ==========

export type TaskStatus = 'completed' | 'not completed';

export interface UhsTask {
    id: number;
    title: string;
    description: string;
    currency: string;
    price: number;
    balance: number;
    src: string;
    active: boolean;
    status: TaskStatus;
}

export interface UhsTasksStore {
    tasks: UhsTask[];
    adTask: boolean,
    adTaskLoading: boolean,
    checkBotState: boolean;
    isLoadingAdd: boolean;
    isLoading: boolean;
    rewardAdTask: (userId: number, internalId: number) => Promise<void>;
    getAGTask: (userId: number) => Promise<void>;
    addTask: (userId: number, title: string, description: string, currency: string, price: number, count: number, balance: number, src: string) => Promise<void>;
    getTasks: (userId: number) => Promise<void>;
    checkTask: (uhsUserId: number, userId: number, chatId: string, taskId: number) => Promise<void>;
    checkBot: (userId: number, chatId: string) => Promise<void>;
}

// ============= LAUNCH ==========


export interface Startup {
    id: number;
    title: string;
    amount_need: number;
    amount_collected: number;
}

export interface StartupStore {
    startups: Startup[];
    isLoading: boolean;
    addIsLoading: boolean;
    isGetStartups: boolean;
    addInvest: (userId: number, startupId: number, currency: string, amount: number, amountInUsd: number, total: number) => Promise<void>;
    fetchStartups: () => Promise<void>;
}

// ======= AIRDROP

export interface AirdropData {
    houses: number;
    uh: number;
    gray_sum: number;
    gold_sum: number;
    bronze_sum: number;
    silver_sum: number;
    allocation: number;
    active_friends_count: number;
    act_friends: number;
    pays: number;
    total_sum: number;
}

export interface AirdropStore {
    data: AirdropData | null;
    loading: boolean;
    error: string | null;
    showModal: boolean;
    isFetch: boolean;

    fetchAirdrop: (uhs_id: number, internal_id: number, external_id: number) => Promise<void>;
    closeModal: () => void;
}


//UHS invites

export type Invite = {
    uhs_id: number;
    uhs_refferer_id: number | null;
    lvl1: boolean;
    lvl2: boolean;
    lvl3: boolean;
};

export type InviteStore = {
    inviteData: Invite | null;
    invitedUsers: Invite[];
    status: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
    checkHardTask: (uhs_id: number, lvl: number) => Promise<void>;
    updateLevels: (uhs_id: number, level: number) => Promise<void>;
    fetchMy: (uhs_id: number) => Promise<void>;
    fetchInvitedUsers: (uhs_id: number) => Promise<void>;
};
