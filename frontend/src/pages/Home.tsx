import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Constants from '../Constants';
import { donationAddresses } from '../Data';
import { Section } from '../styles/Section';
import NftData, { Nfts } from '../components/nft/Data';
import BlogData, { Posts } from '../components/blog/Data';
import Postcard from '../components/Postcard';
import CryptoAssets from '../tools/CryptoAssets';

const Home = (): JSX.Element => {
    const { t } = useTranslation();

    const article = BlogData[Posts[0]];
    const nft = NftData[Nfts[0]];
    const title = Constants.SITE_NAME;
    const subtext = t('content.home');
    const donate = t('content.donate');

    return (
        <>
            <Section>
                <h2>{title}</h2>
                <header>
                    <em>{subtext}</em>
                </header>
            </Section>
            <Row className="max-1200">
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Section>
                        <h3 className="mb-3">{t('latest_blog_post')}</h3>
                        <Postcard
                            height={700}
                            title={article.title}
                            date={article.date}
                            text={article.description}
                            image={article.image}
                            imagePadding={20}
                            linkText={t('button.read')}
                            link={Constants.SITE_BLOG_ARTICLE_PATH + article.path}
                        />
                    </Section>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Section>
                        <h3 className="mb-3">{t('latest_nft')}</h3>
                        <Postcard
                            height={700}
                            title={nft.name}
                            image={{ url: nft.image_url, alt: nft.name }}
                            text={nft.description}
                            link={Constants.SITE_NFT_ASSET_PATH + Nfts[0]}
                            date={nft.listing_date}
                            linkText={t('view')}
                        />
                    </Section>
                </Col>
            </Row>
            <Section>
                <header>
                    <h3>{t('donate')}</h3>
                    <p>{donate}</p>
                </header>
                <CryptoAssets data={donationAddresses} size={24} />
            </Section>
        </>
    );
};

export default Home;
