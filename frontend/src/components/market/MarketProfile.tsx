import React from 'react';
import * as Constants from '../../Constants';
import StockChart from '../StockChart';
import { MarketContext } from '../../pages/Market';
import { PriceData } from '../../tools/MarketData';
import { Breadcrumbs } from '../../layout/Navigation';
import LoaderContent from '../../tools/LoaderContent';
import { AssetStates } from '../../actions/Assets';
import { useTranslation } from 'react-i18next';
import { i18nNamespace } from '../../services/i18n';
import ReadMore from '../../tools/ReadMore';
import { formatFirstUpper } from '../../utils/data-formatters';
import { useParams } from 'react-router-dom';

const MarketProfile = (): JSX.Element => {
    const { type, id } = useParams<{ type: string, id: string }>();
    const marketContext = React.useContext(MarketContext);
    const { t } = useTranslation();

    return (
        <div className="container">
            <Breadcrumbs links={[
                { text: 'markets', class: 'capitalize', path: Constants.SITE_MARKET_PATH_BASE },
                { text: `${type} /`, path: '', class: 'capitalize', active: true }
            ]} />

            {marketContext.assetData.type !== AssetStates.ERROR &&
                marketContext.assetData.data &&
                marketContext.assetData.data[id]
                ? <>
                    <section>
                        <div className="title">
                            <h2>{marketContext.assetData.data[id]?.name}</h2>
                        </div>
                        <StockChart
                            title={formatFirstUpper(t('market_data'))}
                            dataSet={marketContext.assetData.data[id].prices ?? {} as PriceData}
                        />
                    </section>
                    <section>
                        <ReadMore
                            text={t(i18nNamespace.EXTERNAL + ':' + id + '_description')}
                            charactersMax={100}
                        />
                    </section>
                </>
                : marketContext.assetData.type === AssetStates.ERROR
                    ? "Error"
                    : <LoaderContent type="profile" />
            }

        </div>
    );
};

export default MarketProfile;
