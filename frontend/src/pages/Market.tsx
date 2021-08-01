import React from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
//import * as Constants from '../Constants';

//import Web3Provider, { Web3ReactProvider } from '@web3-react/core';
//import CandleStickChart from '../components/CandleStickChart';
//import { Symfoni } from "./hardhat/SymfoniContext";

const Market = (): JSX.Element => {
    // function getLibrary(provider) {
    //     return new Web3Provider(provider);
    // }

    // <Web3ReactProvider getLibrary={getLibrary}>
    // <section id="market" className="d-flex flex-column">
    //     Hello World!
    //     {/* <CandleStickChart width="100%" data={{}} ratio="1.0" /> */}
    //     </section>
    // </Web3ReactProvider>
    return (
        <section id="blog" className="d-flex flex-column">
            <Router history={useHistory()}>
                <div className="margin-auto-vertical">
                    <Switch>
                        <Route path="*">
                            <div className="container">
                                Hello World!
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </section>
    );
};

export default Market;
