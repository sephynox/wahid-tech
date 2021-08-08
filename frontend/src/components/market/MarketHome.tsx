import React from 'react';
import { MarketContext } from '../../pages/Market';
import MarketList from './MarketList';

const MarketHome: React.FunctionComponent = (): JSX.Element => {
    const marketContext = React.useContext(MarketContext);
    const listData = marketContext.cryptoMarket.result ?? [];

    const title = 'Markets';

    return (
        <section className="container">
            <div className="title">
                <h2>{title}</h2>
                <MarketList data={listData} />
            </div>
            <div className="space-bottom"></div>
        </section>
    );
};

export default MarketHome;
