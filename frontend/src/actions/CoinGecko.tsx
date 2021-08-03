import axios from 'axios';

const CoinGecko = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3'
});

export default CoinGecko;
