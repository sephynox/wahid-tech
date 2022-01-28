import React, { useCallback, useContext, useEffect, useReducer, useRef } from 'react';
import { Col, Container, Figure, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import i18next from 'i18next';
import tocbot from 'tocbot';
import { AppContext } from '../../App';
import * as Constants from '../../Constants';
import { ensLookupReducer, EnsLookupState, fetchAddresses, initialEnsLookupState } from '../../actions/Ethereum';
import { Breadcrumbs } from '../../layout/Navigation';
import { ThemeEngine } from '../../styles/GlobalStyle';
import { DefinitionList } from '../../styles/DefinitionList';
import HorizontalRule from '../../styles/HorizontalRule';
import NotFound from '../../pages/NotFound';
import Tocbot from '../Tocbot';
import Comments from '../Comments';
import Data from './Data';
import { Image } from '../../tools/Lightbox';
import CitationGuide from '../../tools/CitationGuide';
import SocialLinks from '../../tools/SocialLinks';
import Citation, { Author, formatAuthorName, InTextCitations } from '../../tools/Citation';
import References from '../../tools/References';
import APACitation from '../../tools/APACitation';
import Tags from '../../tools/Tags';
import { formatNumber } from '../../utils/data-formatters';
import { arrayToRecord } from '../../utils/data-helpers';
import Blockies from '../../tools/Blockies';
import { QuietList } from '../../styles/Lists';

export enum ArticleEditType {
    CORRECTION = 'correction',
    RETRACTION = 'retraction',
    ADDENDA = 'addenda',
    CONCERN = 'concern',
    COMMENT = 'comment',
}

export interface ArticleEdit {
    date: Date;
    type: ArticleEditType;
    reason: string;
}

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
    comments?: boolean;
    edits?: ArticleEdit[];
}

const Article: React.FunctionComponent = (): JSX.Element => {
    const isActive = useRef(true);
    const appContext = useContext(AppContext);
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const [ensData, dispatchEnsData] = useReducer(ensLookupReducer, initialEnsLookupState);

    const data = Data[id];

    const editItem = (edit: ArticleEdit, index: number): JSX.Element => {
        return (
            <li key={index}>
                <strong>
                    {t(edit.type.toString())}: {Intl.DateTimeFormat(i18next.language).format(edit.date)}
                </strong>
                <p>
                    <i>{edit.reason}</i>
                </p>
            </li>
        );
    };

    const dispatchEnsDataAssist = (state: EnsLookupState): void => {
        if (isActive.current) {
            dispatchEnsData(state);
        }
    };

    const authorResolver = useCallback(async () => {
        fetchAddresses(
            data.authors.filter((authors) => !!authors.dns).map((authors) => authors.dns as string),
            appContext.ethersProvider,
        )(dispatchEnsDataAssist);
    }, [data.authors, appContext.ethersProvider]);

    useEffect(() => {
        //contentsProvider();
        authorResolver();

        return () => {
            isActive.current = false;
            tocbot.destroy();
        };
    }, [data, authorResolver]);

    if (data === undefined) {
        return <NotFound />;
    }

    const MyArticle = data.component;
    const article_full_url = Constants.SITE_BLOG_ARTICLE_BASE_URL + data.path;
    const article_references = arrayToRecord(data.references, 'id');
    const article_authors = data.authors.map((author: Author) => formatAuthorName(author)).join(', ');
    const publish_date = Intl.DateTimeFormat(i18next.language).format(data.date);
    const meta_date = [data.date.getFullYear(), data.date.getMonth(), data.date.getDate()].join('-');
    const modified_date = data.edits
        ? Intl.DateTimeFormat(i18next.language).format(
              data.edits.reduce((prev, next) => (next.date > prev.date ? next : prev)).date,
          )
        : undefined;
    const meta_modified = modified_date;

    return (
        <>
            <Helmet>
                <title>{data.title}</title>
                <meta property="og:title" content={data.title} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={article_full_url} />
                <meta property="og:image" content={data.image.url} />
                <meta property="og:description" content={data.description} />
                <meta property="article:published_time" content={meta_date} />
                <meta property="article:modified_time" content={meta_modified} />
                <meta name="twitter:card" content="summary" />
                <meta property="twitter:domain" content={Constants.SITE_DOMAIN} />
                <meta property="twitter:url" content={article_full_url} />
                <meta name="twitter:title" content={data.title} />
                <meta name="twitter:description" content={data.description} />
                <meta name="twitter:image" content={data.image.url} />
                <meta name="keywords" content={data.tags.map((t) => t).join(',')} />
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
                                    {modified_date !== undefined ? (
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
                    </Container>
                    <h2>{t('full_story')}</h2>
                    <HorizontalRule />
                </header>
                <Tocbot header={t('table_of_contents')} contentSelector="article" headingSelector="h3, h4, h5, h6" />
                <MyArticle r={article_references} />
                <footer>
                    <HorizontalRule />
                    {data.edits !== undefined && data.edits.length > 0 && (
                        <details>
                            <summary>
                                <h2>{t('edits')}</h2>
                            </summary>
                            <QuietList>{data.edits.map((edit, i) => editItem(edit, i))}</QuietList>
                        </details>
                    )}
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
        padding-bottom: 20px;
    }

    & h2 {
        padding: 20px 0 20px 0;
        font-size: 1.3em;
        display: inline-block;
        text-transform: capitalize;
        color: ${(props: ThemeEngine) => props.theme.subduedText};
    }

    & h3 {
        font-size: 1.2em;
    }

    & section h3 {
        padding-top: 30px;
        font-size: 1.4em;
    }

    & section h4 {
        padding-top: 20px;
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
