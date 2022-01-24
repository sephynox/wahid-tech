import React, { createContext, Dispatch, Suspense, useEffect, useState, useReducer } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ReactGA, { EventArgs } from 'react-ga';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-loading-skeleton/dist/skeleton.css';
import './scss/custom.scss';
import './App.css';
import * as Constants from './Constants';
import { ethersConfig, socialLinks } from './Data';
import { GlobalStyle } from './styles/GlobalStyle';
import { NavState } from './layout/Navigation';
import Overlay, { OverlayState } from './layout/Overlay';
import Toaster from './layout/Toaster';
import Header from './layout/Header';
import Body from './layout/Body';
import Footer from './layout/Footer';
import Privacy from './layout/Privacy';
import { LanguageSelectorState } from './layout/LanguageSelector';
import { ExternalLocaleState, externalLocaleReducer, initialExternalLocaleState } from './actions/ExternalLocale';
import { PrivacyCookieState, PrivacyPromptState } from './components/PrivacyPrompt';
import BackTop from './tools/BackTop';
import { SocialBlock } from './tools/SocialLinks';
import { Themes, availableThemes } from './tools/Themes';
import LoaderSpinner from './tools/LoaderSpinner';
import { Section } from './styles/Section';

export const AppContext = createContext<{
    testMode: boolean;
    theme: Themes;
    navState: NavState;
    langSelectorState: LanguageSelectorState;
    privacySelectorState: PrivacyPromptState;
    overlayState: OverlayState;
    allowedCookieState: PrivacyCookieState;
    socialLinks: Array<SocialBlock>;
    externalLocaleState: ExternalLocaleState;
    ethersProvider: ethers.providers.Provider;
    setEthersProvider: (value: ethers.providers.Provider) => void;
    logEvent: (event: EventArgs, debug?: boolean) => void;
    toggleNav: (override?: NavState, overlay?: boolean) => void;
    toggleLangSelector: () => void;
    togglePrivacySelector: () => void;
    setTheme: (value: Themes) => void;
    setNavState: (value: NavState) => void;
    setOverlayState: (value: OverlayState) => void;
    setAllowedCookieState: (value: PrivacyCookieState) => void;
    setLangSelectorState: (value: LanguageSelectorState) => void;
    setPrivacySelectorState: (value: PrivacyPromptState) => void;
    dispatchExternalLocaleState: Dispatch<ExternalLocaleState>;
}>({
    testMode: false,
    theme: Themes.DARK,
    navState: NavState.CLOSED,
    langSelectorState: LanguageSelectorState.CLOSED,
    privacySelectorState: PrivacyPromptState.INACTIVE,
    overlayState: OverlayState.HIDE,
    allowedCookieState: {},
    socialLinks: socialLinks,
    externalLocaleState: initialExternalLocaleState,
    ethersProvider: ethers.getDefaultProvider(),
    setEthersProvider: () => null,
    logEvent: () => null,
    toggleNav: () => null,
    toggleLangSelector: () => null,
    togglePrivacySelector: () => null,
    setTheme: () => null,
    setNavState: () => null,
    setOverlayState: () => null,
    setAllowedCookieState: () => null,
    setLangSelectorState: () => null,
    setPrivacySelectorState: () => null,
    dispatchExternalLocaleState: () => undefined,
});

const App = ({ history }: RouteComponentProps): JSX.Element => {
    const testMode: boolean = process.env.NODE_ENV === 'test';
    const isLightScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const sysTheme: Themes = isLightScheme ? Themes.LIGHT : Themes.DARK;
    const localExternalLocaleState: ExternalLocaleState = {
        ...initialExternalLocaleState,
        ...JSON.parse(localStorage.getItem('externalLocaleState') ?? '{}'),
    };

    const [theme, setTheme] = useState((localStorage.getItem('theme') as Themes) || sysTheme);
    const [navState, setNavState] = useState((localStorage.getItem('navState') as NavState) || NavState.CLOSED);
    const [overlayState, setOverlayState] = useState(OverlayState.HIDE);
    const [ethersProvider, setEthersProvider] = useState<ethers.providers.Provider>(
        ethers.getDefaultProvider(Constants.DEFAUL_ETHERS_NETWORK, ethersConfig),
    );
    const [langSelectorState, setLangSelectorState] = useState(LanguageSelectorState.CLOSED);
    const [privacySelectorState, setPrivacySelectorState] = useState(
        localStorage.getItem('privacyPromptComplete') === 'true'
            ? PrivacyPromptState.INACTIVE
            : PrivacyPromptState.ACTIVE,
    );
    const [allowedCookieState, setAllowedCookieState] = useState(
        JSON.parse(localStorage.getItem('allowedCookieState') ?? '{}') as PrivacyCookieState,
    );
    const [externalLocaleState, dispatchExternalLocaleState] = useReducer(
        externalLocaleReducer,
        localExternalLocaleState,
    );

    const toggleNav = (override?: NavState, overlay?: boolean) => {
        const state = override ?? navState === NavState.CLOSED ? NavState.OPEN : NavState.CLOSED;

        setNavState(state);

        if (overlay) {
            setOverlayState(state === NavState.OPEN ? OverlayState.SHOW : OverlayState.HIDE);
        }
    };

    const toggleLangSelector = () => {
        setLangSelectorState(
            langSelectorState === LanguageSelectorState.CLOSED
                ? LanguageSelectorState.OPEN
                : LanguageSelectorState.CLOSED,
        );
    };

    const togglePrivacySelector = () => {
        setPrivacySelectorState(
            privacySelectorState === PrivacyPromptState.INACTIVE
                ? PrivacyPromptState.ACTIVE
                : PrivacyPromptState.INACTIVE,
        );
    };

    const logEvent = (event: EventArgs, debug = false) => {
        if (debug) {
            //TODO
        } else if (allowedCookieState['analytics']) {
            ReactGA.event(event);
        }
    };

    const appContext = {
        testMode,
        theme,
        navState,
        langSelectorState,
        privacySelectorState,
        overlayState,
        allowedCookieState,
        socialLinks,
        externalLocaleState,
        ethersProvider,
        setEthersProvider,
        logEvent,
        toggleNav,
        toggleLangSelector,
        togglePrivacySelector,
        setTheme,
        setNavState,
        setOverlayState,
        setAllowedCookieState,
        setLangSelectorState,
        setPrivacySelectorState,
        dispatchExternalLocaleState,
    };

    useEffect(() => {
        let historyListener = undefined;

        if (allowedCookieState['analytics']) {
            ReactGA.initialize(Constants.REACT_APP_GA_TRACKING_ID, { debug: testMode });

            historyListener = history.listen(() => {
                ReactGA.pageview(window.location.pathname + window.location.search);
                toast.dismiss();
            });

            return historyListener;
        }
    }, [history, testMode, allowedCookieState]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('allowedCookieState', JSON.stringify(allowedCookieState));
    }, [allowedCookieState]);

    return (
        <Suspense fallback={<LoaderSpinner type="Pulse" size={20} />}>
            <ThemeProvider theme={availableThemes[theme]}>
                <AppContext.Provider value={appContext}>
                    <Section className={'App' + (navState === NavState.OPEN ? ' mobile-nav-active' : '')}>
                        <Header />
                        <Body />
                        <Footer />
                        <Privacy />
                        <Toaster />
                        <Overlay state={overlayState as OverlayState} />
                        <BackTop />
                        <GlobalStyle />
                    </Section>
                </AppContext.Provider>
            </ThemeProvider>
        </Suspense>
    );
};

export default withRouter(App);
