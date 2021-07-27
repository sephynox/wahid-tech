import React from 'react';
import { Route, Router, Switch, withRouter, useHistory } from 'react-router-dom';
import FadeIn from '../tools/FadeIn';
import Postcard from '../components/Postcard';
import Posts from '../blog/Posts';

export default withRouter(function () {
    const posts = Posts;

    var list = posts.map(function (article) {
        return (<div key={article.link} className="col-xs-12 col-sm-12 col-md-12 col-lg-5">
            <Postcard title={article.title} date={article.date} text={article.description} image={article.image.url} alt={article.image.alt} link={article.link} />
        </div>);
    });

    return (
        <section id="blog" className="d-flex flex-column">
            <Router history={useHistory()}>
                <FadeIn className="margin-auto-vertical">
                    <Switch>
                        <Route path="/technology-blog/posts/a-decentralized-future">Hello</Route>
                        <Route path="*">
                            <div className="container">
                                <div className="section-title">
                                    <h2>Blog Posts</h2>
                                    <p>A technology blog analyzing technology through various lenses.</p>
                                </div>
                                <div className="row">
                                    {list}
                                </div>
                                <div className="blog-bottom"></div>
                            </div>
                        </Route>
                    </Switch>
                </FadeIn>
            </Router>
        </section>
    );
})
