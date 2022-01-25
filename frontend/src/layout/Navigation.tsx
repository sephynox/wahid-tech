import React, { Component, useContext } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { AppContext } from '../App';
import Buttons from './Buttons';

type Crumb = {
    text: string;
    path: string;
    active?: boolean;
    class?: string;
};

type NavigationProps = {
    navLinks: Array<NavBlock>;
};

type BreadcrumbsProps = {
    links: Array<Crumb>;
};

export enum NavState {
    OPEN = 'active',
    CLOSED = '',
}

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

export const Breadcrumbs = ({ links }: BreadcrumbsProps): JSX.Element => {
    const { t } = useTranslation();

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                {t('home')}
            </Breadcrumb.Item>
            {links.map((crumb: Crumb, i: number) => (
                <Breadcrumb.Item
                    key={i}
                    className={crumb.class}
                    linkAs={Link}
                    linkProps={{ to: crumb.path }}
                    active={crumb.active}
                >
                    {crumb.text}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export const NavToggle = (): JSX.Element => {
    const appContext = useContext(AppContext);

    return (
        <NavToggleStyle
            type="button"
            onClick={() => {
                appContext.toggleNav(undefined, true);
            }}
            className={
                appContext.navState === NavState.CLOSED ? 'bi bi-list mobile-nav-toggle' : `bi bi-x mobile-nav-toggle`
            }
        ></NavToggleStyle>
    );
};

const Navigation: React.FunctionComponent<NavigationProps> = ({ navLinks }: NavigationProps): JSX.Element => {
    const appContext = useContext(AppContext);

    const NavItem = ({
        keyId,
        text,
        icon,
        to,
        className = 'nav-link',
        activeClassName = 'active',
        exact = false,
    }: NavBlock): JSX.Element => {
        const { t } = useTranslation();
        return (
            <NavLink
                onClick={() => appContext.toggleNav(NavState.CLOSED, true)}
                className={className}
                exact={exact}
                activeClassName={activeClassName}
                to={to}
            >
                <i className={'nav-link' + icon}></i> <span>{t(text, text)}</span>
            </NavLink>
        );
    };

    return (
        <NavStyle id="navbar">
            <ul>
                {navLinks.map(
                    (l: NavBlock, i): JSX.Element => (
                        <li key={i}>
                            <NavItem {...l} />
                        </li>
                    ),
                )}
            </ul>
            <Buttons />
        </NavStyle>
    );
};

export default Navigation;

export const NavStyle = styled.nav`
    padding: 15px;
    display: block;
    overflow-x: hidden;
    overflow-y: auto;

    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    & ul {
        list-style: none;
    }

    & hr {
        width: 56px;
    }

    & .nav-menu-buttons {
        z-index: 1061;
    }

    & .nav-menu-buttons button {
        border: none;
    }

    & > ul > li {
        position: relative;
        white-space: nowrap;
    }

    & a,
    .nav-menu-buttons button,
    .nav-menu-buttons button:focus,
    a:focus {
        display: flex;
        align-items: center;
        padding: 10px 18px;
        margin-bottom: 8px;
        font-size: 15px;
        border-radius: 50px;
        height: 56px;
        width: 100%;
        overflow: hidden;
        transition: 0.3s;
    }

    & a i,
    a:focus i,
    .nav-menu-buttons button i {
        font-size: 20px;
    }

    & a span,
    a:focus span {
        padding: 0 5px 0 7px;
    }

    & a:hover,
    .active,
    .active:focus,
    li:hover > a {
        background-color: #0563bb;
    }

    & a:hover,
    li:hover > button,
    li:hover > a,
    .nav-menu-buttons button:hover {
        width: 100%;
    }

    & a:hover span,
    li:hover > button span,
    li:hover > a span,
    .nav-menu-buttons button:hover span {
        display: block;
    }

    @media (min-width: 992px) {
        & a,
        a:focus,
        .nav-menu-buttons button {
            width: 56px;
        }

        & a span,
        a:focus span,
        a:focus span,
        .nav-menu-buttons button span,
        .nav-menu-buttons button:focus span {
            display: none;
        }
    }

    @media screen and (max-width: 992px) {
        & hr {
            width: 100%;
        }
    }
`;

const NavToggleStyle = styled.button`
    position: fixed;
    right: 20px;
    top: 10px;
    z-index: 1000;
    border: 0;
    background: none;
    font-size: 28px;
    transition: all 0.4s;
    outline: none !important;
    line-height: 0;
    cursor: pointer;
    border-radius: 50px;
    padding: 5px;
`;
