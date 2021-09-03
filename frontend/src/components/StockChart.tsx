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
    rangeSelector?: Array<Highcharts.RangeSelectorButtonsOptions>,
    defaultRange?: number,
};

const StockChart = ({ title, dataSet, height, symbol, rangeSelector, xAxis = 'Time', defaultRange = 5 }: Props): JSX.Element => {
    const { t } = useTranslation();
    const [data1, setData1] = useState(dataSet);
    const [loaded, setLoaded] = useState(dataSet.prices !== undefined);
    const [chartRange, setChartRange] = useState(parseInt(localStorage.getItem('chartRange') ?? defaultRange.toString()));

    const fmtPrice = (n: number) => formatPrice(n, Constants.DEFAULT_PRICE_PLACES, i18next.language);
    const fmtShortNumber = (ctx: Highcharts.AxisLabelsFormatterContextObject) => `${symbol}${formatShortNumber(ctx.value as number, 0)}`;
    const fmtContextPrice = (ctx: Highcharts.AxisLabelsFormatterContextObject) => `${fmtPrice(ctx.value as number)}`;
    const fmtDate = (ctx: Highcharts.AxisLabelsFormatterContextObject) => Intl.DateTimeFormat(i18next.language).format(new Date(ctx.value ? ctx.value : 0));

    if (!rangeSelector) {
        rangeSelector = [
            { count: 24, offsetMin: 0, offsetMax: 0, type: "hour", text: "24H" },
            { count: 7, offsetMin: 0, offsetMax: 0, type: "day", text: "7D" },
            { count: 30, offsetMin: 0, offsetMax: 0, type: "day", text: "30D" },
            { count: 90, offsetMin: 0, offsetMax: 0, type: "day", text: "90D" },
            { count: 1, offsetMin: 0, offsetMax: 0, type: "ytd", text: "YTD" },
            { offsetMin: 0, offsetMax: 0, type: "all", text: "All" },
        ];
    }

    Highcharts.setOptions({
        lang: {
            rangeSelectorZoom: formatFirstUpper(t('zoom')),
            decimalPoint: t('number.fractional'),
            thousandsSep: t('number.separator')
        }
    });

    useEffect(() => {
        setData1(dataSet);

        if (dataSet.prices !== undefined) {
            setLoaded(true);

            //HACK Chart does not load after data becomes available.
            if (rangeSelector) {
                setChartRange(chartRange);
            }
        }

        return () => { Highcharts.charts = []; };
    }, [dataSet, rangeSelector, chartRange, loaded]);

    useEffect(() => {
        localStorage.setItem('chartRange', chartRange.toString());
    }, [chartRange]);

    return (
        <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsStockChart updateArgs={[true, true, true]}>
                <Chart
                    marginLeft={20}
                    marginRight={20}
                    zoomType="x"
                    height={height}
                    numberFormatter={fmtPrice}
                />
                <Title>{title}</Title>
                <Loading isLoading={!loaded}><LoaderSpinner width="50%" height={5} /></Loading>
                <Legend layout="horizontal" />
                <Tooltip />
                <XAxis labels={{ formatter: fmtDate }}>
                    <XAxis.Title>{xAxis}</XAxis.Title>
                </XAxis>
                <YAxis opposite labels={{ formatter: fmtShortNumber, x: -10, align: 'right' }}>
                    <YAxis.Title>{formatFirstUpper(`${t('volume')} / ${t('market_capitalization')}`)}</YAxis.Title>
                    <ColumnSeries
                        id="volume"
                        color="#0a58ca"
                        name={formatFirstUpper(t('volume'))}
                        data={data1.total_volumes}
                    />
                    <AreaSplineSeries
                        id="cap"
                        color="#ead274"
                        opacity={0.25}
                        name={formatFirstUpper(t('market_capitalization'))}
                        data={data1.market_caps}
                    />
                </YAxis>
                <YAxis opposite={false} labels={{ formatter: fmtContextPrice, x: 0, align: 'left' }}>
                    <YAxis.Title x={5}>{formatFirstUpper(t('price'))}</YAxis.Title>
                    <LineSeries
                        id="price"
                        color="rgb(32,253,13)"
                        name={formatFirstUpper(t('price'))}
                        data={data1.prices}
                    />
                </YAxis>
                {/* <YAxis opposite>
                    <YAxis.Title>Social Buzz</YAxis.Title>
                    <SplineSeries id="twitter" name="Twitter mentions" data={data2} />
                </YAxis> */}
                <RangeSelector selected={chartRange}>
                    {rangeSelector.map((r, i) => (
                        <RangeSelector.Button
                            key={i}
                            events={{ click: () => setChartRange(i) }}
                            {...r}>
                            {r.text}
                        </RangeSelector.Button>))}
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
