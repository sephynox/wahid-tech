import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { DiscussionEmbed } from 'disqus-react';
import * as Constants from '../../Constants';
import CitationGuide from '../../tools/CitationGuide';
import SocialLinks from '../../tools/SocialLinks';
import { Breadcrumbs } from '../../layout/Navigation';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { Button, Container, Figure } from 'react-bootstrap';
import HorizontalRule from '../../styles/HorizontalRule';
import { AppContext } from '../../App';
import { systemEvents } from '../../Data';
import { BlogPost } from '../../styles/BlogPost';
import Citation from '../../tools/Citation';
import References from '../../tools/References';
import APACitation from '../../tools/APACitation';

type Props = {
    data: ArticleData;
};

export interface ArticleAuthor {
    given: string;
    middle?: string;
    family: string;
}

export interface ArticleImage {
    url: string;
    alt: string;
}

export interface ArticleData {
    id: number;
    path: string;
    description: string;
    image: ArticleImage;
    date: Date;
    authors: Array<ArticleAuthor>;
    title: string;
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
        .map(
            (author: ArticleAuthor) =>
                author.given + (author.middle !== undefined ? author.middle.substr(0, 1) + '. ' : ' ') + author.family,
        )
        .join(', ');
    const MyArticle = data.component;
    const publish_date = Intl.DateTimeFormat(i18next.language).format(data.date);
    const modified_date = data.modified ? Intl.DateTimeFormat(i18next.language).format(data.modified) : null;
    const meta_date = [data.date.getFullYear(), data.date.getMonth(), data.date.getDate()].join('-');
    const meta_modified = data.modified
        ? [data.modified.getFullYear(), data.modified.getMonth(), data.modified.getDate()].join('-')
        : undefined;

    return (
        <Container>
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
            <BlogPost>
                <section>
                    <Figure>
                        <img src={data.image.url} alt={data.image.alt} />
                    </Figure>
                    <h2 className="text-xs-center">{data.title}</h2>
                    <Container>
                        <dl className="dl-horizontal dl-custom">
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
                        </dl>
                    </Container>
                </section>
                <section>
                    <Container>
                        <h3>{t('full_story')}</h3>
                        <HorizontalRule />
                        <MyArticle />
                        <HorizontalRule />
                    </Container>
                    <Container>
                        <h3>{t('references')}</h3>
                        <References data={data.references} Format={APACitation} />
                    </Container>
                    <Container>
                        <h3>{t('citations')}</h3>
                        <CitationGuide
                            authors={data.authors}
                            publisher={Constants.SITE_NAME}
                            title={data.title}
                            date_year={data.date.getFullYear()}
                            date_month={data.date.toLocaleString('default', { month: 'long' })}
                            date_day={data.date.getDate()}
                        />
                    </Container>{data.comments &&
                        <Container className="mt-3">
                            <h3>{t('comments')}</h3>
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
                        </Container>}
                </section>
            </BlogPost>
        </Container>
    );
};

export default Article;
