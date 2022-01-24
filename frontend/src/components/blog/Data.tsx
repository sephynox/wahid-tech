import { ArticleData } from './Article';
import ADecentralizedFuture from './posts/ADecentralizedFuture';
import HardhatReactUseDApp from './posts/HardhatReactUseDApp';

type PostData = {
    [key: string]: ArticleData;
};

const Data: PostData = {
    'hardhat-react-usedapp': {
        id: 2,
        comments: true,
        path: 'hardhat-react-usedapp',
        authors: [{ given: 'Tanveer', family: 'Wahid', dns: 'wahid.eth' }],
        date: new Date('2022-01-22'),
        title: 'Hardhat + React + useDapp',
        readTime: 20,
        component: HardhatReactUseDApp,
        description:
            'DLT is a new and exciting space but like all frontiers, navigating development can be challenging. This post will outline the quickest and easiest path to "Hello World" while still utilizing modern and professional tooling for building your first dapp.',
        image: {
            url: '/images/blog/hardhat-usedapp-typescript.png',
            alt: 'Hardhat + React + useDapp + Typescript',
        },
        tags: ['dlt', 'blockchain', 'dapp', 'development'],
        references: [
            {
                id: 'citation-hardhat-2022',
                date_year: 2022,
                date_month: 'January',
                date_day: 12,
                title: 'Getting started',
                site: 'Hardhat',
                publisher: 'Hardhat',
                archive: 'https://web.archive.org/web/20211217130250/https://hardhat.org/getting-started',
                url: 'https://hardhat.org/getting-started',
            },
            {
                id: 'citation-hardhat-react-2021',
                date_year: 2021,
                date_month: 'November',
                date_day: 26,
                title: 'Hardhat React',
                site: 'Hardhat',
                publisher: 'Hardhat',
                archive:
                    'https://web.archive.org/web/20220124002448/https://www.correccionesweb.com.ar/hardhat_vue/plugins/hardhat-react.html',
                url: 'https://www.correccionesweb.com.ar/hardhat_vue/plugins/hardhat-react.html',
            },
            {
                id: 'citation-usedapp-2021',
                date_year: 2021,
                date_month: 'December',
                date_day: 21,
                title: 'Getting started',
                site: 'useDApp',
                publisher: 'Ethworks',
                archive:
                    'https://web.archive.org/web/20210504020313/https://usedapp.readthedocs.io/en/latest/getting-started.html',
                url: 'https://usedapp.readthedocs.io/en/latest/getting-started.html',
            },
        ],
    },
    'a-decentralized-future': {
        id: 1,
        comments: true,
        path: 'a-decentralized-future',
        authors: [{ given: 'Tanveer', family: 'Wahid', dns: 'wahid.eth' }],
        date: new Date('2021-09-02'),
        title: 'A Decentralized Future',
        readTime: 60,
        component: ADecentralizedFuture,
        description:
            'Decentralized Ledger Technology (DLT) is the future of all things and nothing and no one is going to stop it. An examination of the technology, its advocates, and skeptics through the lenses of history, technology, society, and economics.',
        image: {
            url: '/images/blog/cryptocurrencies.png',
            alt: 'Bitcoin XRP Ethereum Cryptocurrencies',
        },
        tags: ['dlt', 'blockchain', 'cryptocurrency'],
        references: [
            {
                id: 'citation-arons-2021',
                authors: [{ given: 'Steven', family: 'Arons' }],
                date_year: 2021,
                date_month: 'July',
                date_day: 23,
                title: 'Deutsche bank enabled "massive" U.S. ponzi scheme, lawsuit says',
                site: 'Bloomberg',
                publisher: 'Bloomberg',
                archive:
                    'https://web.archive.org/web/20210808065713/https://www.bloomberg.com/news/articles/2021-07-23/deutsche-bank-enabled-massive-u-s-ponzi-scheme-lawsuit-says',
                url: 'https://www.bloomberg.com/news/articles/2021-07-23/deutsche-bank-enabled-massive-u-s-ponzi-scheme-lawsuit-says',
            },
            {
                id: 'citation-arslanalp-simpson-bell-2021',
                authors: [
                    { given: 'Serkan', family: 'Arslanalp' },
                    { given: 'Chima', family: 'Simpson-Bell' },
                ],
                date_year: 2021,
                date_month: 'May',
                date_day: 5,
                title: 'US dollar share of global foreign exchange reserves drops to 25-year low',
                site: 'IMFBlog',
                publisher: 'International Monetary Fund',
                archive:
                    'https://web.archive.org/web/20210816224255/https://blogs.imf.org/2021/05/05/us-dollar-share-of-global-foreign-exchange-reserves-drops-to-25-year-low',
                url: 'https://blogs.imf.org/2021/05/05/us-dollar-share-of-global-foreign-exchange-reserves-drops-to-25-year-low',
            },
            {
                id: 'citation-beattie-2019',
                authors: [{ given: 'Andrew', family: 'Beattie' }],
                date_year: 2019,
                date_month: 'November',
                date_day: 7,
                title: 'The pioneers of financial fraud',
                publisher: 'Investopedia',
                archive:
                    'https://web.archive.org/web/20210831230931/https://www.investopedia.com/articles/financial-theory/09/history-of-fraud.asp',
                url: 'https://www.investopedia.com/articles/financial-theory/09/history-of-fraud.asp',
            },
            {
                id: 'citation-chenoweth-2019',
                authors: [{ given: 'Katie', family: 'Chenoweth' }],
                page_start: 67,
                date_year: 2019,
                title: 'In the prosthetic tongue printing technology and the rise of the French language',
                publisher: 'University of Pennsylvania Press',
            },
            {
                id: 'citation-crowe-2019',
                date_year: 2019,
                date_month: 'July',
                date_day: 12,
                title: 'Fraud costs the global economy over US$5 trillion',
                site: 'Crowe',
                publisher: 'Crowe Global',
                archive:
                    'https://web.archive.org/web/20210418224352/https://www.crowe.com/global/news/fraud-costs-the-global-economy-over-us$5-trillion',
                url: 'https://www.crowe.com/global/news/fraud-costs-the-global-economy-over-us$5-trillion',
            },
            {
                id: 'citation-doj-2021',
                date_year: 2021,
                date_month: 'January',
                date_day: 8,
                title: 'Deutsche Bank agrees to pay over $130 million to resolve Foreign Corrupt Practices Act and fraud case',
                site: 'The U.S. Department of Justice',
                publisher: 'U.S. DOJ',
                archive:
                    'https://web.archive.org/web/20210727034800/https://www.justice.gov/opa/pr/deutsche-bank-agrees-pay-over-130-million-resolve-foreign-corrupt-practices-act-and-fraud',
                url: 'https://www.justice.gov/opa/pr/deutsche-bank-agrees-pay-over-130-million-resolve-foreign-corrupt-practices-act-and-fraud',
            },
            {
                id: 'citation-renteria-2021',
                authors: [
                    { given: 'Nelson', family: 'Renteria' },
                    { given: 'Tom', family: 'Wilson' },
                    { given: 'Karin', family: 'Strohecker' },
                ],
                date_year: 2021,
                date_month: 'June',
                date_day: 9,
                title: 'El Salvador may be the first country to accept Bitcoin as legal tender',
                site: 'Reuters',
                publisher: 'Thomas Reuters',
                archive:
                    'https://web.archive.org/web/20210824043546/https://www.reuters.com/world/americas/el-salvador-approves-first-law-bitcoin-legal-tender-2021-06-09',
                url: 'https://www.reuters.com/world/americas/el-salvador-approves-first-law-bitcoin-legal-tender-2021-06-09',
            },
            {
                id: 'citation-the-fed-2019',
                date_year: 2019,
                date_month: 'May',
                title: 'Report on the Economic Well-Being of U.S. Households in 2018 - May 2019',
                site: 'Board of Governors of the Federal Reserve System',
                publisher: 'The Fed',
                archive:
                    'https://web.archive.org/web/20210707184422/https://www.federalreserve.gov/publications/2019-economic-well-being-of-us-households-in-2018-preface.htm',
                url: 'https://www.federalreserve.gov/publications/2019-economic-well-being-of-us-households-in-2018-preface.htm',
            },
            {
                id: 'citation-the-fed-2020',
                date_year: 2020,
                date_month: 'September',
                title: 'Changes in U.S. Family Finances from 2016 to 2019: Evidence from the Survey of Consumer Finances',
                site: 'Board of Governors of the Federal Reserve System',
                publisher: 'The Fed',
                archive:
                    'https://web.archive.org/web/20210610193731/https://www.federalreserve.gov/publications/2020-bulletin-changes-in-us-family-finances-from-2016-to-2019.htm',
                url: 'https://www.federalreserve.gov/publications/2020-bulletin-changes-in-us-family-finances-from-2016-to-2019.htm',
            },
            {
                id: 'citation-the-fed-2021',
                date_year: 2021,
                date_month: 'June',
                title: 'Changes in U.S. Family Finances from 2016 to 2019: Evidence from the Survey of Consumer Finances',
                site: 'Board of Governors of the Federal Reserve System',
                publisher: 'The Fed',
                archive:
                    'https://web.archive.org/web/20210830041057/https://www.federalreserve.gov/releases/z1/dataviz/dfa/distribute/chart',
                url: 'https://www.federalreserve.gov/releases/z1/dataviz/dfa/distribute/chart',
            },
            {
                id: 'citation-flitter-2021',
                authors: [{ given: 'Emily', family: 'Flitter' }],
                date_year: 2021,
                date_month: 'August',
                date_day: 5,
                title: 'Gold Star families accuse major banks of aiding terrorists',
                site: 'The New York Times',
                publisher: 'The New York Times',
                archive:
                    'https://web.archive.org/web/20210825003741/https://www.nytimes.com/2021/08/05/business/banks-terrorism-gold-star-families.html',
                url: 'https://www.nytimes.com/2021/08/05/business/banks-terrorism-gold-star-families.html',
            },
            {
                id: 'citation-flitter-2020',
                authors: [{ given: 'Emily', family: 'Flitter' }],
                date_year: 2020,
                date_month: 'February',
                date_day: 21,
                title: 'The price of Wells Fargo’s fake account scandal grows by $3 billion',
                site: 'The New York Times',
                publisher: 'The New York Times',
                archive:
                    'https://web.archive.org/web/20210817063840/https://www.nytimes.com/2020/02/21/business/wells-fargo-settlement.html',
                url: 'https://www.nytimes.com/2020/02/21/business/wells-fargo-settlement.html',
            },
            {
                id: 'citation-hertig-2021',
                authors: [{ given: 'Alyssa', family: 'Hertig' }],
                date_year: 2021,
                date_month: 'February',
                date_day: 9,
                title: 'Nigerians look to P2P exchanges after crypto ban',
                site: 'CoinDesk',
                publisher: 'CoinDesk',
                archive:
                    'https://web.archive.org/web/20210209195034/https://www.coindesk.com/bitcoin-cant-be-stopped-nigerians-look-to-p2p-exchanges-after-crypto-ban',
                url: 'https://www.coindesk.com/bitcoin-cant-be-stopped-nigerians-look-to-p2p-exchanges-after-crypto-ban',
            },
            {
                id: 'citation-economist-2020',
                date_year: 2020,
                date_month: 'October',
                date_day: 3,
                title: 'JPMorgan Chase faces a fine of $920m for market manipulation',
                site: 'The Economist',
                publisher: 'The Economist',
                archive:
                    'https://web.archive.org/web/20210824033407/https://www.economist.com/finance-and-economics/2020/10/03/jpmorgan-chase-faces-a-fine-of-920m-for-market-manipulation',
                url: 'https://www.economist.com/finance-and-economics/2020/10/03/jpmorgan-chase-faces-a-fine-of-920m-for-market-manipulation',
            },
            {
                id: 'citation-economist-2013',
                date_year: 2013,
                date_month: 'January',
                date_day: 19,
                title: 'Airtime is money',
                site: 'The Economist',
                publisher: 'The Economist',
                archive:
                    'https://web.archive.org/web/20210418020533/https://www.economist.com/finance-and-economics/2013/01/19/airtime-is-money',
                url: 'https://www.economist.com/finance-and-economics/2013/01/19/airtime-is-money',
            },
            {
                id: 'citation-hayek-1999',
                authors: [{ given: 'Friedrich', middle: 'August', family: 'Hayek' }],
                page_start: 230,
                date_year: 1999,
                chapter: 'Toward A Free Market Monetary System',
                title: 'The collected works of F. A. Hayek',
                volume: 6,
                publisher: 'University of Chicago Press',
            },
            {
                id: 'citation-hanmer-elefante-2020',
                authors: [
                    { given: 'Lucia', family: 'Hanmer' },
                    { given: 'Marina', family: 'Elefante' },
                ],
                date_year: 2020,
                date_month: 'January',
                date_day: 2,
                title: 'Refugee women face complex barriers to proving identity',
                site: 'site',
                publisher: 'World Bank Blogs',
                archive:
                    'https://web.archive.org/web/20210802204550/https://blogs.worldbank.org/dev4peace/refugee-women-face-complex-barriers-proving-identity',
                url: 'https://blogs.worldbank.org/dev4peace/refugee-women-face-complex-barriers-proving-identity',
            },
            {
                id: 'citation-hudson-2021',
                authors: [{ given: 'Michael', family: 'Hudson' }],
                date_year: 2021,
                date_month: 'June',
                date_day: 11,
                title: 'FinCEN files investigation named Pulitzer Prize finalist',
                site: 'ICIJ',
                publisher: 'ICIJ',
                archive:
                    'https://web.archive.org/web/20210831231342/https://www.icij.org/investigations/fincen-files/fincen-files-investigation-named-pulitzer-prize-finalist',
                url: 'https://www.icij.org/investigations/fincen-files/fincen-files-investigation-named-pulitzer-prize-finalist',
            },
            {
                id: 'citation-icij-2020',
                date_year: 2020,
                date_month: 'September',
                date_day: 20,
                title: 'Global banks defy U.S. crackdowns by serving oligarchs, criminals and terrorists',
                site: 'ICIJ',
                publisher: 'ICIJ',
                archive:
                    'https://web.archive.org/web/20210817003010/https://www.icij.org/investigations/fincen-files/global-banks-defy-u-s-crackdowns-by-serving-oligarchs-criminals-and-terrorists',
                url: 'https://www.icij.org/investigations/fincen-files/global-banks-defy-u-s-crackdowns-by-serving-oligarchs-criminals-and-terrorists',
            },
            {
                id: 'citation-korsunskaya-marrow-2021',
                authors: [
                    { given: 'Darya', family: 'Korsunskaya' },
                    { given: 'Alexander', family: 'Marrow' },
                ],
                date_year: 2021,
                date_month: 'June',
                date_day: 3,
                title: 'Russian rainy day fund to get out of all U.S. dollar assets',
                site: 'Reuters',
                publisher: 'Thomas Reuters',
                archive:
                    'https://web.archive.org/web/20210604063626/https://www.reuters.com/article/us-russia-reserves/russian-rainy-day-fund-to-get-out-of-all-u-s-dollar-assets-idUSKCN2DF1R9',
                url: 'https://www.reuters.com/article/us-russia-reserves/russian-rainy-day-fund-to-get-out-of-all-u-s-dollar-assets-idUSKCN2DF1R9',
            },
            {
                id: 'citation-kowsmann-strasburg-2021',
                authors: [
                    { given: 'Patricia', family: 'Kowsmann' },
                    { given: 'Jenny', family: 'Strasburg' },
                ],
                date_year: 2021,
                date_month: 'May',
                date_day: 30,
                title: 'Fed warned Deutsche Bank over anti-money-laundering backsliding',
                site: 'The Wallstreet Journal',
                publisher: 'The Wallstreet Journal',
                archive:
                    'https://web.archive.org/web/20210818130210/https://www.wsj.com/articles/fed-warned-deutsche-bank-over-anti-money-laundering-backsliding-11622390670',
                url: 'https://www.wsj.com/articles/fed-warned-deutsche-bank-over-anti-money-laundering-backsliding-11622390670',
            },
            {
                id: 'citation-kowsmann-brown-2021',
                authors: [
                    { given: 'Patricia', family: 'Kowsmann' },
                    { given: 'Ken', family: 'Brown' },
                ],
                date_year: 2021,
                date_month: 'August',
                date_day: 1,
                title: 'Fired executive says Deutsche Bank’s DWS overstated sustainable-investing efforts',
                site: 'The Wallstreet Journal',
                publisher: 'The Wallstreet Journal',
                archive:
                    'https://web.archive.org/web/20210818130105/https://www.wsj.com/articles/fired-executive-says-deutsche-banks-dws-overstated-sustainable-investing-efforts-11627810380',
                url: 'https://www.wsj.com/articles/fired-executive-says-deutsche-banks-dws-overstated-sustainable-investing-efforts-11627810380',
            },
            {
                id: 'citation-lennon-2021',
                authors: [{ given: 'Hailey', family: 'Lennon' }],
                date_year: 2021,
                date_month: 'January',
                date_day: 19,
                title: 'The false narrative of Bitcoin’s role in illicit activity',
                site: 'Forbes',
                publisher: 'Forbes Magazine',
                archive:
                    'https://web.archive.org/web/20210901002257/https://www.forbes.com/sites/haileylennon/2021/01/19/the-false-narrative-of-bitcoins-role-in-illicit-activity',
                url: 'https://www.forbes.com/sites/haileylennon/2021/01/19/the-false-narrative-of-bitcoins-role-in-illicit-activity',
            },
            {
                id: 'citation-maizland-2021',
                authors: [{ given: 'Lindsay', family: 'Maizland' }],
                date_year: 2021,
                date_month: 'February',
                date_day: 10,
                title: 'Myanmar’s troubled history: Coups, military rule, and ethnic conflict',
                site: 'Council on Foreign Relations',
                publisher: 'Council on Foreign Relations',
                archive:
                    'https://web.archive.org/web/20210817215503/https://www.cfr.org/backgrounder/myanmar-history-coup-military-rule-ethnic-conflict-rohingya',
                url: 'https://www.cfr.org/backgrounder/myanmar-history-coup-military-rule-ethnic-conflict-rohingya',
            },
            {
                id: 'citation-moore-2020',
                authors: [{ given: 'Galen', family: 'Moore' }],
                date_year: 2020,
                date_month: 'May',
                date_day: 22,
                title: '10 years after Laszlo Hanyecz bought pizza with 10K bitcoin, he has no regrets',
                site: 'Coindesk',
                publisher: 'Coindesk',
                archive:
                    'https://web.archive.org/web/20210824231301/https://www.coindesk.com/bitcoin-pizza-10-years-laszlo-hanyecz',
                url: 'https://www.coindesk.com/bitcoin-pizza-10-years-laszlo-hanyecz',
            },
            {
                id: 'citation-minsky-2008',
                authors: [{ given: 'Hyman', middle: 'Philip', family: 'Minsky' }],
                page_start: 17,
                date_year: 2008,
                title: 'Stabilizing an unstable economy',
                publisher: 'McGraw-Hill',
            },
            {
                id: 'citation-pew-charitable-trusts-2016',
                date_year: 2016,
                date_month: 'June',
                date_day: 22,
                title: 'What do consumers without bank accounts think about mobile payments?',
                publisher: 'Pew Charitable Trusts',
                archive:
                    'https://web.archive.org/web/20210116121545/https://www.pewtrusts.org/en/research-and-analysis/issue-briefs/2016/06/what-do-consumers-without-bank-accounts-think-about-mobile-payments',
                url: 'https://www.pewtrusts.org/en/research-and-analysis/issue-briefs/2016/06/what-do-consumers-without-bank-accounts-think-about-mobile-payments',
            },
            {
                id: 'citation-pew-research-center-2020',
                date_year: 2020,
                date_month: 'January',
                date_day: 9,
                title: 'Trends in income and wealth inequality',
                publisher: 'Pew Research Center',
                archive:
                    'https://web.archive.org/web/20210821052153/https://www.pewresearch.org/social-trends/2020/01/09/trends-in-income-and-wealth-inequality',
                url: 'https://www.pewresearch.org/social-trends/2020/01/09/trends-in-income-and-wealth-inequality',
            },
            {
                id: 'citation-oberhaus-2018',
                authors: [{ given: 'Daniel', family: 'Oberhaus' }],
                date_year: 2018,
                date_month: 'August',
                date_day: 27,
                title: 'The world’s oldest blockchain has been hiding in the New York Times since 1995',
                site: 'Vice',
                publisher: 'Vice Media Group',
                archive:
                    'https://web.archive.org/web/20210825220128/https://www.vice.com/en/article/j5nzx4/what-was-the-first-blockchain',
                url: 'https://www.vice.com/en/article/j5nzx4/what-was-the-first-blockchain',
            },
            {
                id: 'citation-perryer-2019',
                authors: [{ given: 'Sophie', family: 'Perryer' }],
                date_year: 2019,
                date_month: 'October',
                date_day: 17,
                title: 'Deutsche bank’s fall from grace: How one of the world’s Largest lenders got into hot water',
                site: 'World Finance',
                publisher: 'World Finance',
                archive:
                    'https://web.archive.org/web/20210823221837/https://www.worldfinance.com/banking/deutsche-banks-fall-from-grace-how-one-of-the-worlds-largest-lenders-got-into-hot-water',
                url: 'https://www.worldfinance.com/banking/deutsche-banks-fall-from-grace-how-one-of-the-worlds-largest-lenders-got-into-hot-water',
            },
            {
                id: 'citation-salvo-2021',
                authors: [{ given: 'Mathew', middle: 'Di', family: 'Salvo' }],
                date_year: 2021,
                date_month: 'July',
                date_day: 21,
                title: 'Jack Dorsey is hopeful Bitcoin can create ’world peace’',
                publisher: 'P2P Foundation',
                archive:
                    'https://web.archive.org/web/20210901013705/https://decrypt.co/76564/bitcoin-world-peace-jack-dorsey',
                url: 'https://decrypt.co/76564/bitcoin-world-peace-jack-dorsey',
            },
            {
                id: 'citation-nakamoto-2009',
                authors: [{ given: 'Nakamoto', family: 'Satoshi' }],
                date_year: 2009,
                date_month: 'February',
                date_day: 11,
                title: 'Bitcoin open source implementation of p2p currency',
                publisher: 'P2P Foundation',
                archive:
                    'https://web.archive.org/web/20090221024857/https://p2pfoundation.ning.com/forum/topics/bitcoin-open-source',
                url: 'https://p2pfoundation.ning.com/forum/topics/bitcoin-open-source',
            },
            {
                id: 'citation-schrage-1994',
                authors: [{ given: 'Michael', family: 'Schrage' }],
                date_year: 1994,
                date_month: 'August',
                date_day: 25,
                title: 'On-line pizza idea is clever but only half-baked ',
                site: 'Los Angeles Times',
                publisher: 'Los Angeles Times',
                archive:
                    'https://web.archive.org/web/20210831233507/https://www.latimes.com/archives/la-xpm-1994-08-25-fi-31168-story.html',
                url: 'https://www.latimes.com/archives/la-xpm-1994-08-25-fi-31168-story.html',
            },
            {
                id: 'citation-schroeder-2019',
                authors: [{ given: 'Pete', family: 'Schroeder' }],
                date_year: 2019,
                date_month: 'December',
                date_day: 17,
                title: 'Explainer: Australia’s biggest banks reel from string of scandals',
                site: 'Reuters',
                publisher: 'Thomas Reuters',
                archive:
                    'https://web.archive.org/web/20210823220630if_/https://www.reuters.com/article/us-australia-banks-regulation-explainer/explainer-australias-biggest-banks-reel-from-string-of-scandals-idUSKBN1YM0F8',
                url: 'https://www.reuters.com/article/us-australia-banks-regulation-explainer/explainer-australias-biggest-banks-reel-from-string-of-scandals-idUSKBN1YM0F8',
            },
            {
                id: 'citation-sigalos-2021b',
                authors: [{ given: 'MacKenzie', family: 'Sigalos' }],
                date_year: 2021,
                date_month: 'July',
                date_day: 16,
                title: 'Why the Fed hates cryptocurrencies and especially stablecoins',
                site: 'CNBC',
                publisher: 'CNBC',
                archive:
                    'https://web.archive.org/web/20210901175044/https://www.cnbc.com/2021/07/16/jerome-powell-promotes-cbdc-digital-dollar-warns-against-stablecoins.html',
                url: 'https://www.cnbc.com/2021/07/16/jerome-powell-promotes-cbdc-digital-dollar-warns-against-stablecoins.html',
            },
            {
                id: 'citation-sigalos-2021a',
                authors: [{ given: 'MacKenzie', family: 'Sigalos' }],
                date_year: 2021,
                date_month: 'August',
                date_day: 21,
                title: 'Inside Afghanistan’s cryptocurrency underground as the country plunges into turmoil',
                site: 'CNBC',
                publisher: 'CNBC',
                archive:
                    'https://web.archive.org/web/20210901013441/https://www.cnbc.com/2021/08/21/bitcoin-afghanistan-cryptocurrency-taliban-capital-flight.html',
                url: 'https://www.cnbc.com/2021/08/21/bitcoin-afghanistan-cryptocurrency-taliban-capital-flight.html',
            },
            {
                id: 'citation-smith-2019',
                authors: [{ given: 'Graham', family: 'Smith' }],
                date_year: 2019,
                date_month: 'July',
                date_day: 19,
                title: 'Hayek’s 1984: Rediscovered footage shows Austrian economist predicting bitcoin',
                publisher: 'Bitcoin.com',
                archive:
                    'https://web.archive.org/web/20210225224718/https://news.bitcoin.com/hayeks-1984-rediscovered-footage-shows-austrian-economist-predicting-bitcoin',
                url: 'https://news.bitcoin.com/hayeks-1984-rediscovered-footage-shows-austrian-economist-predicting-bitcoin',
            },
            {
                id: 'citation-stevens-2020',
                authors: [{ given: 'Robert', family: 'Stevens' }],
                date_year: 2020,
                date_month: 'March',
                date_day: 6,
                title: 'Rapper Akon’s first dapp on Akoin platform tokenizes mobile airtime',
                site: 'Decrypt',
                publisher: 'Decrypt',
                archive:
                    'https://web.archive.org/web/20210825222442/https://decrypt.co/21613/rapper-akons-first-dapp-on-akoin-platform-tokenizes-mobile-airtime',
                url: 'https://decrypt.co/21613/rapper-akons-first-dapp-on-akoin-platform-tokenizes-mobile-airtime',
            },
            {
                id: 'citation-stoll-1995',
                authors: [{ given: 'Clifford', family: 'Stoll' }],
                date_year: 1995,
                date_month: 'February',
                date_day: 26,
                title: 'Why the Web Won’t Be Nirvana',
                site: 'Newsweek',
                publisher: 'Newsweek',
                archive:
                    'https://web.archive.org/web/20210831225348/https://www.newsweek.com/clifford-stoll-why-web-wont-be-nirvana-185306',
                url: 'https://www.newsweek.com/clifford-stoll-why-web-wont-be-nirvana-185306',
            },
            {
                id: 'citation-strupczewski-2021',
                authors: [{ given: 'Jan', family: 'Strupczewski' }],
                date_year: 2021,
                date_month: 'January',
                date_day: 19,
                title: 'EU seeks to cut reliance on U.S. dollar, other financial centres',
                site: 'Reuters',
                publisher: 'Thomas Reuters',
                archive:
                    'https://web.archive.org/web/20210831235351/https://www.reuters.com/article/us-eu-finance/eu-seeks-to-cut-reliance-on-u-s-dollar-other-financial-centres-idUSKBN29O1ZI',
                url: 'https://www.reuters.com/article/us-eu-finance/eu-seeks-to-cut-reliance-on-u-s-dollar-other-financial-centres-idUSKBN29O1ZI',
            },
            {
                id: 'citation-swfi-2021',
                date_year: 2021,
                date_month: 'July',
                date_day: 2,
                title: 'New Mexico State Investment Council files antitrust lawsuit on alleged rigging of CDS market against global banks',
                site: 'SWFI News',
                publisher: 'Sovereign Wealth Fund Institute',
                archive:
                    'https://web.archive.org/web/20210823214557/https://www.swfinstitute.org/news/87324/new-mexico-state-investment-council-files-antitrust-lawsuit-on-alleged-rigging-of-cds-market-against-global-banks',
                url: 'https://www.swfinstitute.org/news/87324/new-mexico-state-investment-council-files-antitrust-lawsuit-on-alleged-rigging-of-cds-market-against-global-banks',
            },
            {
                id: 'citation-farber-osborn-2021',
                authors: [
                    { given: 'Gabrielle', family: 'Tétrault-Farber' },
                    { given: 'Andrew', family: 'Osborn' },
                ],
                date_year: 2021,
                date_month: 'March',
                date_day: 22,
                title: 'Russia’s top diplomat starts China visit with call to reduce U.S. dollar use',
                site: 'Reuters',
                publisher: 'Thomas Reuters',
                archive:
                    'https://web.archive.org/web/20210705041119/https://www.reuters.com/article/us-russia-china-usa/russias-top-diplomat-starts-china-visit-with-call-to-reduce-u-s-dollar-use-idUSKBN2BE0XH',
                url: 'https://www.reuters.com/article/us-russia-china-usa/russias-top-diplomat-starts-china-visit-with-call-to-reduce-u-s-dollar-use-idUSKBN2BE0XH',
            },
            {
                id: 'citation-casey-vigna-2018',
                authors: [
                    { given: 'Michael', middle: 'J', family: 'Casey' },
                    { given: 'Paul', family: 'Vigna' },
                ],
                date_year: 2018,
                title: 'The truth machine: The blockchain and the future of everything ',
                publisher: 'McGraw-Hill',
            },
            {
                id: 'citation-weissmann-2012',
                authors: [{ given: 'Jordan', family: 'Weissmann' }],
                date_year: 2012,
                date_month: 'June',
                date_day: 29,
                title: 'iPhone turns 5: A short history of its famously and loudly wrong critics',
                publisher: 'The Atlantic',
                archive:
                    'https://web.archive.org/web/20210831230129/https://www.theatlantic.com/business/archive/2012/06/iphone-turns-5-a-short-history-of-its-famously-and-loudly-wrong-critics/259171',
                url: 'https://www.theatlantic.com/business/archive/2012/06/iphone-turns-5-a-short-history-of-its-famously-and-loudly-wrong-critics/259171',
            },
            {
                id: 'citation-winton-2017',
                authors: [{ given: 'Alexander', family: 'Winton' }],
                date_year: 2017,
                date_month: 'January',
                date_day: 9,
                title: 'Get a horse! America’s skepticism toward the first automobiles',
                publisher: 'The Saturday Evening Post',
                archive:
                    'https://web.archive.org/web/20210831230218/https://www.saturdayeveningpost.com/2017/01/get-horse-americas-skepticism-toward-first-automobiles',
                url: 'https://www.saturdayeveningpost.com/2017/01/get-horse-americas-skepticism-toward-first-automobiles',
            },
        ],
    },
};

export const Posts: string[] = ['hardhat-react-usedapp', 'a-decentralized-future'];

export default Data;
