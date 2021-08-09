import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as Constants from '../Constants';

const resources = {
    'en-US': {
        translation: {
            language: 'language',
            home: 'home',
            markets: 'market',
            blog: 'blog',
            contact: 'contact',
            about: 'about',
            light: 'light',
            dark: 'dark',
            name: 'name',
            subject: 'subject',
            message: 'message',
            bitcoin: 'bitcoin',
            send_message: 'Send Message',
        },
    },
    de: {
        translation: {
            language: 'sprachen',
            home: 'huis',
            markets: 'markten',
            blog: 'blog',
            contact: 'contact',
            about: 'über',
            light: 'helder',
            dark: 'donker',
            name: 'nombre',
            subject: 'subject',
            message: 'message',
            bitcoin: 'bitcoin',
            send_message: 'Bericht Versturen',
        },
    },
    es: {
        translation: {
            language: 'idioma',
            home: 'portada',
            markets: 'mercados',
            blog: 'blog',
            contact: 'contacto',
            about: 'acerca de',
            light: 'luz',
            dark: 'oscuro',
            name: 'nombre',
            subject: 'el tema',
            message: 'la comunicación',
            bitcoin: 'bitcoin',
            send_message: 'Enviar Mensaje',
        },
    },
    // TODO Support other languages
    fr: {
        translation: {
            home: 'home',
            bitcoin: 'bitcoin',
        },
    },
    it: {
        translation: {
            home: 'home',
            bitcoin: 'bitcoin',
        },
    },
    pl: {
        translation: {
            home: 'home',
            bitcoin: 'bitcoin',
        },
    },
    ro: {
        translation: {
            home: 'home',
            bitcoin: 'bitcoin',
        },
    },
    hu: {
        translation: {
            home: 'home',
            bitcoin: 'bitcoin',
        },
    },
    nl: {
        translation: {
            home: 'home',
            bitcoin: 'bitcoin',
        },
    },
    pt: {
        translation: {
            home: 'home',
            bitcoin: 'bitcoin',
        },
    },
    sv: {
        translation: {
            home: 'home',
            bitcoin: 'bitcoin',
        },
    },
    vi: {
        translation: {
            home: 'home',
            bitcoin: 'bitcoin',
        },
    },
    tr: {
        translation: {
            home: 'home',
            bitcoin: 'bitcoin',
        },
    },
    ru: {
        translation: {
            home: 'home',
            bitcoin: 'биткоин',
        },
    },
    ja: {
        translation: {
            home: 'home',
            bitcoin: 'ビットコイン',
        },
    },
    zh: {
        translation: {
            home: 'home',
            bitcoin: '比特币',
        },
    },
    'zh-tw': {
        translation: {
            home: 'home',
            bitcoin: '比特幣',
        },
    },
    ko: {
        translation: {
            home: 'home',
            bitcoin: '비트코인',
        },
    },
    ar: {
        translation: {
            home: 'home',
            bitcoin: 'بيتكوين',
        },
    },
    th: {
        translation: {
            home: 'home',
            bitcoin: 'บิตคอยน์',
        },
    }
};

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        //ns: ['common', 'validation', 'external'],
        debug: process.env.NODE_ENV !== 'production',
        fallbackLng: Constants.DEFAULT_LANG,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
