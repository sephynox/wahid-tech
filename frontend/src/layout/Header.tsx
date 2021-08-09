import React from 'react';
import { navLinks } from '../Data';
import Buttons from './Buttons';
import LanguageSelector from './LanguageSelector';
import Navigation from './Navigation';

const Header: React.FunctionComponent = (): JSX.Element => {
    return (
        <header id="header" className="d-flex flex-column justify-content-center">
            <Navigation navLinks={navLinks} />
            <Buttons />
            <LanguageSelector />
        </header>
    );
};

export default Header;
