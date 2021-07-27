import React from 'react';
import Typed from 'typed.js';
import * as Constants from '../Constants';

export default function () {
    // Create reference to store the DOM element containing the animation
    const el = React.useRef(null);
    // Create reference to store the Typed instance itself
    const typed = React.useRef(null);

    const bio_text = "I began my journey in software development when I was  13 years old. After almost two decades, technology has become a part of me. However, technology does not exist in a vacuum, and in order to understand technology one must understand its effects through history, on society, and the within various disciplines it forever changes. It is this holistic and fundamental understanding that allows one to truly appreciate and understand the implications of technology on humanity.";

    React.useEffect(() => {
        const options = {
            strings: [
                'VP of Engineering',
                'Software Architect',
                'Fullstack Developer',
                'Web App Engineer',
                'Mobile Engineer',
                'DevOps Engineer',
                'CSec Analyst',
                'Compliance Officer'
            ],
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        };

        // elRef refers to the <span> rendered below
        typed.current = new Typed(el.current, options);

        return () => {
            // Make sure to destroy Typed instance during cleanup
            // to prevent memory leaks
            typed.current.destroy();
        }
    }, [])

    return (
        <section id="about" className="d-flex flex-column justify-content-center">
            <div className="container">
                <h1>{Constants.MY_NAME}</h1>
                <div className="container">
                    <div className="row">
                        <p className="typed-container">I'm a <span className="typed" ref={el} /></p>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6"><hr />{bio_text}</div>
                        <div className="col"></div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="social-links">
                                <a href="https://www.linkedin.com/in/twahid" target="_new" className="linkedin" title="LinkedIn"><i className="icon bi-linkedin"></i></a>
                                <a href="resume.pdf" target="_new" className="linkedin" title="Resume"><i className="icon bi-file-earmark-person-fill"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
