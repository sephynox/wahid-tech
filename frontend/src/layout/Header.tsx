import React from 'react';
import styled from 'styled-components';
import Theme from '../tools/Themes';
import { navLinks } from '../Data';
import Buttons from './Buttons';
import LanguageSelector from './LanguageSelector';
import Navigation from './Navigation';
import ScrollTop from './ScrollTop';

const Header: React.FunctionComponent = (): JSX.Element => {
    return (
        <HeaderStyle id="header" className="d-flex flex-column justify-content-center">
            <ScrollTop />
            <Navigation navLinks={navLinks} />
            <Buttons />
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
`;
