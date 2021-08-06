import React from 'react';
import StockChart from '../components/StockChart';
import { MarketContext } from '../pages/Market';


const MarketProfile: React.FunctionComponent = () => {
    const marketContext = React.useContext(MarketContext);
    const assetData = marketContext.cryptoMarket;

    return (
        <div className="container">
            <h2>{assetData.result?.pop()?.name}</h2>
            <StockChart title="Test" />
        </div>
    );
};

export default MarketProfile;
