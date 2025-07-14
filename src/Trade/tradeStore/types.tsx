export interface tradeNav {
    tool: string;
    assetsNav: string;
    setTool: (tool: string) => void;
    setAssetsNav: (aNAv: string) => void;
}

export interface Asset {
    trade_asset_id: number;
    user_id: number;
    startup_id: number;
    share_id: number;
    price: string;
    amount: string;
    currency: string;
    shares: string;
    total_shares: string;
    title: string;
    amount_need: string;
    amount_collected: string;
    apr: number;
}

export interface TradeAssets {
    assets: Asset[];
    currency: string;
    isReady: boolean;
    isBuy: boolean;
    isLoadAssets: boolean;
    isAddAssets: boolean;
    setReady: () => void;
    buy: (userId: number, shareId: number, rawAddress: string, setOK: React.Dispatch<React.SetStateAction<boolean>>) => Promise<void>;
    removeAssets: (userId: number, shareId: number, rawAddress: string) => Promise<void>;
    addAssets: (userId: number, startupId: number, shareId: number, price: number, rawAddress: string) => Promise<void>;
    getAssets: () => Promise<void>;
    setCurrency: (curr: string) => void;
}
