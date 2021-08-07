import React from 'react';
import { AppContext } from '../App';

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
    <a href={url} target="_new" title={title}><i className={icon}></i></a>
);

const SocialLinks: React.FunctionComponent<Props> = ({ url, title }: Props): JSX.Element => {
    const appContext = React.useContext(AppContext);

    return (
        <div className="social-links">
            {appContext.socialLinks.map((l: SocialBlock, i): JSX.Element => <SocialLink key={i} {...l} />)}
        </div>
    );
};

export default SocialLinks;
