import React from 'react';
import * as Constants from '../Constants';
import { AppContext } from '../App';
import { navLinks } from '../Data';
import Buttons from '../components/Buttons';
import Navigation, { NavState } from './Navigation';
import { OverlayState } from './Overlay';

const Header: React.FunctionComponent = (): JSX.Element => {
    const appContext = React.useContext(AppContext);

    const toggleNav = () => {
        let mode: NavState = NavState.CLOSED;

        if (appContext.navState === NavState.CLOSED) {
            mode = NavState.OPEN;
            document.body.classList.add(Constants.NAVIGATION_ACTIVE_CLASS);
        } else {
            document.body.classList.remove(Constants.NAVIGATION_ACTIVE_CLASS);
        }

        appContext.setOverlayState(appContext.navState === NavState.CLOSED ? OverlayState.HIDE : OverlayState.SHOW);
        appContext.setNavState(mode);
    };

    return (
        <header id="header" className="d-flex flex-column justify-content-center">
            <button
                type="button"
                onClick={toggleNav}
                className={appContext.navState === NavState.CLOSED
                    ? 'bi bi-list mobile-nav-toggle d-xl-none'
                    : 'bi bi-x mobile-nav-toggle d-xl-none'
                }
            ></button>
            <Navigation navLinks={navLinks} />
            <Buttons />
        </header>
    );
};

export default Header;
