import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as Constants from '../Constants';
import { navLinks } from '../Data';
import { AppContext } from '../App';
import { ThemeEngine } from '../styles/GlobalStyle';
import OpenGraphImage from '../resources/images/opengraph.png';
import LanguageSelector from './LanguageSelector';
import Navigation, { NavState, NavToggle } from './Navigation';
import ScrollTop from './ScrollTop';
import Theme from '../tools/Themes';

const Header: React.FunctionComponent = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const appContext = useContext(AppContext);

    return (
        <HeaderStyle id="header" navState={appContext.navState} className="d-flex flex-column justify-content-center">
            <Helmet>
                <title>{Constants.SITE_TITLE}</title>
                <meta name="author" content={Constants.MY_NAME} />
                <meta name="description" content={t('content.description')} />
                <meta property="og:title" content={Constants.SITE_NAME} />
                <meta property="og:site_name" content={Constants.SITE_NAME}></meta>
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content={OpenGraphImage} />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:description" content={t('content.description')} />
                <meta property="og:locale" content={i18n.language.replace('-', '_')}></meta>
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content={Constants.SITE_DOMAIN} />
                <meta property="twitter:url" content={window.location.href} />
                <meta name="twitter:title" content={Constants.SITE_NAME} />
                <meta name="twitter:description" content={t('content.description')} />
                <meta name="twitter:image" content={OpenGraphImage} />
            </Helmet>
            <NavToggle />
            <ScrollTop />
            <Navigation navLinks={navLinks} />
            <LanguageSelector />
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
