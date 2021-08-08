import React from 'react';
import * as Constants from '../../Constants';
import StockChart from '../StockChart';
import { MarketContext } from '../../pages/Market';
import LoaderSpinner from '../../tools/LoaderSpinner';
import { MarketData, MarketType } from '../../tools/MarketData';

const MarketProfile: React.FunctionComponent = (): JSX.Element => {
    const marketContext = React.useContext(MarketContext);

    const assetPath = window.location.pathname.replace(Constants.SITE_MARKET_PATH_BASE, '').split('/');
    const assetType = assetPath[0];
    const assetKey = assetPath[1];

    let assetMarketData: MarketData | null = null;

    switch (assetType) {
        case MarketType.CRYPTO:
            assetMarketData = marketContext.cryptoMarket.result?.filter((c) => c.key === assetKey).pop() ?? null;
            break;
        default:
            assetMarketData = null;
    }

    return (
        <>
            {typeof assetMarketData !== undefined ? (
                <div className="container">
                    <h2>{assetMarketData?.name}</h2>
                    <p></p>
                    <StockChart title="Test" />
                </div>
            ) : (<LoaderSpinner />)}
        </>
    );
};

export default MarketProfile;
