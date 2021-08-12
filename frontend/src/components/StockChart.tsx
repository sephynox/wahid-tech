import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AreaSplineSeries, Chart, Legend, LineSeries, Loading, Title, Tooltip, withHighcharts, XAxis, YAxis } from 'react-jsx-highcharts';
import Highcharts from 'highcharts/highstock';
import { HighchartsStockChart, Navigator, RangeSelector } from 'react-jsx-highstock';
import { PriceData } from '../tools/MarketData';
import LoaderSpinner from '../tools/LoaderSpinner';
import { formatTitleCase } from '../utils/data-formatters';
import { useEffect } from 'react';

type Props = {
    dataSet: PriceData,
    xAxis?: string,
    title?: string,
    legend?: string
};

const StockChart = ({ title, dataSet, xAxis = 'Time' }: Props): JSX.Element => {
    const { t } = useTranslation();
    const [data1, setData1] = useState(() => dataSet);
    //const [data2] = useState(() => dataSet2);
    const [loaded, setLoaded] = useState(() => dataSet.prices !== undefined);

    useEffect(() => {
        setData1(dataSet);
        setLoaded(dataSet.prices !== undefined);
    }, [dataSet, loaded]);

    return (
        <HighchartsStockChart>
            <Chart zoomType="x" />
            <Title>{title}</Title>
            <Loading isLoading={!loaded}><LoaderSpinner width="50%" height={5} /></Loading>
            <Legend layout="horizontal" />
            <Tooltip />
            <XAxis>
                <XAxis.Title>{xAxis}</XAxis.Title>
            </XAxis>
            <YAxis>
                <YAxis.Title>{formatTitleCase(t('price'))}</YAxis.Title>
                <LineSeries id="price" name={formatTitleCase(t('price'))} data={data1.prices} />
            </YAxis>
            <YAxis>
                <YAxis.Title>{formatTitleCase(t('volume'))}</YAxis.Title>
                <AreaSplineSeries id="volume" name={formatTitleCase(t('volume'))} data={data1.total_volumes} />
            </YAxis>
            {/* <YAxis opposite>
                <YAxis.Title>Social Buzz</YAxis.Title>
                <SplineSeries id="twitter" name="Twitter mentions" data={data2} />
            </YAxis> */}
            <RangeSelector selected={3}>
                <RangeSelector.Button count={1} offsetMin={0} offsetMax={0} type="day">1D</RangeSelector.Button>
                <RangeSelector.Button count={7} offsetMin={0} offsetMax={0} type="day">7D</RangeSelector.Button>
                <RangeSelector.Button count={1} offsetMin={0} offsetMax={0} type="month">1M</RangeSelector.Button>
                <RangeSelector.Button count={1} offsetMin={0} offsetMax={0} type="ytd">1Y</RangeSelector.Button>
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
