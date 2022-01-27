import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Constants from '../Constants';
import BlogHome from '../components/blog/BlogHome';
import Article from '../components/blog/Article';

const Blog = (): JSX.Element => {
    return (
        <Switch>
            <Route exact path={Constants.SITE_BLOG_PATH_BASE} component={BlogHome} />
            <Route path={`${Constants.SITE_BLOG_ARTICLE_PATH}:id`} component={Article} />
        </Switch>
    );
};

export default Blog;
