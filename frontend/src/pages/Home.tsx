import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Constants from '../Constants';
import { donationAddresses } from '../Data';
import { Section } from '../styles/Section';
import Data, { Posts } from '../components/blog/Data';
import Postcard from '../components/Postcard';
import CryptoAssets from '../tools/CryptoAssets';

const Home = (): JSX.Element => {
    const { t } = useTranslation();

    const article = Data[Posts[0]];
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
            <Section>
                <h3 className="capitalize mb-3">{t('latest_blog_post')}</h3>
                <Row>
                    <Col xs={12} md={12} lg={6} xl={4}>
                        <Postcard
                            height={600}
                            title={article.title}
                            date={article.date}
                            text={article.description}
                            image={article.image}
                            link={Constants.SITE_BLOG_ARTICLE_PATH + article.path}
                        />
                    </Col>
                </Row>
            </Section>
            <Section>
                <header>
                    <h3 className="capitalize">{t('donate')}</h3>
                    <p>{donate}</p>
                </header>
                <CryptoAssets data={donationAddresses} size={24} />
            </Section>
        </>
    );
};

export default Home;
