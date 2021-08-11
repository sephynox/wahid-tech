import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import * as Constants from '../Constants';

export enum i18nNamespace {
    COMMON = 'common',
    VALIDATION = 'validation',
    EXTERNAL = 'external',
};

i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        ns: Object.values(i18nNamespace),
        defaultNS: 'common',
        debug: process.env.NODE_ENV !== 'production',
        fallbackLng: Constants.DEFAULT_LANG,
        saveMissing: false,
        react: {
            useSuspense: true,
        },
        backend: {
            allowMultiLoading: true,
            loadPath: '/locales/{{lng}}/{{ns}}.json',
            addPath: '/locales/add/{{lng}}/{{ns}}',
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
