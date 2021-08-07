import React from 'react';
import * as Constants from '../Constants';
//import Data, { Posts } from '../blog/Data';
//import Postcard from '../components/Postcard';

const Home = (): JSX.Element => {
    //const article = Data[Posts[0]];
    const title = Constants.SITE_NAME;
    const subtext = 'A personal website and technology blog.';

    return (
        <div className="container margin-auto">
            <div className="section-title">
                <h2>{title}</h2>
                <p>{subtext}</p>
            </div>

            {/* {typeof article !== 'undefined' && typeof article.link !== 'undefined' ? (
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
            ) : null} */}
        </div>
    );
};

export default Home;
