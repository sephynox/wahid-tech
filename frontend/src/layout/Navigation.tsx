
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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


export const NavMenu = (): JSX.Element => {
    const appContext = React.useContext(AppContext);

    return (
        <button
            type="button"
            onClick={appContext.toggleNav}
            className={appContext.navState === NavState.CLOSED
                ? 'bi bi-list mobile-nav-toggle'
                : 'bi bi-x mobile-nav-toggle'
            }
        ></button>
    );
};

const Navigation = ({ navLinks }: Props): JSX.Element => {
    const appContext = React.useContext(AppContext);

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
                onClick={appContext.toggleNav}
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
