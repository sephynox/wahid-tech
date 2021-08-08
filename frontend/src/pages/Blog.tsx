import React from 'react';
import { Route, Router, Switch, useHistory } from 'react-router-dom';
import * as Constants from '../Constants';
import Data from '../components/blog/Data';
import BlogHome from '../components/blog/BlogHome';
import Article from '../components/blog/Article';

const Blog = (): JSX.Element => {
    return (
        <Router history={useHistory()}>
            <Switch>
                <Route
                    path={Constants.SITE_BLOG_ARTICLE_PATH + '*'}
                    render={() => <Article data={Data[window.location.pathname.replace(Constants.SITE_BLOG_ARTICLE_PATH, '')]} />}
                />
                <Route path="*" component={BlogHome} />
            </Switch>
        </Router>
    );
};

export default Blog;
