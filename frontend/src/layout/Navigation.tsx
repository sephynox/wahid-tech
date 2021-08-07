
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as Constants from '../Constants';
import { AppContext } from '../App';

type Props = {
    navLinks: Array<NavBlock>;
};

export enum NavState {
    OPEN = 'active',
    CLOSED = ''
};

export type NavBlock = {
    text: string;
    icon: string;
    to: string;
    component: () => JSX.Element | Component;
    keyId?: number;
    className?: string;
    activeClassName?: string;
    exact?: boolean;
};

const Navigation = ({ navLinks }: Props): JSX.Element => {
    const appContext = React.useContext(AppContext);

    const onNav = () => {
        appContext.setNavState(NavState.CLOSED);
        document.body.classList.remove(Constants.NAVIGATION_ACTIVE_CLASS);
        window.dispatchEvent(new Event('scroll')); // Resets BackTop
    };

    const NavItem = ({
        keyId,
        text,
        icon,
        to,
        className = 'nav-link',
        activeClassName = 'active',
        exact = true
    }: NavBlock): JSX.Element => {
        return (
            <NavLink
                onClick={onNav}
                className={className}
                exact={exact}
                activeClassName={activeClassName}
                to={to}
            >
                <i className={'nav-link' + icon}></i> <span>{text}</span>
            </NavLink>
        );
    };

    return (
        <nav id="navbar" className="navbar nav-menu">
            <ul>{navLinks.map((l: NavBlock, i): JSX.Element => <li key={i}><NavItem {...l} /></li>)}</ul>
        </nav>
    );
};

export default Navigation;
