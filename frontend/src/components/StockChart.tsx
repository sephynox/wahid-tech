import React, { useState } from 'react';
import Highcharts from 'highcharts/highstock';
import { AreaSplineSeries, Chart, Legend, Loading, SplineSeries, Title, Tooltip, withHighcharts, XAxis, YAxis } from 'react-jsx-highcharts';
import { HighchartsStockChart, Navigator, RangeSelector } from 'react-jsx-highstock';
import { createRandomData } from '../utils/data-helpers';

type Props = {
    xAxis?: string,
    title?: string,
    legend?: string
};

const StockChart = ({ title }: Props): JSX.Element => {
    const [data1] = useState(() => createRandomData(Date.now(), 1e7, 500));
    const [data2] = useState(() => createRandomData(Date.now(), 1e7, 500));
    const [loaded] = useState(() => true);

    return (
        <HighchartsStockChart>
            <Chart zoomType="x" />
            <Title>{title}</Title>
            <Loading isLoading={!loaded}>Fetching data...</Loading>
            <Legend layout="horizontal" />
            <Tooltip />
            <XAxis>
                <XAxis.Title>Time</XAxis.Title>
            </XAxis>
            <YAxis>
                <YAxis.Title>Price</YAxis.Title>
                <AreaSplineSeries id="profit" name="Profit" data={data1} />
            </YAxis>
            <YAxis opposite>
                <YAxis.Title>Social Buzz</YAxis.Title>
                <SplineSeries id="twitter" name="Twitter mentions" data={data2} />
            </YAxis>
            <RangeSelector selected={1}>
                <RangeSelector.Button count={1} offsetMin={0} offsetMax={0} type="day">1d</RangeSelector.Button>
                <RangeSelector.Button count={7} offsetMin={0} offsetMax={0} type="day">7d</RangeSelector.Button>
                <RangeSelector.Button count={1} offsetMin={0} offsetMax={0} type="month">1m</RangeSelector.Button>
                <RangeSelector.Button offsetMin={0} offsetMax={0} type="all">All</RangeSelector.Button>
                <RangeSelector.Input enabled boxBorderColor="#7cb5ec" />
            </RangeSelector>
            <Navigator>
                <Navigator.Series seriesId="profit" />
                <Navigator.Series seriesId="twitter" />
            </Navigator>
        </HighchartsStockChart>
    );
};

export default withHighcharts(StockChart, Highcharts);
