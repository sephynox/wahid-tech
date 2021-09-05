import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Section } from '../../styles/Section';
import * as Constants from '../../Constants';
import Postcard from '../Postcard';
import Data, { Nfts } from './Data';

const NftHome: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();

    const title = 'NFTs';
    const subtext = t('content.nfts');
    const list = Nfts.map((path: string) => {
        const nft = Data[path];
        const link = Constants.SITE_NFT_ASSET_PATH + path;
        const name: string = nft.name ?? t('no_name');
        const description: string = nft.description;
        const image = {
            url: nft.image_url,
            alt: name
        };

        return (
            <Col xs={12} sm={12} md={6} lg={4} xl={4} key={path}>
                <Postcard
                    height={700}
                    title={name}
                    image={image}
                    text={description}
                    link={link}
                    date={nft.listing_date}
                    linkText={t('view')}
                />
            </Col>
        );
    });

    return (
        <Section>
            <header>
                <h1>{title}</h1>
                <em>{subtext}</em>
            </header>
            <Row>{list}</Row>
        </Section>
    );
};

export default NftHome;
