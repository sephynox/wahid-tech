import React from 'react';
import StockChart from '../components/StockChart';

type Props = {
    data: MarketProfileData;
};

const Article: React.FunctionComponent<Props> = ({ data }: Props) => {
    return (
        <div className="container">
            <h2>{data.name}</h2>
            <StockChart title="Test" />
        </div>
    );
};

export interface MarketProfileData {
    name: string;
    ticker: string;
}

export default Article;
