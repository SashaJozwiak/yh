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
    isLoadAssets: boolean;
    getAssets: () => Promise<void>;
    setCurrency: (curr: string) => void;
}
