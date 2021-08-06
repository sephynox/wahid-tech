import React from 'react';
import Table, { Column, Sort } from '../components/Table';
import { MarketData } from '../tools/MarketData';
import { formatPercent, formatPrice } from '../utils/data-formatters';

type Props<T> = {
    data: Array<T>;
};

const MarketList = <T,>({ data }: Props<T>): JSX.Element => {
    const defaultSorted: Sort<string> = [{ dataField: 'cap', order: 'desc' }];

    const marketColumns: Array<Column<MarketData>> = [
        { key: 'name', dataField: 'name', text: 'Name', sort: true, formatter: (c: string, r: MarketData) => formatName(r) },
        { key: 'price', dataField: 'price', text: 'Price', sort: true, formatter: (c: number) => formatPrice(c) },
        { key: 'delta1', dataField: 'delta1', text: '1D', sort: true, formatter: (c: number) => formatPercentSym(c) },
        { key: 'delta7', dataField: 'delta7', text: '7D', sort: true, formatter: (c: number) => formatPercentSym(c) },
        { key: 'delta30', dataField: 'delta30', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: '30D', sort: true, formatter: (c: number) => formatPercentSym(c) },
        { key: 'deltaY', dataField: 'deltaY', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: '1Y', sort: true, formatter: (c: number) => formatPercentSym(c) },
        { key: 'cap', dataField: 'cap', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: 'Market Cap', sort: true, formatter: (c: number) => formatPrice(c) },
    ];

    const formatName = (row: MarketData): JSX.Element => {
        return (<a href={row.path}><span>{row.name} <span className="color grey">({row.ticker.toUpperCase()})</span></span></a>);
    };

    const formatPercentSym = (percent?: number): JSX.Element => {
        if (!percent) {
            return (<span className="color grey">-</span>);
        }

        const ret = formatPercent(percent);
        const sign = percent < 0 ? 'bi bi-arrow-down-short' : 'bi bi-arrow-up-short';
        const color = percent < 0 ? 'color red' : 'color green';

        return (
            <span className={color}>{ret} <i className={sign}></i></span>
        );
    };

    return (
        <Table
            data={data}
            columns={marketColumns}
            defaultSorted={defaultSorted} />
    );
};

export default MarketList;
