import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import * as Constants from '../../Constants';
import i18next, { i18nNamespace } from '../../services/i18n';
import StockChart from '../StockChart';
import { Breadcrumbs } from '../../layout/Navigation';
import { MarketContext } from '../../pages/Market';
import LoaderContent from '../../tools/LoaderContent';
import { MarketPriceData, MarketType } from '../../tools/MarketData';
import ReadMore from '../../tools/ReadMore';
import { formatFirstUpper, formatPrice } from '../../utils/data-formatters';
import { AssetStates } from '../../actions/AssetState';
import StyledPercentage from '../../tools/StyledPercentage';

const MarketProfile = (): JSX.Element => {
    const { type, id } = useParams<{ type: MarketType, id: string }>();
    const { t } = useTranslation();
    const marketContext = useContext(MarketContext);
    const assetData = marketContext.assetData?.data ? marketContext.assetData?.data[type][id] : undefined;

    return (
        <Container>
            <Breadcrumbs links={[
                { text: 'markets', class: 'capitalize', path: Constants.SITE_MARKET_PATH_BASE },
                { text: `${t(type)} /`, path: '', class: 'capitalize', active: true }
            ]} />

            {marketContext.assetData.type !== AssetStates.ERROR && assetData !== undefined
                ? <>
                    <Row>
                        <Col>
                            <section>
                                <div className="title">
                                    <h2>{assetData.name}</h2>
                                </div>
                                <StockChart
                                    symbol="$" //TODO
                                    height={500}
                                    title={formatFirstUpper(t('market_data'))}
                                    dataSet={assetData.prices ?? {} as MarketPriceData}
                                />
                            </section>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={{ span: 12, order: 2 }} md={{ span: 12, order: 2 }} lg={{ span: 6, order: 1 }} xl={{ span: 6, order: 1 }}>
                            <section>
                                <h3 className="capitalize">{t('about')} {assetData.name}</h3>
                                <ReadMore
                                    text={t(i18nNamespace.EXTERNAL + ':' + id + '_description')}
                                    charactersMax={300}
                                />
                            </section>
                        </Col>
                        <Col xs={{ span: 12, order: 1 }} md={{ span: 12, order: 1 }} lg={{ span: 6, order: 2 }} xl={{ span: 6, order: 2 }}>
                            <section>
                                <h3 className="capitalize">{t('statistics')}</h3>
                                <dl className="dl-horizontal dl-auto">
                                    <dt className="capitalize">{t('price')}:</dt>
                                    <dd className="text-right">{formatPrice(assetData.price ?? 0, Constants.DEFAULT_PRICE_PLACES, i18next.language)}</dd>
                                    <dt className="capitalize">1D {t('change')}:</dt>
                                    <dd className="text-right">{StyledPercentage(assetData.delta1, i18next.language)}</dd>
                                    <dt className="capitalize">7D {t('change')}:</dt>
                                    <dd className="text-right">{StyledPercentage(assetData.delta7, i18next.language)}</dd>
                                    <dt className="capitalize">30D {t('change')}:</dt>
                                    <dd className="text-right">{StyledPercentage(assetData.delta30, i18next.language)}</dd>
                                    <dt className="capitalize">YTD {t('change')}:</dt>
                                    <dd className="text-right">{StyledPercentage(assetData.deltaY, i18next.language)}</dd>
                                    <dt className="capitalize">{t('market_capitalization')}:</dt>
                                    <dd className="text-right">{formatPrice(assetData.cap ?? 0, Constants.DEFAULT_PRICE_PLACES, i18next.language)}</dd>
                                </dl>
                            </section>
                        </Col>
                    </Row>
                </>
                : marketContext.assetData.type === AssetStates.ERROR
                    ? 'Error'
                    : <LoaderContent type="profile" />
            }
            <div className="space-bottom text-right capitalize">{marketContext.marketDataByline(type)}</div>
        </Container>
    );
};

export default MarketProfile;
