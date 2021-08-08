import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    de: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    es: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    fr: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    it: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    pl: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    ro: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    hu: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    nl: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    pt: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    sv: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    vi: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    tr: {
        translation: {
            bitcoin: "Bitcoin",
        },
    },
    ru: {
        translation: {
            bitcoin: "биткоин",
        },
    },
    ja: {
        translation: {
            bitcoin: "ビットコイン",
        },
    },
    zh: {
        translation: {
            bitcoin: "比特币",
        },
    },
    'zh-tw': {
        translation: {
            bitcoin: "比特幣",
        },
    },
    ko: {
        translation: {
            bitcoin: "비트코인",
        },
    },
    ar: {
        translation: {
            app_name: "بيتكوين",
        },
    },
    th: {
        translation: {
            bitcoin: "บิตคอยน์",
        },
    }
};

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
