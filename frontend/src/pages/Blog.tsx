import React from 'react';
import { Route, Router, Switch, withRouter, useHistory } from 'react-router-dom';
import * as Constants from '../Constants';
import Postcard from '../components/Postcard';
import Data, { Posts } from '../blog/Data';
import Article from '../components/Article';

const Blog = (): JSX.Element => {
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
                    link={Constants.SITE_BLOG_PATH_BASE + article.path}
                />
            </div>
        );
    });

    return (
        <section id="blog" className="d-flex flex-column">
            <Router history={useHistory()}>
                <div className="margin-auto-vertical">
                    <Switch>
                        <Route
                            path={Constants.SITE_BLOG_PATH_BASE + '*'}
                            render={() => <Article data={Data[window.location.pathname.replace(Constants.SITE_BLOG_PATH_BASE, '')]} />}
                        />
                        <Route path="*">
                            <div className="container">
                                <div className="section-title">
                                    <h2>{title}</h2>
                                    <p>{subtext}</p>
                                </div>
                                <div className="row">{list}</div>
                                <div className="blog-bottom"></div>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </section>
    );
};

export default withRouter(Blog);
