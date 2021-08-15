import React, { createContext, Dispatch, Suspense, useEffect, useState, useReducer } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './scss/custom.scss';
import './App.css';
import * as Constants from './Constants';
import { Themes, availableThemes } from './tools/Themes';
import { GlobalStyle } from './styles/GlobalStyle';
import { socialLinks, supportedLanguages } from './Data';
import { NavToggle, NavState } from './layout/Navigation';
import BackTop from './tools/BackTop';
import Overlay, { OverlayState } from './layout/Overlay';
import Toaster from './tools/Toaster';
import { SocialBlock } from './tools/SocialLinks';
import Header from './layout/Header';
import Body from './layout/Body';
import { LanguageSelectorState } from './layout/LanguageSelector';
import LoaderSpinner from './tools/LoaderSpinner';
import { ExternalLocaleState, externalLocaleReducer, initialExternalLocaleState } from './actions/ExternalLocale';
import i18next, { i18nNamespace } from './services/i18n';

export const AppContext = createContext<{
    testMode: boolean,
    theme: Themes,
    navState: NavState,
    langSelectorState: LanguageSelectorState,
    overlayState: OverlayState,
    socialLinks: Array<SocialBlock>,
    toggleNav: () => void,
    toggleLangSelector: () => void,
    setTheme: (value: Themes) => void,
    setNavState: (value: NavState) => void,
    setOverlayState: (value: OverlayState) => void,
    setLangSelectorState: (value: LanguageSelectorState) => void,
    dispatchExternalLocaleState: Dispatch<ExternalLocaleState>,
}>({
    testMode: false,
    theme: Themes.DARK,
    navState: NavState.CLOSED,
    langSelectorState: LanguageSelectorState.CLOSED,
    overlayState: OverlayState.HIDE,
    socialLinks: socialLinks,
    toggleNav: () => null,
    toggleLangSelector: () => null,
    setTheme: () => null,
    setNavState: () => null,
    setOverlayState: () => null,
    setLangSelectorState: () => null,
    dispatchExternalLocaleState: () => undefined,
});

const App = ({ history }: RouteComponentProps): JSX.Element => {
    const testMode: boolean = process.env.NODE_ENV === 'test';
    const isLightScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const sysTheme: Themes = isLightScheme ? Themes.LIGHT : Themes.DARK;
    const localExternalLocaleState: ExternalLocaleState = { ...initialExternalLocaleState, ...JSON.parse(localStorage.getItem('externalLocaleState') ?? '{}') };

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') as Themes || sysTheme);
    const [navState, setNavState] = useState(() => localStorage.getItem('navState') as NavState || NavState.CLOSED);
    const [overlayState, setOverlayState] = useState(() => OverlayState.HIDE);
    const [langSelectorState, setLangSelectorState] = useState(() => LanguageSelectorState.CLOSED);
    const [externalLocaleState, dispatchExternalLocaleState] = useReducer(externalLocaleReducer, localExternalLocaleState);

    const toggleNav = () => {
        setNavState(navState === NavState.CLOSED ? NavState.OPEN : NavState.CLOSED);
    };

    const toggleLangSelector = () => {
        setLangSelectorState(langSelectorState === LanguageSelectorState.CLOSED
            ? LanguageSelectorState.OPEN
            : LanguageSelectorState.CLOSED);
    };

    const appContext = {
        testMode,
        theme,
        navState,
        langSelectorState,
        overlayState,
        socialLinks,
        toggleNav,
        toggleLangSelector,
        setTheme,
        setNavState,
        setOverlayState,
        setLangSelectorState,
        dispatchExternalLocaleState,
    };

    useEffect(() => {
        !testMode && ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID
            ? process.env.REACT_APP_GA_TRACKING_ID
            : '');
    }, [testMode]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('externalLocaleState', JSON.stringify(externalLocaleState));
        supportedLanguages.forEach(lang => {
            if (externalLocaleState.data && externalLocaleState.data[lang] !== undefined) {
                i18next.addResourceBundle(lang, i18nNamespace.EXTERNAL, externalLocaleState.data[lang]);
            }
        });
    }, [externalLocaleState]);

    //HACK Fix this odd issue
    useEffect(() => {
        const bugListener = history.listen(() => {
            document.querySelectorAll('body>div:not(#root):not(.modal):not(.modal-backdrop)').forEach((el) => { el.remove(); });
        });
        return bugListener;
    }, [history]);

    return (
        <ThemeProvider theme={availableThemes[theme]}>
            <div className={"App " + (navState === NavState.OPEN ? Constants.NAVIGATION_ACTIVE_CLASS : '')}>
                <AppContext.Provider value={appContext}>
                    <Suspense fallback={<LoaderSpinner type="Pulse" size={20} />}>
                        <Toaster />
                        <NavToggle />
                        <Header />
                        <Body />
                        <Overlay state={overlayState as OverlayState} />
                        <BackTop />
                        <GlobalStyle />
                    </Suspense>
                </AppContext.Provider>
            </div>
        </ThemeProvider>
    );
}

export default withRouter(App);
