import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import { Col, Container, Figure, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import i18next from 'i18next';
import { AppContext } from '../../App';
import * as Constants from '../../Constants';
import { Breadcrumbs } from '../../layout/Navigation';
import { ThemeEngine } from '../../styles/GlobalStyle';
import { DefinitionList } from '../../styles/DefinitionList';
import HorizontalRule from '../../styles/HorizontalRule';
import Tocbot from '../Tocbot';
import { Image } from '../Lightbox';
import Comments from '../Comments';
import CitationGuide from '../../tools/CitationGuide';
import SocialLinks from '../../tools/SocialLinks';
import Citation, { Author, formatAuthorName, InTextCitations } from '../../tools/Citation';
import References from '../../tools/References';
import APACitation from '../../tools/APACitation';
import Tags from '../../tools/Tags';
import { formatNumber } from '../../utils/data-formatters';
import { arrayToRecord } from '../../utils/data-helpers';
import Blockies from '../../tools/Blockies';
import { ensLookupReducer, fetchAddresses, initialEnsLookupState } from '../../actions/Ethereum';

type Props = {
    data: ArticleData;
};

export interface ArticleData {
    id: number;
    path: string;
    description: string;
    image: Image;
    date: Date;
    authors: Author[];
    title: string;
    tags: string[];
    readTime: number;
    references: Citation[];
    component: React.FunctionComponent<InTextCitations>;
    modified?: Date;
    comments?: boolean;
}

const Article: React.FunctionComponent<Props> = ({ data }: Props) => {
    const appContext = useContext(AppContext);
    const { t } = useTranslation();
    const [ensData, dispatchEnsData] = useReducer(ensLookupReducer, initialEnsLookupState);

    const authorResolver = useCallback(async () => {
        fetchAddresses(
            data.authors.filter((authors) => !!authors.dns).map((authors) => authors.dns as string),
            appContext.ethersProvider,
        )(dispatchEnsData);
    }, [data.authors, appContext.ethersProvider]);

    const MyArticle = data.component;
    const article_full_url = Constants.SITE_BLOG_ARTICLE_BASE_URL + data.path;
    const article_references = arrayToRecord(data.references, 'id');
    const article_authors = data.authors.map((author: Author) => formatAuthorName(author)).join(', ');
    const publish_date = Intl.DateTimeFormat(i18next.language).format(data.date);
    const modified_date = data.modified ? Intl.DateTimeFormat(i18next.language).format(data.modified) : null;
    const meta_date = [data.date.getFullYear(), data.date.getMonth(), data.date.getDate()].join('-');
    const meta_modified = data.modified
        ? [data.modified.getFullYear(), data.modified.getMonth(), data.modified.getDate()].join('-')
        : undefined;

    useEffect(() => {
        authorResolver();
    }, [authorResolver]);

    return (
        <>
            <Helmet>
                <meta property="og:title" content={data.title} data-react-helmet="true" />
                <meta property="og:type" content="article" data-react-helmet="true" />
                <meta property="og:url" content={article_full_url} data-react-helmet="true" />
                <meta property="og:image" content={data.image.url} data-react-helmet="true" />
                <meta property="og:description" content={data.description} data-react-helmet="true" />
                <meta property="article:published_time" content={meta_date} data-react-helmet="true" />
                <meta property="article:modified_time" content={meta_modified} data-react-helmet="true" />
                {data.authors.map((a, i) => (
                    <meta key={i} property="article:author" content={formatAuthorName(a)} />
                ))}
                {data.tags.map((t, i) => (
                    <meta key={i} property="article:tag" content={t} />
                ))}
            </Helmet>
            <Breadcrumbs
                links={[
                    { text: t('blog'), path: Constants.SITE_BLOG_PATH_BASE },
                    { text: t('article'), path: '', active: true },
                ]}
            />
            <ArticleStyle>
                <header>
                    <Figure>
                        <img src={data.image.url} alt={data.image.alt} />
                    </Figure>
                    <h1 className="text-xs-center">{data.title}</h1>
                    <Container>
                        <Row>
                            <Col xs={12} sm={12} md={2}>
                                <Blockies state={ensData} width={100} />
                            </Col>
                            <Col xs={12} md={10}>
                                <DefinitionList>
                                    <dt>{t('byline')}:</dt>
                                    <dd>{article_authors}</dd>
                                    <dt>{t('published')}:</dt>
                                    <dd>{publish_date}</dd>
                                    {modified_date !== null ? (
                                        <>
                                            <dt>{t('last_update')}:</dt>
                                            <dd>{modified_date}</dd>
                                        </>
                                    ) : null}
                                    <dt>{t('summary')}:</dt>
                                    <dd>{data.description}</dd>
                                    <dt>{t('share')}:</dt>
                                    <dd>
                                        <SocialLinks url={article_full_url} title={data.title} />
                                    </dd>
                                    <dt>{t('tags')}:</dt>
                                    <dd>
                                        <Tags tags={data.tags} />
                                    </dd>
                                    <dt>{t('length')}:</dt>
                                    <dd>
                                        {formatNumber(data.readTime, i18next.language, 0)} {t('time.minutes')}
                                    </dd>
                                </DefinitionList>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Tocbot
                                    header={t('table_of_contents')}
                                    contentSelector="article"
                                    headingSelector="h3, h4, h5, h6"
                                />
                            </Col>
                        </Row>
                    </Container>
                </header>
                <h2>{t('full_story')}</h2>
                <HorizontalRule />
                <MyArticle r={article_references} />
                <HorizontalRule />
                <footer>
                    {data.references.length > 0 && (
                        <details>
                            <summary>
                                <h2>{t('references')}</h2>
                            </summary>
                            <References data={data.references} Format={APACitation} />
                        </details>
                    )}
                    <details>
                        <summary>
                            <h2>{t('citations')}</h2>
                        </summary>
                        <CitationGuide
                            id={data.authors[0].family}
                            authors={data.authors}
                            publisher={Constants.SITE_NAME}
                            title={data.title}
                            date_year={data.date.getFullYear()}
                            date_month={data.date.toLocaleString('default', { month: 'long' })}
                            date_day={data.date.getDate()}
                        />
                    </details>
                    {data.comments && (
                        <details open>
                            <summary>
                                <h2>{t('comments')}</h2>
                            </summary>
                            <Comments full_url={article_full_url} identifier={data.path} title={data.title} />
                        </details>
                    )}
                </footer>
            </ArticleStyle>
        </>
    );
};

export default Article;

const ArticleStyle = styled.article`
    max-width: 800px;

    & section > figure {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    & section {
        padding: 0;
    }

    & section h1 {
        margin-bottom: 20px;
    }

    & h2 {
        margin: 20px 0 20px 0;
        font-size: 1.3em;
        display: inline-block;
        text-transform: capitalize;
        color: ${(props: ThemeEngine) => props.theme.subduedText};
    }

    & section h3 {
        margin-top: 30px;
        font-size: 1.4em;
    }

    & section h4 {
        margin-top: 20px;
        font-size: 1.1em;
    }

    & .container {
        padding: 0;
    }

    @media screen and (max-width: 768px) {
        & header + h2 {
            display: block;
            text-align: center;
        }

        & footer p {
            text-align: left;
        }

        & section p {
            text-align: justify;
        }

        & figure {
            padding: 10px;
        }
    }
`;
