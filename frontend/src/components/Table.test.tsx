import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';

describe("when rendered with two columns and data", () => {
    it("should show a table with two columns and its data", () => {
        const props = {
            columns: [{ key: 'name', dataField: 'name', text: 'Name' }],
            data: [{ name: 'Marge' }, { name: 'Homer' }, { name: 'Lisa' }, { name: 'Bart' }]
        };

        render(<Table {...props} />);

        props.columns.forEach((datum) => {
            expect(screen.getByText(new RegExp(datum.text, 'i'))).toBeInTheDocument();
        })

        props.data.forEach((datum) => {
            expect(screen.getByText(new RegExp(datum.name, 'i'))).toBeInTheDocument();
        })
    });
});
