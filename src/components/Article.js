import React from 'react';
import Helmet from 'react-helmet';
import { DiscussionEmbed } from 'disqus-react';
import * as Constants from '../Constants';
import Data from '../blog/Posts';

const Article = (article) => {
    const article_name = article.props.replace(Constants.SITE_BLOG_PATH_BASE, '');
    const article_data = Data[article_name];
    const article_full_url = Constants.SITE_BLOG_ARTICLE_BASE_URL + article_data.link;
    const MyArticle = article_data.component;
    const publish_date = article_data.date.toLocaleDateString();
    const modified_date = article_data.modified ? article_data.modified.toLocaleDateString() : null;
    const meta_date = [article_data.date.getFullYear(), article_data.date.getMonth(), article_data.date.getDate()].join('-');
    const meta_modified = article_data.modified ? [article_data.modified.getFullYear(), article_data.modified.getMonth(), article_data.modified.getDate()].join('-') : null;

    return (
        <div className="container">
            <div className="article-container">
                <Helmet>
                    <meta property="og:title" content={article_data.title} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={Constants.SITE_BLOG_ARTICLE_BASE_URL + article_data.link} />
                    <meta property="og:image" content={'images/blog/' + article_data.image.url} />
                    <meta property="og:description" content={article_data.description} />
                    <meta property="article:published_time" content={meta_date} />
                    <meta property="article:modified_time" content={meta_modified} />
                </Helmet>
                <div className="section-title">
                    <h2>{article_data.title}</h2>

                    <dl className="dl-horizontal dl-custom">
                        <dt>Published:</dt>
                        <dd id="date_posted">{publish_date}</dd>
                        {modified_date !== null ? (
                            <>
                                <dt>Last Update:</dt>
                                <dd id="modified">{modified_date}</dd>
                            </>
                        ) : null}
                        <dt>Summary:</dt>
                        <dd id="abstract">{article_data.description}</dd>
                        <dt className="no-print">Share:</dt>
                        <dd className="no-print">
                            <div className="article-social-links">
                                <a href={'https://www.facebook.com/sharer/sharer.php?u=' + article_full_url} target="_new" className="facebook" title="Facebook"><i className="icon bi-facebook"></i></a>
                                <a href={'https://twitter.com/intent/tweet?url=' + article_full_url} target="_new" className="twitter" title="Twitter"><i className="icon bi-twitter"></i></a>
                                <a href={'https://www.linkedin.com/shareArticle?mini=true&url=' + article_full_url} target="_new" className="linkedin" title="LinkedIn"><i className="icon bi-linkedin"></i></a>
                                <a href={'mailto:info@example.com?subject=' + article_data.title + '&body=' + article_full_url} target="_new" className="email" title="Email"><i className="icon bi-envelope-open-fill"></i></a>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div className="article-body">
                    <p className="article-story-line">Full Story</p>
                    <hr className="article-divider-top" />
                    <MyArticle />
                    <hr className="article-divider-bottom" />
                    <p className="article-story-line">Comments</p>
                    <hr />
                    <DiscussionEmbed
                        shortname='wahidtech'
                        config={
                            {
                                url: article_full_url,
                                identifier: article_data.link,
                                title: article_data.title,
                                language: 'en'
                            }
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Article;
