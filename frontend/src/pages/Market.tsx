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
    dispatchAssetData: (type: MarketType, asset: string) => void,
}>({
    cryptoMarket: initialCoinGeckoState,
    assetData: {},
    dispatchCryptoMarket: () => undefined,
    dispatchAssetData: () => null
});

const Market = (): JSX.Element => {
    const localCoinGeckoState = JSON.parse(localStorage.getItem('cryptoMarket') ?? '[]');
    const [cryptoMarket, dispatchCryptoMarket] = useReducer(coinGeckoReducer, localCoinGeckoState || initialCoinGeckoState);
    const [assetData, setAssetData] = useState(JSON.parse(localStorage.getItem('assetData') ?? '{}') as Record<string, MarketData>);

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

    const fetchStoreData = (): void => {
        fetchCryptoMarketData()(dispatchCryptoMarket);
    };

    const dispatchAssetData = (type: MarketType, key: string): void => {
        switch (type) {
            case MarketType.CRYPTO:
                fetchCoinData(key)((x) => {
                    const coin = x.result?.pop();
                    if (coin?.key !== undefined) {
                        setAssetData({ ...assetData, [coin.key]: coin });
                    }
                });
                break;
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

    useEffect(() => {
        localStorage.setItem('assetData', JSON.stringify(assetData));
    }, [assetData]);

    return (
        <Router history={useHistory()}>
            <MarketContext.Provider value={{ cryptoMarket, assetData, dispatchCryptoMarket, dispatchAssetData }}>
                <Switch>
                    <Route path={Constants.SITE_MARKET_ASSET_PATH + '*'} render={() => <MarketProfile type={assetType} key={assetKey} />} />
                    <Route path="*" component={MarketHome} />
                </Switch>
            </MarketContext.Provider>
        </Router>
    );
};

export default Market;
