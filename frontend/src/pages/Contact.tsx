import React, { createRef, FormEvent, useReducer, useRef, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { formatFirstUpper, formatTitleCase } from '../utils/data-formatters';
import { initialContactData } from '../tools/ContactData';
import { FieldFeedback, FieldFeedbacks, FormWithConstraints } from 'react-form-with-constraints-bootstrap';
import { Input } from 'react-form-with-constraints';
import { apiReducer, initialWTechAPIState, submitContactForm, WTechAPIStates } from '../actions/WTech';
import { useEffect } from 'react';

const Contact = (): JSX.Element => {
    const form = useRef<FormWithConstraints>(null);
    const recaptchaRef = createRef();
    const { t, i18n } = useTranslation();

    const [theme] = useState(() => localStorage.getItem('theme') || 'light');
    const [showServerError, setShowServerError] = useState(false);
    const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
    const [sendButtonText, setSendButtonText] = useState<string>(t('button.send_message'));
    const [contactRequest, setContactRequest] = useState(initialContactData);
    const [apiRequest, dispatchApiRequest] = useReducer(apiReducer, initialWTechAPIState);

    const setRecaptcha = (value: string | null) => {
        setContactRequest({ ...contactRequest, 'g-recaptcha-response': value });
        setSendButtonDisabled(false);
    };

    const resetForm = () => {
        setShowServerError(true);
        setSendButtonDisabled(false);
        form.current?.resetFields();
    };

    const updateContactRequest = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContactRequest({ ...contactRequest, [event.currentTarget.name]: event.currentTarget.value });

        if (sendButtonDisabled) {
            resetForm();
        }
    };

    const submitContact = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSendButtonDisabled(true);

        if (form.current === null) return;
        await form.current.validateForm();

        if (form.current.isValid() && contactRequest['g-recaptcha-response']) {
            submitContactForm(contactRequest)(dispatchApiRequest);
        }
    };

    useEffect(() => {
        switch (apiRequest.type) {
            case WTechAPIStates.SUBMITTING_CONTACT_FORM:
                setSendButtonText(`${t('button.sending')}...`);
                break;
            case WTechAPIStates.SUBMITTED_CONTACT_FORM:
                setContactRequest(initialContactData);
                setSendButtonText(`${t('button.message_sent')}!`);
                toast.success(`${t('button.message_sent')}!`);
                break;
            case WTechAPIStates.SUBMITTED_CONTACT_FORM_ERROR:
                toast.dismiss();
                toast.error(`${formatFirstUpper(t('error'))}!`);
                setSendButtonText(`${t('button.retry')}`);
                setSendButtonDisabled(false);
                setShowServerError(true);
                break;
        }
    }, [apiRequest, t]);

    return (
        <Container id="contact">
            <section>
                <div className="title">
                    <h2 className="capitalize">{t('contact')}</h2>
                    {apiRequest.type !== WTechAPIStates.SUBMITTED_CONTACT_FORM && <p>{t('content.contact')}</p>}
                </div>
                <Row className="mt-1">
                    <Col lg={8} className="mt-6 mt-lg-0">{apiRequest.type === WTechAPIStates.SUBMITTED_CONTACT_FORM
                        ?
                        <Container className="pt-5">
                            <h3>Your message was successfully sent.</h3>
                        </Container>
                        :
                        <FormWithConstraints ref={form} onSubmit={submitContact} noValidate>
                            <Row>
                                <Col>
                                    {apiRequest.type === WTechAPIStates.SUBMITTED_CONTACT_FORM_ERROR
                                        ? <Alert variant="danger" show={showServerError} onClose={() => setShowServerError(false)} dismissible>{apiRequest.error ?? ''}</Alert>
                                        : null}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="form-group">
                                    <FieldFeedbacks for="name">
                                        <FieldFeedback when="valueMissing" error>Please enter a sender name.</FieldFeedback>
                                    </FieldFeedbacks>
                                    <FieldFeedbacks for="email">
                                        <FieldFeedback when="valueMissing" error>Please enter an email address.</FieldFeedback>
                                        <FieldFeedback when="typeMismatch" error>Please enter a valid email.</FieldFeedback>
                                    </FieldFeedbacks>
                                    <FieldFeedbacks for="subject">
                                        <FieldFeedback when="valueMissing" error>Please enter a subject.</FieldFeedback>
                                        <FieldFeedback when="tooShort" error>Please enter a longer subject.</FieldFeedback>
                                    </FieldFeedbacks>
                                    <FieldFeedbacks for="message">
                                        <FieldFeedback when="valueMissing" error>Please enter a message.</FieldFeedback>
                                        <FieldFeedback when="tooShort" error>Please enter an actual message.</FieldFeedback>
                                    </FieldFeedbacks>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} sm={12} className="form-group">
                                    <Input
                                        type="text"
                                        name="name"
                                        value={contactRequest.name}
                                        onChange={updateContactRequest}
                                        className="form-control"
                                        placeholder={formatTitleCase(t('name'))}
                                        required
                                    />
                                </Col>
                                <Col md={6} sm={12} className="form-group">
                                    <Input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={contactRequest.email}
                                        onChange={updateContactRequest}
                                        placeholder={formatTitleCase(t('email'))}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="form-group mt-lg-2">
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        value={contactRequest.subject}
                                        onChange={updateContactRequest}
                                        placeholder={formatTitleCase(t('subject'))}
                                        autoComplete="off"
                                        required minLength={4}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="form-group mt-lg-2">
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        value={contactRequest.message}
                                        onChange={updateContactRequest}
                                        rows={5}
                                        placeholder={formatTitleCase(t('message'))}
                                        required minLength={100}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={12} lg={6} className="contact-recaptcha w-auto pt-lg-2 pb-2">
                                    <div className={`form-control captcha ${sendButtonDisabled && !contactRequest['g-recaptcha-response'] ? 'is-invalid' : ''}`}>
                                        <ReCAPTCHA
                                            hl={i18n.language}
                                            ref={recaptchaRef}
                                            sitekey={process.env.REACT_APP_GA_RECAPTCHA_KEY}
                                            theme={theme}
                                            onExpired={() => setRecaptcha(null)}
                                            onChange={setRecaptcha}
                                        />
                                    </div>
                                    <Form.Control.Feedback type="invalid">Are you a robot?</Form.Control.Feedback>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={6}></Col>
                                <Col xs={12} sm={12} md={12} lg={6} className="contact-button mt-xs-2">
                                    <Button className="capitalize" type="submit" disabled={sendButtonDisabled}>
                                        {apiRequest.type === WTechAPIStates.SUBMITTING_CONTACT_FORM && <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />} {sendButtonText}
                                    </Button>
                                </Col>
                            </Row>
                        </FormWithConstraints>}
                    </Col>
                </Row>
            </section>
        </Container>
    );
};

export default Contact;
