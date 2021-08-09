import React from 'react';
import { useTranslation } from 'react-i18next';
import { MarketContext } from '../../pages/Market';
import MarketList from './MarketList';

const MarketHome: React.FunctionComponent = (): JSX.Element => {
    const marketContext = React.useContext(MarketContext);
    const { t } = useTranslation();

    const title = t('markets');
    const listData = marketContext.cryptoMarket.result ?? [];

    return (
        <section className="container">
            <div className="title">
                <h2 className="capitalize">{title}</h2>
                <MarketList data={listData} />
            </div>
            <div className="space-bottom"></div>
        </section>
    );
};

export default MarketHome;
