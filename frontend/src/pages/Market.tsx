import React, { createContext, Dispatch, useEffect, useReducer } from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import { coinGeckoReducer, CoinGeckoState, fetchCryptoMarketData, initialCoinGeckoState } from '../actions/CoinGecko';
import Table, { Column } from '../components/Table';
import { MarketData } from '../tools/MarketData';
import { formatPercent, formatPrice } from '../utils/data-formatters';

//import StockChart from '../components/StockChart';
//import * as Constants from '../Constants';
//import Web3Provider, { Web3ReactProvider } from '@web3-react/core';
//import CandleStickChart from '../components/CandleStickChart';
//import { Symfoni } from "./hardhat/SymfoniContext";

const MarketContext = createContext<{
    cryptoMarket: CoinGeckoState;
    dispatchCryptoMarket: Dispatch<CoinGeckoState>;
}>({
    cryptoMarket: initialCoinGeckoState,
    dispatchCryptoMarket: () => undefined,
});

const Market = (): JSX.Element => {
    const title = 'Markets';

    const [cryptoMarket, dispatchCryptoMarket] = useReducer(coinGeckoReducer, initialCoinGeckoState);

    const marketColumns: Array<Column<MarketData>> = [
        { key: 'name', dataField: 'name', text: 'Name', formatter: (c: string, r: MarketData) => formatName(r) },
        { key: 'price', dataField: 'price', text: 'Price', formatter: (c: number) => formatPrice(c) },
        { key: 'delta1', dataField: 'delta1', text: '1D', formatter: (c: number) => formatPercentSym(c) },
        { key: 'delta7', dataField: 'delta7', text: '7D', formatter: (c: number) => formatPercentSym(c) },
        { key: 'delta30', dataField: 'delta30', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: '30D', formatter: (c: number) => formatPercentSym(c) },
        { key: 'deltaY', dataField: 'deltaY', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: '1Y', formatter: (c: number) => formatPercentSym(c) },
        { key: 'cap', dataField: 'cap', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: 'Market Cap', formatter: (c: number) => formatPrice(c) },
    ];

    // function getLibrary(provider) {
    //     return new Web3Provider(provider);
    // }

    // <Web3ReactProvider getLibrary={getLibrary}>
    // <section id="market" className="d-flex flex-column">
    //     Hello World!
    //     {/* <CandleStickChart width="100%" data={{}} ratio="1.0" /> */}
    //     </section>
    // </Web3ReactProvider>

    const formatName = (row: MarketData): JSX.Element => {
        return (<a href={row.path}><span>{row.name} <span className="color grey">({row.ticker.toUpperCase()})</span></span></a>);
    };

    const formatPercentSym = (percent?: number): JSX.Element => {
        if (!percent) {
            return (<span className="color grey">-</span>);
        }

        const ret = formatPercent(percent);
        const sign = percent < 0 ? 'bi bi-arrow-down-short' : 'bi bi-arrow-up-short';
        const color = percent < 0 ? 'color red' : 'color green';

        return (
            <span className={color}>{ret} <i className={sign}></i></span>
        );
    };

    useEffect(() => {
        fetchCryptoMarketData()(dispatchCryptoMarket);
    }, []);

    return (
        <section id="blog" className="d-flex flex-column">
            <MarketContext.Provider value={{ cryptoMarket, dispatchCryptoMarket }}>
                <Router history={useHistory()}>
                    <div className="margin-auto-vertical">
                        <Switch>
                            <Route path="*">
                                <div className="container">
                                    <div className="section-title">
                                        <h2>{title}</h2>
                                        <Table data={cryptoMarket.result ?? []} columns={marketColumns} />
                                        {/* <StockChart title="Test" /> */}
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
