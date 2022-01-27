import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Constants from '../Constants';
import { Section } from '../styles/Section';
import NftData, { Nfts } from '../components/nft/Data';
import BlogData, { Posts } from '../components/blog/Data';
import ProjectData, { Projects } from '../components/projects/Data';
import Postcard from '../tools/Postcard';

const Home = (): JSX.Element => {
    const { t } = useTranslation();

    const article = BlogData[Posts[0]];
    const nft = NftData[Nfts[0]];
    const project = ProjectData[Projects[0]];
    const title = Constants.SITE_NAME;
    const subtext = t('content.home');

    return (
        <>
            <Section>
                <h1>{title}</h1>
                <header>
                    <em>{subtext}</em>
                </header>
            </Section>
            <Row className="max-1200">
                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
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
                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                    <Section>
                        <h3 className="mb-3">{t('latest_project')}</h3>
                        <Postcard
                            height={700}
                            title={project.name}
                            image={project.image}
                            text={project.description}
                            link={Constants.SITE_PROJECT_ASSET_PATH + Projects[0]}
                            date={project.date}
                            linkText={t('view')}
                        />
                    </Section>
                </Col>
                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
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
        </>
    );
};

export default Home;
