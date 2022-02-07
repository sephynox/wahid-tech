import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import * as Constants from "../Constants";
import { navLinks, SystemCookies, systemLanguages } from "../Data";
import { AppAction, AppContext } from "../App";
import { ThemeEngine } from "../styles/GlobalStyle";
import Theme, { Themes } from "../styles/Themes";
import OpenGraphImage from "../resources/images/opengraph.png";
import LanguageSelector, { LanguageSelectorState } from "./LanguageSelector";
import Navigation from "./Navigation";
import ScrollTop from "./ScrollTop";
import NavToggle, { NavState } from "./NavToggle";
import Buttons from "./Buttons";
import Privacy from "./Privacy";
import { PrivacyCookieState, PrivacyPromptState } from "../components/PrivacyPrompt";

type Props = {
  navState: NavState;
  setNavState: (state: NavState) => void;
};

const Header: React.FunctionComponent<Props> = ({ navState, setNavState }): JSX.Element => {
  const theme: Theme = useTheme();
  const { t, i18n } = useTranslation();
  const appContext = useContext(AppContext);

  const setLanguageSelectorState = (state: LanguageSelectorState) =>
    appContext.dispatch({
      type: state === LanguageSelectorState.CLOSED ? AppAction.CLOSE_LANGUAGES : AppAction.OPEN_LANGUAGES,
    });

  const setPrivacyPromptState = (state: PrivacyPromptState) =>
    appContext.dispatch({
      type: state === PrivacyPromptState.INACTIVE ? AppAction.CLOSE_PRIVACY : AppAction.OPEN_PRIVACY,
    });

  const setTheme = (value: Themes) => appContext.dispatch({ type: AppAction.SET_THEME, theme: value });

  const setPrivacyCookieState = (state: PrivacyCookieState) =>
    appContext.dispatch({ type: AppAction.SET_PRIVACY_STATE, state });

  return (
    <HeaderStyle id="header" navState={navState} className="d-flex flex-column justify-content-center">
      <Helmet>
        <title>{Constants.SITE_TITLE}</title>
        <meta name="author" content={Constants.MY_NAME} />
        <meta name="description" content={t("content.description")} />
        <meta property="og:title" content={Constants.SITE_NAME} />
        <meta property="og:site_name" content={Constants.SITE_NAME}></meta>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={OpenGraphImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:description" content={t("content.description")} />
        <meta property="og:locale" content={i18n.language.replace("-", "_")}></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={Constants.SITE_DOMAIN} />
        <meta property="twitter:url" content={window.location.href} />
        <meta name="twitter:title" content={Constants.SITE_NAME} />
        <meta name="twitter:description" content={t("content.description")} />
        <meta name="twitter:image" content={OpenGraphImage} />
      </Helmet>
      <NavToggle navState={navState} setNavState={(navState) => setNavState(navState)} color={theme.text}>
        <FontAwesomeIcon icon={navState === NavState.CLOSED ? faBars : faTimes} />
      </NavToggle>
      <ScrollTop />
      <Navigation navLinks={navLinks} setNavState={(navState) => setNavState(navState)}>
        <Buttons
          theme={appContext.state.theme}
          privacyPromptState={appContext.state.privacyPromptState}
          languageSelectorState={appContext.state.languageSelectorState}
          systemLanguages={systemLanguages}
          setLanguageSelectorState={setLanguageSelectorState}
          setPrivacyPromptState={setPrivacyPromptState}
          setTheme={setTheme}
        />
      </Navigation>
      <LanguageSelector
        langSelectorState={appContext.state.languageSelectorState}
        setLangSelectorState={setLanguageSelectorState}
        systemLanguages={systemLanguages}
      />
      <Privacy
        systemCookies={SystemCookies()}
        privacyCookieState={appContext.state.privacyCookieState}
        privacyPromptState={appContext.state.privacyPromptState}
        setAllowedCookieState={setPrivacyCookieState}
        setPrivacyPromptState={setPrivacyPromptState}
      />
    </HeaderStyle>
  );
};

export default Header;

const HeaderStyle = styled.header<Theme>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0;
  z-index: 999;
  transition: all 0.5s;
  overflow-y: auto;

  @media (min-width: 993px) {
    & .mobile-nav-toggle {
      display: none;
    }
  }

  @media screen and (max-width: 992px) {
    width: 300px;
    left: ${(props: { navState: NavState }) => (props.navState === NavState.OPEN ? 0 : -300)}px;
    background-color: ${(props: ThemeEngine) => props.theme.background};
    border-right: 1px solid ${(props: ThemeEngine) => props.theme.backgroundDelta};

    & .mobile-nav-toggle {
      color: ${(props: ThemeEngine) => props.theme.text};
    }
  }
`;
