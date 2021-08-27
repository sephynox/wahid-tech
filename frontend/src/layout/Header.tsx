import React from 'react';
import styled from 'styled-components';
import Theme from '../tools/Themes';
import { navLinks } from '../Data';
import { ThemeEngine } from '../styles/GlobalStyle';
import LanguageSelector from './LanguageSelector';
import Navigation, { NavToggle } from './Navigation';
import ScrollTop from './ScrollTop';

const Header: React.FunctionComponent = (): JSX.Element => {
    return (
        <HeaderStyle id="header" className="d-flex flex-column justify-content-center">
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
    z-index: 999;
    transition: all 0.5s;
    padding: 15px;
    overflow-y: auto;

    @media (min-width: 992px) {
        & .mobile-nav-toggle {
            display: none;
        }
    }

    @media screen and (max-width: 992px) {
        width: 300px;
        left: -300px;
        background-color: ${(props: ThemeEngine) => props.theme.background};
        border-right: 1px solid ${(props: ThemeEngine) => props.theme.backgroundDelta};
    }
`;
