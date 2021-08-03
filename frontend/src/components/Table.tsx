/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

type Props = {
    columns: Array<Column<any>>;
    data: Array<any>;
    page?: number,
    sizePerPage?: number
};

const Table = ({ columns, data, page = 1, sizePerPage = 20 }: Props): JSX.Element => {
    const options = {
        page: page,
        sizePerPage: sizePerPage,
        // onSizePerPageChange: (sizePerPage: number, page: number) => {
        // },
        // onPageChange: (page: number, sizePerPage: number) => {
        // }
    };

    return (
        <BootstrapTable bootstrap4 keyField='id' data={data} columns={columns} pagination={paginationFactory(options)} />
    );
}

export type Column<T> = {
    key: string,
    dataField: string;
    text: string;
    formatter?: (c: any, r: T) => any;
    hidden?: boolean;
    headerClasses?: string;
    classes?: string;
    icon?: JSX.Element;
};

export default Table;
