import React, { createContext, Fragment, useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';
import './scss/custom.scss';
import * as Constants from './Constants';
import { Themes, availableThemes } from './tools/Themes';
import { GlobalStyle } from './styles/GlobalStyle';
import './App.css';
import { socialLinks } from './Data';
import { NavToggle, NavState } from './layout/Navigation';
import BackTop from './tools/BackTop';
import Overlay, { OverlayState } from './layout/Overlay';
import { SocialBlock } from './tools/SocialLinks';
import Header from './layout/Header';
import Body from './layout/Body';
import { LanguageSelectorState } from './layout/LanguageSelector';

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
});

const App = (): JSX.Element => {
    const testMode: boolean = process.env.NODE_ENV === 'test';
    const sysTheme: Themes = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? Themes.LIGHT : Themes.DARK;

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') as Themes || sysTheme);
    const [navState, setNavState] = useState(() => localStorage.getItem('navState') as NavState || NavState.CLOSED);
    const [overlayState, setOverlayState] = useState(() => OverlayState.HIDE);
    const [langSelectorState, setLangSelectorState] = useState(() => LanguageSelectorState.CLOSED);

    const toggleNav = () => {
        setNavState(navState === NavState.CLOSED ? NavState.OPEN : NavState.CLOSED);
    };

    const toggleLangSelector = () => {
        setLangSelectorState(langSelectorState === LanguageSelectorState.CLOSED ? LanguageSelectorState.OPEN : LanguageSelectorState.CLOSED);
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
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        !testMode && ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID ? process.env.REACT_APP_GA_TRACKING_ID : '');
    }, [theme, testMode]);

    return (
        <ThemeProvider theme={availableThemes[theme]}>
            <div className={"App " + (navState === NavState.OPEN ? Constants.NAVIGATION_ACTIVE_CLASS : '')}>
                <AppContext.Provider value={appContext}>
                    <Fragment>
                        <Router>
                            <NavToggle />
                            <Header />
                            <Body />
                        </Router>
                        <Overlay state={overlayState as OverlayState} />
                        <BackTop />
                        <GlobalStyle />
                    </Fragment>
                </AppContext.Provider>
            </div>
        </ThemeProvider>
    );
}

export default App;
