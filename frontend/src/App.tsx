import React, { createContext, Dispatch, useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EventArgs } from "react-ga";
import { ThemeProvider } from "styled-components";
import { ethers } from "ethers";

import "bootstrap-icons/font/bootstrap-icons.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import "./scss/custom.scss";

import * as Constants from "./Constants";
import { i18nNamespace } from "./services/i18n";
import { ethersConfig, supportedLanguages, systemEvents } from "./Data";
import { ExternalLocaleState, initialExternalLocaleState } from "./actions/ExternalLocale";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Themes, availableThemes } from "./styles/Themes";
import Overlay, { OverlayState } from "./layout/Overlay";
import { NavState } from "./layout/NavToggle";
import { LanguageSelectorState } from "./layout/LanguageSelector";
import Toaster from "./layout/Toaster";
import Header from "./layout/Header";
import Body from "./layout/Body";
import Footer from "./layout/Footer";
import { PrivacyCookieState, PrivacyPromptState } from "./components/PrivacyPrompt";
import BackTop from "./components/BackTop";
import { localStoreOr } from "./utils/data-helpers";

const SYS_THEME_LIGHT = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;

export enum AppAction {
  SET_THEME = "SET_THEME",
  SET_LANGUAGE = "SET_LANGUAGE",
  SET_PRIVACY_STATE = "SET_PRIVACY_STATE",
  SHOW_OVERLAY = "SHOW_OVERLAY",
  HIDE_OVERLAY = "HIDE_OVERLAY",
  OPEN_PRIVACY = "OPEN_PRIVACY",
  CLOSE_PRIVACY = "CLOSE_PRIVACY",
  OPEN_LANGUAGES = "OPEN_LANGUAGES",
  CLOSE_LANGUAGES = "CLOSE_LANGUAGES",
  OPEN_NAV = "OPEN_NAV",
  CLOSE_NAV = "CLOSE_NAV",
  NAVIGATE = "NAVIGATE",
  LOG = "LOG",
}

enum InternalAppAction {
  ACK_LOG = "ACK_LOG",
  ACK_BOOT = "ACK_BOOT",
  ACK_SET_PRIVACY_OPTION = "ACK_SET_PRIVACY_OPTION",
  ACK_SWITCHED_LANG = "ACK_SWITCHED_LANG",
  ACK_REQUESTED_NAVIGATION = "ACK_REQUESTED_NAVIGATION",
}

enum AppEvent {
  LISTENING = "LISTENING",
  SYN_BOOT = "SYN_BOOT",
  SYN_LOG = "SYN_LOG",
  SYN_SET_PRIVACY_OPTION = "SYN_SET_PRIVACY_OPTION",
  SYN_SWITCHED_LANG = "SYN_SWITCHED_LANG",
  SYN_REQUESTED_NAVIGATION = "SYN_REQUESTED_NAVIGATION",
}

export type AppEvents =
  | { type: AppEvent.SYN_BOOT }
  | { type: AppEvent.LISTENING }
  | { type: AppEvent.SYN_LOG; log: EventArgs }
  | { type: AppEvent.SYN_SET_PRIVACY_OPTION; prev: PrivacyCookieState; state: PrivacyCookieState }
  | { type: AppEvent.SYN_SWITCHED_LANG; prev: string; language: string }
  | { type: AppEvent.SYN_REQUESTED_NAVIGATION; path: string };

export type AppActions =
  | { type: AppAction.NAVIGATE; path: string }
  | { type: AppAction.SET_THEME; theme: Themes }
  | { type: AppAction.SET_LANGUAGE; language: string }
  | { type: AppAction.SET_PRIVACY_STATE; state: PrivacyCookieState }
  | { type: AppAction.LOG; event: EventArgs }
  | { type: AppAction.SHOW_OVERLAY }
  | { type: AppAction.HIDE_OVERLAY }
  | { type: AppAction.OPEN_PRIVACY }
  | { type: AppAction.CLOSE_PRIVACY }
  | { type: AppAction.OPEN_LANGUAGES }
  | { type: AppAction.CLOSE_LANGUAGES }
  | { type: AppAction.OPEN_NAV }
  | { type: AppAction.CLOSE_NAV }
  | { type: InternalAppAction.ACK_BOOT }
  | { type: InternalAppAction.ACK_LOG }
  | { type: InternalAppAction.ACK_SWITCHED_LANG }
  | { type: InternalAppAction.ACK_SET_PRIVACY_OPTION }
  | { type: InternalAppAction.ACK_REQUESTED_NAVIGATION };

type AppState = {
  eventHost: AppEvents;
  testMode: boolean;
  theme: Themes;
  language: string;
  navState: NavState;
  externalLocaleState: ExternalLocaleState;
  languageSelectorState: LanguageSelectorState;
  privacyCookieState: PrivacyCookieState;
  privacyPromptState: PrivacyPromptState;
  overlayState: OverlayState;
};

const initialEventHost: AppEvents = {
  type: AppEvent.LISTENING,
};

const initialPrivacyCookieState: PrivacyCookieState = {
  required: true,
  disqus: true,
  analytics: true,
  performance: true,
  advertising: false,
};

const hardStateResets = {
  eventHost: { type: AppEvent.SYN_BOOT } as AppEvents,
  navState: NavState.CLOSED,
  privacyPromptState: PrivacyPromptState.INACTIVE,
  overlayState: OverlayState.HIDE,
  languageSelectorState: LanguageSelectorState.CLOSED,
};

const initialAppState: AppState = localStoreOr("appState", {
  testMode: process.env.NODE_ENV === "test",
  theme: SYS_THEME_LIGHT ? Themes.LIGHT : Themes.DARK,
  externalLocaleState: initialExternalLocaleState,
  privacyCookieState: initialPrivacyCookieState,
  language: Constants.DEFAULT_LANG,
  ...hardStateResets,
});

