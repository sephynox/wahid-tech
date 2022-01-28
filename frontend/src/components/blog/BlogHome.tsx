import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Constants from '../../Constants';
import Data, { Posts } from './Data';
import { Section } from '../../styles/Section';
import Postcard from '../../tools/Postcard';

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
                    linkText={t('button.read')}
                    imagePadding={20}
                    link={Constants.SITE_BLOG_ARTICLE_PATH + article.path}
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

export default BlogHome;
