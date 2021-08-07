export enum MarketType {
    CRYPTO = 'crypto',
    STOCK = 'stock',
    COMMODITY = 'commodity'
};

export type MarketData = {
    type: MarketType;
    key: string;
    name: string;
    ticker: string;
    price: number;
    delta1?: number;
    delta7?: number;
    delta30?: number;
    deltaY?: number;
    cap?: number;
    path?: string;
    ath?: number;
};
