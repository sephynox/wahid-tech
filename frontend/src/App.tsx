import React, { createContext, Fragment, useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';
import './scss/custom.scss';
import { lightTheme, darkTheme, Themes } from './tools/Themes';
import { GlobalStyle } from './tools/Styles';
import './App.css';
import { socialLinks } from './Data';
import { NavState } from './layout/Navigation';
import BackTop from './tools/BackTop';
import Overlay, { OverlayState } from './layout/Overlay';
import { SocialBlock } from './tools/SocialLinks';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Body from './layout/Body';

export const AppContext = createContext<{
    testMode: boolean,
    theme: Themes,
    navState: NavState,
    overlayState: OverlayState,
    socialLinks: Array<SocialBlock>,
    setTheme: (value: Themes) => void,
    setNavState: (value: NavState) => void,
    setOverlayState: (value: OverlayState) => void,
}>({
    testMode: false,
    theme: Themes.DARK,
    navState: NavState.CLOSED,
    overlayState: OverlayState.HIDE,
    socialLinks: socialLinks,
    setTheme: () => null,
    setNavState: () => null,
    setOverlayState: () => null,
});

const App = (): JSX.Element => {
    const testMode: boolean = process.env.NODE_ENV === 'test';
    const sysTheme: Themes = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? Themes.LIGHT : Themes.DARK;

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') as Themes || sysTheme);
    const [navState, setNavState] = useState(() => localStorage.getItem('navState') as NavState || NavState.CLOSED);
    const [overlayState, setOverlayState] = useState(() => OverlayState.HIDE);

    const appContext = {
        testMode,
        theme,
        navState,
        overlayState,
        socialLinks,
        setTheme,
        setNavState,
        setOverlayState
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        !testMode && ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID ? process.env.REACT_APP_GA_TRACKING_ID : '');
    }, [theme, testMode]);

    return (
        <div className="App">
            <AppContext.Provider value={appContext}>
                <ThemeProvider theme={theme === Themes.LIGHT ? lightTheme : darkTheme}>
                    <Fragment>
                        <Router>
                            <Header />
                            <Body />
                            <Footer />
                        </Router>
                        <Overlay state={overlayState as OverlayState} />
                        <BackTop />
                        <GlobalStyle />
                    </Fragment>
                </ThemeProvider>
            </AppContext.Provider>
        </div>
    );
}

export default App;
