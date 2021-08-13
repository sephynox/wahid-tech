import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Highcharts from 'highcharts/highstock';
import { AreaSplineSeries, Chart, ColumnSeries, Legend, LineSeries, Loading, Title, Tooltip, withHighcharts, XAxis, YAxis } from 'react-jsx-highcharts';
import { HighchartsStockChart, Navigator, RangeSelector } from 'react-jsx-highstock';
import { PriceData } from '../tools/MarketData';
import LoaderSpinner from '../tools/LoaderSpinner';
import { formatFirstUpper, formatNumberWithSeparators, formatShortNumber } from '../utils/data-formatters';
import i18next from 'i18next';

type Props = {
    dataSet: PriceData,
    height: number,
    symbol: string,
    xAxis?: string,
    title?: string,
    legend?: string,
    startRange?: number,
};

const StockChart = ({ title, dataSet, height, symbol, xAxis = 'Time', startRange = 4 }: Props): JSX.Element => {
    const { t } = useTranslation();
    const [data1, setData1] = useState(() => dataSet);
    //const [data2] = useState(() => dataSet2);
    const [loaded, setLoaded] = useState(() => dataSet.prices !== undefined);

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

    return (
        <HighchartsStockChart>
            <Chart marginLeft={20} marginRight={20} zoomType="x" height={height} numberFormatter={(number: number) => formatNumberWithSeparators(number)} />
            <Title>{title}</Title>
            <Loading isLoading={!loaded}><LoaderSpinner width="50%" height={5} /></Loading>
            <Legend layout="horizontal" />
            <Tooltip valuePrefix={symbol} />
            <XAxis labels={{ formatter: (ctx) => { return Intl.DateTimeFormat(i18next.language).format(ctx.value as number); } }}>
                <XAxis.Title>{xAxis}</XAxis.Title>
            </XAxis>
            <YAxis opposite labels={{ formatter: (ctx) => { return `${symbol}${formatShortNumber(ctx.value as number, 0)}` }, x: 0, align: 'right' }}>
                <AreaSplineSeries opacity={0.25} color="#ead274" id="cap" name={formatFirstUpper(t('market_capitalization'))} data={data1.market_caps} />
            </YAxis>
            <YAxis opposite labels={{ formatter: (ctx) => { return `${symbol}${formatShortNumber(ctx.value as number, 0)}` }, x: -40, align: 'right' }}>
                <YAxis.Title>{formatFirstUpper(`${t('volume')} / ${t('market_capitalization')}`)}</YAxis.Title>
                <ColumnSeries color="#0a58ca" id="volume" name={formatFirstUpper(t('volume'))} data={data1.total_volumes} />
            </YAxis>
            <YAxis opposite={false} labels={{ formatter: (ctx) => { return `${symbol}${Intl.NumberFormat(i18next.language).format(ctx.value as number)}` }, x: 0, align: 'left' }}>
                <YAxis.Title x={5}>{formatFirstUpper(t('price'))}</YAxis.Title>
                <LineSeries color="rgb(32,253,13)" id="price" name={formatFirstUpper(t('price'))} data={data1.prices} />
            </YAxis>
            {/* <YAxis opposite>
                <YAxis.Title>Social Buzz</YAxis.Title>
                <SplineSeries id="twitter" name="Twitter mentions" data={data2} />
            </YAxis> */}
            <RangeSelector selected={startRange}>
                <RangeSelector.Button count={1} offsetMin={0} offsetMax={0} type="day">1D</RangeSelector.Button>
                <RangeSelector.Button count={7} offsetMin={0} offsetMax={0} type="day">7D</RangeSelector.Button>
                <RangeSelector.Button count={30} offsetMin={0} offsetMax={0} type="day">30D</RangeSelector.Button>
                <RangeSelector.Button count={90} offsetMin={0} offsetMax={0} type="day">90D</RangeSelector.Button>
                <RangeSelector.Button count={1} offsetMin={0} offsetMax={0} type="ytd">YTD</RangeSelector.Button>
                <RangeSelector.Button offsetMin={0} offsetMax={0} type="all">All</RangeSelector.Button>
                <RangeSelector.Input enabled />
            </RangeSelector>
            <Navigator>
                <Navigator.Series seriesId="price" />
                <Navigator.Series seriesId="volume" />
                {/* <Navigator.Series seriesId="twitter" /> */}
            </Navigator>

        </HighchartsStockChart>
    );
};

export default withHighcharts(StockChart, Highcharts);
