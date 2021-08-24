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
    date: Date;
    image: ArticleImage;
    height?: number;
    linkText?: string;
};

const Postcard = ({ title, text, link, date, image, height = 500, linkText = 'button.read' }: Props): JSX.Element => {
    const { t } = useTranslation();

    return (
        <PostcardStyle height={height}>
            <img className="card-img-top" src={image.url} alt={image.alt} />
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

const PostcardStyle = styled.article<Theme>`
    display: flex;
    flex-direction: column;
    height: ${(props: { height: number }) => props.height}px;
    background-color: ${(props: ThemeEngine) => props.theme.background};
    border: 1px solid ${(props: ThemeEngine) => props.theme.backgroundAlt};

    & .card-body {
        display: flex;
        flex-direction: column;
    }

    & .card-body .card-text {
        height: 100%;
        overflow: hidden;
        line-height: 24px;
        display: -webkit-box;
        box-orient: vertical;
        line-clamp: 5;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -ms-box-orient: vertical;
        -webkit-line-clamp: 5;
        -moz-line-clamp: 5;
        -ms-line-clamp: 5;
    }

    & img {
        padding: 20px;
        display: block;
        max-width: 545px;
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
