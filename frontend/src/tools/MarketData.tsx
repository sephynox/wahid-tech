import { systemLanguages } from "../Data";

export enum MarketType {
    CRYPTO = 'crypto',
    STOCK = 'stock',
    COMMODITY = 'commodity',
};

export type MarketData = {
    type: MarketType;
    key: string;
    name?: string;
    description?: Record<keyof typeof systemLanguages, string>;
    ticker?: string;
    price?: number;
    price_history?: boolean;
    prices?: PriceData;
    delta1?: number;
    delta7?: number;
    delta30?: number;
    deltaY?: number;
    cap?: number;
    path?: string;
    ath?: number;
};

export type PriceData = {
    prices: Array<Array<number>>,
    market_caps: Array<Array<number>>,
    total_volumes: Array<Array<number>>,
};
