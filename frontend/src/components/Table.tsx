/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import BootstrapTable, { SortOrder } from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import LoaderSpinner from '../tools/LoaderSpinner';

type Props = {
    columns: Array<Column>;
    data: Array<any>;
    page?: number,
    sizePerPage?: number,
    defaultSort?: Sort<any>
};

const Table = ({ columns, data, defaultSort, page = 1, sizePerPage = 10 }: Props): JSX.Element => {
    const defaultSorted: Sort<any> = {
        dataField: 'name',
        order: 'asc'
    };

    const options = {
        dataSize: data.length,
        page: page,
        sizePerPage: sizePerPage,
        // onSizePerPageChange: (sizePerPage: number, page: number) => {
        // },
        // onPageChange: (page: number, sizePerPage: number) => {
        // }
    };

    return (
        <BootstrapTable bootstrap4
            keyField='id'
            noDataIndication={() => <LoaderSpinner width="50%" height={5} />}
            defaultSorted={defaultSort ? [{ ...defaultSorted, ...defaultSort }] : [defaultSorted]}
            data={data}
            columns={columns}
            pagination={paginationFactory(options)}
        />
    );
};

export type Sort<T> = {
    dataField: T;
    order: SortOrder;
    sortCaret?: (order: SortOrder | null, column: Column) => JSX.Element | void;
};

export type Column = {
    key: string,
    dataField: string;
    text: string;
    formatter?: (c: any, r: any) => any;
    hidden?: boolean;
    sort?: boolean;
    headerClasses?: string;
    classes?: string;
    icon?: JSX.Element;
};

export default Table;
