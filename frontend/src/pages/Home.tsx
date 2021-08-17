import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Constants from '../Constants';
import { donationAddresses } from '../Data';
import Data, { Posts } from '../components/blog/Data';
import CryptoAssets from '../tools/CryptoAssets';
import Postcard from '../components/Postcard';
import { Col, Container, Row } from 'react-bootstrap';

const Home = (): JSX.Element => {
    const { t } = useTranslation();

    const article = Data[Posts[0]];
    const title = Constants.SITE_NAME;
    const subtext = 'An informational website and technology blog.';

    return (
        <Container>
            <Row>
                <Col>
                    <section>
                        <div className="title">
                            <h2>{title}</h2>
                            <p>{subtext}</p>
                        </div>
                    </section>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={12} lg={6} xl={6}>
                    <section>
                        <h3 className="capitalize">{t('latest_blog_post')}</h3>
                        <Postcard
                            height={600}
                            title={article.title}
                            date={article.date}
                            text={article.description}
                            image={article.image}
                            link={Constants.SITE_BLOG_ARTICLE_PATH + article.path}
                        />
                    </section>
                </Col>
            </Row>
            <Row>
                <Col>
                    <section>
                        <h3 className="capitalize">{t('donate')}</h3>
                        <p>
                            Proceeds will be used to maintain and enhance the platform
                            as well as developing quality content for the blog.
                        </p>
                        <CryptoAssets data={donationAddresses} size={24} />
                    </section>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
