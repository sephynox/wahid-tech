import axios from 'axios';
import React from 'react';
import * as Constants from '../Constants';
import { MarketData, MarketType } from '../tools/MarketData';

type CoinGeckoROI = {
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
    platforms?: { ['any']: string };
    asset_platform_id?: string | null;
    block_time_in_minutes?: number;
    hashing_algorithm?: string;

};

const importData = ((coin: CoinGeckoCoinData): MarketData => {
    return {
        type: MarketType.CRYPTO,
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        price: coin.current_price,
        delta1: coin.price_change_percentage_24h ?? undefined,
        delta7: coin.price_change_percentage_7d_in_currency ?? undefined,
        delta30: coin.price_change_percentage_30d_in_currency ?? undefined,
        deltaY: coin.price_change_percentage_1y_in_currency ?? undefined,
        cap: coin.market_cap,
        path: Constants.SITE_MARKET_ASSET_PATH + MarketType.CRYPTO + '/' + coin.id,
    };
});

export enum CoinGeckoStates {
    EMPTY,
    FETCHING,
    ERROR,
    FETCHED_COIN_DATA,
    FETCHED_COIN_MARKET_DATA,
    FETCHED_COIN_LIST,
};

export type CoinGeckoState =
    | { type: CoinGeckoStates.EMPTY, result?: Array<MarketData> }
    | { type: CoinGeckoStates.FETCHING, result?: Array<MarketData> }
    | { type: CoinGeckoStates.ERROR, error: string, result?: Array<MarketData> }
    | { type: CoinGeckoStates.FETCHED_COIN_DATA, result: Array<MarketData> }
    | { type: CoinGeckoStates.FETCHED_COIN_MARKET_DATA, result: Array<MarketData> }
    // TODO
    | { type: CoinGeckoStates.FETCHED_COIN_LIST, result: Array<MarketData> };

export const initialCoinGeckoState: CoinGeckoState = {
    type: CoinGeckoStates.EMPTY
};

export const coinGeckoReducer = (
    init: CoinGeckoState = initialCoinGeckoState,
    action: CoinGeckoState
): CoinGeckoState => {
    switch (action.type) {
        case CoinGeckoStates.FETCHING:
            return { ...init, type: CoinGeckoStates.FETCHING };
        case CoinGeckoStates.ERROR:
            return { ...init, type: CoinGeckoStates.ERROR, error: action.error };
        case CoinGeckoStates.FETCHED_COIN_MARKET_DATA:
            return { type: CoinGeckoStates.FETCHED_COIN_MARKET_DATA, result: action.result };
        case CoinGeckoStates.FETCHED_COIN_DATA:
            return { type: CoinGeckoStates.FETCHED_COIN_DATA, result: action.result };
        default:
            return { ...init, type: CoinGeckoStates.EMPTY };
    };
};

export const fetchCoinData = (coin: string) => async (dispatch: React.Dispatch<CoinGeckoState>): Promise<void> => {
    dispatch({ type: CoinGeckoStates.FETCHING });
    return CoinGecko.get(`coins/${coin}`).then(
        (result) => {
            dispatch({ type: CoinGeckoStates.FETCHED_COIN_DATA, result: [importData(result.data)] });
        },
        (error) => dispatch({ type: CoinGeckoStates.ERROR, error: error }),
    );
};

