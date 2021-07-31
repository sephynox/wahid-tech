import ADecentralizedFuture from "./ADecentralizedFuture";
import * as Constants from '../Constants';

const Data = {
    'a-decentralized-future': {
        id: 1,
        link: 'a-decentralized-future',
        authors: [{ given: 'Tanveer', family: 'Wahid' }],
        date: new Date('2021-07-29'),
        title: 'A Decentralized Future',
        component: ADecentralizedFuture,
        description: 'Decentralized Ledger Technology (DLT) is the future of all things and nothing and no one is going to stop it. An examination of the technology, its advocates, and skeptics through the lenses of history, technology, society, and economics.',
        image: {
            url: 'crypto-bitcoin-xrp-ether.png',
            alt: 'Bitcoin XRP Ethereum Cryptocurrencies'
        }
    }
}


const Posts = [
    'a-decentralized-future'
];

export default Data;
export {
    Posts,
    Data
};

