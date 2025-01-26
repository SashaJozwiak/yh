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
}

export interface UseWallet {
    address: string | null;
    assets: Array<Asset>;
    status: string;
    setWallet: (payload: { address: string | null; assets: Array<Asset> }) => void;
}
