import React from 'react';
import { NavLink } from 'react-router-dom';
import i18next from 'i18next';
import * as Constants from '../../Constants';
import Table, { Column, Sort } from '../Table';
import { MarketData, MarketType } from '../../tools/MarketData';
import { formatPrice } from '../../utils/data-formatters';
import StyledPercentage from '../../tools/StyledPercentage';

type Props<T> = {
    data: Array<T>;
};

const MarketList = <T,>({ data }: Props<T>): JSX.Element => {
    const defaultSorted: Sort<string> = { dataField: 'cap', order: 'desc' };

    const marketColumns: Array<Column> = [
        { key: 'name', dataField: 'name', text: 'Name', sort: true, formatter: (c: string, r: MarketData) => formatName(r) },
        { key: 'price', dataField: 'price', text: 'Price', sort: true, formatter: (c: number) => formatPrice(c, Constants.DEFAULT_PRICE_PLACES, i18next.language) },
        { key: 'delta1', dataField: 'delta1', text: '1D', sort: true, formatter: (c: number) => StyledPercentage(c, i18next.language) },
        { key: 'delta7', dataField: 'delta7', text: '7D', sort: true, formatter: (c: number) => StyledPercentage(c, i18next.language) },
        { key: 'delta30', dataField: 'delta30', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: '30D', sort: true, formatter: (c: number) => StyledPercentage(c, i18next.language) },
        { key: 'deltaY', dataField: 'deltaY', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: '1Y', sort: true, formatter: (c: number) => StyledPercentage(c, i18next.language) },
        { key: 'cap', dataField: 'cap', headerClasses: 'hide-mobile', classes: 'hide-mobile', text: 'Market Cap', sort: true, formatter: (c: number) => formatPrice(c, Constants.DEFAULT_PRICE_PLACES, i18next.language) },
    ];

    const formatName = (row: MarketData): JSX.Element => {
        return (
            <NavLink to={row.path ?? Constants.SITE_MARKET_ASSET_PATH + MarketType.CRYPTO + '/' + row.key}>
                <span>{row.name} <span className="color grey">({row.ticker?.toUpperCase()})</span></span>
            </NavLink>
        );
    };

    return (<Table data={data} columns={marketColumns} defaultSort={defaultSorted} />);
};

export default MarketList;
