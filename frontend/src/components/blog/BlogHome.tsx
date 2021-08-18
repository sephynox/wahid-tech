import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Constants from '../../Constants';
import Postcard from '../Postcard';
import Data, { Posts } from './Data';

const BlogHome: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();

    const title = 'Blog';
    const subtext = t('content.blog');
    const list = Posts.map((path: string) => {
        const article = Data[path];

        return (
            <Col xs={12} sm={12} md={6} lg={4} xl={4} key={article.path}>
                <Postcard
                    height={600}
                    title={article.title}
                    date={article.date}
                    text={article.description}
                    image={article.image}
                    link={Constants.SITE_BLOG_ARTICLE_PATH + article.path}
                />
            </Col>
        );
    });
    return (
        <section className="container">
            <div className="title">
                <h2>{title}</h2>
                <p>{subtext}</p>
            </div>
            <Row>{list}</Row>
            <div className="space-bottom"></div>
        </section>
    );
};

export default BlogHome;
