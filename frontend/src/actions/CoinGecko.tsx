import axios from 'axios';
import React from 'react';
import * as Constants from '../Constants';
import { MarketData } from '../tools/MarketData';
import { ExternalStates } from './External';

enum CoinGeckoStates {
    FETCHED_COIN_DATA,
    FETCHED_COIN_MARKET_DATA,
    FETCHED_COIN_LIST,
};

type CoinGeckoROI = null | {
    times: number;
    currency: string;
    percentage: number;
};

type CoinGeckoCoinData = {
    symbol: string;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    circulating_supply: number;
    current_price: number;
    high_24h: number;
    id: string;
    image: string;
    last_updated: string;
    low_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    name: string;
    roi: CoinGeckoROI;
    max_supply: number | null;
    fully_diluted_valuation: number | null;
    total_supply: number | null;
    total_volume: number | null;
    price_change_24h: number | null;
    price_change_percentage_24h: number | null;
    price_change_percentage_24h_in_currency: number | null;
    price_change_percentage_1y_in_currency: number | null;
    price_change_percentage_30d_in_currency: number | null;
    price_change_percentage_7d_in_currency: number | null;
};

export type CoinGeckoState =
    | { type: ExternalStates.EMPTY, result?: Array<MarketData> }
    | { type: ExternalStates.FETCHING, result?: Array<MarketData> }
    | { type: ExternalStates.ERROR, error: string, result?: Array<MarketData> }
    | { type: CoinGeckoStates.FETCHED_COIN_DATA, result: Array<MarketData> }
    | { type: CoinGeckoStates.FETCHED_COIN_MARKET_DATA, result: Array<MarketData> }
    | { type: CoinGeckoStates.FETCHED_COIN_LIST, result: Array<MarketData> };

export const initialCoinGeckoState: CoinGeckoState = {
    type: ExternalStates.EMPTY
};

export const coinGeckoReducer = (
    init: CoinGeckoState = initialCoinGeckoState,
    action: CoinGeckoState
): CoinGeckoState => {
    switch (action.type) {
        case CoinGeckoStates.FETCHED_COIN_MARKET_DATA:
            return { type: CoinGeckoStates.FETCHED_COIN_MARKET_DATA, result: action.result };
        case CoinGeckoStates.FETCHED_COIN_DATA:
            return { type: CoinGeckoStates.FETCHED_COIN_DATA, result: action.result };
        case ExternalStates.ERROR:
            return { type: ExternalStates.ERROR, error: action.error };
        default:
            return { type: ExternalStates.EMPTY };
    };
};

export const fetchCoinData = (coin: string) =>
    async (dispatch: React.Dispatch<CoinGeckoState>): Promise<void> => {
        dispatch({ type: ExternalStates.FETCHING });
        return CoinGecko.get(`coins/${coin}`).then(
            (result) => {
                // eslint-disable-next-line
                console.log(result);
                dispatch({ type: CoinGeckoStates.FETCHED_COIN_DATA, result: result.data });
            },
            (error) => dispatch({ type: ExternalStates.ERROR, error: error }),
        );
    };

export const fetchCryptoMarketData = (
    currency = 'usd',
    priceChangePercentage = '24h,7d,30d,1y') =>
    async (dispatch: React.Dispatch<CoinGeckoState>): Promise<void> => {
        dispatch({ type: ExternalStates.FETCHING });
        return CoinGecko.get(`coins/markets?vs_currency=${currency}&price_change_percentage=${priceChangePercentage}`)
            .then(
                (result) => {
                    const data = result.data.map((coin: CoinGeckoCoinData): MarketData => {
                        return {
                            key: coin.id,
                            name: coin.name,
                            ticker: coin.symbol,
                            price: coin.current_price,
                            delta1: coin.price_change_percentage_24h ?? undefined,
                            delta7: coin.price_change_percentage_7d_in_currency ?? undefined,
                            delta30: coin.price_change_percentage_30d_in_currency ?? undefined,
                            deltaY: coin.price_change_percentage_1y_in_currency ?? undefined,
                            cap: coin.market_cap,
                            path: Constants.SITE_MARKET_PATH_BASE + coin.id,
                        };
                    });
                    dispatch({ type: CoinGeckoStates.FETCHED_COIN_MARKET_DATA, result: data });
                },
                (error) => dispatch({ type: ExternalStates.ERROR, error: error }),
            );
    };

const CoinGecko = axios.create({
    baseURL: Constants.COINGECKO_API_ENDPOINT
});

export default CoinGecko;

// eslint-disable-next-line
const exampleData: CoinGeckoCoinData = {
    ath: 4356.99,
    ath_change_percentage: -35.86867,
    ath_date: "2021-05-12T14:41:48.623Z",
    atl: 0.432979,
    atl_change_percentage: 645242.32753,
    atl_date: "2015-10-20T00:00:00.000Z",
    circulating_supply: 116987990.9365,
    current_price: 2788.22,
    fully_diluted_valuation: null,
    high_24h: 2835.27,
    id: "ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
    last_updated: "2021-08-06T02:29:00.781Z",
    low_24h: 2572.82,
    market_cap: 326891323568,
    market_cap_change_24h: 11511751289,
    market_cap_change_percentage_24h: 3.65013,
    market_cap_rank: 2,
    max_supply: null,
    name: "Ethereum",
    price_change_24h: 96.06,
    price_change_percentage_1y_in_currency: 596.7350017958644,
    price_change_percentage_24h: 3.56815,
    price_change_percentage_24h_in_currency: 3.568148668270118,
    price_change_percentage_30d_in_currency: 20.148174148277644,
    price_change_percentage_7d_in_currency: 16.9830460037074,
    roi: { times: 91.30645971710253, currency: "btc", percentage: 9130.645971710252 },
    symbol: "eth",
    total_supply: null,
    total_volume: 38006149148
}
