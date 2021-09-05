import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import MarketList from './MarketList';
import { Section } from '../../styles/Section';
import { MarketContext } from '../../pages/Market';
import IconButton from '../../tools/IconButton';
import { MarketType } from '../../tools/MarketData';
import { useState } from 'react';

const MarketHome: React.FunctionComponent = (): JSX.Element => {
    const marketContext = React.useContext(MarketContext);
    const [marketType] = useState(MarketType.CRYPTO);
    const { t } = useTranslation();

    const title = t('markets');
    const listData = Object.values(marketContext.assetData.data ? marketContext.assetData.data[marketType] : {} ?? {});

    const refreshData = () => {
        marketContext.refreshData(marketType, marketContext.dispatchAssetData);
    };

    return (
        <>
            <Section>
                <header>
                    <h1>{title}</h1>
                </header>
                <Row>
                    <Col className="text-right d-none d-md-block d-xl-block d-lg-block">
                        <IconButton
                            title={t('refresh')}
                            onClick={refreshData}
                            icon="bi-arrow-repeat"
                            size={30}></IconButton>
                    </Col>
                </Row>
                <MarketList data={listData} />
                <div className="text-right">{marketContext.marketDataByline(marketType)}</div>
            </Section>
        </>
    );
};

export default MarketHome;
