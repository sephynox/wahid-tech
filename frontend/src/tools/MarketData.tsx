import { systemLanguages } from "../Data";

export type MarketDataSource = {
    name: string;
    link: string;
};

export enum MarketDataTranslationKeys {
    DESCRIPTION = 'description'
};

export enum MarketType {
    CRYPTO = 'crypto',
    STOCK = 'stock',
    COMMODITY = 'commodity',
};

export type MarketData = {
    source: MarketDataSource;
    type: MarketType;
    key: string;
    name?: string;
    description?: Record<keyof typeof systemLanguages, string>;
    ticker?: string;
    price?: number;
    price_history?: boolean;
    meta_data?: boolean;
    prices?: MarketPriceData;
    delta1?: number;
    delta7?: number;
    delta30?: number;
    deltaY?: number;
    cap?: number;
    total_value?: number;
    circulating_supply?: number;
    max_supply?: number;
    volume?: number;
    path?: string;
    ath?: number;
    atl?: number;
    icon?: JSX.Element;
};

export type MarketPriceData = {
    source: MarketDataSource;
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
};

export type AssetData = {
    name: string;
    address: string;
    icon?: JSX.Element;
    extra?: Array<[string, string]>;
}
