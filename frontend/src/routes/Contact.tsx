import React, { createRef, FormEvent, useReducer, useRef, useState, useEffect } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Input, FieldFeedback, FieldFeedbacks, FormWithConstraints } from "react-form-with-constraints-bootstrap";
import { useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-hot-toast";
import styled from "styled-components";

import * as Constants from "../Constants";
import { apiReducer, initialWTechAPIState, submitContactForm, WTechAPIStates } from "../actions/WTech";
import { Section } from "../styles/Section";
import { Theme } from "../styles/Themes";
import { initialContactData } from "../tools/ContactData";
import { formatFirstUpper, formatTitleCase } from "../utils/data-formatters";
import { useTheme } from "styled-components";

const Contact = (): JSX.Element => {
  const form = useRef<FormWithConstraints>(null);
  const theme: Theme = useTheme();
  const { t, i18n } = useTranslation();

  const recaptchaRef = createRef();
  const [showServerError, setShowServerError] = useState(false);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
  const [sendButtonText, setSendButtonText] = useState<string>(t("button.send_message"));
  const [contactRequest, setContactRequest] = useState(initialContactData);
  const [apiRequest, dispatchApiRequest] = useReducer(apiReducer, initialWTechAPIState);

  const setRecaptcha = (value: string | null) => {
    setContactRequest({ ...contactRequest, "g-recaptcha-response": value });
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

    if (form.current.isValid() && contactRequest["g-recaptcha-response"]) {
      submitContactForm(contactRequest)(dispatchApiRequest);
    }
  };

  useEffect(() => {
    switch (apiRequest.type) {
      case WTechAPIStates.SUBMITTING_CONTACT_FORM:
        setSendButtonText(`${t("button.sending")}...`);
        break;
      case WTechAPIStates.SUBMITTED_CONTACT_FORM:
        setContactRequest(initialContactData);
        setSendButtonText(`${t("button.message_sent")}!`);
        toast.success(`${t("button.message_sent")}!`);
        break;
      case WTechAPIStates.SUBMITTED_CONTACT_FORM_ERROR:
        toast.dismiss();
        toast.error(`${formatFirstUpper(t("error.error"))}!`);
        setSendButtonText(`${t("button.retry")}`);
        setSendButtonDisabled(false);
        setShowServerError(true);
        break;
    }
  }, [apiRequest, t]);

  return (
    <ContactStyle id="contact">
      <header>
        <Section>
          <h1>{t("contact")}</h1>
          {apiRequest.type !== WTechAPIStates.SUBMITTED_CONTACT_FORM && <em>{t("content.contact")}</em>}
        </Section>
      </header>
      <Row className="mt-1">
        <Col lg={12} className="mt-6 mt-lg-0">
          {apiRequest.type === WTechAPIStates.SUBMITTED_CONTACT_FORM ? (
            <Container className="pt-5">
              <h3>{t("validation.contact_message_success")}.</h3>
            </Container>
          ) : (
            <FormWithConstraints ref={form} onSubmit={submitContact} noValidate>
              <Row>
                <Col>
                  {apiRequest.type === WTechAPIStates.SUBMITTED_CONTACT_FORM_ERROR ? (
                    <Alert
                      variant="danger"
                      show={showServerError}
                      onClose={() => setShowServerError(false)}
                      dismissible
                    >
                      {apiRequest.error ?? ""}
                    </Alert>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col className="form-group">
                  <FieldFeedbacks for="name">
                    <FieldFeedback when="valueMissing" error>
                      {t("validation.contact_missing_name")}.
                    </FieldFeedback>
                  </FieldFeedbacks>
                  <FieldFeedbacks for="email">
                    <FieldFeedback when="valueMissing" error>
                      {t("validation.contact_missing_email")}.
                    </FieldFeedback>
                    <FieldFeedback when="typeMismatch" error>
                      {t("validation.contact_valid_email")}.
                    </FieldFeedback>
                  </FieldFeedbacks>
                  <FieldFeedbacks for="subject">
                    <FieldFeedback when="valueMissing" error>
                      {t("validation.contact_missing_subject")}.
                    </FieldFeedback>
                    <FieldFeedback when="tooShort" error>
                      {t("validation.contact_short_subject")}.
                    </FieldFeedback>
                  </FieldFeedbacks>
                  <FieldFeedbacks for="message">
                    <FieldFeedback when="valueMissing" error>
                      {t("validation.contact_missing_message")}.
                    </FieldFeedback>
                    <FieldFeedback when="tooShort" error>
                      {t("validation.contact_short_message")}.
                    </FieldFeedback>
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
                    placeholder={formatTitleCase(t("name"))}
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
                    placeholder={formatTitleCase(t("email"))}
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
                    placeholder={formatTitleCase(t("subject"))}
                    autoComplete="off"
                    required
                    minLength={4}
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
                    placeholder={formatTitleCase(t("message"))}
                    required
                    minLength={100}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} lg={6} className="contact-recaptcha w-auto pt-lg-2 pb-2">
                  <div
                    className={`form-control captcha ${
                      sendButtonDisabled && !contactRequest["g-recaptcha-response"] ? "is-invalid" : ""
                    }`}
                  >
                    <ReCAPTCHA
                      hl={i18n.language}
                      ref={recaptchaRef}
                      sitekey={Constants.REACT_APP_GA_RECAPTCHA_KEY}
                      theme={theme.name}
                      onExpired={() => setRecaptcha(null)}
                      onChange={setRecaptcha}
                    />
                  </div>
                  <Form.Control.Feedback type="invalid">{t("eggs.robot")}</Form.Control.Feedback>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={6}></Col>
                <Col xs={12} sm={12} md={12} lg={6} className="contact-button mt-xs-2">
                  <Button type="submit" disabled={sendButtonDisabled}>
                    {apiRequest.type === WTechAPIStates.SUBMITTING_CONTACT_FORM && (
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    )}{" "}
                    {sendButtonText}
                  </Button>
                </Col>
              </Row>
            </FormWithConstraints>
          )}
        </Col>
      </Row>
    </ContactStyle>
  );
};

export default Contact;

const ContactStyle = styled.article`
  & form {
    width: 100%;
  }

  & input,
  & textarea {
    border-radius: 4px;
    box-shadow: none;
    font-size: 14px;
  }

  & input {
    height: 44px;
  }

  & textarea {
    padding: 10px 12px;
  }

  & button[type="submit"] {
    background: #0563bb;
    color: rgba(255, 255, 255);
    border: 0;
    padding: 10px 35px;
    transition: 0.4s;
    border-radius: 50px;
  }

  & button[type="submit"]:hover {
    background: #0678e3;
  }

  & .info {
    width: 100%;
  }

  & .info i {
    font-size: 20px;
    float: left;
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    transition: all 0.3s ease-in-out;
  }

  & .info h4 {
    padding: 0 0 0 60px;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  & .info p {
    padding: 0 0 0 60px;
    margin-bottom: 0;
    font-size: 14px;
  }

  & .info .email,
  & .info .phone {
    margin-top: 40px;
  }

  & .form-group {
    padding-bottom: 8px;
  }

  & .error-message {
    display: none;
    background: #ed3c0d;
    text-align: left;
    padding: 15px;
    font-weight: 600;
  }

  & .error-message br + br {
    margin-top: 25px;
  }

  & .sent-message {
    display: none;
    background: #18d26e;
    text-align: center;
    padding: 15px;
    font-weight: 600;
  }

  & .loading {
    display: none;
    text-align: center;
    padding: 15px;
  }

  & .loading:before {
    content: "";
    display: inline-block;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin: 0 10px -6px 0;
    border: 3px solid #18d26e;
    -webkit-animation: animate-loading 1s linear infinite;
    animation: animate-loading 1s linear infinite;
  }

  .captcha {
    padding: 0;
    width: 304px;
    height: 78px;
  }

  .captcha.is-invalid {
    width: 340px;
  }

  @media (min-width: 992px) {
    .contact-button {
      text-align: right;
    }
  }

  @media screen and (max-width: 992px) {
    .contact-recaptcha > div {
      margin: 0 auto;
    }

    .contact-button {
      text-align: center;
    }
  }
`;
