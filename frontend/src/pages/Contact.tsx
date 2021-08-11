import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { formatTitleCase } from '../utils/data-formatters';

const Contact = (): JSX.Element => {
    const recaptchaRef = React.createRef();
    const { t, i18n } = useTranslation();

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
                    <h2 className="capitalize">{t('contact')}</h2>
                    <p>{contact_text}</p>
                </div>
                <Row className="mt-1">
                    <Col lg={8} className="mt-6 mt-lg-0">
                        <Form action="forms/contact.php" method="post" className="php-email-form">
                            <div className="my-3">
                                <div className="loading">Loading</div>
                                <div className="error-message"></div>
                                <div className="sent-message">Your message has been sent. Thank you!</div>
                            </div>
                            <Row>
                                <Col md={6} sm={12} className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        placeholder={formatTitleCase(t('name'))}
                                        required
                                    />
                                </Col>
                                <Col md={6} sm={12} className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="form-group mt-lg-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        id="subject"
                                        placeholder={formatTitleCase(t('subject'))}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="form-group mt-lg-2">
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        rows={5}
                                        placeholder={formatTitleCase(t('message'))}
                                        required
                                    ></textarea>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12} lg={6} className="contact-recaptcha pt-lg-2 pb-2">
                                    <ReCAPTCHA
                                        hl={i18n.language}
                                        ref={recaptchaRef}
                                        sitekey={process.env.REACT_APP_GA_RECAPTCHA_KEY}
                                        theme={theme}
                                        onChange={setRecaptcha}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={6}></Col>
                                <Col xs={12} sm={12} md={12} lg={6} className="contact-button mt-xs-2">
                                    <button className="capitalize" type="submit">{t('button.send_message')}</button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </section>
        </div>
    );
};

export default Contact;
