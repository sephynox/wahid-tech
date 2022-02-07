export const SITE_BASE_URL = window.location.origin;
export const DEV_MODE = "production" !== process.env.NODE_ENV;
export const MY_NAME = "Tanveer Wahid";
export const MY_EMAIL = "tan@wahid.email";
export const SITE_NAME = "WTech";
export const SITE_DOMAIN = "wahid.tech";
export const SITE_SHORTNAME = "wahidtech";
export const SITE_ENS = "wahid.eth";
export const SITE_OG_PROFILE = "https://wahid.tech/about";
export const SITE_TITLE = `${MY_NAME} - Engineering &amp; Cybersecurity - Blog`;
export const AUTHOR_ME = { given: "Tanveer", family: "Wahid", dns: SITE_ENS, og: SITE_OG_PROFILE };

export const DEFAULT_LANG = "en-US";
export const DEFAULT_CURRENCY = "USD";
export const DEFAULT_PRICE_PLACES = 2;
export const DEFAULT_PERCENT_PLACES = 2;
export const DEFAULT_PRICE_PERCENTAGE_CHANGES = "24h,7d,30d,1y";
export const DEFAULT_ETHERS_NETWORK = "homestead";

export const SITE_BLOG_PATH_BASE = "/technology-blog/";
export const SITE_BLOG_ARTICLE_PATH = SITE_BLOG_PATH_BASE + "posts/";
export const SITE_MARKET_PATH_BASE = "/financial-markets/";
export const SITE_MARKET_ASSET_PATH = SITE_MARKET_PATH_BASE + "asset/";
export const SITE_NFT_PATH_BASE = "/nfts/";
export const SITE_NFT_ASSET_PATH = SITE_NFT_PATH_BASE + "asset/";
export const SITE_PROJECT_PATH_BASE = "/projects/";
export const SITE_PROJECT_ASSET_PATH = SITE_PROJECT_PATH_BASE + "opensource/";
export const SITE_BLOG_ARTICLE_BASE_URL = SITE_BASE_URL + SITE_BLOG_ARTICLE_PATH;
export const SITE_MARKET_PATH_BASE_URL = SITE_BASE_URL + SITE_MARKET_ASSET_PATH;
export const SITE_PROJECT_PATH_BASE_URL = SITE_BASE_URL + SITE_PROJECT_ASSET_PATH;

export const COINGECKO_API_ENDPOINT = "https://api.coingecko.com/api/v3";
export const WTECH_API_ENDPOINT_PROD = "https://api.wahid.tech/v1";
export const WTECH_API_ENDPOINT_DEV = "https://dev-api.wahid.tech/v1";
export const WTECH_API_ENDPOINT = DEV_MODE ? WTECH_API_ENDPOINT_DEV : WTECH_API_ENDPOINT_PROD;
export const SITE_CONTACT_ENDPOINT = WTECH_API_ENDPOINT + "/contact";

export const REGEX_ETHEREUM_ADDRESS = "/^0x[a-fA-F0-9]{40}$/";

//Front-end safe values only
export const REACT_APP_GA_RECAPTCHA_KEY = "6Le0wCYUAAAAABYv_Axwdte1Jg7LcjqAhhBCYH80";
export const REACT_APP_GA_TRACKING_ID = "UA-101953437-1";
export const REACT_APP_INFURA_PROJECT_ID = "972ae4d98d4541bb808e85e73170615b";