export const fetchCryptoMarketData = (
    currency = 'usd',
    priceChangePercentage = '24h,7d,30d,1y'
) => async (dispatch: React.Dispatch<CoinGeckoState>): Promise<void> => {
    dispatch({ type: CoinGeckoStates.FETCHING });
    return CoinGecko.get(`coins/markets?vs_currency=${currency}&price_change_percentage=${priceChangePercentage}`)
        .then(
            (result) => {
                const data = result.data.map((coin: CoinGeckoCoinData): MarketData => importData(coin));
                dispatch({ type: CoinGeckoStates.FETCHED_COIN_MARKET_DATA, result: data });
            },
            (error) => dispatch({ type: CoinGeckoStates.ERROR, error: error }),
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

// export const exampleCoinData: CoinGeckoCoinData = {
//     id: "bitcoin",
//     symbol: "btc",
//     name: "Bitcoin",
//     asset_platform_id: null,
//     platforms: {},
//     block_time_in_minutes: 10,
//     hashing_algorithm: "SHA-256",
//     localization: {
//         en: "Bitcoin",
//         de: "Bitcoin",
//         es: "Bitcoin",
//         fr: "Bitcoin",
//         it: "Bitcoin",
//         pl: "Bitcoin",
//         ro: "Bitcoin",
//         hu: "Bitcoin",
//         nl: "Bitcoin",
//         pt: "Bitcoin",
//         sv: "Bitcoin",
//         vi: "Bitcoin",
//         tr: "Bitcoin",
//         ru: "биткоин",
//         ja: "ビットコイン",
//         zh: "比特币",
//         'zh-tw': "比特幣",
//         ko: "비트코인",
//         ar: "بيتكوين",
//         th: "บิตคอยน์",
//         id: "Bitcoin"
//     },
//     description: {
//         en: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         de: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         es: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         fr: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         it: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         pl: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         ro: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         hu: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         nl: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         pt: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         sv: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         vi: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         tr: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>.",
//         ru: "",
//         ja: "",
//         zh: "",
//         zh- tw: "",
//     ko: "비트코인은 2009년 나카모토 사토시가 만든 디지털 통화로, 통화를 발행하고 관리하는 중앙 장치가 존재하지 않는 구조를 가지고 있다. 대신, 비트코인의 거래는 P2P 기반 분산 데이터베이스에 의해 이루어지며, 공개 키 암호 방식 기반으로 거래를 수행한다. 비트코인은 공개성을 가지고 있다. 비트코인은 지갑 파일의 형태로 저장되며, 이 지갑에는 각각의 고유 주소가 부여되며, 그 주소를 기반으로 비트코인의 거래가 이루어진다. 비트코인은 1998년 웨이따이가 사이버펑크 메일링 리스트에 올린 암호통화란 구상을 최초로 구현한 것 중의 하나이다.\r\n\r\n비트코인은 최초로 구현된 가상화폐입니다. 발행 및 유통을 관리하는 중앙권력이나 중간상인 없이, P2P 네트워크 기술을 이용하여 네트워크에 참여하는 사용자들이 주체적으로 화폐를 발행하고 이체내용을 공동으로 관리합니다. 이를 가능하게 한 블록체인 기술을 처음으로 코인에 도입한 것이 바로 비트코인입니다.\r\n\r\n비트코인을 사용하는 개인과 사업자의 수는 꾸준히 증가하고 있으며, 여기에는 식당, 아파트, 법률사무소, 온라인 서비스를 비롯한 소매상들이 포함됩니다. 비트코인은 새로운 사회 현상이지만 아주 빠르게 성장하고 있습니다. 이를 바탕으로 가치 증대는 물론, 매일 수백만 달러의 비트코인이 교환되고 있습니다. \r\n\r\n비트코인은 가상화폐 시장에서 현재 유통시가총액과 코인의 가치가 가장 크고, 거래량 또한 안정적입니다. 이더리움이 빠르게 추격하고 있지만 아직은 가장 견고한 가상화폐라고 볼 수 있습니다. \r\n\r\n코인 특징\r\n1. 중앙주체 없이 사용자들에 의해 거래내용이 관리될 수 있는 비트코인의 운영 시스템은 블록체인 기술에서 기인합니다. 블록체인은 쉽게 말해 다 같이 장부를 공유하고, 항상 서로의 컴퓨터에 있는 장부 파일을 비교함으로써 같은 내용만 인정하는 방식으로 운영됩니다. 따라서 전통적인 금융기관에서 장부에 대한 접근을 튼튼하게 방어하던 것과는 정반대의 작업을 통해 보안을 달성합니다. 장부를 해킹하려면 51%의 장부를 동시에 조작해야 하는데, 이는 사실상 불가능합니다. 왜냐하면, 이를 실행하기 위해서는 컴퓨팅 파워가 어마어마하게 소요되고, 이것이 가능한 슈퍼컴퓨터는 세상에 존재하지 않기 때문입니다. 또한, 장부의 자료들은 줄글로 기록되는 것이 아니라 암호화 해시 함수형태로 블록에 저장되고, 이 블록들은 서로 연결되어 있어서 더 강력한 보안을 제공합니다. \r\n\r\n2. 비트코인은 블록발행보상을 채굴자에게 지급하는 방식으로 신규 코인을 발행합니다. 블록발행보상은 매 21만 블록(약 4년)을 기준으로 발행량이 절반으로 줄어듭니다. 처음에는 50비트코인씩 발행이 되었고, 4년마다 계속 반으로 감소하고 있습니다. 코인의 총량이 2,100만 개에 도달하면 신규 발행은 종료되고, 이후에는 거래 수수료만을 통해 시스템이 지탱될 것입니다. \r\n\r\n핵심 가치\r\n(키워드: 통화로 사용될 수 있는 보편성 및 편의성)\r\n\r\n1. 다양한 알트코인들의 등장에 앞서 비트코인은 가상화폐 시장에서 독보적이었기 때문에, 현재 가장 보편적인 결제수단으로 사용됩니다. 실생활에서 이를 활용할 수 있는 가맹점이 알트코인들보다 압도적으로 많을 뿐만 아니라, 이 또한 증가하고 있습니다. 일례로 일본 업체들이 비트코인 결제 시스템을 도입하면서 곧 비트코인을 오프라인 점포 26만 곳에서 이용할 수 있게 될 것입니다. \r\n\r\n2. 여러 나라에서 비트코인을 정식 결제 수단으로 인정하면서, 실물화폐와 가상화폐를 거래할 때 더는 부가가치세가 부과되지 않게 된다고 합니다. 실제로 일본과 호주에서는 이미 비트코인을 합법적 결제 수단으로 인정하면서 제도권 안으로 들여오고 있고, 미국에서는 비트코인 ETF 승인 노력도 진행되고 있습니다. 각국에 비트코인을 기반으로 한 ATM 기계도 설치되었다고 합니다. ",
//     ar: "",
//     th: "",
//     id: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>."
// },
//     links: {
//         homepage: [
//             http://www.bitcoin.org",
//             ",
//       "
//         ],
//         blockchain_site: [
//             https://blockchair.com/bitcoin/",
//             https://btc.com/",
//             https://btc.tokenview.com/",
//             ",
//       "
//         ],
//         official_forum_url: [
//             https://bitcointalk.org/",
//             ",
//       "
//         ],
//         chat_url: [
//             ",
//       ",
//       "
//         ],
//         announcement_url: [
//             ",
//       "
//         ],
//         twitter_screen_name: "bitcoin",
//         facebook_username: "bitcoins",
//         bitcointalk_thread_identifier: null,
//         telegram_channel_identifier: "",
//         subreddit_url: "https://www.reddit.com/r/Bitcoin/",
//         repos_url: {
//             github: [
//                 https://github.com/bitcoin/bitcoin",
//                 https://github.com/bitcoin/bips"
//             ],
//             bitbucket: []
//         }
//     },
//     image: {
//         thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
//         small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
//         large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
//     },
//     country_origin: "",
//     genesis_date: "2009-01-03",
//     sentiment_votes_up_percentage: 89.94,
//     sentiment_votes_down_percentage: 10.06,
//     market_cap_rank: 1,
//     coingecko_rank: 1,
//     coingecko_score: 81.341,
//     developer_score: 104.046,
//     community_score: 69.656,
//     liquidity_score: 99.951,
//     public_interest_score: 0.295,
//     market_data: {
//         current_price: {
//             aed: 163588,
//             ars: 4314789,
//             aud: 60557,
//             bch: 75.864,
//             bdt: 3784704,
//             bhd: 16787.72,
//             bmd: 44536,
//             bnb: 124.807,
//             brl: 233358,
//             btc: 1,
//             cad: 55911,
//             chf: 40726,
//             clp: 35105151,
//             cny: 288751,
//             czk: 962066,
//             dkk: 281620,
//             dot: 2114,
//             eos: 9621,
//             eth: 14.091596,
//             eur: 37861,
//             gbp: 32092,
//             hkd: 346482,
//             huf: 13400748,
//             idr: 640984649,
//             ils: 143663,
//             inr: 3305006,
//             jpy: 4908486,
//             krw: 51044036,
//             kwd: 13391.93,
//             lkr: 8884546,
//             ltc: 284.472,
//             mmk: 73303155,
//             mxn: 892680,
//             myr: 187896,
//             ngn: 18325490,
//             nok: 395796,
//             nzd: 63523,
//             php: 2255580,
//             pkr: 7337670,
//             pln: 173231,
//             rub: 3253986,
//             sar: 167009,
//             sek: 386123,
//             sgd: 60327,
//             thb: 1488406,
//             try: 384253,
//             twd: 1239068,
//             uah: 1198717,
//             usd: 44536,
//             vef: 4459.35,
//             vnd: 1024869015,
//             xag: 1830.1,
//             xau: 25.25,
//             xdr: 31244,
//             xlm: 143592,
//             xrp: 53444,
//             yfi: 1.28611,
//             zar: 651755,
//             bits: 1000170,
//             link: 1804,
//             sats: 100017046
//         },
//         total_value_locked: null,
//         mcap_to_tvl_ratio: null,
//         fdv_to_tvl_ratio: null,
//         roi: null,
//         ath: {
//             aed: 238028,
//             ars: 6003192,
//             aud: 84381,
//             bch: 113.776,
//             bdt: 5493601,
//             bhd: 24433,
//             bmd: 64805,
//             bnb: 143062,
//             brl: 370557,
//             btc: 1.003301,
//             cad: 81381,
//             chf: 59803,
//             clp: 45888222,
//             cny: 423510,
//             czk: 1405977,
//             dkk: 403111,
//             dot: 5526,
//             eos: 15224,
//             eth: 624.203,
//             eur: 54205,
//             gbp: 47095,
//             hkd: 503309,
//             huf: 19455389,
//             idr: 947837108,
//             ils: 212949,
//             inr: 4868723,
//             jpy: 7058952,
//             krw: 72296468,
//             kwd: 19538.17,
//             lkr: 13058370,
//             ltc: 318.98,
//             mmk: 92661658,
//             mxn: 1303117,
//             myr: 267546,
//             ngn: 26604355,
//             nok: 546617,
//             nzd: 91285,
//             php: 3144705,
//             pkr: 9907525,
//             pln: 247078,
//             rub: 4907234,
//             sar: 243030,
//             sek: 550226,
//             sgd: 86666,
//             thb: 2036265,
//             try: 525937,
//             twd: 1844031,
//             uah: 1815814,
//             usd: 64805,
//             vef: 8618768857,
//             vnd: 1495234422,
//             xag: 2553.93,
//             xau: 37.14,
//             xdr: 45474,
//             xlm: 275874,
//             xrp: 159288,
//             yfi: 1.976674,
//             zar: 938527,
//             bits: 1058236,
//             link: 2874,
//             sats: 105823579
//         },
//         ath_change_percentage: {
//             aed: -31.176,
//             ars: -28.02285,
//             aud: -28.13176,
//             bch: -33.09017,
//             bdt: -31.00904,
//             bhd: -31.19342,
//             bmd: -31.17954,
//             bnb: -99.91267,
//             brl: -36.93531,
//             btc: -0.32896,
//             cad: -31.19955,
//             chf: -31.80367,
//             clp: -23.38974,
//             cny: -31.7227,
//             czk: -31.47582,
//             dkk: -30.0391,
//             dot: -61.75001,
//             eos: -36.90417,
//             eth: -97.73871,
//             eur: -30.05208,
//             gbp: -31.75949,
//             hkd: -31.0612,
//             huf: -31.02266,
//             idr: -32.27777,
//             ils: -32.44061,
//             inr: -32.02104,
//             jpy: -30.36546,
//             krw: -29.29579,
//             kwd: -31.3601,
//             lkr: -31.86605,
//             ltc: -10.83662,
//             mmk: -20.77907,
//             mxn: -31.39916,
//             myr: -29.67095,
//             ngn: -31.02047,
//             nok: -27.48859,
//             nzd: -30.31379,
//             php: -28.17168,
//             pkr: -25.83306,
//             pln: -29.7885,
//             rub: -33.5957,
//             sar: -31.18263,
//             sek: -29.72479,
//             sgd: -30.29308,
//             thb: -26.80114,
//             try: -26.83552,
//             twd: -32.71097,
//             uah: -33.89068,
//             usd: -31.17954,
//             vef: -99.99995,
//             vnd: -31.36014,
//             xag: -28.23976,
//             xau: -31.90851,
//             xdr: -31.19543,
//             xlm: -47.72056,
//             xrp: -66.04617,
//             yfi: -34.91162,
//             zar: -30.45678,
//             bits: -5.40782,
//             link: -37.20803,
//             sats: -5.40782
//         },
//         ath_date: {
//             aed: "2021-04-14T11:54:46.763Z",
//             ars: "2021-04-14T11:54:46.763Z",
//             aud: "2021-04-14T06:52:46.198Z",
//             bch: "2021-03-25T02:09:22.587Z",
//             bdt: "2021-04-14T06:52:46.198Z",
//             bhd: "2021-04-14T11:54:46.763Z",
//             bmd: "2021-04-14T11:54:46.763Z",
//             bnb: "2017-10-19T00:00:00.000Z",
//             brl: "2021-04-14T11:54:46.763Z",
//             btc: "2019-10-15T16:00:56.136Z",
//             cad: "2021-04-14T11:54:46.763Z",
//             chf: "2021-04-14T11:54:46.763Z",
//             clp: "2021-04-14T11:54:46.763Z",
//             cny: "2021-04-14T06:52:46.198Z",
//             czk: "2021-04-14T11:54:46.763Z",
//             dkk: "2021-04-14T11:54:46.763Z",
//             dot: "2020-12-27T11:42:47.567Z",
//             eos: "2021-03-13T01:53:26.538Z",
//             eth: "2015-10-20T00:00:00.000Z",
//             eur: "2021-04-14T11:54:46.763Z",
//             gbp: "2021-04-14T11:54:46.763Z",
//             hkd: "2021-04-14T11:54:46.763Z",
//             huf: "2021-04-14T06:52:46.198Z",
//             idr: "2021-04-14T11:54:46.763Z",
//             ils: "2021-04-14T11:54:46.763Z",
//             inr: "2021-04-14T11:54:46.763Z",
//             jpy: "2021-04-14T11:54:46.763Z",
//             krw: "2021-04-14T06:52:46.198Z",
//             kwd: "2021-04-14T11:54:46.763Z",
//             lkr: "2021-04-14T11:54:46.763Z",
//             ltc: "2017-03-05T00:00:00.000Z",
//             mmk: "2021-05-08T13:44:31.031Z",
//             mxn: "2021-04-14T11:54:46.763Z",
//             myr: "2021-04-14T11:54:46.763Z",
//             ngn: "2021-04-14T11:54:46.763Z",
//             nok: "2021-04-14T06:52:46.198Z",
//             nzd: "2021-04-14T06:52:46.198Z",
//             php: "2021-04-14T11:54:46.763Z",
//             pkr: "2021-04-14T06:52:46.198Z",
//             pln: "2021-04-14T06:52:46.198Z",
//             rub: "2021-04-14T11:54:46.763Z",
//             sar: "2021-04-14T11:54:46.763Z",
//             sek: "2021-04-14T06:52:46.198Z",
//             sgd: "2021-04-14T11:54:46.763Z",
//             thb: "2021-04-14T06:52:46.198Z",
//             try: "2021-04-14T06:52:46.198Z",
//             twd: "2021-04-14T11:54:46.763Z",
//             uah: "2021-04-14T06:52:46.198Z",
//             usd: "2021-04-14T11:54:46.763Z",
//             vef: "2021-01-03T12:04:17.372Z",
//             vnd: "2021-04-14T11:54:46.763Z",
//             xag: "2021-04-14T11:54:46.763Z",
//             xau: "2021-04-14T11:54:46.763Z",
//             xdr: "2021-04-14T11:54:46.763Z",
//             xlm: "2021-01-03T07:50:39.913Z",
//             xrp: "2021-01-03T07:54:40.240Z",
//             yfi: "2020-11-05T13:29:25.560Z",
//             zar: "2021-04-14T06:52:46.198Z",
//             bits: "2021-05-19T16:00:11.072Z",
//             link: "2021-01-03T07:43:41.985Z",
//             sats: "2021-05-19T16:00:11.072Z"
//         },
//         atl: {
//             aed: 632.31,
//             ars: 1478.98,
//             aud: 72.61,
//             bch: 3.513889,
//             bdt: 9390.25,
//             bhd: 45.91,
//             bmd: 121.77,
//             bnb: 81.254,
//             brl: 149.66,
//             btc: 0.99895134,
//             cad: 69.81,
//             chf: 63.26,
//             clp: 107408,
//             cny: 407.23,
//             czk: 4101.56,
//             dkk: 382.47,
//             dot: 991.882,
//             eos: 908.141,
//             eth: 6.779735,
//             eur: 51.3,
//             gbp: 43.9,
//             hkd: 514.37,
//             huf: 46598,
//             idr: 658780,
//             ils: 672.18,
//             inr: 3993.42,
//             jpy: 6641.83,
//             krw: 75594,
//             kwd: 50.61,
//             lkr: 22646,
//             ltc: 20.707835,
//             mmk: 117588,
//             mxn: 859.32,
//             myr: 211.18,
//             ngn: 4289706,
//             nok: 1316.03,
//             nzd: 84.85,
//             php: 2880.5,
//             pkr: 17315.84,
//             pln: 220.11,
//             rub: 2206.43,
//             sar: 646.04,
//             sek: 443.81,
//             sgd: 84.47,
//             thb: 5644.35,
//             try: 392.91,
//             twd: 1998.66,
//             uah: 553.37,
//             usd: 67.81,
//             vef: 766.19,
//             vnd: 3672339,
//             xag: 3.37,
//             xau: 0.0531,
//             xdr: 44.39,
//             xlm: 21608,
//             xrp: 9908,
//             yfi: 0.23958075,
//             zar: 666.26,
//             bits: 950993,
//             link: 598.477,
//             sats: 95099268
//         },
//         atl_change_percentage: {
//             aed: 25808.12281,
//             ars: 292056.3937,
//             aud: 83419.92535,
//             bch: 2066.46049,
//             bdt: 40261.9289,
//             bhd: 36516.0083,
//             bmd: 36525.52776,
//             bnb: 53.7545,
//             brl: 156049.10853,
//             btc: 0.10498,
//             cad: 80107.94268,
//             chf: 64368.58067,
//             clp: 32630.35555,
//             cny: 70907.73489,
//             czk: 23389.47572,
//             dkk: 73637.07792,
//             dot: 113.10067,
//             eos: 957.74748,
//             eth: 108.19431,
//             eur: 73811.12399,
//             gbp: 73102.64055,
//             hkd: 67355.71084,
//             huf: 28699.08555,
//             idr: 97337.14981,
//             ils: 21302.94113,
//             inr: 82779.03571,
//             jpy: 73907.71964,
//             krw: 67520.15674,
//             kwd: 26398.17025,
//             lkr: 39187.58773,
//             ltc: 1273.45694,
//             mmk: 62327.6739,
//             mxn: 103930.03946,
//             myr: 89002.35104,
//             ngn: 327.80454,
//             nok: 30017.88926,
//             nzd: 74867.56484,
//             php: 78316.47949,
//             pkr: 42335.74695,
//             pln: 78713.31713,
//             rub: 147586.98607,
//             sar: 25788.00981,
//             sek: 87026.58919,
//             sgd: 71422.92463,
//             thb: 26307.35357,
//             try: 97835.91556,
//             twd: 61983.27554,
//             uah: 216830.21807,
//             usd: 65671.36538,
//             vef: 482.84385,
//             vnd: 27847.49529,
//             xag: 54287.87314,
//             xau: 47521.71983,
//             xdr: 70382.43334,
//             xlm: 567.45414,
//             xrp: 445.86699,
//             yfi: 437.01518,
//             zar: 97861.36301,
//             bits: 5.2593,
//             link: 201.54255,
//             sats: 5.2593
//         },
//         atl_date: {
//             aed: "2015-01-14T00:00:00.000Z",
//             ars: "2015-01-14T00:00:00.000Z",
//             aud: "2013-07-05T00:00:00.000Z",
//             bch: "2017-08-02T00:00:00.000Z",
//             bdt: "2013-09-08T00:00:00.000Z",
//             bhd: "2013-09-08T00:00:00.000Z",
//             bmd: "2013-09-08T00:00:00.000Z",
//             bnb: "2021-05-13T07:09:55.887Z",
//             brl: "2013-07-05T00:00:00.000Z",
//             btc: "2019-10-21T00:00:00.000Z",
//             cad: "2013-07-05T00:00:00.000Z",
//             chf: "2013-07-05T00:00:00.000Z",
//             clp: "2015-01-14T00:00:00.000Z",
//             cny: "2013-07-05T00:00:00.000Z",
//             czk: "2015-01-14T00:00:00.000Z",
//             dkk: "2013-07-05T00:00:00.000Z",
//             dot: "2021-05-19T11:04:48.978Z",
//             eos: "2019-04-11T00:00:00.000Z",
//             eth: "2017-06-12T00:00:00.000Z",
//             eur: "2013-07-05T00:00:00.000Z",
//             gbp: "2013-07-05T00:00:00.000Z",
//             hkd: "2013-07-05T00:00:00.000Z",
//             huf: "2015-01-14T00:00:00.000Z",
//             idr: "2013-07-05T00:00:00.000Z",
//             ils: "2015-01-14T00:00:00.000Z",
//             inr: "2013-07-05T00:00:00.000Z",
//             jpy: "2013-07-05T00:00:00.000Z",
//             krw: "2013-07-05T00:00:00.000Z",
//             kwd: "2015-01-14T00:00:00.000Z",
//             lkr: "2015-01-14T00:00:00.000Z",
//             ltc: "2013-11-28T00:00:00.000Z",
//             mmk: "2013-09-08T00:00:00.000Z",
//             mxn: "2013-07-05T00:00:00.000Z",
//             myr: "2013-07-05T00:00:00.000Z",
//             ngn: "2020-10-15T09:39:31.080Z",
//             nok: "2015-01-14T00:00:00.000Z",
//             nzd: "2013-07-05T00:00:00.000Z",
//             php: "2013-07-05T00:00:00.000Z",
//             pkr: "2015-01-14T00:00:00.000Z",
//             pln: "2013-07-05T00:00:00.000Z",
//             rub: "2013-07-05T00:00:00.000Z",
//             sar: "2015-01-14T00:00:00.000Z",
//             sek: "2013-07-05T00:00:00.000Z",
//             sgd: "2013-07-05T00:00:00.000Z",
//             thb: "2015-01-14T00:00:00.000Z",
//             try: "2015-01-14T00:00:00.000Z",
//             twd: "2013-07-05T00:00:00.000Z",
//             uah: "2013-07-06T00:00:00.000Z",
//             usd: "2013-07-06T00:00:00.000Z",
//             vef: "2013-09-08T00:00:00.000Z",
//             vnd: "2015-01-14T00:00:00.000Z",
//             xag: "2013-07-05T00:00:00.000Z",
//             xau: "2013-07-05T00:00:00.000Z",
//             xdr: "2013-07-05T00:00:00.000Z",
//             xlm: "2018-11-20T00:00:00.000Z",
//             xrp: "2018-12-25T00:00:00.000Z",
//             yfi: "2020-09-12T20:09:36.122Z",
//             zar: "2013-07-05T00:00:00.000Z",
//             bits: "2021-05-19T13:14:13.071Z",
//             link: "2020-08-16T08:13:13.338Z",
//             sats: "2021-05-19T13:14:13.071Z"
//         },
//         market_cap: {
//             aed: 3079822041203,
//             ars: 81233229199526,
//             aud: 1140091729474,
//             bch: 1435095779,
//             bdt: 71253488122198,
//             bhd: 316057388177,
//             bmd: 838457486988,
//             bnb: 2354483554,
//             brl: 4393369663297,
//             btc: 18779462,
//             cad: 1052616298314,
//             chf: 766727448976,
//             clp: 660914114117984,
//             cny: 5436222962633,
//             czk: 18112526325404,
//             dkk: 5301969149816,
//             dot: 39880522097,
//             eos: 182158832965,
//             eth: 265247916,
//             eur: 712804571073,
//             gbp: 604184919006,
//             hkd: 6523119595302,
//             huf: 252291857834572,
//             idr: 12067625150092226,
//             ils: 2704696161525,
//             inr: 62222356045754,
//             jpy: 92410591928340,
//             krw: 960990712207839,
//             kwd: 252125843252,
//             lkr: 167266673627218,
//             ltc: 5366776849,
//             mmk: 1380056449504684,
//             mxn: 16806209560677,
//             myr: 3537452137601,
//             ngn: 345008486745662,
//             nok: 7451539378356,
//             nzd: 1195925451990,
//             php: 42465127444567,
//             pkr: 138144109664476,
//             pln: 3261364856285,
//             rub: 61261812441001,
//             sar: 3144228153066,
//             sek: 7269426412183,
//             sgd: 1135749358149,
//             thb: 28021764028023,
//             try: 7234211197729,
//             twd: 23327564202969,
//             uah: 22567884827629,
//             usd: 838457486988,
//             vef: 83954748172,
//             vnd: 19294900627489040,
//             xag: 34454834128,
//             xau: 475397011,
//             xdr: 588215657709,
//             xlm: 2727691429754,
//             xrp: 1027647234507,
//             yfi: 24158361,
//             zar: 12270389324170,
//             bits: 18836327175911,
//             link: 34007788804,
//             sats: 1883632717591051
//         },
//         market_cap_rank: 1,
//         fully_diluted_valuation: {
//             aed: 3443989123078,
//             ars: 90838481591754,
//             aud: 1274899478960,
//             bch: 1604785662,
//             bdt: 79678707013341,
//             bhd: 353428929526,
//             bmd: 937599129663,
//             bnb: 2632884511,
//             brl: 4912854421987,
//             btc: 21000000,
//             cad: 1177080699362,
//             chf: 857387524120,
//             clp: 739062513956878,
//             cny: 6079017717083,
//             czk: 20254203918807,
//             dkk: 5928889344442,
//             dot: 44596110583,
//             eos: 203697821176,
//             eth: 296611598,
//             eur: 797088648893,
//             gbp: 675625494443,
//             hkd: 7294432156861,
//             huf: 282123578115604,
//             idr: 13494536113544506,
//             ils: 3024507272467,
//             inr: 69579707712651,
//             jpy: 103337488075810,
//             krw: 1074621038470890,
//             kwd: 281937933488,
//             lkr: 187044769768781,
//             ltc: 6001360094,
//             mmk: 1543238322780406,
//             mxn: 18793424474792,
//             myr: 3955730728048,
//             ngn: 385803289873741,
//             nok: 8332630985141,
//             nzd: 1337335142604,
//             php: 47486327155481,
//             pkr: 154478669461031,
//             pln: 3646998086633,
//             rub: 68505586648916,
//             sar: 3516010800223,
//             sek: 8128984454178,
//             sgd: 1270043653068,
//             thb: 31335138599204,
//             try: 8089605290733,
//             twd: 26085882985485,
//             uah: 25236376919648,
//             usd: 937599129663,
//             vef: 93881800853,
//             vnd: 21576385584276580,
//             xag: 38528873547,
//             xau: 531609331,
//             xdr: 657767981419,
//             xlm: 3050221567840,
//             xrp: 1149159221103,
//             yfi: 27014915,
//             zar: 13721275711071,
//             bits: 21063589079076,
//             link: 38028968289,
//             sats: 2106358907907589
//         },
//         total_volume: {
//             aed: 158409343797,
//             ars: 4178196778850,
//             aud: 58640135799,
//             bch: 73462101,
//             bdt: 3664893018383,
//             bhd: 16256278056,
//             bmd: 43125706141,
//             bnb: 120855758,
//             brl: 225971110054,
//             btc: 968508,
//             cad: 54140874003,
//             chf: 39436301981,
//             clp: 33993837865560,
//             cny: 279609828335,
//             czk: 931610129197,
//             dkk: 272704540268,
//             dot: 2046769021,
//             eos: 9316877991,
//             eth: 13645502,
//             eur: 36662801567,
//             gbp: 31075995714,
//             hkd: 335513896834,
//             huf: 12976524977795,
//             idr: 620693194488743,
//             ils: 139114902869,
//             inr: 3200380560574,
//             jpy: 4753099702319,
//             krw: 49428150743457,
//             kwd: 12967986088,
//             lkr: 8603290597271,
//             ltc: 275466757,
//             mmk: 70982619659122,
//             mxn: 864420279029,
//             myr: 181947354208,
//             ngn: 17745365562855,
//             nok: 383266775615,
//             nzd: 61511919697,
//             php: 2184175865600,
//             pkr: 7105383839901,
//             pln: 167746921690,
//             rub: 3150975406614,
//             sar: 161722044914,
//             sek: 373899872242,
//             sgd: 58416787767,
//             thb: 1441287578412,
//             try: 372088592584,
//             twd: 1199843396252,
//             uah: 1160769608957,
//             usd: 43125706141,
//             vef: 4318176956,
//             vnd: 992425051231179,
//             xag: 1772169818,
//             xau: 24451844,
//             xdr: 30254623515,
//             xlm: 139046768492,
//             xrp: 51752428148,
//             yfi: 1245396,
//             zar: 631122284005,
//             bits: 968508371859,
//             link: 1747296528,
//             sats: 96850837185866
//         },
//         high_24h: {
//             aed: 164090,
//             ars: 4328035,
//             aud: 60729,
//             bch: 76.73,
//             bdt: 3796012,
//             bhd: 16841.8,
//             bmd: 44672,
//             bnb: 125.375,
//             brl: 233945,
//             btc: 1,
//             cad: 56082,
//             chf: 40872,
//             clp: 35212799,
//             cny: 289636,
//             czk: 964985,
//             dkk: 282441,
//             dot: 2148,
//             eos: 9924,
//             eth: 14.872413,
//             eur: 37977,
//             gbp: 32196,
//             hkd: 347561,
//             huf: 13440064,
//             idr: 642950646,
//             ils: 144103,
//             inr: 3316552,
//             jpy: 4924255,
//             krw: 51190712,
//             kwd: 13435.24,
//             lkr: 8911796,
//             ltc: 288.731,
//             mmk: 73527987,
//             mxn: 895418,
//             myr: 188472,
//             ngn: 18381697,
//             nok: 397015,
//             nzd: 63722,
//             php: 2262129,
//             pkr: 7356127,
//             pln: 173667,
//             rub: 3263966,
//             sar: 167523,
//             sek: 387388,
//             sgd: 60526,
//             thb: 1492537,
//             try: 385570,
//             twd: 1242869,
//             uah: 1201732,
//             usd: 44672,
//             vef: 4473.02,
//             vnd: 1027999341,
//             xag: 1835.72,
//             xau: 25.33,
//             xdr: 31340,
//             xlm: 150404,
//             xrp: 57324,
//             yfi: 1.294326,
//             zar: 653701,
//             bits: 1010628,
//             link: 1812,
//             sats: 101062832
//         },
//         low_24h: {
//             aed: 157078,
//             ars: 4143102,
//             aud: 58134,
//             bch: 74.632,
//             bdt: 3633812,
//             bhd: 16122.17,
//             bmd: 42763,
//             bnb: 122.839,
//             brl: 223802,
//             btc: 1,
//             cad: 53686,
//             chf: 39126,
//             clp: 33708186,
//             cny: 277260,
//             czk: 923752,
//             dkk: 270373,
//             dot: 2043,
//             eos: 9498,
//             eth: 14.022245,
//             eur: 36355,
//             gbp: 30820,
//             hkd: 332710,
//             huf: 12865781,
//             idr: 615477918,
//             ils: 137946,
//             inr: 3174839,
//             jpy: 4713846,
//             krw: 49003377,
//             kwd: 12861.16,
//             lkr: 8531003,
//             ltc: 280.714,
//             mmk: 70386199,
//             mxn: 857157,
//             myr: 180419,
//             ngn: 17596263,
//             nok: 380051,
//             nzd: 60999,
//             php: 2165470,
//             pkr: 7020437,
//             pln: 166183,
//             rub: 3124500,
//             sar: 160365,
//             sek: 370835,
//             sgd: 57940,
//             thb: 1428763,
//             try: 369095,
//             twd: 1189762,
//             uah: 1146882,
//             usd: 42763,
//             vef: 4281.89,
//             vnd: 984073813,
//             xag: 1757.28,
//             xau: 24.25,
//             xdr: 30000,
//             xlm: 141452,
//             xrp: 53495,
//             yfi: 1.260689,
//             zar: 625769,
//             bits: 994554,
//             link: 1767,
//             sats: 99455417
//         },
//         price_change_24h: 1681,
//         price_change_percentage_24h: 3.92165,
//         price_change_percentage_7d: 6.66134,
//         price_change_percentage_14d: 30.16916,
//         price_change_percentage_30d: 35.22841,
//         price_change_percentage_60d: 32.71554,
//         price_change_percentage_200d: 23.35057,
//         price_change_percentage_1y: 284.87319,
//         market_cap_change_24h: 34613542829,
//         market_cap_change_percentage_24h: 4.306,
//         price_change_24h_in_currency: {
//             aed: 6173.25,
//             ars: 162814,
//             aud: 2298.68,
//             bch: 0.13951447,
//             bdt: 143110,
//             bhd: 631.03,
//             bmd: 1680.62,
//             bnb: 0.15389168,
//             brl: 9077.16,
//             btc: 0,
//             cad: 2109.88,
//             chf: 1515.71,
//             clp: 1324772,
//             cny: 10896.46,
//             czk: 36335,
//             dkk: 10667.64,
//             dot: 6.454403,
//             eos: -263.200183271008,
//             eth: -0.780817169876,
//             eur: 1428.76,
//             gbp: 1205.47,
//             hkd: 13059.41,
//             huf: 507412,
//             idr: 24188559,
//             ils: 5421.34,
//             inr: 123368,
//             jpy: 184545,
//             krw: 1935708,
//             kwd: 503.22,
//             lkr: 335272,
//             ltc: -4.011433093355,
//             mmk: 2766209,
//             mxn: 33687,
//             myr: 7090.53,
//             ngn: 691541,
//             nok: 14931.71,
//             nzd: 2393.11,
//             php: 85473,
//             pkr: 302197,
//             pln: 6692.27,
//             rub: 122794,
//             sar: 6300.97,
//             sek: 14493.83,
//             sgd: 2262.8,
//             thb: 56167,
//             try: 14367.53,
//             twd: 46758,
//             uah: 49378,
//             usd: 1680.62,
//             vef: 168.28,
//             vnd: 38687608,
//             xag: 69.06,
//             xau: 0.952894,
//             xdr: 1179.03,
//             xlm: -6160.42930952285,
//             xrp: -3880.185753631777,
//             yfi: -0.001188771095,
//             zar: 24646,
//             bits: -118.482896359637,
//             link: 10.454307,
//             sats: -11848.289635956287
//         },
//         price_change_percentage_1h_in_currency: {
//             aed: 0.43373,
//             ars: 0.43373,
//             aud: 0.43373,
//             bch: -0.59078,
//             bdt: 0.43373,
//             bhd: 0.43373,
//             bmd: 0.43373,
//             bnb: -0.31378,
//             brl: 0.43373,
//             btc: 0,
//             cad: 0.43373,
//             chf: 0.43373,
//             clp: 0.43373,
//             cny: 0.43373,
//             czk: 0.43373,
//             dkk: 0.43373,
//             dot: -0.98936,
//             eos: -0.57813,
//             eth: -0.84999,
//             eur: 0.43373,
//             gbp: 0.43373,
//             hkd: 0.43373,
//             huf: 0.43373,
//             idr: 0.43373,
//             ils: 0.43373,
//             inr: 0.43373,
//             jpy: 0.43373,
//             krw: 0.43373,
//             kwd: 0.43373,
//             lkr: 0.43373,
//             ltc: -0.36973,
//             mmk: 0.43373,
//             mxn: 0.43373,
//             myr: 0.43373,
//             ngn: 0.43373,
//             nok: 0.43373,
//             nzd: 0.43373,
//             php: 0.43373,
//             pkr: 0.43373,
//             pln: 0.43373,
//             rub: 0.43373,
//             sar: 0.43373,
//             sek: 0.43373,
//             sgd: 0.43373,
//             thb: 0.43373,
//             try: 0.43373,
//             twd: 0.43373,
//             uah: 0.43373,
//             usd: 0.43373,
//             vef: 0.43373,
//             vnd: 0.43373,
//             xag: 0.43373,
//             xau: 0.43373,
//             xdr: 0.43373,
//             xlm: -0.5978,
//             xrp: -1.88666,
//             yfi: 0.04606,
//             zar: 0.43373,
//             bits: -0.20765,
//             link: -0.02287,
//             sats: -0.20765
//         },
//         price_change_percentage_24h_in_currency: {
//             aed: 3.92165,
//             ars: 3.92135,
//             aud: 3.94565,
//             bch: 0.18424,
//             bdt: 3.92987,
//             bhd: 3.90566,
//             bmd: 3.92165,
//             bnb: 0.12346,
//             brl: 4.04722,
//             btc: 0,
//             cad: 3.92165,
//             chf: 3.86565,
//             clp: 3.92172,
//             cny: 3.92165,
//             czk: 3.92501,
//             dkk: 3.9371,
//             dot: 0.3063,
//             eos: -2.66271,
//             eth: -5.2501,
//             eur: 3.92165,
//             gbp: 3.9029,
//             hkd: 3.91677,
//             huf: 3.93546,
//             idr: 3.92165,
//             ils: 3.92165,
//             inr: 3.87749,
//             jpy: 3.90658,
//             krw: 3.94171,
//             kwd: 3.90437,
//             lkr: 3.92165,
//             ltc: -1.39052,
//             mmk: 3.92165,
//             mxn: 3.92165,
//             myr: 3.92165,
//             ngn: 3.92165,
//             nok: 3.92048,
//             nzd: 3.9148,
//             php: 3.93863,
//             pkr: 4.29534,
//             pln: 4.01845,
//             rub: 3.92165,
//             sar: 3.92076,
//             sek: 3.90008,
//             sgd: 3.8971,
//             thb: 3.92165,
//             try: 3.88432,
//             twd: 3.92165,
//             uah: 4.29624,
//             usd: 3.92165,
//             vef: 3.92165,
//             vnd: 3.92297,
//             xag: 3.92165,
//             xau: 3.92165,
//             xdr: 3.92165,
//             xlm: -4.11373,
//             xrp: -6.76881,
//             yfi: -0.09235,
//             zar: 3.93003,
//             bits: -0.01184,
//             link: 0.58275,
//             sats: -0.01184
//         },
//         price_change_percentage_7d_in_currency: {
//             aed: 6.66134,
//             ars: 6.85299,
//             aud: 6.54083,
//             bch: -0.08332,
//             bdt: 6.77112,
//             bhd: 6.62033,
//             bmd: 6.66134,
//             bnb: 0.2619,
//             brl: 7.29524,
//             btc: 0,
//             cad: 7.32044,
//             chf: 7.72058,
//             clp: 11.11584,
//             cny: 7.02615,
//             czk: 7.24892,
//             dkk: 7.6105,
//             dot: -14.24476,
//             eos: -5.39495,
//             eth: -14.2154,
//             eur: 7.60622,
//             gbp: 6.87269,
//             hkd: 6.7677,
//             huf: 6.30276,
//             idr: 6.08385,
//             ils: 6.6263,
//             inr: 6.41929,
//             jpy: 7.14744,
//             krw: 6.12534,
//             kwd: 6.716,
//             lkr: 6.66498,
//             ltc: -0.8936,
//             mmk: 6.66542,
//             mxn: 7.53312,
//             myr: 6.58555,
//             ngn: 6.66393,
//             nok: 7.50996,
//             nzd: 6.10143,
//             php: 8.04825,
//             pkr: 8.0854,
//             pln: 7.79605,
//             rub: 6.53813,
//             sar: 6.65187,
//             sek: 7.59332,
//             sgd: 6.67906,
//             thb: 8.39182,
//             try: 8.85664,
//             twd: 6.20974,
//             uah: 7.00284,
//             usd: 6.66134,
//             vef: 6.66134,
//             vnd: 6.61432,
//             xag: 11.75895,
//             xau: 9.68101,
//             xdr: 6.86867,
//             xlm: -1.29458,
//             xrp: -3.76825,
//             yfi: 2.79018,
//             zar: 6.85971,
//             bits: 0.0804,
//             link: -1.07365,
//             sats: 0.0804
//         },
//         price_change_percentage_14d_in_currency: {
//             aed: 30.16916,
//             ars: 30.87044,
//             aud: 30.33287,
//             bch: 1.69555,
//             bdt: 30.40267,
//             bhd: 30.11634,
//             bmd: 30.16916,
//             bnb: 9.97297,
//             brl: 31.06866,
//             btc: 0,
//             cad: 30.08885,
//             chf: 29.40893,
//             clp: 34.61623,
//             cny: 30.21334,
//             czk: 29.04728,
//             dkk: 30.30268,
//             dot: -14.63576,
//             eos: 3.17001,
//             eth: -10.07071,
//             eur: 30.26324,
//             gbp: 28.95919,
//             hkd: 30.34516,
//             huf: 27.99967,
//             idr: 29.42727,
//             ils: 28.26847,
//             inr: 29.76176,
//             jpy: 29.77001,
//             krw: 29.49366,
//             kwd: 30.06448,
//             lkr: 30.25003,
//             ltc: 4.48065,
//             mmk: 30.25019,
//             mxn: 30.08317,
//             myr: 29.93817,
//             ngn: 30.24866,
//             nok: 30.52458,
//             nzd: 29.48395,
//             php: 31.16265,
//             pkr: 33.42047,
//             pln: 30.29209,
//             rub: 28.7536,
//             sar: 30.12519,
//             sek: 29.85837,
//             sgd: 29.52182,
//             thb: 31.97038,
//             try: 31.27376,
//             twd: 29.11984,
//             uah: 28.72995,
//             usd: 30.16916,
//             vef: 30.16916,
//             vnd: 30.28247,
//             xag: 34.63558,
//             xau: 33.01723,
//             xdr: 29.81259,
//             xlm: 12.28611,
//             xrp: -4.5512,
//             yfi: 10.86786,
//             zar: 28.33124,
//             bits: -0.12188,
//             link: -11.9995,
//             sats: -0.12188
//         },
//         price_change_percentage_30d_in_currency: {
//             aed: 35.22841,
//             ars: 36.48776,
//             aud: 36.64232,
//             bch: 13.34309,
//             bdt: 35.55807,
//             bhd: 35.2216,
//             bmd: 35.22841,
//             bnb: 18.05852,
//             brl: 34.71483,
//             btc: 0,
//             cad: 35.45121,
//             chf: 35.14196,
//             clp: 41.48358,
//             cny: 35.09298,
//             czk: 33.84487,
//             dkk: 36.21571,
//             dot: -1.28897,
//             eos: 5.31526,
//             eth: -9.00112,
//             eur: 36.18491,
//             gbp: 34.40696,
//             hkd: 35.43653,
//             huf: 34.81214,
//             idr: 33.68973,
//             ils: 32.94966,
//             inr: 34.30337,
//             jpy: 35.71109,
//             krw: 35.22021,
//             kwd: 35.07164,
//             lkr: 35.61288,
//             ltc: 14.17997,
//             mmk: 35.27298,
//             mxn: 35.61893,
//             myr: 36.44115,
//             ngn: 35.41101,
//             nok: 36.72416,
//             nzd: 34.02706,
//             php: 36.40695,
//             pkr: 39.96405,
//             pln: 37.21944,
//             rub: 32.21354,
//             sar: 35.21669,
//             sek: 36.37351,
//             sgd: 35.42537,
//             thb: 38.89656,
//             try: 34.28988,
//             twd: 34.2829,
//             uah: 33.36385,
//             usd: 35.22841,
//             vef: 35.22841,
//             vnd: 35.30841,
//             xag: 44.0084,
//             xau: 38.26443,
//             xdr: 34.93356,
//             xlm: 6.91566,
//             xrp: 1.38526,
//             yfi: 29.48187,
//             zar: 38.21263,
//             bits: -0.12723,
//             link: 1.4621,
//             sats: -0.12723
//         },
//         price_change_percentage_60d_in_currency: {
//             aed: 32.71916,
//             ars: 35.44378,
//             aud: 39.63977,
//             bch: 35.1754,
//             bdt: 33.07421,
//             bhd: 32.69653,
//             bmd: 32.71554,
//             bnb: 31.56394,
//             brl: 38.07876,
//             btc: 0,
//             cad: 37.53761,
//             chf: 35.30098,
//             clp: 45.7615,
//             cny: 34.43864,
//             czk: 37.20604,
//             dkk: 37.36435,
//             dot: 37.82133,
//             eos: 45.43714,
//             eth: 6.17144,
//             eur: 37.32688,
//             gbp: 35.3156,
//             hkd: 33.06735,
//             huf: 39.37776,
//             idr: 33.74563,
//             ils: 31.98357,
//             inr: 34.96148,
//             jpy: 33.60409,
//             krw: 36.06457,
//             kwd: 32.66084,
//             lkr: 33.77142,
//             ltc: 37.14195,
//             mmk: 32.76562,
//             mxn: 34.95908,
//             myr: 35.90458,
//             ngn: 32.73532,
//             nok: 42.62457,
//             nzd: 36.15801,
//             php: 40.89622,
//             pkr: 40.56333,
//             pln: 40.79347,
//             rub: 34.16415,
//             sar: 32.6947,
//             sek: 39.08422,
//             sgd: 35.75932,
//             thb: 42.11393,
//             try: 33.07027,
//             twd: 33.76607,
//             uah: 31.60878,
//             usd: 32.71554,
//             vef: 32.71554,
//             vnd: 33.02449,
//             xag: 50.71282,
//             xau: 42.49159,
//             xdr: 34.15279,
//             xlm: 51.05432,
//             xrp: 39.66663,
//             yfi: 53.0389,
//             zar: 43.09449,
//             bits: 0.04191,
//             link: 30.34619,
//             sats: 0.04191
//         },
//         price_change_percentage_200d_in_currency: {
//             aed: 23.35896,
//             ars: 38.63084,
//             aud: 29.38143,
//             bch: 7.93543,
//             bdt: 23.59559,
//             bhd: 23.32112,
//             bmd: 23.35057,
//             bnb: -85.07415,
//             brl: 20.62545,
//             btc: 0,
//             cad: 21.73174,
//             chf: 27.00696,
//             clp: 31.87452,
//             cny: 23.43814,
//             czk: 23.62681,
//             dkk: 27.28331,
//             dot: -3.18678,
//             eos: -25.20198,
//             eth: -46.03523,
//             eur: 27.30739,
//             gbp: 21.30804,
//             hkd: 23.7906,
//             huf: 25.86187,
//             idr: 26.03186,
//             ils: 22.49125,
//             inr: 25.0668,
//             jpy: 30.8591,
//             krw: 28.33314,
//             kwd: 22.36256,
//             lkr: 27.14069,
//             ltc: 22.01994,
//             mmk: 52.39068,
//             mxn: 25.83645,
//             myr: 28.56128,
//             ngn: 31.50431,
//             nok: 28.66046,
//             nzd: 25.45393,
//             php: 30.11804,
//             pkr: 26.48599,
//             pln: 28.42418,
//             rub: 22.06452,
//             sar: 23.30838,
//             sek: 28.30251,
//             sgd: 25.82779,
//             thb: 37.54809,
//             try: 42.47704,
//             twd: 22.89912,
//             uah: 18.02517,
//             usd: 23.35057,
//             vef: 23.35057,
//             vnd: 23.15506,
//             xag: 27.98102,
//             xau: 28.7884,
//             xdr: 24.60668,
//             xlm: 19.43897,
//             xrp: -56.31568,
//             yfi: 24.19089,
//             zar: 20.4022,
//             bits: 0.16777,
//             link: 4.10509,
//             sats: 0.16777
//         },
//         price_change_percentage_1y_in_currency: {
//             aed: 284.89414,
//             ars: 412.44727,
//             aud: 274.52958,
//             bch: 97.59699,
//             bdt: 285.65816,
//             bhd: 284.85787,
//             bmd: 284.87319,
//             bnb: -76.08278,
//             brl: 270.89336,
//             btc: 0,
//             cad: 260.97082,
//             chf: 285.59001,
//             clp: 284.60405,
//             cny: 258.12793,
//             czk: 272.43996,
//             dkk: 285.07902,
//             eos: 149.77311,
//             eth: -53.79087,
//             eur: 285.60436,
//             gbp: 261.92393,
//             hkd: 286.33288,
//             huf: 294.42243,
//             idr: 276.46254,
//             ils: 264.0064,
//             inr: 280.69106,
//             jpy: 300.44554,
//             krw: 270.94543,
//             kwd: 278.60676,
//             lkr: 314.37396,
//             ltc: 40.32669,
//             mmk: 367.23924,
//             mxn: 244.58235,
//             myr: 287.76835,
//             ngn: 309.36977,
//             nok: 278.26738,
//             nzd: 262.56068,
//             php: 297.18434,
//             pkr: 277.67504,
//             pln: 299.84427,
//             rub: 281.4893,
//             sar: 284.85677,
//             sek: 281.15136,
//             sgd: 279.76229,
//             thb: 311.96593,
//             try: 355.25642,
//             twd: 263.7641,
//             uah: 274.64414,
//             usd: 284.87319,
//             vef: -99.99984,
//             vnd: 281.05194,
//             xag: 347.5032,
//             xau: 344.1218,
//             xdr: 281.17631,
//             xlm: 27.69291,
//             xrp: 35.88931,
//             yfi: -52.74918,
//             zar: 219.34031,
//             bits: 0.01705,
//             link: 55.5216,
//             sats: 0.01705
//         },
//         market_cap_change_24h_in_currency: {
//             aed: 127142465519,
//             ars: 3353282133800,
//             aud: 47318137247,
//             bch: -10110942.67519164,
//             bdt: 2946918097897,
//             bhd: 13000986634,
//             bmd: 34613542829,
//             bnb: 6024207,
//             brl: 186452381543,
//             btc: 1044,
//             cad: 43711764000,
//             chf: 31256059175,
//             clp: 27284578502924,
//             cny: 224420366286,
//             czk: 748291365661,
//             dkk: 219633659116,
//             dot: 522778164,
//             eos: -3925849198.2552185,
//             eth: -13012536.532477945,
//             eur: 29426288074,
//             gbp: 24839315416,
//             hkd: 268996671883,
//             huf: 10447368795005,
//             idr: 498180607197442,
//             ils: 111656366458,
//             inr: 2543332143643,
//             jpy: 3802087627510,
//             krw: 39849859717575,
//             kwd: 10368169359,
//             lkr: 6905170818209,
//             ltc: -67777250.75446987,
//             mmk: 56972051371329,
//             mxn: 693800775173,
//             myr: 146034537195,
//             ngn: 14242780603267,
//             nok: 307537093435,
//             nzd: 49295119348,
//             php: 1759716070488,
//             pkr: 6177456900832,
//             pln: 137546904891,
//             rub: 2529035045445,
//             sar: 129775581806,
//             sek: 298652497228,
//             sgd: 46629236648,
//             thb: 1156805854059,
//             try: 296153731301,
//             twd: 963017988588,
//             uah: 1009365797558,
//             usd: 34613542829,
//             vef: 3465854043,
//             vnd: 796775725455296,
//             xag: 1422378469,
//             xau: 19625533,
//             xdr: 24282957904,
//             xlm: -92302008864.57031,
//             xrp: -50110448604.87329,
//             yfi: -159402.5527566038,
//             zar: 507499736114,
//             bits: 49543626189,
//             link: 315643043,
//             sats: 4954362618892
//         },
//         market_cap_change_percentage_24h_in_currency: {
//             aed: 4.306,
//             ars: 4.30571,
//             aud: 4.3301,
//             bch: -0.69962,
//             bdt: 4.31425,
//             bhd: 4.28996,
//             bmd: 4.306,
//             bnb: 0.25652,
//             brl: 4.43204,
//             btc: 0.00556,
//             cad: 4.3326,
//             chf: 4.2498,
//             clp: 4.30608,
//             cny: 4.306,
//             czk: 4.30938,
//             dkk: 4.32151,
//             dot: 1.32827,
//             eos: -2.10971,
//             eth: -4.67639,
//             eur: 4.306,
//             gbp: 4.28748,
//             hkd: 4.30111,
//             huf: 4.31987,
//             idr: 4.306,
//             ils: 4.306,
//             inr: 4.26169,
//             jpy: 4.29088,
//             krw: 4.32614,
//             kwd: 4.28866,
//             lkr: 4.306,
//             ltc: -1.24715,
//             mmk: 4.306,
//             mxn: 4.306,
//             myr: 4.306,
//             ngn: 4.306,
//             nok: 4.30483,
//             nzd: 4.29913,
//             php: 4.32305,
//             pkr: 4.68107,
//             pln: 4.40317,
//             rub: 4.306,
//             sar: 4.30511,
//             sek: 4.28435,
//             sgd: 4.28137,
//             thb: 4.306,
//             try: 4.26854,
//             twd: 4.306,
//             uah: 4.68198,
//             usd: 4.306,
//             vef: 4.306,
//             vnd: 4.30733,
//             xag: 4.306,
//             xau: 4.306,
//             xdr: 4.306,
//             xlm: -3.27313,
//             xrp: -4.64951,
//             yfi: -0.6555,
//             zar: 4.31441,
//             bits: 0.26372,
//             link: 0.93684,
//             sats: 0.26372
//         },
//         total_supply: 21000000,
//         max_supply: 21000000,
//         circulating_supply: 18779462,
//         last_updated: "2021-08-08T00:34:15.029Z"
//     },
//     community_data: {
//         facebook_likes: null,
//         twitter_followers: 3011891,
//         reddit_average_posts_48h: 6.583,
//         reddit_average_comments_48h: 1024.833,
//         reddit_subscribers: 3247673,
//         reddit_accounts_active_48h: 6421,
//         telegram_channel_user_count: null
//     },
//     developer_data: {
//         forks: 29545,
//         stars: 55997,
//         subscribers: 3836,
//         total_issues: 6375,
//         closed_issues: 5769,
//         pull_requests_merged: 8843,
//         pull_request_contributors: 740,
//         code_additions_deletions_4_weeks: {
//             additions: 3133,
//             deletions: -2272
//         },
//         commit_count_4_weeks: 292,
//         last_4_weeks_commit_activity_series: []
//     },
//     public_interest_stats: {
//         alexa_rank: 9440,
//         bing_matches: null
//     },
//     status_updates: [],
//     last_updated: "2021-08-08T00:34:15.029Z",
//     tickers: [
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "Bitfinex",
//                 identifier: "bitfinex",
//                 has_trading_incentive: false
//             },
//             last: 44208,
//             volume: 9452.69031261,
//             converted_last: {
//                 btc: 0.99240737,
//                 eth: 13.978769,
//                 usd: 44208
//             },
//             converted_volume: {
//                 btc: 9381,
//                 eth: 132137,
//                 usd: 417884533
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.022609,
//             timestamp: "2021-08-08T00:32:41+00:00",
//             last_traded_at: "2021-08-08T00:32:41+00:00",
//             last_fetch_at: "2021-08-08T00:32:41+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.bitfinex.com/t/BTCUSD",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "JPY",
//             market: {
//                 name: "Bitfinex",
//                 identifier: "bitfinex",
//                 has_trading_incentive: false
//             },
//             last: 4863399.99999978,
//             volume: 335.85647588,
//             converted_last: {
//                 btc: 0.99057736,
//                 eth: 13.952992,
//                 usd: 44126
//             },
//             converted_volume: {
//                 btc: 332.692,
//                 eth: 4686,
//                 usd: 14820164
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.020521,
//             timestamp: "2021-08-08T00:32:30+00:00",
//             last_traded_at: "2021-08-08T00:32:30+00:00",
//             last_fetch_at: "2021-08-08T00:32:30+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.bitfinex.com/t/BTCJPY",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "EUR",
//             market: {
//                 name: "Bitfinex",
//                 identifier: "bitfinex",
//                 has_trading_incentive: false
//             },
//             last: 37511,
//             volume: 570.86231918,
//             converted_last: {
//                 btc: 0.99050877,
//                 eth: 13.952026,
//                 usd: 44123
//             },
//             converted_volume: {
//                 btc: 565.444,
//                 eth: 7965,
//                 usd: 25188401
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.026596,
//             timestamp: "2021-08-08T00:32:44+00:00",
//             last_traded_at: "2021-08-08T00:32:44+00:00",
//             last_fetch_at: "2021-08-08T00:32:44+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.bitfinex.com/t/BTCEUR",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "GBP",
//             market: {
//                 name: "Bitfinex",
//                 identifier: "bitfinex",
//                 has_trading_incentive: false
//             },
//             last: 31823,
//             volume: 314.05013762,
//             converted_last: {
//                 btc: 0.99138284,
//                 eth: 13.964338,
//                 usd: 44162
//             },
//             converted_volume: {
//                 btc: 311.344,
//                 eth: 4386,
//                 usd: 13869196
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.031377,
//             timestamp: "2021-08-08T00:32:55+00:00",
//             last_traded_at: "2021-08-08T00:32:55+00:00",
//             last_fetch_at: "2021-08-08T00:32:55+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.bitfinex.com/t/BTCGBP",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Binance",
//                 identifier: "binance",
//                 has_trading_incentive: false
//             },
//             last: 44507.91,
//             volume: 72603.08794389972,
//             converted_last: {
//                 btc: 1.000907,
//                 eth: 14.10013,
//                 usd: 44606
//             },
//             converted_volume: {
//                 btc: 72669,
//                 eth: 1023713,
//                 usd: 3238500088
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.010023,
//             timestamp: "2021-08-08T00:27:52+00:00",
//             last_traded_at: "2021-08-08T00:27:52+00:00",
//             last_fetch_at: "2021-08-08T00:27:52+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.binance.com/en/trade/BTC_USDT?ref=37754157",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "FTX.US",
//                 identifier: "ftx_us",
//                 has_trading_incentive: false
//             },
//             last: 44757,
//             volume: 611.4224956744197,
//             converted_last: {
//                 btc: 1.004565,
//                 eth: 14.164954,
//                 usd: 44757
//             },
//             converted_volume: {
//                 btc: 614.214,
//                 eth: 8661,
//                 usd: 27365437
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.09821,
//             timestamp: "2021-08-08T00:24:38+00:00",
//             last_traded_at: "2021-08-08T00:24:38+00:00",
//             last_fetch_at: "2021-08-08T00:24:38+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://ftx.us/trade/BTC/USD",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "FTX.US",
//                 identifier: "ftx_us",
//                 has_trading_incentive: false
//             },
//             last: 44724,
//             volume: 252.79704919282713,
//             converted_last: {
//                 btc: 1.005766,
//                 eth: 14.181888,
//                 usd: 44811
//             },
//             converted_volume: {
//                 btc: 254.255,
//                 eth: 3585,
//                 usd: 11327964
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.062567,
//             timestamp: "2021-08-08T00:24:38+00:00",
//             last_traded_at: "2021-08-08T00:24:38+00:00",
//             last_fetch_at: "2021-08-08T00:24:38+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://ftx.us/trade/BTC/USDT",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "Coinbase Exchange",
//                 identifier: "gdax",
//                 has_trading_incentive: false
//             },
//             last: 44479.76,
//             volume: 19529.18831981,
//             converted_last: {
//                 btc: 0.99776764,
//                 eth: 14.055725,
//                 usd: 44480
//             },
//             converted_volume: {
//                 btc: 19486,
//                 eth: 274497,
//                 usd: 868653609
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.010022,
//             timestamp: "2021-08-08T00:28:03+00:00",
//             last_traded_at: "2021-08-08T00:28:03+00:00",
//             last_fetch_at: "2021-08-08T00:28:03+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://pro.coinbase.com/trade/BTC-USD",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "Coinzoom",
//                 identifier: "coinzoom",
//                 has_trading_incentive: false
//             },
//             last: 44761.22,
//             volume: 39.261903,
//             converted_last: {
//                 btc: 1.00466,
//                 eth: 14.166289,
//                 usd: 44761
//             },
//             converted_volume: {
//                 btc: 39.444853,
//                 eth: 556.195,
//                 usd: 1757411
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.01385,
//             timestamp: "2021-08-08T00:24:37+00:00",
//             last_traded_at: "2021-08-08T00:24:37+00:00",
//             last_fetch_at: "2021-08-08T00:24:37+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://trade.coinzoom.com/landing",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Digifinex",
//                 identifier: "digifinex",
//                 has_trading_incentive: false
//             },
//             last: 44394.17,
//             volume: 6862.67789395,
//             converted_last: {
//                 btc: 0.9974445,
//                 eth: 14.05136,
//                 usd: 44451
//             },
//             converted_volume: {
//                 btc: 6845,
//                 eth: 96430,
//                 usd: 305054661
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.019866,
//             timestamp: "2021-08-08T00:27:56+00:00",
//             last_traded_at: "2021-08-08T00:27:56+00:00",
//             last_fetch_at: "2021-08-08T00:27:56+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.digifinex.com/en-ww/trade/USDT/BTC",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "BUSD",
//             market: {
//                 name: "Binance",
//                 identifier: "binance",
//                 has_trading_incentive: false
//             },
//             last: 44600.22,
//             volume: 20640.49182742356,
//             converted_last: {
//                 btc: 0.99832613,
//                 eth: 14.067884,
//                 usd: 44490
//             },
//             converted_volume: {
//                 btc: 20606,
//                 eth: 290368,
//                 usd: 918293171
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.016546,
//             timestamp: "2021-08-08T00:16:54+00:00",
//             last_traded_at: "2021-08-08T00:16:54+00:00",
//             last_fetch_at: "2021-08-08T00:16:54+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.binance.com/en/trade/BTC_BUSD?ref=37754157",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "binance-usd"
//         },
//         {
//             base: "BTC",
//             target: "USDC",
//             market: {
//                 name: "Serum DEX",
//                 identifier: "serum_dex",
//                 has_trading_incentive: false
//             },
//             last: 44740,
//             volume: 116.1891,
//             converted_last: {
//                 btc: 1.003505,
//                 eth: 14.151716,
//                 usd: 44709
//             },
//             converted_volume: {
//                 btc: 116.596,
//                 eth: 1644,
//                 usd: 5194716
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.017618,
//             timestamp: "2021-08-08T00:23:46+00:00",
//             last_traded_at: "2021-08-08T00:23:46+00:00",
//             last_fetch_at: "2021-08-08T00:23:46+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://dex.projectserum.com",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "usd-coin"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "FTX",
//                 identifier: "ftx_spot",
//                 has_trading_incentive: false
//             },
//             last: 44762,
//             volume: 36577.95916866092,
//             converted_last: {
//                 btc: 1.004677,
//                 eth: 14.166536,
//                 usd: 44762
//             },
//             converted_volume: {
//                 btc: 36749,
//                 eth: 518183,
//                 usd: 1637302608
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.012235,
//             timestamp: "2021-08-08T00:24:36+00:00",
//             last_traded_at: "2021-08-08T00:24:36+00:00",
//             last_fetch_at: "2021-08-08T00:24:36+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://ftx.com/trade/BTC/USD",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Serum DEX",
//                 identifier: "serum_dex",
//                 has_trading_incentive: false
//             },
//             last: 44736.2,
//             volume: 157.0384,
//             converted_last: {
//                 btc: 1.00604,
//                 eth: 14.176589,
//                 usd: 44834
//             },
//             converted_volume: {
//                 btc: 157.987,
//                 eth: 2226,
//                 usd: 7040608
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.026459,
//             timestamp: "2021-08-08T00:16:51+00:00",
//             last_traded_at: "2021-08-08T00:16:51+00:00",
//             last_fetch_at: "2021-08-08T00:23:49+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://dex.projectserum.com",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "Bitcoin.com Exchange",
//                 identifier: "bitcoin_com",
//                 has_trading_incentive: false
//             },
//             last: 44561.89,
//             volume: 36998.49107,
//             converted_last: {
//                 btc: 1.000177,
//                 eth: 14.104938,
//                 usd: 44562
//             },
//             converted_volume: {
//                 btc: 37005,
//                 eth: 521861,
//                 usd: 1648722689
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.017763,
//             timestamp: "2021-08-08T00:22:21+00:00",
//             last_traded_at: "2021-08-08T00:22:21+00:00",
//             last_fetch_at: "2021-08-08T00:22:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.bitcoin.com/exchange/BTC-to-USD",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "FTX",
//                 identifier: "ftx_spot",
//                 has_trading_incentive: false
//             },
//             last: 44730,
//             volume: 3196.506070207914,
//             converted_last: {
//                 btc: 1.005901,
//                 eth: 14.183791,
//                 usd: 44817
//             },
//             converted_volume: {
//                 btc: 3215,
//                 eth: 45339,
//                 usd: 143256278
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.037997,
//             timestamp: "2021-08-08T00:24:35+00:00",
//             last_traded_at: "2021-08-08T00:24:35+00:00",
//             last_fetch_at: "2021-08-08T00:24:35+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://ftx.com/trade/BTC/USDT",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "EUR",
//             market: {
//                 name: "Cryptology",
//                 identifier: "cryptology",
//                 has_trading_incentive: false
//             },
//             last: 37735.84,
//             volume: 271.25481178,
//             converted_last: {
//                 btc: 0.99570702,
//                 eth: 14.026697,
//                 usd: 44388
//             },
//             converted_volume: {
//                 btc: 270.09,
//                 eth: 3805,
//                 usd: 12040431
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.051521,
//             timestamp: "2021-08-08T00:28:19+00:00",
//             last_traded_at: "2021-08-08T00:28:19+00:00",
//             last_fetch_at: "2021-08-08T00:28:19+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 44513.41,
//             volume: 36527.20383,
//             converted_last: {
//                 btc: 1.00103,
//                 eth: 14.101873,
//                 usd: 44611
//             },
//             converted_volume: {
//                 btc: 36565,
//                 eth: 515102,
//                 usd: 1629517065
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.022953,
//             timestamp: "2021-08-08T00:27:14+00:00",
//             last_traded_at: "2021-08-08T00:27:14+00:00",
//             last_fetch_at: "2021-08-08T00:27:14+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/BTC-to-USDT",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Wootrade",
//                 identifier: "wootrade",
//                 has_trading_incentive: false
//             },
//             last: 44411.73,
//             volume: 4268.47809821,
//             converted_last: {
//                 btc: 0.99783904,
//                 eth: 14.056731,
//                 usd: 44483
//             },
//             converted_volume: {
//                 btc: 4259,
//                 eth: 60001,
//                 usd: 189874467
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.016118,
//             timestamp: "2021-08-08T00:28:34+00:00",
//             last_traded_at: "2021-08-08T00:28:34+00:00",
//             last_fetch_at: "2021-08-08T00:28:34+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://x.woo.network/spot",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "Bitfinex",
//                 identifier: "bitfinex",
//                 has_trading_incentive: false
//             },
//             last: 0.070981,
//             volume: 22488.31507732,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.085716,
//                 usd: 44546
//             },
//             converted_volume: {
//                 btc: 1596,
//                 eth: 22484,
//                 usd: 71106601
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.028157,
//             timestamp: "2021-08-08T00:32:57+00:00",
//             last_traded_at: "2021-08-08T00:32:57+00:00",
//             last_fetch_at: "2021-08-08T00:32:57+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.bitfinex.com/t/ETHBTC",
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "OKEx",
//                 identifier: "okex",
//                 has_trading_incentive: false
//             },
//             last: 44623.6,
//             volume: 27366.0585506,
//             converted_last: {
//                 btc: 1.003508,
//                 eth: 14.151766,
//                 usd: 44709
//             },
//             converted_volume: {
//                 btc: 27462,
//                 eth: 387278,
//                 usd: 1223517575
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.010224,
//             timestamp: "2021-08-08T00:23:10+00:00",
//             last_traded_at: "2021-08-08T00:23:10+00:00",
//             last_fetch_at: "2021-08-08T00:23:10+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.okex.com/markets/spot-info/btc-usdt",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "ZB",
//                 identifier: "zb",
//                 has_trading_incentive: false
//             },
//             last: 44313.73,
//             volume: 32674.2283,
//             converted_last: {
//                 btc: 0.99563718,
//                 eth: 14.027725,
//                 usd: 44334
//             },
//             converted_volume: {
//                 btc: 32532,
//                 eth: 458345,
//                 usd: 1448569329
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.047149,
//             timestamp: "2021-08-08T00:34:31+00:00",
//             last_traded_at: "2021-08-08T00:34:31+00:00",
//             last_fetch_at: "2021-08-08T00:34:31+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://trans.zb.com/btcusdt",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "Kraken",
//                 identifier: "kraken",
//                 has_trading_incentive: false
//             },
//             last: 44627.7,
//             volume: 4637.09343668,
//             converted_last: {
//                 btc: 1.001676,
//                 eth: 14.125934,
//                 usd: 44628
//             },
//             converted_volume: {
//                 btc: 4645,
//                 eth: 65503,
//                 usd: 206942815
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.010224,
//             timestamp: "2021-08-08T00:23:02+00:00",
//             last_traded_at: "2021-08-08T00:23:02+00:00",
//             last_fetch_at: "2021-08-08T00:23:02+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://trade.kraken.com/markets/kraken/btc/usd",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "LBank",
//                 identifier: "lbank",
//                 has_trading_incentive: false
//             },
//             last: 0.07110928,
//             volume: 21189.9303,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.087173,
//                 usd: 44579
//             },
//             converted_volume: {
//                 btc: 1507,
//                 eth: 21227,
//                 usd: 67172085
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.419475,
//             timestamp: "2021-08-08T00:28:25+00:00",
//             last_traded_at: "2021-08-08T00:28:25+00:00",
//             last_fetch_at: "2021-08-08T00:28:25+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.lbank.info/exchange/eth/btc",
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "UST",
//             market: {
//                 name: "Bitfinex",
//                 identifier: "bitfinex",
//                 has_trading_incentive: false
//             },
//             last: 44207,
//             volume: 1334.50524231,
//             converted_last: {
//                 btc: 0.99542912,
//                 eth: 14.021332,
//                 usd: 44343
//             },
//             converted_volume: {
//                 btc: 1328,
//                 eth: 18712,
//                 usd: 59175442
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.022599,
//             timestamp: "2021-08-08T00:32:48+00:00",
//             last_traded_at: "2021-08-08T00:32:48+00:00",
//             last_fetch_at: "2021-08-08T00:32:48+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.bitfinex.com/t/BTCUST",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "Bitstamp",
//                 identifier: "bitstamp",
//                 has_trading_incentive: false
//             },
//             last: 44736.07,
//             volume: 4976.56920233,
//             converted_last: {
//                 btc: 1.003812,
//                 eth: 14.154083,
//                 usd: 44736
//             },
//             converted_volume: {
//                 btc: 4996,
//                 eth: 70439,
//                 usd: 222632148
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.067835,
//             timestamp: "2021-08-08T00:25:12+00:00",
//             last_traded_at: "2021-08-08T00:25:12+00:00",
//             last_fetch_at: "2021-08-08T00:25:12+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "Cryptology",
//                 identifier: "cryptology",
//                 has_trading_incentive: false
//             },
//             last: 44725.9,
//             volume: 41.83714129,
//             converted_last: {
//                 btc: 1.003289,
//                 eth: 14.133506,
//                 usd: 44726
//             },
//             converted_volume: {
//                 btc: 41.974745,
//                 eth: 591.305,
//                 usd: 1871204
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.056451,
//             timestamp: "2021-08-08T00:28:19+00:00",
//             last_traded_at: "2021-08-08T00:28:19+00:00",
//             last_fetch_at: "2021-08-08T00:28:19+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "WhiteBIT",
//                 identifier: "whitebit",
//                 has_trading_incentive: false
//             },
//             last: 44569.37,
//             volume: 10112.911461,
//             converted_last: {
//                 btc: 1.002289,
//                 eth: 14.13472,
//                 usd: 44656
//             },
//             converted_volume: {
//                 btc: 10136,
//                 eth: 142943,
//                 usd: 451601984
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.03504,
//             timestamp: "2021-08-08T00:22:05+00:00",
//             last_traded_at: "2021-08-08T00:22:05+00:00",
//             last_fetch_at: "2021-08-08T00:22:05+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://whitebit.com/trade/BTC_USDT",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "Cryptology",
//                 identifier: "cryptology",
//                 has_trading_incentive: false
//             },
//             last: 0.071215,
//             volume: 442.17230784,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.087173,
//                 usd: 44579
//             },
//             converted_volume: {
//                 btc: 31.489301,
//                 eth: 443.595,
//                 usd: 1403770
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.056286,
//             timestamp: "2021-08-08T00:28:19+00:00",
//             last_traded_at: "2021-08-08T00:28:19+00:00",
//             last_fetch_at: "2021-08-08T00:28:19+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "Binance",
//                 identifier: "binance",
//                 has_trading_incentive: false
//             },
//             last: 0.070724,
//             volume: 188353.85256136532,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.093565,
//                 usd: 44564
//             },
//             converted_volume: {
//                 btc: 13321,
//                 eth: 187742,
//                 usd: 593649335
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.035505,
//             timestamp: "2021-08-08T00:17:42+00:00",
//             last_traded_at: "2021-08-08T00:17:42+00:00",
//             last_fetch_at: "2021-08-08T00:17:42+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.binance.com/en/trade/ETH_BTC?ref=37754157",
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Huobi Global",
//                 identifier: "huobi",
//                 has_trading_incentive: false
//             },
//             last: 44737.09,
//             volume: 21985.012737314028,
//             converted_last: {
//                 btc: 1.00606,
//                 eth: 14.186039,
//                 usd: 44824
//             },
//             converted_volume: {
//                 btc: 22118,
//                 eth: 311880,
//                 usd: 985447939
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.010022,
//             timestamp: "2021-08-08T00:24:29+00:00",
//             last_traded_at: "2021-08-08T00:24:29+00:00",
//             last_fetch_at: "2021-08-08T00:24:29+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.huobi.com/en-us/exchange/btc_usdt",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Cryptology",
//                 identifier: "cryptology",
//                 has_trading_incentive: false
//             },
//             last: 44706.45,
//             volume: 29.42618547,
//             converted_last: {
//                 btc: 1.004461,
//                 eth: 14.150012,
//                 usd: 44778
//             },
//             converted_volume: {
//                 btc: 29.557449,
//                 eth: 416.381,
//                 usd: 1317650
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.015784,
//             timestamp: "2021-08-08T00:28:19+00:00",
//             last_traded_at: "2021-08-08T00:28:19+00:00",
//             last_fetch_at: "2021-08-08T00:28:19+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "Currency.com",
//                 identifier: "currency",
//                 has_trading_incentive: false
//             },
//             last: 44811.4,
//             volume: 2394.63263937,
//             converted_last: {
//                 btc: 1.005778,
//                 eth: 14.182274,
//                 usd: 44811
//             },
//             converted_volume: {
//                 btc: 2408,
//                 eth: 33961,
//                 usd: 107306841
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.011233,
//             timestamp: "2021-08-08T00:20:11+00:00",
//             last_traded_at: "2021-08-08T00:20:11+00:00",
//             last_fetch_at: "2021-08-08T00:20:11+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.currency.com/btc-to-usd",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "LBank",
//                 identifier: "lbank",
//                 has_trading_incentive: false
//             },
//             last: 44376.81,
//             volume: 14163.1345,
//             converted_last: {
//                 btc: 0.99705446,
//                 eth: 14.045678,
//                 usd: 44448
//             },
//             converted_volume: {
//                 btc: 14121,
//                 eth: 198931,
//                 usd: 629522533
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.075456,
//             timestamp: "2021-08-08T00:28:27+00:00",
//             last_traded_at: "2021-08-08T00:28:27+00:00",
//             last_fetch_at: "2021-08-08T00:28:27+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.lbank.info/exchange/btc/usdt",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "EUR",
//             market: {
//                 name: "Kraken",
//                 identifier: "kraken",
//                 has_trading_incentive: false
//             },
//             last: 37799.9,
//             volume: 2910.38917865,
//             converted_last: {
//                 btc: 0.99798537,
//                 eth: 14.073882,
//                 usd: 44463
//             },
//             converted_volume: {
//                 btc: 2905,
//                 eth: 40960,
//                 usd: 129405367
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.016668,
//             timestamp: "2021-08-08T00:23:01+00:00",
//             last_traded_at: "2021-08-08T00:23:01+00:00",
//             last_fetch_at: "2021-08-08T00:23:01+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://trade.kraken.com/markets/kraken/btc/eur",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Dex-Trade",
//                 identifier: "dextrade",
//                 has_trading_incentive: false
//             },
//             last: 44599.79,
//             volume: 903.95413314,
//             converted_last: {
//                 btc: 1.002973,
//                 eth: 14.144368,
//                 usd: 44686
//             },
//             converted_volume: {
//                 btc: 906.641,
//                 eth: 12786,
//                 usd: 40394511
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.272768,
//             timestamp: "2021-08-08T00:22:43+00:00",
//             last_traded_at: "2021-08-08T00:22:43+00:00",
//             last_fetch_at: "2021-08-08T00:22:43+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "Digifinex",
//                 identifier: "digifinex",
//                 has_trading_incentive: false
//             },
//             last: 0.071051,
//             volume: 13859.1246,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.08736,
//                 usd: 44565
//             },
//             converted_volume: {
//                 btc: 984.705,
//                 eth: 13872,
//                 usd: 43883505
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.185769,
//             timestamp: "2021-08-08T00:27:56+00:00",
//             last_traded_at: "2021-08-08T00:27:56+00:00",
//             last_fetch_at: "2021-08-08T00:27:56+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.digifinex.com/en-ww/trade/BTC/ETH",
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Coinsbit",
//                 identifier: "coinsbit",
//                 has_trading_incentive: false
//             },
//             last: 44486.26,
//             volume: 18380.3319454,
//             converted_last: {
//                 btc: 1.00042,
//                 eth: 14.084695,
//                 usd: 44560
//             },
//             converted_volume: {
//                 btc: 18388,
//                 eth: 258881,
//                 usd: 819024909
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.07123,
//             timestamp: "2021-08-08T00:08:41+00:00",
//             last_traded_at: "2021-08-08T00:08:41+00:00",
//             last_fetch_at: "2021-08-08T00:08:41+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://coinsbit.io/trade/BTC_USDT",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "JPY",
//             market: {
//                 name: "bitFlyer",
//                 identifier: "bitflyer",
//                 has_trading_incentive: false
//             },
//             last: 4928754,
//             volume: 5215.30823677,
//             converted_last: {
//                 btc: 1.003722,
//                 eth: 14.153069,
//                 usd: 44719
//             },
//             converted_volume: {
//                 btc: 5235,
//                 eth: 73813,
//                 usd: 233225707
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.04905,
//             timestamp: "2021-08-08T00:24:37+00:00",
//             last_traded_at: "2021-08-08T00:24:37+00:00",
//             last_fetch_at: "2021-08-08T00:24:37+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://bitflyer.com/en-jp/ex/simpleex",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Crypto.com Exchange",
//                 identifier: "crypto_com",
//                 has_trading_incentive: false
//             },
//             last: 44409.97,
//             volume: 7788.057972,
//             converted_last: {
//                 btc: 0.99779949,
//                 eth: 14.058191,
//                 usd: 44430
//             },
//             converted_volume: {
//                 btc: 7771,
//                 eth: 109486,
//                 usd: 346023261
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.015469,
//             timestamp: "2021-08-08T00:34:02+00:00",
//             last_traded_at: "2021-08-08T00:34:02+00:00",
//             last_fetch_at: "2021-08-08T00:34:02+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://crypto.com/exchange/trade/spot/BTC_USDT",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "XRP",
//             target: "BTC",
//             market: {
//                 name: "Bitcoin.com Exchange",
//                 identifier: "bitcoin_com",
//                 has_trading_incentive: false
//             },
//             last: 0.000018781,
//             volume: 32305805.7,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102445,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 606.735,
//                 eth: 8556,
//                 usd: 27032494
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.03726,
//             timestamp: "2021-08-08T00:22:21+00:00",
//             last_traded_at: "2021-08-08T00:22:21+00:00",
//             last_fetch_at: "2021-08-08T00:22:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.bitcoin.com/exchange/XRP-to-BTC",
//             token_info_url: null,
//             coin_id: "ripple",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "XRP",
//             target: "BTC",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 0.000018761,
//             volume: 32799183.1,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.08736,
//                 usd: 44565
//             },
//             converted_volume: {
//                 btc: 615.345,
//                 eth: 8669,
//                 usd: 27422959
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.047962,
//             timestamp: "2021-08-08T00:27:27+00:00",
//             last_traded_at: "2021-08-08T00:27:27+00:00",
//             last_fetch_at: "2021-08-08T00:27:27+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/XRP-to-BTC",
//             token_info_url: null,
//             coin_id: "ripple",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "VCC Exchange",
//                 identifier: "vcc",
//                 has_trading_incentive: false
//             },
//             last: 0.070994,
//             volume: 3291.015,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.085716,
//                 usd: 44546
//             },
//             converted_volume: {
//                 btc: 233.642,
//                 eth: 3291,
//                 usd: 10407883
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.011408,
//             timestamp: "2021-08-08T00:32:23+00:00",
//             last_traded_at: "2021-08-08T00:32:23+00:00",
//             last_fetch_at: "2021-08-08T00:32:23+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://vcc.exchange/exchange/basic?currency=btc&coin=eth",
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "FTX.US",
//                 identifier: "ftx_us",
//                 has_trading_incentive: false
//             },
//             last: 0.0712225,
//             volume: 1192.777950085998,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.100584,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 84.953,
//                 eth: 1198,
//                 usd: 3784946
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.066692,
//             timestamp: "2021-08-08T00:24:38+00:00",
//             last_traded_at: "2021-08-08T00:24:38+00:00",
//             last_fetch_at: "2021-08-08T00:24:38+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://ftx.us/trade/ETH/BTC",
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "EUR",
//             market: {
//                 name: "Bitstamp",
//                 identifier: "bitstamp",
//                 has_trading_incentive: false
//             },
//             last: 37955.51,
//             volume: 1423.2771411,
//             converted_last: {
//                 btc: 1.001947,
//                 eth: 14.117669,
//                 usd: 44646
//             },
//             converted_volume: {
//                 btc: 1426,
//                 eth: 20093,
//                 usd: 63544048
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.058392,
//             timestamp: "2021-08-08T00:13:35+00:00",
//             last_traded_at: "2021-08-08T00:13:35+00:00",
//             last_fetch_at: "2021-08-08T00:13:35+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDC",
//             market: {
//                 name: "Bitcoin.com Exchange",
//                 identifier: "bitcoin_com",
//                 has_trading_incentive: false
//             },
//             last: 44610.06935,
//             volume: 1907.67381,
//             converted_last: {
//                 btc: 1.00059,
//                 eth: 14.11077,
//                 usd: 44580
//             },
//             converted_volume: {
//                 btc: 1909,
//                 eth: 26919,
//                 usd: 85044700
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.036053,
//             timestamp: "2021-08-08T00:22:21+00:00",
//             last_traded_at: "2021-08-08T00:22:21+00:00",
//             last_fetch_at: "2021-08-08T00:22:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.bitcoin.com/exchange/BTC-to-USDC",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "usd-coin"
//         },
//         {
//             base: "BTC",
//             target: "USDC",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 44609.6297,
//             volume: 1933.43721,
//             converted_last: {
//                 btc: 1.00058,
//                 eth: 14.095538,
//                 usd: 44591
//             },
//             converted_volume: {
//                 btc: 1935,
//                 eth: 27253,
//                 usd: 86213923
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.057723,
//             timestamp: "2021-08-08T00:27:13+00:00",
//             last_traded_at: "2021-08-08T00:27:13+00:00",
//             last_fetch_at: "2021-08-08T00:27:13+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/BTC-to-USDC",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "usd-coin"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "eToroX",
//                 identifier: "etorox",
//                 has_trading_incentive: false
//             },
//             last: 44742.02,
//             volume: 217.29347,
//             converted_last: {
//                 btc: 1.003984,
//                 eth: 14.149718,
//                 usd: 44742
//             },
//             converted_volume: {
//                 btc: 218.159,
//                 eth: 3075,
//                 usd: 9722149
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.136337,
//             timestamp: "2021-08-08T00:17:03+00:00",
//             last_traded_at: "2021-08-08T00:17:03+00:00",
//             last_fetch_at: "2021-08-08T00:24:35+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.etorox.com/xchange#",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "ADA",
//             target: "BTC",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 0.000033122,
//             volume: 11285797,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.100327,
//                 usd: 44566
//             },
//             converted_volume: {
//                 btc: 373.808,
//                 eth: 5271,
//                 usd: 16659197
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.05124,
//             timestamp: "2021-08-08T00:25:50+00:00",
//             last_traded_at: "2021-08-08T00:25:50+00:00",
//             last_fetch_at: "2021-08-08T00:25:50+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/ADA-to-BTC",
//             token_info_url: null,
//             coin_id: "cardano",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "JPY",
//             market: {
//                 name: "GMO Japan",
//                 identifier: "gmo_japan",
//                 has_trading_incentive: false
//             },
//             last: 4910442,
//             volume: 598.8091,
//             converted_last: {
//                 btc: 0.99998469,
//                 eth: 14.100588,
//                 usd: 44553
//             },
//             converted_volume: {
//                 btc: 598.8,
//                 eth: 8444,
//                 usd: 26678922
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.018117,
//             timestamp: "2021-08-08T00:20:09+00:00",
//             last_traded_at: "2021-08-08T00:20:09+00:00",
//             last_fetch_at: "2021-08-08T00:20:09+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://coin.z.com/jp/corp/information/btc-market/",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "EUR",
//             market: {
//                 name: "B2BX",
//                 identifier: "b2bx",
//                 has_trading_incentive: false
//             },
//             last: 37768.32,
//             volume: 115.2664,
//             converted_last: {
//                 btc: 0.99712691,
//                 eth: 14.061902,
//                 usd: 44426
//             },
//             converted_volume: {
//                 btc: 114.935,
//                 eth: 1621,
//                 usd: 5120837
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.050813,
//             timestamp: "2021-08-08T00:21:33+00:00",
//             last_traded_at: "2021-08-08T00:21:33+00:00",
//             last_fetch_at: "2021-08-08T00:21:33+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "EOS",
//             target: "BTC",
//             market: {
//                 name: "Bitcoin.com Exchange",
//                 identifier: "bitcoin_com",
//                 has_trading_incentive: false
//             },
//             last: 0.00010382,
//             volume: 4962432.1,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102445,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 515.2,
//                 eth: 7266,
//                 usd: 22954214
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.076739,
//             timestamp: "2021-08-08T00:22:21+00:00",
//             last_traded_at: "2021-08-08T00:22:21+00:00",
//             last_fetch_at: "2021-08-08T00:22:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.bitcoin.com/exchange/EOS-to-BTC",
//             token_info_url: null,
//             coin_id: "eos",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "Gemini",
//                 identifier: "gemini",
//                 has_trading_incentive: false
//             },
//             last: 44637.86,
//             volume: 3192.9822890657,
//             converted_last: {
//                 btc: 1.001904,
//                 eth: 14.12915,
//                 usd: 44638
//             },
//             converted_volume: {
//                 btc: 3199,
//                 eth: 45114,
//                 usd: 142527896
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.032572,
//             timestamp: "2021-08-08T00:23:08+00:00",
//             last_traded_at: "2021-08-08T00:23:08+00:00",
//             last_fetch_at: "2021-08-08T00:23:08+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "EUR",
//             market: {
//                 name: "Coinbase Exchange",
//                 identifier: "gdax",
//                 has_trading_incentive: false
//             },
//             last: 37664.26,
//             volume: 2231.42556161,
//             converted_last: {
//                 btc: 0.9938183,
//                 eth: 14.00009,
//                 usd: 44304
//             },
//             converted_volume: {
//                 btc: 2218,
//                 eth: 31240,
//                 usd: 98860412
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.022618,
//             timestamp: "2021-08-08T00:28:12+00:00",
//             last_traded_at: "2021-08-08T00:28:12+00:00",
//             last_fetch_at: "2021-08-08T00:28:12+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://pro.coinbase.com/trade/BTC-EUR",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "LTC",
//             target: "BTC",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 0.0035135,
//             volume: 99292.778,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.095376,
//                 usd: 44565
//             },
//             converted_volume: {
//                 btc: 348.865,
//                 eth: 4917,
//                 usd: 15547227
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.076846,
//             timestamp: "2021-08-08T00:26:42+00:00",
//             last_traded_at: "2021-08-08T00:26:42+00:00",
//             last_fetch_at: "2021-08-08T00:26:42+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/LTC-to-BTC",
//             token_info_url: null,
//             coin_id: "litecoin",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "EOS",
//             target: "BTC",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 0.00010406,
//             volume: 4907999.87,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.095376,
//                 usd: 44565
//             },
//             converted_volume: {
//                 btc: 510.726,
//                 eth: 7199,
//                 usd: 22760598
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.096052,
//             timestamp: "2021-08-08T00:26:52+00:00",
//             last_traded_at: "2021-08-08T00:26:52+00:00",
//             last_fetch_at: "2021-08-08T00:26:52+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/EOS-to-BTC",
//             token_info_url: null,
//             coin_id: "eos",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "UAH",
//             market: {
//                 name: "WhiteBIT",
//                 identifier: "whitebit",
//                 has_trading_incentive: false
//             },
//             last: 1219098.19,
//             volume: 13.05287,
//             converted_last: {
//                 btc: 1.016581,
//                 eth: 14.33628,
//                 usd: 45293
//             },
//             converted_volume: {
//                 btc: 13.269301,
//                 eth: 187.13,
//                 usd: 591201
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.025028,
//             timestamp: "2021-08-08T00:22:05+00:00",
//             last_traded_at: "2021-08-08T00:22:05+00:00",
//             last_fetch_at: "2021-08-08T00:22:05+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://whitebit.com/trade/BTC_UAH",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "LTC",
//             target: "BTC",
//             market: {
//                 name: "Bitcoin.com Exchange",
//                 identifier: "bitcoin_com",
//                 has_trading_incentive: false
//             },
//             last: 0.0035233,
//             volume: 98742.173,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102445,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 347.898,
//                 eth: 4906,
//                 usd: 15500265
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.059525,
//             timestamp: "2021-08-08T00:22:21+00:00",
//             last_traded_at: "2021-08-08T00:22:21+00:00",
//             last_fetch_at: "2021-08-08T00:22:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.bitcoin.com/exchange/LTC-to-BTC",
//             token_info_url: null,
//             coin_id: "litecoin",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "Bitcoin.com Exchange",
//                 identifier: "bitcoin_com",
//                 has_trading_incentive: false
//             },
//             last: 0.070984,
//             volume: 48389.361,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102445,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 3435,
//                 eth: 48440,
//                 usd: 153037262
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.018449,
//             timestamp: "2021-08-08T00:22:21+00:00",
//             last_traded_at: "2021-08-08T00:22:21+00:00",
//             last_fetch_at: "2021-08-08T00:22:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.bitcoin.com/exchange/ETH-to-BTC",
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "Coinbase Exchange",
//                 identifier: "gdax",
//                 has_trading_incentive: false
//             },
//             last: 0.07097,
//             volume: 30573.3192547,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.087173,
//                 usd: 44579
//             },
//             converted_volume: {
//                 btc: 2170,
//                 eth: 30566,
//                 usd: 96727601
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.014088,
//             timestamp: "2021-08-08T00:28:07+00:00",
//             last_traded_at: "2021-08-08T00:28:07+00:00",
//             last_fetch_at: "2021-08-08T00:28:07+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://pro.coinbase.com/trade/ETH-BTC",
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "ADA",
//             target: "BTC",
//             market: {
//                 name: "Bitcoin.com Exchange",
//                 identifier: "bitcoin_com",
//                 has_trading_incentive: false
//             },
//             last: 0.000033109,
//             volume: 11307656,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102445,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 374.385,
//                 eth: 5280,
//                 usd: 16680362
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.036218,
//             timestamp: "2021-08-08T00:22:21+00:00",
//             last_traded_at: "2021-08-08T00:22:21+00:00",
//             last_fetch_at: "2021-08-08T00:22:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.bitcoin.com/exchange/ADA-to-BTC",
//             token_info_url: null,
//             coin_id: "cardano",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDC",
//             market: {
//                 name: "Binance",
//                 identifier: "binance",
//                 has_trading_incentive: false
//             },
//             last: 44536.72,
//             volume: 3466.7743626689157,
//             converted_last: {
//                 btc: 0.99894513,
//                 eth: 14.0725,
//                 usd: 44518
//             },
//             converted_volume: {
//                 btc: 3463,
//                 eth: 48786,
//                 usd: 154334323
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.035117,
//             timestamp: "2021-08-08T00:27:48+00:00",
//             last_traded_at: "2021-08-08T00:27:48+00:00",
//             last_fetch_at: "2021-08-08T00:27:48+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.binance.com/en/trade/BTC_USDC?ref=37754157",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "usd-coin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "BKEX",
//                 identifier: "bkex",
//                 has_trading_incentive: false
//             },
//             last: 44373.25,
//             volume: 6452.7118,
//             converted_last: {
//                 btc: 0.99697447,
//                 eth: 14.042635,
//                 usd: 44425
//             },
//             converted_volume: {
//                 btc: 6433,
//                 eth: 90613,
//                 usd: 286659586
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.013386,
//             timestamp: "2021-08-08T00:29:18+00:00",
//             last_traded_at: "2021-08-08T00:29:18+00:00",
//             last_fetch_at: "2021-08-08T00:29:18+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.bkex.com/#/trade/BTC_USDT",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 0.071156,
//             volume: 48408.5272,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.100327,
//                 usd: 44566
//             },
//             converted_volume: {
//                 btc: 3445,
//                 eth: 48569,
//                 usd: 153510710
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.012647,
//             timestamp: "2021-08-08T00:25:15+00:00",
//             last_traded_at: "2021-08-08T00:25:15+00:00",
//             last_fetch_at: "2021-08-08T00:25:15+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/ETH-to-BTC",
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "KRW",
//             market: {
//                 name: "Upbit",
//                 identifier: "upbit",
//                 has_trading_incentive: false
//             },
//             last: 50779000,
//             volume: 11338.73780104,
//             converted_last: {
//                 btc: 0.99427344,
//                 eth: 14.003839,
//                 usd: 44304
//             },
//             converted_volume: {
//                 btc: 11274,
//                 eth: 158786,
//                 usd: 502354982
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.035448,
//             timestamp: "2021-08-08T00:30:24+00:00",
//             last_traded_at: "2021-08-08T00:30:24+00:00",
//             last_fetch_at: "2021-08-08T00:30:24+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://upbit.com/exchange?code=CRIX.UPBIT.KRW-BTC",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Hoo.com",
//                 identifier: "hoo",
//                 has_trading_incentive: false
//             },
//             last: 44398.56,
//             volume: 9379.487011839421,
//             converted_last: {
//                 btc: 1.000979,
//                 eth: 14.135018,
//                 usd: 44462
//             },
//             converted_volume: {
//                 btc: 9389,
//                 eth: 132579,
//                 usd: 417031978
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.015494,
//             timestamp: "2021-08-07T23:49:15+00:00",
//             last_traded_at: "2021-08-07T23:49:15+00:00",
//             last_fetch_at: "2021-08-07T23:49:15+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hoo.com/spot/btc-usdt",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "Binance US",
//                 identifier: "binance_us",
//                 has_trading_incentive: false
//             },
//             last: 44765.5,
//             volume: 2694.8084825122023,
//             converted_last: {
//                 btc: 1.004756,
//                 eth: 14.167644,
//                 usd: 44766
//             },
//             converted_volume: {
//                 btc: 2708,
//                 eth: 38179,
//                 usd: 120634449
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.043066,
//             timestamp: "2021-08-08T00:24:09+00:00",
//             last_traded_at: "2021-08-08T00:24:09+00:00",
//             last_fetch_at: "2021-08-08T00:24:09+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.binance.us/en/trade/BTC_USD",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "EUR",
//             market: {
//                 name: "Binance",
//                 identifier: "binance",
//                 has_trading_incentive: false
//             },
//             last: 38399.66,
//             volume: 3441.2972733830875,
//             converted_last: {
//                 btc: 1.01356,
//                 eth: 14.284668,
//                 usd: 45169
//             },
//             converted_volume: {
//                 btc: 3488,
//                 eth: 49158,
//                 usd: 155439053
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.024774,
//             timestamp: "2021-08-08T00:17:43+00:00",
//             last_traded_at: "2021-08-08T00:17:43+00:00",
//             last_fetch_at: "2021-08-08T00:17:43+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.binance.com/en/trade/BTC_EUR?ref=37754157",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "KuCoin",
//                 identifier: "kucoin",
//                 has_trading_incentive: false
//             },
//             last: 44734.3,
//             volume: 8446.23650857,
//             converted_last: {
//                 btc: 1.005998,
//                 eth: 14.185154,
//                 usd: 44821
//             },
//             converted_volume: {
//                 btc: 8497,
//                 eth: 119811,
//                 usd: 378567317
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.013802,
//             timestamp: "2021-08-08T00:24:57+00:00",
//             last_traded_at: "2021-08-08T00:24:57+00:00",
//             last_fetch_at: "2021-08-08T00:24:57+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.kucoin.com/trade/BTC-USDT",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "WBTC",
//             target: "BTC",
//             market: {
//                 name: "Binance",
//                 identifier: "binance",
//                 has_trading_incentive: false
//             },
//             last: 1,
//             volume: 529.60492188,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.093565,
//                 usd: 44564
//             },
//             converted_volume: {
//                 btc: 529.605,
//                 eth: 7464,
//                 usd: 23601558
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.011,
//             timestamp: "2021-08-08T00:17:17+00:00",
//             last_traded_at: "2021-08-08T00:17:17+00:00",
//             last_fetch_at: "2021-08-08T00:17:17+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.binance.com/en/trade/WBTC_BTC?ref=37754157",
//             token_info_url: null,
//             coin_id: "wrapped-bitcoin",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "WAVES",
//             target: "BTC",
//             market: {
//                 name: "Waves.Exchange",
//                 identifier: "waves",
//                 has_trading_incentive: false
//             },
//             last: 0.0003918,
//             volume: 25692.85553431,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102293,
//                 usd: 44553
//             },
//             converted_volume: {
//                 btc: 10.066461,
//                 eth: 141.96,
//                 usd: 448491
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.140277,
//             timestamp: "2021-08-08T00:23:03+00:00",
//             last_traded_at: "2021-08-08T00:23:03+00:00",
//             last_fetch_at: "2021-08-08T00:23:03+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "waves",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "BiKi",
//                 identifier: "biki",
//                 has_trading_incentive: false
//             },
//             last: 44389.14,
//             volume: 4411.08657076,
//             converted_last: {
//                 btc: 0.99733149,
//                 eth: 14.051532,
//                 usd: 44411
//             },
//             converted_volume: {
//                 btc: 4399,
//                 eth: 61983,
//                 usd: 195902205
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.020063,
//             timestamp: "2021-08-08T00:33:59+00:00",
//             last_traded_at: "2021-08-08T00:33:59+00:00",
//             last_fetch_at: "2021-08-08T00:33:59+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.biki.com/trade/BTC_USDT",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Bitrue",
//                 identifier: "bitrue",
//                 has_trading_incentive: false
//             },
//             last: 44736.6,
//             volume: 9804.7086,
//             converted_last: {
//                 btc: 1.006049,
//                 eth: 14.185884,
//                 usd: 44823
//             },
//             converted_volume: {
//                 btc: 9864,
//                 eth: 139088,
//                 usd: 439477756
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.03882,
//             timestamp: "2021-08-08T00:24:40+00:00",
//             last_traded_at: "2021-08-08T00:24:40+00:00",
//             last_fetch_at: "2021-08-08T00:24:40+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.bitrue.com/trading?market=usdt&symbol=btcusdt",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "BTSE",
//                 identifier: "btse",
//                 has_trading_incentive: false
//             },
//             last: 44740.5,
//             volume: 1625.4930539958814,
//             converted_last: {
//                 btc: 1.004195,
//                 eth: 14.159732,
//                 usd: 44741
//             },
//             converted_volume: {
//                 btc: 1632,
//                 eth: 23017,
//                 usd: 72725372
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.053629,
//             timestamp: "2021-08-08T00:24:39+00:00",
//             last_traded_at: "2021-08-08T00:24:39+00:00",
//             last_fetch_at: "2021-08-08T00:24:39+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.btse.com/en/trading/BTC-USD",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDC",
//             market: {
//                 name: "B2BX",
//                 identifier: "b2bx",
//                 has_trading_incentive: false
//             },
//             last: 44607.050259,
//             volume: 11.838056,
//             converted_last: {
//                 btc: 1.000523,
//                 eth: 14.109789,
//                 usd: 44577
//             },
//             converted_volume: {
//                 btc: 11.844243,
//                 eth: 167.032,
//                 usd: 527710
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.069085,
//             timestamp: "2021-08-08T00:21:30+00:00",
//             last_traded_at: "2021-08-08T00:21:30+00:00",
//             last_fetch_at: "2021-08-08T00:21:30+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "usd-coin"
//         },
//         {
//             base: "BTC",
//             target: "USDC",
//             market: {
//                 name: "Coinbase Exchange",
//                 identifier: "gdax",
//                 has_trading_incentive: false
//             },
//             last: 44438.68,
//             volume: 935.50362286,
//             converted_last: {
//                 btc: 0.99779867,
//                 eth: 14.056162,
//                 usd: 44481
//             },
//             converted_volume: {
//                 btc: 933.444,
//                 eth: 13150,
//                 usd: 41612271
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.044542,
//             timestamp: "2021-08-08T00:28:18+00:00",
//             last_traded_at: "2021-08-08T00:28:18+00:00",
//             last_fetch_at: "2021-08-08T00:28:18+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://pro.coinbase.com/trade/BTC-USDC",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "usd-coin"
//         },
//         {
//             base: "BTC",
//             target: "JPY",
//             market: {
//                 name: "Bitbank",
//                 identifier: "bitbank",
//                 has_trading_incentive: false
//             },
//             last: 4925000,
//             volume: 908.774,
//             converted_last: {
//                 btc: 1.002958,
//                 eth: 14.142289,
//                 usd: 44685
//             },
//             converted_volume: {
//                 btc: 911.462,
//                 eth: 12852,
//                 usd: 40608918
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.01002,
//             timestamp: "2021-08-08T00:24:49+00:00",
//             last_traded_at: "2021-08-08T00:24:49+00:00",
//             last_fetch_at: "2021-08-08T00:24:49+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://bitbank.cc/app/trade/BTC_JPY",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "JPY",
//             market: {
//                 name: "Coincheck",
//                 identifier: "coincheck",
//                 has_trading_incentive: false
//             },
//             last: 4896535,
//             volume: 4024.56522594,
//             converted_last: {
//                 btc: 0.99690287,
//                 eth: 14.04373,
//                 usd: 44427
//             },
//             converted_volume: {
//                 btc: 4012,
//                 eth: 56520,
//                 usd: 178799841
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.033475,
//             timestamp: "2021-08-08T00:27:57+00:00",
//             last_traded_at: "2021-08-08T00:27:57+00:00",
//             last_fetch_at: "2021-08-08T00:27:57+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "JPY",
//             market: {
//                 name: "Liquid",
//                 identifier: "quoine",
//                 has_trading_incentive: false
//             },
//             last: 4884063,
//             volume: 3322.7942971,
//             converted_last: {
//                 btc: 0.99519392,
//                 eth: 14.02148,
//                 usd: 44314
//             },
//             converted_volume: {
//                 btc: 3307,
//                 eth: 46590,
//                 usd: 147246171
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.037098,
//             timestamp: "2021-08-08T00:34:21+00:00",
//             last_traded_at: "2021-08-08T00:34:21+00:00",
//             last_fetch_at: "2021-08-08T00:34:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://app.liquid.com/exchange/BTCJPY?lang=en",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BCH",
//             target: "BTC",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 0.013177,
//             volume: 29093.8425,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.100584,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 383.37,
//                 eth: 5406,
//                 usd: 17080499
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.037954,
//             timestamp: "2021-08-08T00:24:49+00:00",
//             last_traded_at: "2021-08-08T00:24:49+00:00",
//             last_fetch_at: "2021-08-08T00:24:49+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/BCH-to-BTC",
//             token_info_url: null,
//             coin_id: "bitcoin-cash",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Coineal",
//                 identifier: "coineal",
//                 has_trading_incentive: false
//             },
//             last: 44365.76,
//             volume: 961.70799,
//             converted_last: {
//                 btc: 0.99680619,
//                 eth: 14.044131,
//                 usd: 44388
//             },
//             converted_volume: {
//                 btc: 958.636,
//                 eth: 13506,
//                 usd: 42688231
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.123074,
//             timestamp: "2021-08-08T00:33:57+00:00",
//             last_traded_at: "2021-08-08T00:33:57+00:00",
//             last_fetch_at: "2021-08-08T00:33:57+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "LINK",
//             target: "BTC",
//             market: {
//                 name: "Bitcoin.com Exchange",
//                 identifier: "bitcoin_com",
//                 has_trading_incentive: false
//             },
//             last: 0.00055389,
//             volume: 88165.51,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102445,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 48.833994,
//                 eth: 688.679,
//                 usd: 2175750
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.039642,
//             timestamp: "2021-08-08T00:22:22+00:00",
//             last_traded_at: "2021-08-08T00:22:22+00:00",
//             last_fetch_at: "2021-08-08T00:22:22+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.bitcoin.com/exchange/LINK-to-BTC",
//             token_info_url: null,
//             coin_id: "chainlink",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "Kraken",
//                 identifier: "kraken",
//                 has_trading_incentive: false
//             },
//             last: 44612.8,
//             volume: 466.30699574,
//             converted_last: {
//                 btc: 1.003265,
//                 eth: 14.148341,
//                 usd: 44698
//             },
//             converted_volume: {
//                 btc: 467.83,
//                 eth: 6597,
//                 usd: 20843218
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.015253,
//             timestamp: "2021-08-08T00:23:02+00:00",
//             last_traded_at: "2021-08-08T00:23:02+00:00",
//             last_fetch_at: "2021-08-08T00:23:02+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://trade.kraken.com/markets/kraken/btc/usdt",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "LINK",
//             target: "BTC",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 0.00055503,
//             volume: 88466.25,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.100327,
//                 usd: 44566
//             },
//             converted_volume: {
//                 btc: 49.101423,
//                 eth: 692.346,
//                 usd: 2188262
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.081088,
//             timestamp: "2021-08-08T00:25:45+00:00",
//             last_traded_at: "2021-08-08T00:25:45+00:00",
//             last_fetch_at: "2021-08-08T00:25:45+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/LINK-to-BTC",
//             token_info_url: null,
//             coin_id: "chainlink",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BCH",
//             target: "BTC",
//             market: {
//                 name: "Bitcoin.com Exchange",
//                 identifier: "bitcoin_com",
//                 has_trading_incentive: false
//             },
//             last: 0.013194,
//             volume: 29074.5449,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102445,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 383.61,
//                 eth: 5410,
//                 usd: 17091345
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.068177,
//             timestamp: "2021-08-08T00:22:21+00:00",
//             last_traded_at: "2021-08-08T00:22:21+00:00",
//             last_fetch_at: "2021-08-08T00:22:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.bitcoin.com/exchange/BCH-to-BTC",
//             token_info_url: null,
//             coin_id: "bitcoin-cash",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "B2BX",
//                 identifier: "b2bx",
//                 has_trading_incentive: false
//             },
//             last: 44733.792932,
//             volume: 134.03503595,
//             converted_last: {
//                 btc: 1.004136,
//                 eth: 14.143954,
//                 usd: 44734
//             },
//             converted_volume: {
//                 btc: 134.589,
//                 eth: 1896,
//                 usd: 5995896
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.024712,
//             timestamp: "2021-08-08T00:12:47+00:00",
//             last_traded_at: "2021-08-08T00:12:47+00:00",
//             last_fetch_at: "2021-08-08T00:12:47+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "AlterDice",
//                 identifier: "alterdice",
//                 has_trading_incentive: false
//             },
//             last: 0.071289,
//             volume: 1194.74020936,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.100327,
//                 usd: 44566
//             },
//             converted_volume: {
//                 btc: 85.172,
//                 eth: 1201,
//                 usd: 3795782
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.237426,
//             timestamp: "2021-08-08T00:25:16+00:00",
//             last_traded_at: "2021-08-08T00:25:16+00:00",
//             last_fetch_at: "2021-08-08T00:25:16+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "Coinsbit",
//                 identifier: "coinsbit",
//                 has_trading_incentive: false
//             },
//             last: 0.070983,
//             volume: 56652.2071323,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.078787,
//                 usd: 44541
//             },
//             converted_volume: {
//                 btc: 4021,
//                 eth: 56616,
//                 usd: 179115322
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.011417,
//             timestamp: "2021-08-08T00:08:42+00:00",
//             last_traded_at: "2021-08-08T00:08:42+00:00",
//             last_fetch_at: "2021-08-08T00:08:42+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://coinsbit.io/trade/ETH_BTC",
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "HIT",
//             target: "BTC",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 0.000005674,
//             volume: 2300415.2,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.100584,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 13.052556,
//                 eth: 184.049,
//                 usd: 581539
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.193833,
//             timestamp: "2021-08-08T00:24:56+00:00",
//             last_traded_at: "2021-08-08T00:24:56+00:00",
//             last_fetch_at: "2021-08-08T00:24:56+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/HIT-to-BTC",
//             token_info_url: null,
//             coin_id: "hitbtc-token",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "TRX",
//             target: "BTC",
//             market: {
//                 name: "Bitcoin.com Exchange",
//                 identifier: "bitcoin_com",
//                 has_trading_incentive: false
//             },
//             last: 0.0000016936,
//             volume: 156684858,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102445,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 265.361,
//                 eth: 3742,
//                 usd: 11822919
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.117758,
//             timestamp: "2021-08-08T00:22:21+00:00",
//             last_traded_at: "2021-08-08T00:22:21+00:00",
//             last_fetch_at: "2021-08-08T00:22:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.bitcoin.com/exchange/TRX-to-BTC",
//             token_info_url: null,
//             coin_id: "tron",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "XMR",
//             target: "BTC",
//             market: {
//                 name: "Bitcoin.com Exchange",
//                 identifier: "bitcoin_com",
//                 has_trading_incentive: false
//             },
//             last: 0.006093,
//             volume: 48509.422,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102445,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 295.568,
//                 eth: 4168,
//                 usd: 13168737
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.114585,
//             timestamp: "2021-08-08T00:22:21+00:00",
//             last_traded_at: "2021-08-08T00:22:21+00:00",
//             last_fetch_at: "2021-08-08T00:22:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.bitcoin.com/exchange/XMR-to-BTC",
//             token_info_url: null,
//             coin_id: "monero",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "LTC",
//             target: "BTC",
//             market: {
//                 name: "Bitfinex",
//                 identifier: "bitfinex",
//                 has_trading_incentive: false
//             },
//             last: 0.0035098,
//             volume: 3866.80728725,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.085716,
//                 usd: 44546
//             },
//             converted_volume: {
//                 btc: 13.57172,
//                 eth: 191.167,
//                 usd: 604569
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.14241,
//             timestamp: "2021-08-08T00:32:36+00:00",
//             last_traded_at: "2021-08-08T00:32:36+00:00",
//             last_fetch_at: "2021-08-08T00:32:36+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.bitfinex.com/t/LTCBTC",
//             token_info_url: null,
//             coin_id: "litecoin",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "LTC",
//             target: "BTC",
//             market: {
//                 name: "B2BX",
//                 identifier: "b2bx",
//                 has_trading_incentive: false
//             },
//             last: 0.00352652,
//             volume: 777.56577252,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102419,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 2.742101,
//                 eth: 38.670261,
//                 usd: 122172
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.224896,
//             timestamp: "2021-08-08T00:21:30+00:00",
//             last_traded_at: "2021-08-08T00:21:30+00:00",
//             last_fetch_at: "2021-08-08T00:21:30+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "litecoin",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "ETH",
//             target: "BTC",
//             market: {
//                 name: "Dex-Trade",
//                 identifier: "dextrade",
//                 has_trading_incentive: false
//             },
//             last: 0.071014,
//             volume: 3456.04431725,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.102445,
//                 usd: 44554
//             },
//             converted_volume: {
//                 btc: 245.428,
//                 eth: 3461,
//                 usd: 10934782
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.133686,
//             timestamp: "2021-08-08T00:22:43+00:00",
//             last_traded_at: "2021-08-08T00:22:43+00:00",
//             last_fetch_at: "2021-08-08T00:22:43+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "ethereum",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "EUR",
//             market: {
//                 name: "Currency.com",
//                 identifier: "currency",
//                 has_trading_incentive: false
//             },
//             last: 38050.05,
//             volume: 60.748,
//             converted_last: {
//                 btc: 1.004568,
//                 eth: 14.165214,
//                 usd: 44757
//             },
//             converted_volume: {
//                 btc: 61.025,
//                 eth: 860.508,
//                 usd: 2718929
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.011451,
//             timestamp: "2021-08-08T00:20:11+00:00",
//             last_traded_at: "2021-08-08T00:20:11+00:00",
//             last_fetch_at: "2021-08-08T00:20:11+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://exchange.currency.com/btc-to-eur",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USDT",
//             market: {
//                 name: "CoinTiger",
//                 identifier: "cointiger",
//                 has_trading_incentive: false
//             },
//             last: 44415.35,
//             volume: 2266.02132298,
//             converted_last: {
//                 btc: 0.99882499,
//                 eth: 14.070807,
//                 usd: 44513
//             },
//             converted_volume: {
//                 btc: 2263,
//                 eth: 31885,
//                 usd: 100866906
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.012072,
//             timestamp: "2021-08-08T00:27:50+00:00",
//             last_traded_at: "2021-08-08T00:27:50+00:00",
//             last_fetch_at: "2021-08-08T00:27:50+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: null,
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether"
//         },
//         {
//             base: "TRX",
//             target: "BTC",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 0.0000016971,
//             volume: 156709727,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.100327,
//                 usd: 44566
//             },
//             converted_volume: {
//                 btc: 265.952,
//                 eth: 3750,
//                 usd: 11852465
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.182396,
//             timestamp: "2021-08-08T00:25:37+00:00",
//             last_traded_at: "2021-08-08T00:25:37+00:00",
//             last_fetch_at: "2021-08-08T00:25:37+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/TRX-to-BTC",
//             token_info_url: null,
//             coin_id: "tron",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "USD",
//             market: {
//                 name: "Liquid",
//                 identifier: "quoine",
//                 has_trading_incentive: false
//             },
//             last: 44384.34,
//             volume: 62.93974704,
//             converted_last: {
//                 btc: 0.99677452,
//                 eth: 14.04375,
//                 usd: 44384
//             },
//             converted_volume: {
//                 btc: 62.737,
//                 eth: 883.91,
//                 usd: 2793539
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.123335,
//             timestamp: "2021-08-08T00:34:21+00:00",
//             last_traded_at: "2021-08-08T00:34:21+00:00",
//             last_fetch_at: "2021-08-08T00:34:21+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://app.liquid.com/exchange/BTCUSD?lang=en",
//             token_info_url: null,
//             coin_id: "bitcoin"
//         },
//         {
//             base: "XMR",
//             target: "BTC",
//             market: {
//                 name: "HitBTC",
//                 identifier: "hitbtc",
//                 has_trading_incentive: false
//             },
//             last: 0.006117,
//             volume: 48545.079,
//             converted_last: {
//                 btc: 1,
//                 eth: 14.100327,
//                 usd: 44566
//             },
//             converted_volume: {
//                 btc: 296.95,
//                 eth: 4187,
//                 usd: 13233934
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.147107,
//             timestamp: "2021-08-08T00:25:02+00:00",
//             last_traded_at: "2021-08-08T00:25:02+00:00",
//             last_fetch_at: "2021-08-08T00:25:02+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://hitbtc.com/XMR-to-BTC",
//             token_info_url: null,
//             coin_id: "monero",
//             target_coin_id: "bitcoin"
//         },
//         {
//             base: "BTC",
//             target: "EUT",
//             market: {
//                 name: "Bitfinex",
//                 identifier: "bitfinex",
//                 has_trading_incentive: false
//             },
//             last: 37838,
//             volume: 78.5379288,
//             converted_last: {
//                 btc: 1.000106,
//                 eth: 14.088662,
//                 usd: 44584
//             },
//             converted_volume: {
//                 btc: 78.546,
//                 eth: 1106,
//                 usd: 3501534
//             },
//             trust_score: "green",
//             bid_ask_spread_percentage: 0.106695,
//             timestamp: "2021-08-08T00:28:48+00:00",
//             last_traded_at: "2021-08-08T00:28:48+00:00",
//             last_fetch_at: "2021-08-08T00:32:54+00:00",
//             is_anomaly: false,
//             is_stale: false,
//             trade_url: "https://www.bitfinex.com/t/BTCEUT",
//             token_info_url: null,
//             coin_id: "bitcoin",
//             target_coin_id: "tether-eurt"
//         }
//     ]
//   };
