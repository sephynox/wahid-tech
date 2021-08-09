import React, { createContext, Dispatch, SetStateAction, useEffect, useReducer, useState } from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import * as Constants from '../Constants';
import { coinGeckoReducer, CoinGeckoState, CoinGeckoStates, fetchCryptoMarketData, initialCoinGeckoState } from '../actions/CoinGecko';
import { AssetState, assetReducer, initialAssetState, fetchAssetData, AssetStates, fetchAssetPriceData } from '../actions/Assets';
import MarketHome from '../components/market/MarketHome';
import MarketProfile from '../components/market/MarketProfile';
import { MarketType } from '../tools/MarketData';

//import StockChart from '../components/StockChart';
//import * as Constants from '../Constants';
//import Web3Provider, { Web3ReactProvider } from '@web3-react/core';
//import CandleStickChart from '../components/CandleStickChart';
//import { Symfoni } from "./hardhat/SymfoniContext";

export const MarketContext = createContext<{
    cryptoMarket: CoinGeckoState;
    assetData: AssetState,
    setDateStart: Dispatch<SetStateAction<number>>,
    dispatchCryptoMarket: Dispatch<CoinGeckoState>,
    dispatchAssetData: Dispatch<AssetState>,
}>({
    cryptoMarket: initialCoinGeckoState,
    assetData: initialAssetState,
    setDateStart: () => undefined,
    dispatchCryptoMarket: () => undefined,
    dispatchAssetData: () => undefined
});

const Market = (): JSX.Element => {
    const defaultStart: number = Math.floor(new Date(new Date().setDate(new Date().getDate() - 5)).getTime() / 1000);
    const localCoinGeckoState: CoinGeckoState = JSON.parse(localStorage.getItem('cryptoMarket') ?? '{}');
    const localAssetState: AssetState = JSON.parse(localStorage.getItem('assetData') ?? '{}');
    const [cryptoMarket, dispatchCryptoMarket] = useReducer(coinGeckoReducer, localCoinGeckoState || initialCoinGeckoState);
    const [assetData, dispatchAssetData] = useReducer(assetReducer, localAssetState || initialAssetState);
    const [dateStart, setDateStart] = useState(defaultStart);

    const assetPath = window.location.pathname.replace(Constants.SITE_MARKET_ASSET_PATH, '').split('/');
    const assetType = assetPath[0] as MarketType;
    const assetKey = assetPath[1];

    // TODO Retrieve data from ChainLink
    // function getLibrary(provider) {
    //     return new Web3Provider(provider);
    // }

    // <Web3ReactProvider getLibrary={getLibrary}>
    // <section id="market" className="d-flex flex-column">
    //     Hello World!
    //     {/* <CandleStickChart width="100%" data={{}} ratio="1.0" /> */}
    //     </section>
    // </Web3ReactProvider>

    const fetchCryptoMarketStoreData = (): void => {
        fetchCryptoMarketData()(dispatchCryptoMarket);
    };

    useEffect(() => {
        // Initial fetch
        if (localCoinGeckoState.type === CoinGeckoStates.EMPTY && cryptoMarket.type !== CoinGeckoStates.FETCHING) {
            fetchCryptoMarketStoreData();
        }

        // Refresh every minute
        // TODO use sockets
        const timer = setInterval(() => {
            fetchCryptoMarketStoreData();
        }, 60000);

        return () => clearTimeout(timer);
    }, [localCoinGeckoState, cryptoMarket]);

    useEffect(() => {
        if (assetType && assetKey && assetData.type !== AssetStates.ERROR && assetData.type !== AssetStates.FETCHING) {
            if (!assetData.data || assetData.data[assetKey] === undefined) {
                fetchAssetData(assetType, assetKey)(dispatchAssetData);
            }

            if (assetData.data && assetData.data[assetKey] && !assetData.data[assetKey].price_history) {
                fetchAssetPriceData(assetType, assetKey, dateStart)(dispatchAssetData);
            }
        }
    }, [assetType, assetKey, assetData, dateStart]);

    useEffect(() => {
        localStorage.setItem('cryptoMarket', JSON.stringify(cryptoMarket));
    }, [cryptoMarket]);

    useEffect(() => {
        localStorage.setItem('assetData', JSON.stringify(assetData));
    }, [assetData]);

    useEffect(() => {
        localStorage.setItem('dateStart', dateStart.toString());
    }, [dateStart]);

    return (
        <Router history={useHistory()}>
            <MarketContext.Provider value={{ cryptoMarket, assetData, setDateStart, dispatchCryptoMarket, dispatchAssetData }}>
                <Switch>
                    <Route
                        path={Constants.SITE_MARKET_ASSET_PATH + '*'}
                        render={() => <MarketProfile type={assetType} id={assetKey} />}
                    />
                    <Route path="*" component={MarketHome} />
                </Switch>
            </MarketContext.Provider>
        </Router>
    );
};

export default Market;
