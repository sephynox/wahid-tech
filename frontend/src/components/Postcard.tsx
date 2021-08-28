import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeEngine } from '../styles/GlobalStyle';
import Theme from '../tools/Themes';

interface Image {
    url: string,
    alt: string,
};

type Props = {
    title: string;
    text: string;
    link: string;
    date: Date;
    image: Image;
    linkText: string;
    height?: number;
    imagePadding?: number;
};

const Postcard: React.FunctionComponent<Props> = (props): JSX.Element => {
    const imagePad = props.imagePadding ?? 0;

    return (
        <PostcardStyle padding={imagePad} height={props.height}>
            <header>
                <img className="card-img-top" src={props.image.url} alt={props.image.alt} />
            </header>
            <div className="card-body">
                <h3 className="card-title">{props.title}</h3>
                <p>{props.date.toLocaleDateString()}</p>
                <p className="card-text">{props.text}</p>
                <NavLink className="btn btn-primary capitalize" to={props.link}>{props.linkText}</NavLink>
            </div>
        </PostcardStyle>
    );
};

export default Postcard;

const PostcardStyle = styled.article<Theme>`
    display: inline-flex;
    flex-direction: column;
    height: ${(props: { height: number }) => props.height}px;
    background-color: ${(props: ThemeEngine) => props.theme.background};
    border: 1px solid ${(props: ThemeEngine) => props.theme.backgroundAlt};

    & header {
        display: inline-flex;
    }

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

    & header img {
        padding: ${(props: { padding: number }) => props.padding}px;;
        max-height: 350px;
        margin-left: auto;
        margin-right: auto;
    }

    @media (min-width: 992px) {
        :nth-child(odd) {
            margin-bottom: 10px;
        }
    }

    @media screen and (max-width: 992px) {
        margin-bottom: 10px;
    }

    @media screen and (max-width: 768px) {
        & header img {
            padding: 0;
        }
    }
`;
