import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Constants from '../Constants';
import NotFound from './NotFound';
import Data from '../components/blog/Data';
import BlogHome from '../components/blog/BlogHome';
import Article from '../components/blog/Article';

const Blog = (): JSX.Element => {
    const data = Data[window.location.pathname.replace(Constants.SITE_BLOG_ARTICLE_PATH, '')];

    return (
        <Switch>
            {data !== undefined &&
                <Route
                    path={Constants.SITE_BLOG_ARTICLE_PATH + '*'}
                    render={() => <Article data={data} />}
                />}
            <Route exact path={Constants.SITE_BLOG_PATH_BASE} component={BlogHome} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default Blog;
