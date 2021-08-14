/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Constants from '../Constants';
import { AssetStateData, AssetState, AssetStates, initialAssetState } from './AssetState';
import { fetchCoinData, fetchCoinPriceData, fetchCryptoMarketData } from './CoinGecko';
import { MarketType } from '../tools/MarketData';
import { Dispatch } from 'react';
import { merge } from 'highcharts';

const methodDefinitions: Record<AssetStates, (...props: any) => (dispatch: Dispatch<AssetState>) => Promise<void>> = {
    [AssetStates.EMPTY]: () => async () => new Promise(() => undefined),
    [AssetStates.FETCHING]: () => async () => new Promise(() => undefined),
    [AssetStates.ERROR]: () => async () => new Promise(() => undefined),
    [AssetStates.FETCHED_ASSET_DATA]: (
        asset = '',
    ) => async (dispatch: Dispatch<AssetState>) => new Promise(() => undefined),
    [AssetStates.FETCHED_ASSET_MARKET_DATA]: (
        currency = Constants.DEFAULT_CURRENCY,
        priceChangePercentage = Constants.DEFAULT_PRICE_PERCENTAGE_CHANGES,
    ) => async (dispatch: Dispatch<AssetState>) => new Promise(() => undefined),
    [AssetStates.FETCHED_ASSET_PRICE_DATA]: (
        asset = '',
        start = 0,
        end = 0,
        currency = Constants.DEFAULT_CURRENCY,
    ) => async (dispatch: Dispatch<AssetState>) => new Promise(() => undefined),
};

const methodBaseStates = {
    [AssetStates.EMPTY]: methodDefinitions[AssetStates.EMPTY],
    [AssetStates.FETCHING]: methodDefinitions[AssetStates.FETCHING],
    [AssetStates.ERROR]: methodDefinitions[AssetStates.ERROR],
};

const methodMap: Record<MarketType, typeof methodDefinitions> = {
    [MarketType.CRYPTO]: {
        ...methodBaseStates,
        [AssetStates.FETCHED_ASSET_DATA]: fetchCoinData,
        [AssetStates.FETCHED_ASSET_MARKET_DATA]: fetchCryptoMarketData,
        [AssetStates.FETCHED_ASSET_PRICE_DATA]: fetchCoinPriceData,
    },
    //TODO
    [MarketType.STOCK]: {
        ...methodBaseStates,
        [AssetStates.FETCHED_ASSET_DATA]: methodDefinitions[AssetStates.FETCHED_ASSET_DATA],
        [AssetStates.FETCHED_ASSET_MARKET_DATA]: methodDefinitions[AssetStates.FETCHED_ASSET_MARKET_DATA],
        [AssetStates.FETCHED_ASSET_PRICE_DATA]: methodDefinitions[AssetStates.FETCHED_ASSET_PRICE_DATA],
    },
    //TODO
    [MarketType.COMMODITY]: {
        ...methodBaseStates,
        [AssetStates.FETCHED_ASSET_DATA]: methodDefinitions[AssetStates.FETCHED_ASSET_DATA],
        [AssetStates.FETCHED_ASSET_MARKET_DATA]: methodDefinitions[AssetStates.FETCHED_ASSET_MARKET_DATA],
        [AssetStates.FETCHED_ASSET_PRICE_DATA]: methodDefinitions[AssetStates.FETCHED_ASSET_PRICE_DATA],
    },
};

const fetchData = (
    assetClass: MarketType,
    assetState: AssetStates,
    dispatch: Dispatch<AssetState>,
    props = {},
    key?: string,
): void => {
    dispatch({ type: AssetStates.FETCHING, class: assetClass });

    methodMap[assetClass][assetState](...Object.values(props))((assetState) => {
        if (assetState.type === AssetStates.ERROR) {
            dispatch({ type: AssetStates.ERROR, class: assetClass, error: assetState.error });
        } else {
            const data: AssetStateData = { ...initialAssetState.data as AssetStateData, ...assetState.data ?? {} };
            dispatch({ type: assetState.type, class: assetClass, key: key ?? '', data: data });
        }
    });
};

export const assetReducer = (
    currentState: AssetState = initialAssetState,
    action: AssetState,
): AssetState => {
    switch (action.type) {
        case AssetStates.FETCHING:
            return { ...currentState, type: action.type, class: action.class };
        case AssetStates.ERROR:
            return { ...currentState, type: action.type, class: action.class, error: action.error };
        case AssetStates.FETCHED_ASSET_DATA:
        case AssetStates.FETCHED_ASSET_MARKET_DATA:
            return { ...currentState, type: action.type, class: action.class, data: merge(currentState.data, action.data) };
        case AssetStates.FETCHED_ASSET_PRICE_DATA:
            return { ...currentState, type: action.type, class: action.class, key: action.key, data: merge(currentState.data, action.data) };
        default:
            return { ...currentState, ...initialAssetState };
    };
};

export const fetchAssetMarketData = (
    type: MarketType,
) => async (dispatch: Dispatch<AssetState>): Promise<void> => {
    fetchData(type, AssetStates.FETCHED_ASSET_MARKET_DATA, dispatch);
};

export const fetchAssetData = (
    type: MarketType,
    key: string,
) => async (dispatch: Dispatch<AssetState>): Promise<void> => {
    fetchData(type, AssetStates.FETCHED_ASSET_DATA, dispatch, { asset: key }, key);
};

export const fetchAssetPriceData = (
    type: MarketType,
    key: string,
    start: number,
    end = Date.now(),
    currency = Constants.DEFAULT_CURRENCY,
) => async (dispatch: Dispatch<AssetState>): Promise<void> => {
    const props = { asset: key, start: start, end: end, currency: currency };
    fetchData(type, AssetStates.FETCHED_ASSET_PRICE_DATA, dispatch, props, key);
};
