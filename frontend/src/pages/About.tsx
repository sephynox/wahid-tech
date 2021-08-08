import React from 'react';
import Typed from 'react-typed';
import * as Constants from '../Constants';

const About = (): JSX.Element => {
    const bio_text =
        'I began my journey in software development when I was  13 years old. After almost two decades, technology has become a part of me. However, technology does not exist in a vacuum, and in order to understand technology one must understand its effects through history, on society, and the within the various disciplines it forever changes. It is this holistic and fundamental understanding that allows one to truly appreciate and understand the implications of technology upon humanity.';
    const typed_options = {
        strings: [
            'VP of Engineering',
            'Software Architect',
            'Fullstack Developer',
            'Web App Engineer',
            'Mobile Engineer',
            'DevOps Engineer',
            'CSec Analyst',
            'Compliance Officer',
        ],
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
    };

    return (
        <section id="about" className="container">
            <h1>{Constants.MY_NAME}</h1>
            <div className="container">
                <div className="row">
                    <p className="typed-container">
                        I&apos;m a <Typed {...typed_options} />
                    </p>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <hr />
                        {bio_text}
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="social-links">
                            <a
                                href="https://www.linkedin.com/in/twahid"
                                target="_new"
                                className="linkedin"
                                title="LinkedIn"
                            >
                                <i className="icon bi-linkedin"></i>
                            </a>
                            <a href="resume.pdf" target="_new" className="linkedin" title="Resume">
                                <i className="icon bi-file-earmark-person-fill"></i>
                            </a>
                            <a
                                href="https://github.com/sephynox/wahid-tech"
                                target="_new"
                                className="github"
                                title="GitHub"
                            >
                                <i className="icon bi-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
