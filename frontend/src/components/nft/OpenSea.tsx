import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Eth } from 'react-cryptocoins';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { ThemeEngine } from '../../styles/GlobalStyle';

type Props = {
    button: string;
    address: string;
    price: string;
    image: { url: string, alt: string };
}

const OpenSea: React.FunctionComponent<Props> = (props): JSX.Element => {
    const url = `https://opensea.io/assets/${props.address}`;
    const button = <>{props.button} <Eth /> {props.price}</>;

    return (
        <OpenSeaStyle>
            <Row>
                <Col xs={12} sm={6} md={6} lg={6} className="description">
                    <QRCode className="code" value={url} />
                    <div className="logo"></div>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} className="image">
                    <img src={props.image.url} alt={props.image.alt} />
                    <Button className="capitalize" target="_blank" href={url}>{button}</Button>
                </Col>
            </Row>
        </OpenSeaStyle>
    );
};

export default OpenSea;

const OpenSeaStyle = styled.article`
    max-width: 100%;
    max-height: 250px;
    text-align: right;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};

    & div.description {
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
        padding-right: 30px;
    }

    & div.description .code {
        margin: auto;
    }
    
    & div.description .price {
        text-align: right;
    }

    & div.description .logo {
        margin-top: 15px;
        margin-left: auto;
        margin-right: auto;
        width: 140px;
        height: 32px;
        background-image: url('${(props: ThemeEngine) => props.theme.images.opensea}');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }

    & div.image {
        padding: 0;
        position: relative;
        max-height: 100%;
    }

    & div.image img {
        max-width: 100%;
    }

    & div.image a {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
    }

    @media screen and (max-width: 768px) {
        max-height: unset;

        & div.description, div.image {
            width: 100%;
            max-width: unset;
        }
    }
`;
