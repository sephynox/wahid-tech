import React from 'react';
import * as Constants from '../Constants';

const Article = (props) => {
    meta_date = [props.date.getFullYear(), props.date.getMonth(), props.date.getDate()].join('-');
    meta_modified = props.modified ? [props.modified.getFullYear(), props.modified.getMonth(), props.modified.getDate()].join('-') : null;

    return (
        <div className="container">
            <Helmet>
                <meta property="og:title" content={props.title} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={Constants.SITE_BLOG_ARTICLE_BASE_URL + props.link} />
                <meta property="og:image" content={props.image.url} />
                <meta property="og:description" content={props.description} />
                <meta property="article:published_time" content={meta_date} />
                <meta property="article:modified_time" content={meta_modified} />
            </Helmet>
            <div className="section-title">
                <h2>{props.title}</h2>
                <p>{props.date}</p>
                <p>{meta_date}</p>
            </div>
        </div>
    );
}

export default Article;
