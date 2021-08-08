import React, { createContext, Dispatch, useEffect, useReducer, useState } from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import * as Constants from '../Constants';
import { coinGeckoReducer, CoinGeckoState, fetchCoinData, fetchCryptoMarketData, initialCoinGeckoState } from '../actions/CoinGecko';
import MarketHome from '../components/market/MarketHome';
import MarketProfile from '../components/market/MarketProfile';
import { MarketData, MarketType } from '../tools/MarketData';

//import StockChart from '../components/StockChart';
//import * as Constants from '../Constants';
//import Web3Provider, { Web3ReactProvider } from '@web3-react/core';
//import CandleStickChart from '../components/CandleStickChart';
//import { Symfoni } from "./hardhat/SymfoniContext";

export const MarketContext = createContext<{
    cryptoMarket: CoinGeckoState;
    assetData: Record<string, MarketData>,
    dispatchCryptoMarket: Dispatch<CoinGeckoState>,
    fetchAssetData: (type: MarketType, asset: string) => MarketData | null,
}>({
    cryptoMarket: initialCoinGeckoState,
    assetData: {},
    dispatchCryptoMarket: () => undefined,
    fetchAssetData: () => null
});

const Market = (): JSX.Element => {
    const localCoinGeckoState = JSON.parse(localStorage.getItem('cryptoMarket') ?? '[]');
    const [cryptoMarket, dispatchCryptoMarket] = useReducer(coinGeckoReducer, localCoinGeckoState || initialCoinGeckoState);
    const [assetData, setAssetData] = useState(JSON.parse(localStorage.getItem('assetData') ?? '{}'));

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

    const fetchStoreData = (): void => {
        fetchCryptoMarketData()(dispatchCryptoMarket);
    };

    const fetchAssetData = (type: MarketType, asset: string): MarketData | null => {
        if (assetData[asset] !== undefined) {
            return assetData[asset];
        }

        switch (type) {
            case MarketType.CRYPTO:
                fetchCoinData(asset)(setAssetData);
                return assetData[asset] ?? null;
            default:
                return null;
        }
    };

    useEffect(() => {
        // Initial fetch
        if (localCoinGeckoState === []) {
            fetchStoreData();
        }

        // Refresh every minute
        const timer = setInterval(() => {
            fetchStoreData();
        }, 60000);

        return () => clearTimeout(timer);
    }, [localCoinGeckoState]);

    useEffect(() => {
        localStorage.setItem('cryptoMarket', JSON.stringify(cryptoMarket));
    }, [cryptoMarket]);

    return (
        <MarketContext.Provider value={{ cryptoMarket, assetData, dispatchCryptoMarket, fetchAssetData }}>
            <Router history={useHistory()}>
                <Switch>
                    <Route path={Constants.SITE_MARKET_PATH_BASE + '*'} render={() => <MarketProfile />} />
                    <Route path="*" component={MarketHome} />
                </Switch>
            </Router>
        </MarketContext.Provider>
    );
};

export default Market;
