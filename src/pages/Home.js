import React from 'react';
import Posts from '../blog/Posts';
import Postcard from '../components/Postcard';

export default function () {
    const article = Posts[0];

    return (
        <section id="home" className="d-flex flex-column">
            <div className="container margin-auto">
                <div className="section-title">
                    <h2>Wahid Tech</h2>
                    <p>A technology blog analyzing technology through various lenses.</p>
                </div>

                {typeof article !== 'undefined' && typeof article.link !== 'undefined' ? (
                    <>
                        <div className="section-title">
                            <h3>Latest Blog Post</h3>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5">
                                <Postcard title={article.title} date={article.date} text={article.description} image={article.image.url} alt={article.image.alt} link={article.link} />
                            </div>
                            <div className="blog-bottom"></div>
                        </div>
                    </>
                ) : null}
            </div>
        </section >
    );
}
