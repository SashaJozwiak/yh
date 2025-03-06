
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


export interface UseUHSWallet {
    address: string | null;
    assets: Array<Asset>;
    status: string;
    recBalance: boolean;
    claim: (uhsId: number, rewards: Rewards, wallType: string, setDisableButton: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>;
    saveTx: (uhsId: number, ufAddress: string, currency: string, amount: number) => Promise<void>;
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
    checkBotState: boolean;
    isLoadingAdd: boolean;
    isLoading: boolean;
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
    fetchStartups: () => Promise<void>;
}
