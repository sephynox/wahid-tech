import React, { useContext } from 'react';
import { Button, Container, Figure } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';
import i18next from 'i18next';
import { AppContext } from '../../App';
import * as Constants from '../../Constants';
import { systemEvents } from '../../Data';
import { Breadcrumbs } from '../../layout/Navigation';
import { DefinitionList } from '../../styles/DefinitionList';
import HorizontalRule from '../../styles/HorizontalRule';
import Tocbot from '../Tocbot';
import { Image } from '../Lightbox';
import CitationGuide from '../../tools/CitationGuide';
import SocialLinks from '../../tools/SocialLinks';
import Citation, { InTextCitations } from '../../tools/Citation';
import References from '../../tools/References';
import APACitation from '../../tools/APACitation';
import Tags from '../../tools/Tags';
import { formatNumber } from '../../utils/data-formatters';
import { arrayToRecord } from '../../utils/data-helpers';

type Props = {
    data: ArticleData;
};

export interface ArticleAuthor {
    given: string;
    middle?: string;
    family: string;
};

export interface ArticleData {
    id: number;
    path: string;
    description: string;
    image: Image;
    date: Date;
    authors: Array<ArticleAuthor>;
    title: string;
    tags: Array<string>;
    readTime: number;
    references: Array<Citation>;
    component: React.FunctionComponent<InTextCitations>;
    modified?: Date;
    comments?: boolean;
};

const Article: React.FunctionComponent<Props> = ({ data }: Props) => {
    const { t, i18n } = useTranslation();
    const appContext = useContext(AppContext);

    const disqus_lang = i18n.language === 'en-US' ? 'en' : i18n.language.replace('-', '_');
    const article_full_url = Constants.SITE_BLOG_ARTICLE_BASE_URL + data.path;
    const article_references = arrayToRecord(data.references, 'id');
    const article_authors = data.authors
        .map((author: ArticleAuthor) =>
            author.given + (author.middle !== undefined ? author.middle.substr(0, 1) + '. ' : ' ') + author.family,
        ).join(', ');
    const MyArticle = data.component;
    const publish_date = Intl.DateTimeFormat(i18next.language).format(data.date);
    const modified_date = data.modified ? Intl.DateTimeFormat(i18next.language).format(data.modified) : null;
    const meta_date = [data.date.getFullYear(), data.date.getMonth(), data.date.getDate()].join('-');
    const meta_modified = data.modified
        ? [data.modified.getFullYear(), data.modified.getMonth(), data.modified.getDate()].join('-')
        : undefined;

    return (
        <>
            <Helmet>
                <meta property="og:title" content={data.title} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={article_full_url} />
                <meta property="og:image" content={data.image.url} />
                <meta property="og:description" content={data.description} />
                <meta property="article:published_time" content={meta_date} />
                <meta property="article:modified_time" content={meta_modified} />
            </Helmet>
            <Breadcrumbs links={[
                { text: t('blog'), path: Constants.SITE_BLOG_PATH_BASE },
                { text: t('article'), path: '', active: true }
            ]} />
            <ArticleStyle>
                <header>
                    <Figure>
                        <img src={data.image.url} alt={data.image.alt} />
                    </Figure>
                    <h1 className="text-xs-center">{data.title}</h1>
                    <Container>
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
                            <dd><SocialLinks url={article_full_url} title={data.title} /></dd>
                            <dt>{t('tags')}:</dt>
                            <dd><Tags tags={data.tags} /></dd>
                            <dt>{t('length')}:</dt>
                            <dd>{formatNumber(data.readTime, i18next.language, 0)} {t('time.minutes')}</dd>
                        </DefinitionList>
                        <Tocbot
                            header={t('table_of_contents')}
                            contentSelector="article"
                            headingSelector="h3, h4, h5, h6" />
                    </Container>
                </header>
                <h2>{t('full_story')}</h2>
                <HorizontalRule />
                <MyArticle r={article_references} />
                <HorizontalRule />
                <footer>
                    <details>
                        <summary><h2>{t('references')}</h2></summary>
                        <References data={data.references} Format={APACitation} />
                    </details>
                    <details>
                        <summary><h2>{t('citations')}</h2></summary>
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
                    {data.comments &&
                        <details open>
                            <summary><h2>{t('comments')}</h2></summary>
                            {appContext.allowedCookieState['disqus']
                                ? <DiscussionEmbed
                                    shortname="wahidtech"
                                    config={{
                                        onNewComment: () => { appContext.logEvent(systemEvents['disqus_comment']) },
                                        url: article_full_url,
                                        identifier: data.path,
                                        title: data.title,
                                        language: disqus_lang,
                                    }}
                                />
                                :
                                <p>
                                    {t('content.disqus_disabled')}<br />
                                    <Button

                                        onClick={appContext.togglePrivacySelector}
                                        variant="link"
                                    >
                                        {t('data_privacy')}
                                    </Button>
                                </p>
                            }
                        </details>}
                </footer>
            </ArticleStyle>
        </>
    );
};

export default Article;

const ArticleStyle = styled.article`
    max-width: 800px;

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
        color: #595959;
    }

    & section h3 {
        margin-top: 30px;
        font-size: 1.4em;
    }

    & .container {
        padding: 0;
    }

    @media screen and (max-width: 768px) {
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
