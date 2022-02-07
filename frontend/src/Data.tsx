import { useTranslation } from "react-i18next";
import * as Icon from "react-cryptocoins";
import { EventArgs } from "react-ga";

import * as Constants from "./Constants";
import { NavBlock } from "./layout/Navigation";
import { PrivacySetting } from "./components/PrivacyPrompt";
import { AssetData } from "./tools/MarketData";
import { SocialBlock } from "./components/SocialLinks";
import { formatFirstUpper, formatNumber } from "./utils/data-formatters";

export const navLinks: NavBlock[] = [
  {
    text: "home",
    icon: "icon bi-house",
    to: "/",
  },
  {
    text: "markets",
    icon: "icon bi-graph-up",
    to: "/financial-markets",
  },
  {
    text: "projects",
    icon: "icon bi-bricks",
    to: "/projects",
  },
  {
    text: "NFTs",
    icon: "icon bi-images",
    to: "/nfts",
  },
  {
    text: "blog",
    icon: "icon bi-journals",
    to: "/technology-blog",
  },
  {
    text: "contact",
    icon: "icon bi-envelope",
    to: "/contact",
  },
  {
    text: "about",
    icon: "icon bi-person",
    to: "/about",
  },
];

export const socialLinks: SocialBlock[] = [
  {
    title: "Facebook",
    icon: "icon bi-facebook",
    url: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    title: "Twitter",
    icon: "icon bi-twitter",
    url: "https://twitter.com/intent/tweet?url=",
  },
  {
    title: "LinkedIn",
    icon: "icon bi-linkedin",
    url: "https://www.linkedin.com/shareArticle?mini=true&url=",
  },
  {
    title: "Email",
    icon: "icon bi-envelope-open-fill",
    url: "mailto:info@example.com?subject=",
  },
];

export const systemEvents: Record<string, EventArgs> = {
  change_theme: {
    category: "Style",
    action: "Theme",
  },
  change_language: {
    category: "Internationalization",
    action: "Switch",
  },
  change_privacy: {
    category: "Privacy",
    action: "Update",
  },
  disqus_comment: {
    category: "Social",
    action: "Comment",
  },
  manual_refresh: {
    category: "Maintenance",
    action: "Refresh",
  },
};

export const systemLanguages: Record<string, string> = {
  "en-US": "English",
  es: "Español",
  de: "Deutsch",
};

export const supportedLanguages: Array<keyof typeof systemLanguages> = ["en-US", "es", "de"];

export const donationAddresses: Record<string, AssetData> = {
  xrp: { name: "XRP (XRP)", icon: Icon.Xrp, address: "r4UjAbmBoVVTUk6midb25GoWqtexBbcvzM" },
  btc: { name: "Bitcoin (BTC)", icon: Icon.Btc, address: "bc1qkqsfuaptqcslwmxh5lz2utxls4pe7wnjhepa2s" },
  eth: { name: "Ethereum (ETH)", icon: Icon.Eth, address: "0x00E069d105F61564530859A35FE0D007C3536a35" },
  ada: {
    name: "Cardano (ADA)",
    icon: Icon.Ada,
    address: "addr1qywvljkfnyyey38te86tshjscn6yw25c069lf82jfjgv57m3txy8f0nf4wnjwcr8uxmlg9wk7lt6uu7g5w9x077v8lwqgsulw6",
  },
  doge: { name: "Doge (DOGE)", icon: Icon.Doge, address: "D949UWaLauvKyhX6PNuXGavmMNS6uFcjfS" },
};

