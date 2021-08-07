import React from 'react';
import Helmet from 'react-helmet';
import { DiscussionEmbed } from 'disqus-react';
import * as Constants from '../../Constants';
import CitationGuide from '../../tools/CitationGuide';
import SocialLinks from '../../tools/SocialLinks';

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
    modified?: Date;
    authors: Array<ArticleAuthor>;
    title: string;
    component: React.FunctionComponent;
}

const Article: React.FunctionComponent<Props> = ({ data }: Props) => {
    const article_full_url = Constants.SITE_BLOG_ARTICLE_BASE_URL + data.path;
    const article_authors = data.authors
        .map(
            (author: ArticleAuthor) =>
                author.given + (author.middle !== undefined ? author.middle.substr(0, 1) + '. ' : ' ') + author.family,
        )
        .join(', ');
    const MyArticle = data.component;
    const publish_date = data.date.toLocaleDateString();
    const modified_date = data.modified ? data.modified.toLocaleDateString() : null;
    const meta_date = [data.date.getFullYear(), data.date.getMonth(), data.date.getDate()].join('-');
    const meta_modified = data.modified
        ? [data.modified.getFullYear(), data.modified.getMonth(), data.modified.getDate()].join('-')
        : undefined;

    return (
        <div className="container">
            <div className="article-container">
                <Helmet>
                    <meta property="og:title" content={data.title} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={article_full_url} />
                    <meta property="og:image" content={'images/blog/' + data.image.url} />
                    <meta property="og:description" content={data.description} />
                    <meta property="article:published_time" content={meta_date} />
                    <meta property="article:modified_time" content={meta_modified} />
                </Helmet>
                <div className="section-title">
                    <h2>{data.title}</h2>

                    <dl className="dl-horizontal dl-custom">
                        <dt>By:</dt>
                        <dd id="article_authors">{article_authors}</dd>
                        <dt>Published:</dt>
                        <dd id="article_date_posted">{publish_date}</dd>
                        {modified_date !== null ? (
                            <>
                                <dt>Last Update:</dt>
                                <dd id="modified">{modified_date}</dd>
                            </>
                        ) : null}
                        <dt>Summary:</dt>
                        <dd id="article_abstract">{data.description}</dd>
                        <dt className="no-print">Share:</dt>
                        <dd className="no-print">
                            <SocialLinks url={article_full_url} title={data.title} />
                        </dd>
                    </dl>
                </div>
                <div className="article-body">
                    <p className="article-story-line">Full Story</p>
                    <hr className="article-divider-top" />
                    <MyArticle />
                    <hr className="article-divider-bottom" />
                    <p className="article-story-line">Cite this Page</p>
                    <CitationGuide
                        authors={data.authors}
                        publisher={Constants.SITE_NAME}
                        title={data.title}
                        date_year={data.date.getFullYear()}
                        date_month={data.date.toLocaleString('default', { month: 'long' })}
                        date_day={data.date.getDate()}
                    />
                    <hr className="mt-5" />
                    <p className="article-story-line">Comments</p>
                    <div className="article-end-comments">
                        <DiscussionEmbed
                            shortname="wahidtech"
                            config={{
                                url: article_full_url,
                                identifier: data.path,
                                title: data.title,
                                language: 'en',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;
