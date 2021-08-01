import { ArticleData } from '../components/Article';
import ADecentralizedFuture from './ADecentralizedFuture';

type PostData = {
    [key: string]: ArticleData;
};

const Data: PostData = {
    'a-decentralized-future': {
        id: 1,
        path: 'a-decentralized-future',
        authors: [{ given: 'Tanveer', family: 'Wahid' }],
        date: new Date('2021-07-29'),
        title: 'A Decentralized Future',
        component: ADecentralizedFuture,
        description:
            'Decentralized Ledger Technology (DLT) is the future of all things and nothing and no one is going to stop it. An examination of the technology, its advocates, and skeptics through the lenses of history, technology, society, and economics.',
        image: {
            url: 'crypto-bitcoin-xrp-ether.png',
            alt: 'Bitcoin XRP Ethereum Cryptocurrencies',
        },
    },
};

export const Posts: Array<string> = ['a-decentralized-future'];

export default Data;