export const SystemCookies = (): Record<string, PrivacySetting> => {
  const { t, i18n } = useTranslation();

  return {
    required: {
      active: true,
      locked: true,
      title: formatFirstUpper(t("required")),
      description: t("content.required_cookies"),
      cookies: [
        {
          name: "session_id",
          expiration: `${formatNumber(6, i18n.language, 0)} ${t("time.months")}`,
          description: "Used to store session token.",
        },
      ],
    },
    analytics: {
      active: false,
      locked: false,
      title: formatFirstUpper(t("analytics")),
      description: t("content.analytics_cookies"),
      cookies: [
        {
          name: "_ga",
          expiration: `${formatNumber(2, i18n.language, 0)} ${t("time.years")}`,
          description: "Used to distinguish users.",
        },
        {
          name: "_gid",
          expiration: `${formatNumber(24, i18n.language, 0)} ${t("time.hours")}`,
          description: "Used to distinguish users.",
        },
        {
          name: "_gat",
          expiration: `${formatNumber(1, i18n.language, 0)} ${t("time.minutes")}`,
          description: "Used to throttle request rate.",
        },
        {
          name: "_ga_<container-id>",
          expiration: `${formatNumber(2, i18n.language, 0)} ${t("time.years")}`,
          description: "Used to persist session state.",
        },
        {
          name: "AMP_TOKEN",
          expiration: `${formatNumber(1, i18n.language, 0)} ${t("time.years")}`,
          description: "Contains a token that can be used to retrieve a Client ID from AMP Client ID service.",
        },
        {
          name: "__utma",
          expiration: `${formatNumber(2, i18n.language, 0)} ${t("time.years")}`,
          description: "Used to distinguish users and sessions.",
        },
        {
          name: "__utmt",
          expiration: `${formatNumber(10, i18n.language, 0)} ${t("time.minutes")}`,
          description: "Used to throttle request rate.",
        },
        {
          name: "__utmb",
          expiration: `${formatNumber(30, i18n.language, 0)} ${t("time.minutes")}`,
          description: "Used to determine new sessions/visits.",
        },
        {
          name: "__utmz",
          expiration: `${formatNumber(6, i18n.language, 0)} ${t("time.months")}`,
          description: "Stores the traffic source or campaign that explains how the user reached your site.",
        },
        {
          name: "__utmv",
          expiration: `${formatNumber(2, i18n.language, 0)} ${t("time.years")}`,
          description: "Used to store visitor-level custom variable data.",
        },
        {
          name: "CGIC",
          expiration: `${formatNumber(6, i18n.language, 0)} ${t("time.months")}`,
          description:
            "Improves the delivery of search results by auto-completing search queries based on a user&apos;s initial input.",
        },
        {
          name: "SID",
          expiration: `${formatNumber(6, i18n.language, 0)} ${t("time.months")}`,
          description:
            "Used to store digitally signed and encrypted records of a user&apos;s Google Account ID and most recent sign-in time.",
        },
        {
          name: "HSID",
          expiration: `${formatNumber(6, i18n.language, 0)} ${t("time.months")}`,
          description:
            "Used to store digitally signed and encrypted records of a user&apos;s Google Account ID and most recent sign-in time.",
        },
        {
          name: "OTZ",
          expiration: `${formatNumber(10, i18n.language, 0)} ${t("time.years")}`,
          description: "Used to track website traffic information.",
        },
      ],
    },
    advertising: {
      active: false,
      locked: false,
      title: formatFirstUpper(t("advertising")),
      description: t("content.advertising_cookies"),
      cookies: [
        {
          name: "IDE",
          expiration: `${formatNumber(13, i18n.language, 0)} ${t("time.months")}`,
          description: "Used to show Google ads on non-Google sites.",
        },
        {
          name: "ANID",
          expiration: `${formatNumber(13, i18n.language, 0)} ${t("time.months")}`,
          description: "Used to show Google ads on non-Google sites.",
        },
        {
          name: "NID",
          expiration: `${formatNumber(6, i18n.language, 0)} ${t("time.months")}`,
          description: "Used to show Google ads in Google services for signed-out users.",
        },
        {
          name: "HSID",
          expiration: `${formatNumber(1, i18n.language, 0)} ${t("time.years")}`,
          description:
            "Used to build a profile of the website visitor&apos;s interests and show relevant ads on other sites.",
        },
        {
          name: "APISID",
          expiration: `${formatNumber(10, i18n.language, 0)} ${t("time.years")}`,
          description: "Used to play YouTube videos embedded on the website.",
        },
        {
          name: "SAPISID",
          expiration: `${formatNumber(10, i18n.language, 0)} ${t("time.years")}`,
          description: "Used to play YouTube videos embedded on the website.",
        },
        {
          name: "SIDCC",
          expiration: `${formatNumber(6, i18n.language, 0)} ${t("time.months")}`,
          description: "Used as security measure to protect users data from unauthorized access.",
        },
        {
          name: "_gac_<property-id>",
          expiration: `${formatNumber(90, i18n.language, 0)} ${t("time.days")}`,
          description: "Contains campaign related information for the user.",
        },
        {
          name: "_gac_gb_<container-id>",
          expiration: `${formatNumber(90, i18n.language, 0)} ${t("time.days")}`,
          description: "Contains campaign related information.",
        },
      ],
    },
    performance: {
      active: false,
      locked: false,
      title: formatFirstUpper(t("performance")),
      description: t("content.performance_cookies"),
      cookies: [
        {
          name: "JSESSIONID",
          expiration: formatFirstUpper(t("browser_closed")),
          description: "Used to monitor session counts for an application.",
        },
        {
          name: "NREUM",
          expiration: formatFirstUpper(t("browser_closed")),
          description: "This cookie is only created in browsers that do not support the Navigation Timing API.",
        },
        {
          name: "NRAGENT",
          expiration: formatFirstUpper(t("browser_closed")),
          description:
            "This cookie is used to communicate between the New Relic collector aggregating end user metrics and the agent(s) running in the associated web application.",
        },
      ],
    },
    disqus: {
      active: false,
      locked: false,
      title: "Disqus",
      description: t("content.disqus_cookies"),
      cookies: [
        {
          name: "disqus_unique",
          expiration: `${formatNumber(24, i18n.language, 0)} ${t("time.hours")}`,
          description: "Internal statistics, used for anonymous visitors.",
        },
        {
          name: "testCookie",
          expiration: `${formatNumber(24, i18n.language, 0)} ${t("time.hours")}`,
          description: " Used to check whether the browser accepts 3rd-party cookies.",
        },
        {
          name: "G_ENABLED_IDPS",
          expiration: formatFirstUpper(t("no_expiration")),
          description: "Please see Disqus documentation.",
        },
        {
          name: "__jid",
          expiration: `${formatNumber(24, i18n.language, 0)} ${t("time.hours")}`,
          description: "Please see Disqus documentation.",
        },
        {
          name: "csrftoken",
          expiration: `${formatNumber(5, i18n.language, 0)} ${t("time.minutes")}`,
          description: "Please see Disqus documentation.",
        },
        {
          name: "disqusauth",
          expiration: `${formatNumber(3, i18n.language, 0)} ${t("time.months")}`,
          description: "Please see Disqus documentation.",
        },
        {
          name: "disqusauths",
          expiration: `${formatNumber(3, i18n.language, 0)} ${t("time.months")}`,
          description: "Please see Disqus documentation.",
        },
        {
          name: "sessionid",
          expiration: `${formatNumber(3, i18n.language, 0)} ${t("time.months")}`,
          description: "Please see Disqus documentation.",
        },
        {
          name: "intercom-id-*",
          expiration: `${formatNumber(1, i18n.language, 0)} ${t("time.years")}`,
          description: "Please see Disqus documentation.",
        },
        {
          name: "intercom-session-*",
          expiration: `${formatNumber(1, i18n.language, 0)} ${t("time.weeks")}`,
          description: "Please see Disqus documentation.",
        },
      ],
    },
  };
};

export const ethersConfig: Record<string, string> = {
  infura: Constants.REACT_APP_INFURA_PROJECT_ID,
};
