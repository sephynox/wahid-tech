import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import * as Constants from "../../Constants";
import i18next, { i18nNamespace } from "../../services/i18n";
import { AssetStates } from "../../actions/AssetState";
import { Section } from "../../styles/Section";
import { DefinitionList } from "../../styles/DefinitionList";
import HorizontalRule from "../../styles/HorizontalRule";
import { MarketContext } from "../../routes/Market";
import NotFound from "../../routes/NotFound";
import { Breadcrumbs } from "../../layout/Navigation";
import LoaderSkeleton from "../../components/LoaderSkeleton";
import { MarketPriceData, MarketType } from "../../tools/MarketData";
import ReadMore from "../../components/ReadMore";
import StyledPercentage from "../../tools/StyledPercentage";
import IconButton from "../../components/IconButton";
import StockChart from "../../components/StockChart";
import { formatFirstUpper, formatNumber, formatPrice } from "../../utils/data-formatters";

const MarketProfile = (): JSX.Element => {
  const { type, asset } = useParams<{ type: MarketType; asset: string }>();
  const { t } = useTranslation();
  const marketContext = useContext(MarketContext);

  if (
    !type ||
    !asset ||
    !marketContext.assetData.data ||
    !marketContext.assetData.data[type] ||
    !marketContext.assetData.data[type][asset]
  ) {
    return <NotFound />;
  }

  const assetData = marketContext.assetData.data[type][asset];
  const athDelta = (((assetData.price ?? 0) - (assetData.ath ?? 0)) / (assetData.price ?? 1)) * 100;
  const atlDelta = Math.abs((((assetData.atl ?? 0) - (assetData.price ?? 0)) / (assetData.atl ?? 1)) * 100);

  const refreshData = () => {
    marketContext.refreshData(type ?? MarketType.CRYPTO, marketContext.dispatchAssetData, asset);
  };

  return (
    <Section>
      <Breadcrumbs
        links={[
          { text: t("markets"), path: Constants.SITE_MARKET_PATH_BASE },
          { text: `${t(type)} /`, path: "", active: true },
        ]}
      />

      {marketContext.assetData.type !== AssetStates.ERROR && assetData !== undefined ? (
        <>
          <Row>
            <Col>
              <Section>
                <h1>{assetData.name}</h1>
              </Section>
            </Col>
            <Col className="text-right d-none d-md-block d-xl-block d-lg-block">
              <IconButton title={t("refresh")} onClick={refreshData} icon="bi-arrow-repeat" size={30}></IconButton>
            </Col>
          </Row>
          <Row>
            <Col>
              <StockChart
                symbol="$" //TODO
                height={500}
                title={formatFirstUpper(t("market_data"))}
                dataSet={assetData.prices ?? ({} as MarketPriceData)}
              />
              <HorizontalRule />
            </Col>
          </Row>
          <Row>
            <Col
              xs={{ span: 12, order: 2 }}
              md={{ span: 12, order: 2 }}
              lg={{ span: 6, order: 1 }}
              xl={{ span: 6, order: 1 }}
            >
              <Section>
                <h2>
                  {t("about")} {assetData.name}
                </h2>
                <ReadMore text={t(i18nNamespace.EXTERNAL + ":" + asset + "_description")} charactersMax={300} />
              </Section>
            </Col>
            <Col
              xs={{ span: 12, order: 1 }}
              md={{ span: 12, order: 1 }}
              lg={{ span: 6, order: 2 }}
              xl={{ span: 6, order: 2 }}
            >
              <Section>
                <h2>{t("statistics")}</h2>
                <DefinitionList>
                  <dt className="xs-right">{t("price")}:</dt>
                  <dd className="text-right">{formatPrice(assetData.price ?? 0, 9, i18next.language)}</dd>
                  <dt className="xs-right">1D {t("change")}:</dt>
                  <dd className="text-right">{StyledPercentage(assetData.delta1, i18next.language)}</dd>
                  <dt className="xs-right">7D {t("change")}:</dt>
                  <dd className="text-right">{StyledPercentage(assetData.delta7, i18next.language)}</dd>
                  <dt className="xs-right">30D {t("change")}:</dt>
                  <dd className="text-right">{StyledPercentage(assetData.delta30, i18next.language)}</dd>
                  <dt className="xs-right">YTD {t("change")}:</dt>
                  <dd className="text-right">{StyledPercentage(assetData.deltaY, i18next.language)}</dd>
                  <dt className="xs-right">{t("all_time_high")}:</dt>
                  <dd className="text-right">
                    {formatPrice(assetData.ath ?? 0, 8, i18next.language)}{" "}
                    {StyledPercentage(athDelta, i18next.language)}
                  </dd>
                  <dt className="xs-right">{t("all_time_low")}:</dt>
                  <dd className="text-right">
                    {formatPrice(assetData.atl ?? 0, 8, i18next.language)}{" "}
                    {StyledPercentage(atlDelta, i18next.language)}
                  </dd>
                  <dt className="xs-right">{t("market_capitalization")}:</dt>
                  <dd className="text-right">
                    {formatPrice(assetData.cap ?? 0, Constants.DEFAULT_PRICE_PLACES, i18next.language)}
                  </dd>
                  <dt className="xs-right">{t("fully_diluted_valuation")}:</dt>
                  <dd className="text-right">
                    {formatPrice(assetData.total_value ?? 0, Constants.DEFAULT_PRICE_PLACES, i18next.language)}
                  </dd>
                  <dt className="xs-right">24H {t("volume")}:</dt>
                  <dd className="text-right">
                    {formatPrice(assetData.volume ?? 0, Constants.DEFAULT_PRICE_PLACES, i18next.language)}
                  </dd>
                  <dt className="xs-right">{t("circulating_supply")}:</dt>
                  <dd className="text-right">{formatNumber(assetData.circulating_supply ?? 0, i18next.language, 0)}</dd>
                  <dt className="xs-right">{t("max_supply")}:</dt>
                  <dd className="text-right">
                    {!assetData.max_supply ? "-" : formatNumber(assetData.max_supply ?? 0, i18next.language, 0)}
                  </dd>
                </DefinitionList>
              </Section>
            </Col>
          </Row>
        </>
      ) : marketContext.assetData.type === AssetStates.ERROR ? (
        "Error"
      ) : (
        <LoaderSkeleton type="Paragraphs" bars={16} width="100%" height="300" />
      )}
      <div className="text-right">{marketContext.marketDataByline(type)}</div>
    </Section>
  );
};

export default MarketProfile;
