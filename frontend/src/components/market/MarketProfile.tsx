import React from 'react';
import * as Constants from '../../Constants';
import StockChart from '../StockChart';
import { MarketContext } from '../../pages/Market';
import { MarketType } from '../../tools/MarketData';
import { Breadcrumbs } from '../../layout/Navigation';
import { useEffect } from 'react';
import LoaderContent from '../../tools/LoaderContent';

type Props = {
    type: MarketType,
    key: string,
};

const MarketProfile: React.FunctionComponent<Props> = ({ type, key }: Props): JSX.Element => {
    const marketContext = React.useContext(MarketContext);

    useEffect(() => {
        marketContext.dispatchAssetData(type, key);
    }, [marketContext, type, key]);

    return (
        <div className="container">
            <Breadcrumbs links={[{ text: 'Market', path: Constants.SITE_MARKET_PATH_BASE }, { text: `${type} /`, path: '', class: 'capitalize', active: true }]} />
            <section>
                {typeof marketContext.assetData[key] !== undefined ? (
                    <>
                        <div className="title">
                            <h2>{marketContext.assetData[key]?.name}</h2>
                            <p></p>
                        </div>
                        <StockChart title="Test" />
                    </>
                ) : (<LoaderContent />)}
            </section>
        </div>
    );
};

export default MarketProfile;
