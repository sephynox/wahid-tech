import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Highcharts from 'highcharts/highstock';
import {
    AreaSplineSeries,
    Chart,
    ColumnSeries,
    HighchartsProvider,
    Legend,
    LineSeries,
    Loading,
    Title,
    Tooltip,
    XAxis,
    YAxis
} from 'react-jsx-highcharts';
import { HighchartsStockChart, Navigator, RangeSelector } from 'react-jsx-highstock';
import * as Constants from '../Constants';
import { MarketPriceData } from '../tools/MarketData';
import LoaderSpinner from '../tools/LoaderSpinner';
import { formatFirstUpper, formatPrice, formatShortNumber } from '../utils/data-formatters';

type Props = {
    dataSet: MarketPriceData,
    height: number,
    symbol: string,
    xAxis?: string,
    title?: string,
    legend?: string,
    defaultRange?: number,
};

const StockChart = ({ title, dataSet, height, symbol, xAxis = 'Time', defaultRange = 3 }: Props): JSX.Element => {
    const { t } = useTranslation();
    const [data1, setData1] = useState(dataSet);
    //const [data2] = useState(() => dataSet2);
    const [loaded, setLoaded] = useState(dataSet.prices !== undefined);
    const [chartRange, setChartRange] = useState(parseInt(localStorage.getItem('chartRange') ?? defaultRange.toString()));

    Highcharts.setOptions({
        lang: {
            rangeSelectorZoom: formatFirstUpper(t('zoom')),
            decimalPoint: t('number.fractional'),
            thousandsSep: t('number.separator')
        }
    });

    useEffect(() => {
        setData1(dataSet);
        setLoaded(dataSet.prices !== undefined);
    }, [dataSet, loaded]);

    useEffect(() => {
        localStorage.setItem('chartRange', chartRange.toString());
    }, [chartRange]);

    return (
        <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsStockChart updateArgs={[true, true, true]}>
                <Chart marginLeft={20} marginRight={20} zoomType="x" height={height} numberFormatter={(n: number) => formatPrice(n, Constants.DEFAULT_PRICE_PLACES, i18next.language)} />
                <Title>{title}</Title>
                <Loading isLoading={!loaded}><LoaderSpinner width="50%" height={5} /></Loading>
                <Legend layout="horizontal" />
                <Tooltip />
                <XAxis labels={{ formatter: (ctx) => Intl.DateTimeFormat(i18next.language).format(new Date(ctx.value ? ctx.value : 0)) }}>
                    <XAxis.Title>{xAxis}</XAxis.Title>
                </XAxis>
                <YAxis opposite labels={{ formatter: (ctx) => `${symbol}${formatShortNumber(ctx.value as number, 0)}`, x: -40, align: 'right' }}>
                    <YAxis.Title>{formatFirstUpper(`${t('volume')} / ${t('market_capitalization')}`)}</YAxis.Title>
                    <ColumnSeries color="#0a58ca" id="volume" name={formatFirstUpper(t('volume'))} data={data1.total_volumes} />
                    <AreaSplineSeries opacity={0.25} color="#ead274" id="cap" name={formatFirstUpper(t('market_capitalization'))} data={data1.market_caps} />
                </YAxis>
                <YAxis opposite={false} labels={{ formatter: (ctx) => `${formatPrice(ctx.value as number, Constants.DEFAULT_PRICE_PLACES, i18next.language)}`, x: 0, align: 'left' }}>
                    <YAxis.Title x={5}>{formatFirstUpper(t('price'))}</YAxis.Title>
                    <LineSeries color="rgb(32,253,13)" id="price" name={formatFirstUpper(t('price'))} data={data1.prices} />
                </YAxis>
                {/* <YAxis opposite>
                    <YAxis.Title>Social Buzz</YAxis.Title>
                    <SplineSeries id="twitter" name="Twitter mentions" data={data2} />
                </YAxis> */}
                <RangeSelector selected={chartRange}>
                    <RangeSelector.Button events={{ click: () => setChartRange(0) }} count={24} offsetMin={0} offsetMax={0} type="hour">24H</RangeSelector.Button>
                    <RangeSelector.Button events={{ click: () => setChartRange(1) }} count={7} offsetMin={0} offsetMax={0} type="day">7D</RangeSelector.Button>
                    <RangeSelector.Button events={{ click: () => setChartRange(2) }} count={30} offsetMin={0} offsetMax={0} type="day">30D</RangeSelector.Button>
                    <RangeSelector.Button events={{ click: () => setChartRange(3) }} count={90} offsetMin={0} offsetMax={0} type="day">90D</RangeSelector.Button>
                    <RangeSelector.Button events={{ click: () => setChartRange(4) }} count={1} offsetMin={0} offsetMax={0} type="ytd">YTD</RangeSelector.Button>
                    <RangeSelector.Button events={{ click: () => setChartRange(5) }} offsetMin={0} offsetMax={0} type="all">All</RangeSelector.Button>
                    <RangeSelector.Input enabled />
                </RangeSelector>
                <Navigator>
                    <Navigator.Series seriesId="price" />
                    <Navigator.Series seriesId="volume" />
                    {/* <Navigator.Series seriesId="twitter" /> */}
                </Navigator>

            </HighchartsStockChart>
        </HighchartsProvider>
    );
};

export default StockChart;
