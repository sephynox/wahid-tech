import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ArticleImage } from './blog/Article';
import { ThemeEngine } from '../styles/GlobalStyle';
import Theme from '../tools/Themes';

type Props = {
    title: string;
    text: string;
    link: string;
    linkText?: string;
    image: ArticleImage;
    date: Date;
};

const Postcard = ({ title, text, link, image, date, linkText = 'button.read' }: Props): JSX.Element => {
    const { t } = useTranslation();
    return (
        <PostcardStyle>
            <img className="card-img-top" src={'/images/blog/' + image.url} alt={image.alt} />
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p>{date.toLocaleDateString()}</p>
                <p className="card-text">{text}</p>
                <NavLink className="btn btn-primary capitalize" to={link}>{t(linkText)}</NavLink>
            </div>
        </PostcardStyle>
    );
};

export default Postcard;


const PostcardStyle = styled.div<Theme>`
    background-color: ${(props: ThemeEngine) => props.theme.background};
    border: 1px solid ${(props: ThemeEngine) => props.theme.backgroundAlt};

    & img {
        padding: 20px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    @media (min-width: 992px) {
        & :nth-child(odd) {
            margin-bottom: 10px;
        }
    }

    @media screen and (max-width: 992px) {
        margin-bottom: 10px;
    }
`;
