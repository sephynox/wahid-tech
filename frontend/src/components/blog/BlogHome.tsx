import React from 'react';
import * as Constants from '../../Constants';
import Postcard from '../Postcard';
import Data, { Posts } from './Data';

const BlogHome: React.FunctionComponent = (): JSX.Element => {
    const title = 'Blog Posts';
    const subtext = 'A technology blog analyzing technology through various lenses, disciplines and views.';
    const list = Posts.map((path: string) => {
        const article = Data[path];

        return (
            <div key={article.path} className="col-xs-12 col-sm-12 col-md-12 col-lg-5">
                <Postcard
                    title={article.title}
                    date={article.date}
                    text={article.description}
                    image={article.image}
                    link={Constants.SITE_BLOG_ARTICLE_PATH + article.path}
                />
            </div>
        );
    });
    return (
        <section className="container">
            <div className="title">
                <h2>{title}</h2>
                <p>{subtext}</p>
            </div>
            <div className="row">{list}</div>
            <div className="space-bottom"></div>
        </section>
    );
};

export default BlogHome;