const appReducer = (state: AppState, action: AppActions): AppState => {
  let event: AppEvents;

  switch (action.type) {
    case AppAction.NAVIGATE:
      event = { type: AppEvent.SYN_REQUESTED_NAVIGATION, path: action.path };
      return { ...state, eventHost: event };
    case AppAction.SET_THEME:
      return { ...state, theme: action.theme };
    case AppAction.SET_LANGUAGE:
      event = { type: AppEvent.SYN_SWITCHED_LANG, prev: state.language, language: action.language };
      return { ...state, eventHost: event, language: action.language };
    case AppAction.SET_PRIVACY_STATE:
      event = { type: AppEvent.SYN_SET_PRIVACY_OPTION, prev: state.privacyCookieState, state: action.state };
      return { ...state, eventHost: event, privacyCookieState: action.state };
    case AppAction.LOG:
      event = { type: AppEvent.SYN_LOG, log: action.event };
      return { ...state, eventHost: event };
    case AppAction.SHOW_OVERLAY:
      return { ...state, overlayState: OverlayState.SHOW };
    case AppAction.HIDE_OVERLAY:
      return { ...state, overlayState: OverlayState.HIDE };
    case AppAction.OPEN_PRIVACY:
      return { ...state, overlayState: OverlayState.SHOW, privacyPromptState: PrivacyPromptState.ACTIVE };
    case AppAction.CLOSE_PRIVACY:
      return { ...state, overlayState: OverlayState.HIDE, privacyPromptState: PrivacyPromptState.INACTIVE };
    case AppAction.OPEN_LANGUAGES:
      return { ...state, overlayState: OverlayState.SHOW, languageSelectorState: LanguageSelectorState.OPEN };
    case AppAction.CLOSE_LANGUAGES:
      return { ...state, overlayState: OverlayState.HIDE, languageSelectorState: LanguageSelectorState.CLOSED };
    case AppAction.OPEN_NAV:
      return { ...state, overlayState: OverlayState.SHOW, navState: NavState.OPEN };
    case AppAction.CLOSE_NAV:
      return { ...state, overlayState: OverlayState.HIDE, navState: NavState.CLOSED };
    case InternalAppAction.ACK_BOOT:
    case InternalAppAction.ACK_LOG:
    case InternalAppAction.ACK_SWITCHED_LANG:
    case InternalAppAction.ACK_SET_PRIVACY_OPTION:
    case InternalAppAction.ACK_REQUESTED_NAVIGATION:
      return { ...state, eventHost: initialEventHost };
  }
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppActions>;
  ethersProvider: ethers.providers.Provider;
}>({
  state: initialAppState,
  dispatch: () => null,
  ethersProvider: ethers.getDefaultProvider(),
});

const App: React.FunctionComponent = (): JSX.Element => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(appReducer, { ...initialAppState, ...hardStateResets });
  const [ethersProvider] = useState<ethers.providers.Provider>(
    new ethers.providers.InfuraProvider(Constants.DEFAULT_ETHERS_NETWORK, ethersConfig),
  );

  const theme = availableThemes[state.theme];
  const setNavState = (navState: NavState) =>
    dispatch({ type: navState === NavState.OPEN ? AppAction.OPEN_NAV : AppAction.CLOSE_NAV });

  const logEvent = useCallback((event: EventArgs, debug = false) => {
    return null;
  }, []);

  const importExternalLocaleStates = useCallback(
    (localeState: ExternalLocaleState) => {
      supportedLanguages.forEach((lang) => {
        if (localeState.data && localeState.data[lang] !== undefined) {
          i18n.addResourceBundle(lang, i18nNamespace.EXTERNAL, localeState.data[lang]);
        }
      });
    },
    [i18n],
  );

  const listenEventBus = useCallback(async () => {
    switch (state.eventHost.type) {
      case AppEvent.SYN_BOOT:
        dispatch({ type: InternalAppAction.ACK_BOOT });
        return importExternalLocaleStates(state.externalLocaleState);
      case AppEvent.SYN_LOG:
        logEvent(state.eventHost.log);
        return dispatch({ type: InternalAppAction.ACK_LOG });
      case AppEvent.SYN_SWITCHED_LANG:
        i18n.changeLanguage(state.eventHost.language);
        const label = `${state.eventHost.prev} -> ${state.eventHost.language}`;
        logEvent({ ...systemEvents["change_language"], label: label });
        return dispatch({ type: InternalAppAction.ACK_SWITCHED_LANG });
      case AppEvent.SYN_SET_PRIVACY_OPTION:
        logEvent({ ...systemEvents["change_privacy"], label: `TODO` });
        return dispatch({ type: InternalAppAction.ACK_SET_PRIVACY_OPTION });
      case AppEvent.SYN_REQUESTED_NAVIGATION:
        navigate(state.eventHost.path);
        return dispatch({ type: InternalAppAction.ACK_REQUESTED_NAVIGATION });
      case AppEvent.LISTENING:
      default:
        return;
    }
  }, [state.eventHost, state.externalLocaleState, importExternalLocaleStates, logEvent, i18n, navigate]);

  useEffect(() => {
    listenEventBus();
  }, [listenEventBus]);

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  const appContext = {
    state,
    dispatch,
    ethersProvider,
  };

  return (
    <ThemeProvider theme={availableThemes[state.theme]}>
      <AppContext.Provider value={appContext}>
        <Header navState={state.navState} setNavState={setNavState} />
        <Body />
        <Footer />
        <Toaster />
        <Overlay state={state.overlayState} />
        <BackTop textColor={theme.text} backgroundColor={theme.background} />
        <GlobalStyle />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
