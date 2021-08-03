import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import CoinGecko from '../actions/CoinGecko';
import { EMPTY, ERROR, FETCHING, reducer, SUCCESS } from '../actions/External';
import StockChart from '../components/StockChart';
import Table, { Column } from '../components/Table';
import { formatPercent, formatPrice } from '../utils/data-formatters';

//import * as Constants from '../Constants';
//import Web3Provider, { Web3ReactProvider } from '@web3-react/core';
//import CandleStickChart from '../components/CandleStickChart';
//import { Symfoni } from "./hardhat/SymfoniContext";

type MarketData = {
    key: string;
    name: string;
    ticker: string;
    price: number;
    delta: number;
    delta7?: number;
    delta30?: number;
    deltaY?: number;
    cap?: number;
};

const Market = (): JSX.Element => {
    const [cryptoPrices] = useState(() => JSON.parse(localStorage.getItem('cryptoPrices') ?? '{}') || {});
    const [{ status }, dispatch] = useReducer(reducer, { status: EMPTY });

    const title = 'Markets';

    const formatName = (row: MarketData): JSX.Element => {
        return (<span>{row.name} <span className="color grey">({row.ticker})</span></span>);
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

    const fetchCoinData = (coin: string) => async (): Promise<void> => {
        dispatch({ type: FETCHING });
        CoinGecko.get(`coins/${coin}`).then(
            (result) => dispatch({ type: SUCCESS, result: result.data }),
            (error) => dispatch({ type: ERROR, error: error }),
        );
    }

    const marketColumns: Array<Column<MarketData>> = [
        { key: 'name', dataField: 'name', text: 'Name', formatter: (c: string, r: MarketData) => formatName(r) },
        { key: 'price', dataField: 'price', text: 'Price', formatter: (c: number) => formatPrice(c) },
        { key: 'delta', dataField: 'delta', text: '1D', formatter: (c: number) => formatPercentSym(c) },
        { key: 'delta7', dataField: 'delta7', text: '7D', formatter: (c: number) => formatPercentSym(c) },
        { key: 'delta30', dataField: 'delta30', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: '30D', formatter: (c: number) => formatPercentSym(c) },
        { key: 'deltaY', dataField: 'deltaY', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: '1Y', formatter: (c: number) => formatPercentSym(c) },
        { key: 'cap', dataField: 'cap', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: 'Market Cap', formatter: (c: number) => formatPrice(c) },
    ];

    const cryptoData: Array<MarketData> = [
        { key: 'bitcoin', name: 'Bitcoin', ticker: 'BTC', price: 100000, cap: 738680149000, delta: -3.4 },
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

    useEffect(() => {
        fetchCoinData('bitcoin')
        console.log(status);
    }, [cryptoPrices]);

    return (
        <section id="blog" className="d-flex flex-column">
            <MarketContext.Provider value={[]}>
                <Router history={useHistory()}>
                    <div className="margin-auto-vertical">
                        <Switch>
                            <Route path="*">
                                <div className="container">
                                    <div className="section-title">
                                        <h2>{title}</h2>
                                        <Table data={cryptoData} columns={marketColumns} />
                                        <StockChart title="Test" />
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

export const MarketContext = createContext([] as Array<MarketData>);

export default Market;
