export enum MarketType {
    CRYPTO = 'crypto',
    STOCK = 'stock',
    COMMODITY = 'commodity',
};

export type MarketData = {
    type: MarketType;
    key: string;
    name?: string;
    description?: string;
    ticker?: string;
    price?: number;
    price_history?: boolean;
    prices?: Array<PriceData>;
    delta1?: number;
    delta7?: number;
    delta30?: number;
    deltaY?: number;
    cap?: number;
    path?: string;
    ath?: number;
};

export type PriceData = {
    unix: number;
    price: number;
    cap?: number;
    volume?: number;
};
