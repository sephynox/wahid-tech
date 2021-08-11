
import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { AppContext } from '../App';
import Theme from '../tools/Themes';

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

export const Breadcrumbs = ({ links }: BreadcrumbsProps): JSX.Element => {
    const { t } = useTranslation();
    return (
        <Breadcrumb>
            <Breadcrumb.Item className="capitalize" linkAs={NavLink} linkProps={{ to: "/" }}>{t('home')}</Breadcrumb.Item>
            {links.map((crumb: Crumb, i: number) => (
                <Breadcrumb.Item
                    key={i}
                    className={crumb.class}
                    linkAs={NavLink}
                    linkProps={{ to: crumb.path }}
                    active={crumb.active}>{t(crumb.text, crumb.text)}</Breadcrumb.Item>)
            )}
        </Breadcrumb>
    );
};

export const NavToggle = (): JSX.Element => {
    const appContext = React.useContext(AppContext);

    return (
        <NavToggleStyle
            type="button"
            onClick={appContext.toggleNav}
            className={appContext.navState === NavState.CLOSED
                ? 'bi bi-list mobile-nav-toggle'
                : 'bi bi-x mobile-nav-toggle'
            }
        ></NavToggleStyle>
    );
};

const Navigation: React.FunctionComponent<NavigationProps> = ({ navLinks }: NavigationProps): JSX.Element => {
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
        const { t } = useTranslation();
        return (
            <NavLink
                onClick={appContext.toggleNav}
                className={className}
                exact={exact}
                activeClassName={activeClassName}
                to={to}
            >
                <i className={'nav-link' + icon}></i> <span className="capitalize">{t(text, text)}</span>
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

const NavToggleStyle = styled.button<Theme>`
    position: fixed;
    right: 10px;
    top: 10px;
    z-index: 9998;
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
