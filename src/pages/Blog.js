import React from 'react';
import { Route, Router, Switch, withRouter, useHistory } from 'react-router-dom';
import * as Constants from '../Constants';
import Postcard from '../components/Postcard';
import { Data, Posts } from '../blog/Posts';
import Article from '../components/Article';

export default withRouter(() => {
    const title = 'Blog Posts';
    const subtext = 'A technology blog analyzing technology through various lenses, disciplines and views.';

    var list = Posts.map(function (id) {
        let article = Data[id];

        return (<div key={article.link} className="col-xs-12 col-sm-12 col-md-12 col-lg-5">
            <Postcard title={article.title} date={article.date} text={article.description} image={article.image.url} alt={article.image.alt} link={article.link} />
        </div>);
    });

    return (
        <section id="blog" className="d-flex flex-column">
            <Router history={useHistory()}>
                <div className="margin-auto-vertical">
                    <Switch>
                        <Route path={Constants.SITE_BLOG_PATH_BASE + "*"}
                            render={() => (
                                <Article props={location.pathname} />
                            )} />
                        <Route path="*">
                            <div className="container">
                                <div className="section-title">
                                    <h2>{title}</h2>
                                    <p>{subtext}</p>
                                </div>
                                <div className="row">
                                    {list}
                                </div>
                                <div className="blog-bottom"></div>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </section>
    );
})
