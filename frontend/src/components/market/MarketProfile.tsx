import React from 'react';
import * as Constants from '../../Constants';
//import StockChart from '../StockChart';
import { MarketContext } from '../../pages/Market';
import { MarketType } from '../../tools/MarketData';
import { Breadcrumbs } from '../../layout/Navigation';
import LoaderContent from '../../tools/LoaderContent';
import { AssetStates } from '../../actions/Assets';

type Props = {
    type: MarketType,
    id: string,
};

const MarketProfile = ({ type, id }: Props): JSX.Element => {
    const marketContext = React.useContext(MarketContext);

    return (
        <div className="container">
            <Breadcrumbs links={[
                { text: 'markets', class: 'capitalize', path: Constants.SITE_MARKET_PATH_BASE },
                { text: `${type} /`, path: '', class: 'capitalize', active: true }
            ]} />
            <section>
                {marketContext.assetData.type !== AssetStates.ERROR &&
                    marketContext.assetData.data &&
                    marketContext.assetData.data[id]
                    ? <>
                        <div className="title">
                            <h2>{marketContext.assetData.data[id]?.name}</h2>
                            <p></p>
                        </div>
                        {/* <StockChart title="Test" /> */}
                    </>
                    : marketContext.assetData.type === AssetStates.ERROR
                        ? "Error"
                        : <LoaderContent type="profile" />
                }
            </section>
        </div>
    );
};

export default MarketProfile;
