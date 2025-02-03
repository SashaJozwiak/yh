
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

interface Asset {
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

export interface UseUHSWallet {
    address: string | null;
    assets: Array<Asset>;
    status: string;
    setWallet: (payload: { address: string | null; assets: Array<Asset> }) => void;
    fetchPrices: () => Promise<void>;
    fetchUHSPrice: () => Promise<void>;
}


//=== EARN NAV ===

export interface Nav {
    isOpenWallet: boolean;
    tool: string;
    setTool: (tool: string) => void;
    setIsOpenWallet: (isOpen: boolean) => void;
}
