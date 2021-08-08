import React from 'react';
import { AppContext } from '../App';
import styled from 'styled-components';
import Theme from '../tools/Themes';

type Props = {
    title: string
    url: string,
};

export type SocialBlock = {
    title: string,
    icon: string,
    url: string
};

export const SocialLink = ({ title, icon, url }: SocialBlock): JSX.Element => (
    <SocialLinkStyle href={url} target="_new" title={title}><i className={icon}></i></SocialLinkStyle>
);

const SocialLinks: React.FunctionComponent<Props> = ({ url, title }: Props): JSX.Element => {
    const appContext = React.useContext(AppContext);
    return (<>{appContext.socialLinks.map((l: SocialBlock, i): JSX.Element => <SocialLink key={i} {...l} />)}</>);
};

export default SocialLinks;

const SocialLinkStyle = styled.a<Theme>`
    font-size: 24px;
    display: inline-block;
    line-height: 1;
    margin-right: 20px;
    transition: 0.3s;

    &:hover #
`;
