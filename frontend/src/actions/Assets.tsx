import { MarketData, MarketType } from '../tools/MarketData';
import { CoinGeckoStates, fetchCoinData, fetchCoinPriceData } from './CoinGecko';

export enum AssetStates {
    EMPTY,
    FETCHING,
    ERROR,
    FETCHED_ASSET_DATA,
    FETCHED_ASSET_PRICE_DATA,
};

export type AssetState =
    | { type: AssetStates.EMPTY, data?: Record<string, MarketData> }
    | { type: AssetStates.FETCHING, data?: Record<string, MarketData> }
    | { type: AssetStates.ERROR, error: string, data?: Record<string, MarketData> }
    | { type: AssetStates.FETCHED_ASSET_DATA, data: Record<string, MarketData> }
    | { type: AssetStates.FETCHED_ASSET_PRICE_DATA, key: string, data: Record<string, MarketData> };

export const initialAssetState: AssetState = {
    type: AssetStates.EMPTY
};

export const assetReducer = (
    init: AssetState = initialAssetState,
    action: AssetState
): AssetState => {
    switch (action.type) {
        case AssetStates.FETCHING:
            return { ...init, type: action.type };
        case AssetStates.ERROR:
            return { ...init, type: action.type, error: action.error };
        case AssetStates.FETCHED_ASSET_DATA:
            return { ...init, type: action.type, data: { ...init.data, ...action.data } };
        case AssetStates.FETCHED_ASSET_PRICE_DATA:
            //Ensures price data does not overwrite the asset data
            const data = init.data ? { [action.key]: { ...init.data[action.key], ...action.data[action.key] } } : {};
            return { ...init, type: action.type, key: action.key, data: { ...init.data, ...data } };
        default:
            return { ...init, type: AssetStates.EMPTY };
    };
};

export const fetchAssetData = (
    type: MarketType,
    key: string
) => async (dispatch: React.Dispatch<AssetState>): Promise<void> => {
    dispatch({ type: AssetStates.FETCHING });

    switch (type) {
        case MarketType.CRYPTO:
            fetchCoinData(key)((response) => {
                if (response.type === CoinGeckoStates.FETCHED_COIN_DATA) {
                    const coin = response.result?.pop();
                    if (coin?.key !== undefined) {
                        dispatch({ type: AssetStates.FETCHED_ASSET_DATA, data: { [coin.key]: coin } });
                    }
                } else if (response.type === CoinGeckoStates.ERROR) {
                    dispatch({ type: AssetStates.ERROR, error: response.error });
                }
            });
            break;
    }
};

export const fetchAssetPriceData = (
    type: MarketType,
    key: string,
    start: number,
    end = Date.now(),
    currency = 'usd'
) => async (dispatch: React.Dispatch<AssetState>): Promise<void> => {
    dispatch({ type: AssetStates.FETCHING });

    switch (type) {
        case MarketType.CRYPTO:
            fetchCoinPriceData(key, start, end, currency)((response) => {
                if (response.type === CoinGeckoStates.FETCHED_COIN_PRICE_DATA) {
                    const data = { [key]: { type: type, key: key, price_history: true, prices: response.prices } };
                    dispatch({ type: AssetStates.FETCHED_ASSET_PRICE_DATA, key: key, data: data });
                } else if (response.type === CoinGeckoStates.ERROR) {
                    dispatch({ type: AssetStates.ERROR, error: response.error });
                }
            });
            break;
    }
};
