import * as Icon from 'react-cryptocoins';
import { EventArgs } from 'react-ga';
import { NavBlock } from './layout/Navigation';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Market from './pages/Market';
import { AssetData } from './tools/MarketData';
import { SocialBlock } from './tools/SocialLinks';

export const navLinks: Array<NavBlock> = [
    {
        text: 'home',
        icon: 'icon bi-house',
        to: '/',
        exact: true,
        component: Home,
    },
    {
        text: 'markets',
        icon: 'icon bi-graph-up',
        to: '/financial-markets',
        component: Market,
    },
    {
        text: 'blog',
        icon: 'icon bi-journals',
        to: '/technology-blog',
        component: Blog,
    },
    {
        text: 'contact',
        icon: 'icon bi-envelope',
        to: '/contact',
        component: Contact,
        exact: true,
    },
    {
        text: 'about',
        icon: 'icon bi-person',
        to: '/about',
        component: About,
        exact: true,
    },
];

export const socialLinks: Array<SocialBlock> = [
    {
        title: 'Facebook',
        icon: 'icon bi-facebook',
        url: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
        title: 'Twitter',
        icon: 'icon bi-twitter',
        url: 'https://twitter.com/intent/tweet?url=',
    },
    {
        title: 'LinkedIn',
        icon: 'icon bi-linkedin',
        url: 'https://www.linkedin.com/shareArticle?mini=true&url=',
    },
    {
        title: 'Email',
        icon: 'icon bi-envelope-open-fill',
        url: 'mailto:info@example.com?subject=',
    },

];

export const systemEvents: Record<string, EventArgs> = {
    'change_theme': {
        category: 'Style',
        action: 'Theme',
    },
    'disqus_comment': {
        category: 'Social',
        action: 'Comment',
    },
    'manual_refresh': {
        category: 'Maintenance',
        action: 'Refresh',
    },
}

export const systemLanguages: Record<string, string> = {
    'en-US': 'English',
    'es': 'Español',
    'de': 'Deutsch',
};

export const supportedLanguages: Array<keyof typeof systemLanguages> = [
    'en-US',
    'es',
    'de',
];

export const donationAddresses: Record<string, AssetData> = {
    xrp: { name: 'XRP (XRP)', icon: Icon.Xrp, address: 'r4UjAbmBoVVTUk6midb25GoWqtexBbcvzM' },
    btc: { name: 'Bitcoin (BTC)', icon: Icon.Btc, address: 'bc1qkqsfuaptqcslwmxh5lz2utxls4pe7wnjhepa2s' },
    eth: { name: 'Ethereum (ETH)', icon: Icon.Eth, address: '0x00E069d105F61564530859A35FE0D007C3536a35' },
    ada: { name: 'Cardano (ADA)', icon: Icon.Ada, address: 'addr1qywvljkfnyyey38te86tshjscn6yw25c069lf82jfjgv57m3txy8f0nf4wnjwcr8uxmlg9wk7lt6uu7g5w9x077v8lwqgsulw6' },
    doge: { name: 'Doge (DOGE)', icon: Icon.Doge, address: 'D949UWaLauvKyhX6PNuXGavmMNS6uFcjfS' },
};
