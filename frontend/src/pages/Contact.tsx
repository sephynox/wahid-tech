import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = (): JSX.Element => {
    const recaptchaRef = React.createRef();
    const contact_text = 'Get in touch if you believe I can help or if you would like to contribute to the blog.';
    const [recaptchaVal, setRecaptcha] = useState(() => localStorage.getItem('recaptchaVal') || '');
    const [theme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('recaptchaVal', recaptchaVal);
    }, [recaptchaVal]);

    return (
        <div id="contact" className="container">
            <section>
                <div className="title">
                    <h2>Contact</h2>
                    <p>{contact_text}</p>
                </div>

                <div className="row mt-1">
                    <div className="col-lg-8 mt-6 mt-lg-0">
                        <form action="forms/contact.php" method="post" className="php-email-form">
                            <div className="my-3">
                                <div className="loading">Loading</div>
                                <div className="error-message"></div>
                                <div className="sent-message">Your message has been sent. Thank you!</div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="subject"
                                    id="subject"
                                    placeholder="Subject"
                                    required
                                />
                            </div>
                            <div className="form-group mt-3">
                                <textarea
                                    className="form-control"
                                    name="message"
                                    rows={5}
                                    placeholder="Message"
                                    required
                                ></textarea>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 pb-2">
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        sitekey={process.env.REACT_APP_GA_RECAPTCHA_KEY}
                                        theme={theme}
                                        onChange={setRecaptcha}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6"></div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 contact-button">
                                    <button type="submit">Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
