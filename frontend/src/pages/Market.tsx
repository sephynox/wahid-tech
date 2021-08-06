import React, { createContext, Dispatch, useEffect, useReducer } from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import * as Constants from '../Constants';
import { coinGeckoReducer, CoinGeckoState, fetchCryptoMarketData, initialCoinGeckoState } from '../actions/CoinGecko';
import MarketProfile from '../components/MarketProfile';
import MarketList from '../components/MarketList';

//import StockChart from '../components/StockChart';
//import * as Constants from '../Constants';
//import Web3Provider, { Web3ReactProvider } from '@web3-react/core';
//import CandleStickChart from '../components/CandleStickChart';
//import { Symfoni } from "./hardhat/SymfoniContext";

export const MarketContext = createContext<{
    cryptoMarket: CoinGeckoState;
    dispatchCryptoMarket: Dispatch<CoinGeckoState>;
}>({
    cryptoMarket: initialCoinGeckoState,
    dispatchCryptoMarket: () => undefined,
});

const Market = (): JSX.Element => {
    const localCoinGeckoState = JSON.parse(localStorage.getItem('cryptoMarket') ?? '{}');
    const [cryptoMarket, dispatchCryptoMarket] = useReducer(coinGeckoReducer, localCoinGeckoState || initialCoinGeckoState);

    const title = 'Markets';

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

    useEffect(() => {
        // Initial fetch
        fetchStoreData();
        // Refresh every minute
        const timer = setInterval(() => {
            fetchStoreData();
        }, 60000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="blog" className="d-flex flex-column">
            <MarketContext.Provider value={{ cryptoMarket, dispatchCryptoMarket }}>
                <Router history={useHistory()}>
                    <div className="margin-auto-vertical">
                        <Switch>
                            <Route
                                path={Constants.SITE_MARKET_PATH_BASE + '*'}
                                render={() => <MarketProfile />}
                            />
                            <Route path="*">
                                <div className="container">
                                    <div className="section-title">
                                        <h2>{title}</h2>
                                        <MarketList data={cryptoMarket.result ?? localCoinGeckoState ?? []} />
                                    </div>
                                </div>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </MarketContext.Provider>
        </section >
    );
};

export default Market;
