import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as Constants from '../Constants';

//TODO namespace
const resources = {
    'en-US': {
        translation: {
            language: 'language',
            home: 'home',
            markets: 'markets',
            blog: 'blog',
            contact: 'contact',
            about: 'about',
            light: 'light',
            dark: 'dark',
            name: 'name',
            read: 'read',
            byline: 'by',
            published: 'published',
            last_update: 'last update',
            summary: 'summary',
            full_story: 'full story',
            share: 'share',
            references: 'references',
            citations: 'citations',
            to_comment: 'comment',
            comments: 'comments',
            subject: 'subject',
            message: 'message',
            article: 'article',
            bitcoin: 'bitcoin',
            send_message: 'Send Message',
        },
    },
    de: {
        translation: {
            language: 'sprache',
            home: 'startseite',
            markets: 'märkte',
            blog: 'blog',
            contact: 'kontaktiere',
            about: 'über mich',
            light: 'licht',
            dark: 'dunkel',
            name: 'der name',
            read: 'lesen',
            read_seen: 'gesehen',
            byline: 'von',
            published: 'veröffentlicht',
            last_update: 'neuestes update',
            summary: 'zusammenfassung',
            full_story: 'kompletter artikel',
            share: 'teilen',
            references: 'verweise',
            citations: 'referenzieren',
            to_comment: 'kommentieren',
            comments: 'bemerkungen',
            subject: 'das thema',
            message: 'die mitteilung',
            article: 'artikel',
            bitcoin: 'bitcoin',
            send_message: 'sende nachricht',
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
            read: 'leer',
            read_seen: 'visto',
            byline: 'por',
            published: 'publicado',
            last_update: 'neuestes update',
            summary: 'el resumen',
            full_story: 'historia completa',
            share: 'compartir',
            references: 'los referencios',
            citations: 'mención',
            to_comment: 'comentar',
            comments: 'comentarios',
            subject: 'el tema',
            message: 'la comunicación',
            article: 'el artículo',
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
