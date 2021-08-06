/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import BootstrapTable, { SortOrder } from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import LoaderSpinner from '../tools/LoaderSpinner';

type Props = {
    columns: Array<Column<any>>;
    data: Array<any>;
    page?: number,
    sizePerPage?: number,
    defaultSorted?: Sort<any>
};

const Table = ({ columns, data, defaultSorted, page = 1, sizePerPage = 20 }: Props): JSX.Element => {
    const options = {
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
            noDataIndication={() => <LoaderSpinner />}
            defaultSorted={defaultSorted} data={data}
            columns={columns}
            pagination={paginationFactory(options)}
        />
    );
}

export type Sort<T> = [{
    dataField: T;
    order: SortOrder;
}];

export type Column<T> = {
    key: string,
    dataField: string;
    text: string;
    formatter?: (c: any, r: T) => any;
    hidden?: boolean;
    sort: boolean;
    headerClasses?: string;
    classes?: string;
    icon?: JSX.Element;
};

export default Table;
