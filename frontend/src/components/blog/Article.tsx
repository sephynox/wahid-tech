import React, { useContext } from 'react';
import { Button, Container, Figure } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
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
import Citation from '../../tools/Citation';
import References from '../../tools/References';
import APACitation from '../../tools/APACitation';
import Tags from '../../tools/Tags';

type Props = {
    data: ArticleData;
};

export interface ArticleAuthor {
    given: string;
    middle?: string;
    family: string;
}

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
    component: React.FunctionComponent;
    modified?: Date;
    comments?: boolean;
}

const Article: React.FunctionComponent<Props> = ({ data }: Props) => {
    const { t, i18n } = useTranslation();
    const appContext = useContext(AppContext);

    const article_full_url = Constants.SITE_BLOG_ARTICLE_BASE_URL + data.path;
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
                { text: t('blog'), class: 'capitalize', path: Constants.SITE_BLOG_PATH_BASE },
                { text: t('article'), path: '', class: 'capitalize', active: true }
            ]} />
            <ArticleStyle>
                <header>
                    <Figure>
                        <img src={data.image.url} alt={data.image.alt} />
                    </Figure>
                    <h2 className="text-xs-center">{data.title}</h2>
                    <Container>
                        <DefinitionList>
                            <dt className="capitalize">{t('byline')}:</dt>
                            <dd id="article_authors">{article_authors}</dd>
                            <dt className="capitalize">{t('published')}:</dt>
                            <dd id="article_date_posted">{publish_date}</dd>
                            {modified_date !== null ? (
                                <>
                                    <dt className="capitalize">{t('last_update')}:</dt>
                                    <dd id="modified">{modified_date}</dd>
                                </>
                            ) : null}
                            <dt className="capitalize">{t('summary')}:</dt>
                            <dd id="article_abstract">{data.description}</dd>
                            <dt className="capitalize no-print">{t('share')}:</dt>
                            <dd className="no-print">
                                <SocialLinks url={article_full_url} title={data.title} />
                            </dd>
                            <dt className="capitalize no-print">{t('tags')}:</dt>
                            <dd className="no-print">
                                <Tags tags={data.tags} />
                            </dd>
                            <dt className="capitalize no-print">{t('length')}:</dt>
                            <dd className="no-print">{data.readTime} {t('time.minutes')}</dd>
                        </DefinitionList>
                        <Tocbot
                            header={t('table_of_contents')}
                            contentSelector="article"
                            headingSelector="h4, h5, h6" />
                    </Container>
                </header>
                <h3>{t('full_story')}</h3>
                <HorizontalRule />
                <MyArticle />
                <HorizontalRule />
                <footer>
                    <details>
                        <summary><h3>{t('references')}</h3></summary>
                        <References data={data.references} Format={APACitation} />
                    </details>
                    <details>
                        <summary><h3>{t('citations')}</h3></summary>
                        <CitationGuide
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
                            <summary><h3>{t('comments')}</h3></summary>
                            {appContext.allowedCookieState['disqus']
                                ? <DiscussionEmbed
                                    shortname="wahidtech"
                                    config={{
                                        onNewComment: () => { appContext.logEvent(systemEvents['disqus_comment']) },
                                        url: article_full_url,
                                        identifier: data.path,
                                        title: data.title,
                                        language: i18n.language.replace('-', '_'),
                                    }}
                                />
                                :
                                <p>
                                    {t('content.disqus_disabled')}<br />
                                    <Button
                                        className="capitalize"
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

    & section h2 {
        margin-bottom: 20px;
    }

    & h3 {
        margin: 20px 0 20px 0;
        font-size: 1.3em;
        display: inline-block;
        text-transform: capitalize;
        color: #595959;
    }

    & section h4 {
        margin-top: 30px;
        font-size: 1.2em;
    }

    & .container {
        padding: 0;
    }

    @media screen and (max-width: 768px) {
        text-align: justify;

        & figure {
            padding: 10px;
        }    
    }
`;
