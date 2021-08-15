import { Dispatch } from 'react';
import axios from 'axios';
import * as Constants from '../Constants';
import { systemLanguages } from '../Data';
import i18next, { i18nNamespace } from '../services/i18n';
import { MarketData, MarketDataSource, MarketType } from '../tools/MarketData';
import { cleanObject, stripTagsUnsafe } from '../utils/data-helpers';
import { AssetStateData, AssetState, AssetStates, initialAssetState } from './AssetState';
import {
    externalLocaleReducer,
    ExternalLocaleState,
    ExternalLocaleStates,
    initialExternalLocaleState
} from './ExternalLocale';

enum i18nKeys {
    DESCRIPTION = 'description'
};

const i18nKeyExchange: Record<string, keyof typeof systemLanguages> = {
    en: 'en-US',
};

interface CoinGeckoROI {
    times: number;
    currency: string;
    percentage: number;
};

interface CoinGeckoCoinData {
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
    roi: CoinGeckoROI | null;
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
    platforms?: Record<string, string>;
    asset_platform_id?: string | null;
    block_time_in_minutes?: number;
    hashing_algorithm?: string;
    description?: Record<keyof typeof systemLanguages, string>;
};

const coinGeckoSource: MarketDataSource = {
    name: 'CoinGecko',
    link: 'https://www.coingecko.com',
}

const importData = (coin: CoinGeckoCoinData): MarketData => {
    //TODO Handle external translations better
    const translations: ExternalLocaleState = { type: ExternalLocaleStates.SUCCESS, data: {} };

    Object.values(i18nKeys).forEach((key: keyof CoinGeckoCoinData) => {
        if (coin[key] !== undefined) {
            const data = coin[key] as { [key: string]: string };

            Object.keys(coin[key] as Record<keyof typeof systemLanguages, string>).forEach((locale) => {
                const lang = i18nKeyExchange[locale] !== undefined ? i18nKeyExchange[locale] : locale;
                translations.data[lang] = { [coin.id + '_' + key]: stripTagsUnsafe(data[locale] ?? '') };
                i18next.addResourceBundle(lang, i18nNamespace.EXTERNAL, translations.data[lang]);
            });
        }
    });

    if (translations.data) {
        const localExternalLocaleState: ExternalLocaleState = { ...initialExternalLocaleState, ...JSON.parse(localStorage.getItem('externalLocaleState') ?? '{}') };
        localStorage.setItem('externalLocaleState', JSON.stringify(externalLocaleReducer(localExternalLocaleState, translations)));
    }

    return cleanObject<MarketData>({
        source: coinGeckoSource,
        type: MarketType.CRYPTO,
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        price: coin.current_price,
        delta1: coin.price_change_percentage_24h ?? undefined,
        delta7: coin.price_change_percentage_7d_in_currency ?? undefined,
        delta30: coin.price_change_percentage_30d_in_currency ?? undefined,
        deltaY: coin.price_change_percentage_1y_in_currency ?? undefined,
        description: coin.description ?? undefined,
        cap: coin.market_cap,
        total_value: coin.fully_diluted_valuation ?? undefined,
        circulating_supply: coin.circulating_supply ?? undefined,
        max_supply: coin.max_supply ?? undefined,
        volume: coin.total_volume ?? undefined,
        ath: coin.ath,
        atl: coin.atl,
        path: Constants.SITE_MARKET_ASSET_PATH + MarketType.CRYPTO + '/' + coin.id,
    });
};

export const fetchCoinMetaData = (asset = 'bitcoin') => async (dispatch: Dispatch<AssetState>): Promise<void> => {
    dispatch({ type: AssetStates.FETCHING, class: MarketType.CRYPTO });
    return CoinGecko.get(`coins/${asset}`).then(
        (result) => {
            const data = { ...initialAssetState.data as AssetStateData, [MarketType.CRYPTO]: { [result.data.id]: { ...importData(result.data), meta_data: true } } };
            dispatch({ type: AssetStates.FETCHED_ASSET_META_DATA, class: MarketType.CRYPTO, data: data });
        },
        (error) => dispatch({ type: AssetStates.ERROR, class: MarketType.CRYPTO, error: error }),
    );
};

export const fetchCoinPriceData = (
    asset = 'bitcoin',
    start = new Date().getTime(),
    end = new Date().getTime(),
    currency = Constants.DEFAULT_CURRENCY,
) => async (dispatch: Dispatch<AssetState>): Promise<void> => {
    dispatch({ type: AssetStates.FETCHING, class: MarketType.CRYPTO });
    return CoinGecko.get(`coins/${asset}/market_chart/range?vs_currency=${currency}&from=${start}&to=${end}`).then(
        (result) => {
            const data = {
                [asset]: {
                    source: coinGeckoSource,
                    type: MarketType.CRYPTO,
                    key: asset,
                    price_history: true,
                    prices: result.data,
                }
            };
            const state = { ...initialAssetState.data as AssetStateData, [MarketType.CRYPTO]: data };
            dispatch({ type: AssetStates.FETCHED_ASSET_PRICE_DATA, class: MarketType.CRYPTO, key: asset, data: state });
        },
        (error) => dispatch({ type: AssetStates.ERROR, class: MarketType.CRYPTO, error: error }),
    );
};

export const fetchCryptoMarketData = (
    currency = Constants.DEFAULT_CURRENCY,
    priceChangePercentage = Constants.DEFAULT_PRICE_PERCENTAGE_CHANGES,
) => async (dispatch: Dispatch<AssetState>): Promise<void> => {
    dispatch({ type: AssetStates.FETCHING, class: MarketType.CRYPTO });
    return CoinGecko.get(`coins/markets?vs_currency=${currency}&price_change_percentage=${priceChangePercentage}`)
        .then(
            (result) => {
                const data: Record<string, MarketData> = result.data
                    .reduce((rec: Record<string, MarketData>, coin: CoinGeckoCoinData) => {
                        rec[coin.id] = importData(coin);
                        return rec;
                    }, {} as Record<string, MarketData>);

                const state = { ...initialAssetState.data as AssetStateData, [MarketType.CRYPTO]: data };
                dispatch({ type: AssetStates.FETCHED_ASSET_MARKET_DATA, class: MarketType.CRYPTO, data: state });
            },
            (error) => dispatch({ type: AssetStates.ERROR, class: MarketType.CRYPTO, error: error }),
        );
};

const CoinGecko = axios.create({
    baseURL: Constants.COINGECKO_API_ENDPOINT
});

export default CoinGecko;

//Example data for testing
export const exampleMarketData: CoinGeckoCoinData = {
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
};
