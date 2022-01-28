import React from 'react';
import { useTranslation } from 'react-i18next';
import Typed from 'react-typed';
import styled from 'styled-components';
import * as Constants from '../Constants';
import { Section } from '../styles/Section';
import { formatTitleCase } from '../utils/data-formatters';

const About = (): JSX.Element => {
    const { t } = useTranslation();

    const bio_text = t('content.about');
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
        <AboutStyle id="about">
            <header>
                <Section>
                    <h1>{t('about')}</h1>
                    <h2>{Constants.MY_NAME}</h2>
                    <p className="typed-container">
                        {formatTitleCase(t('i_am_a'))} <Typed {...typed_options} />
                    </p>
                </Section>
            </header>
            <section className="col-xs-12 col-sm-12 col-md-12 col-lg-6">{bio_text}</section>
            <footer className="social-links">
                <a
                    href="https://www.linkedin.com/in/twahid"
                    target="_blank"
                    className="linkedin"
                    title="LinkedIn"
                    rel="noreferrer"
                >
                    <i className="icon bi-linkedin"></i>
                </a>
                <a href="wahid-resume.pdf" target="_blank" className="linkedin" title="Resume">
                    <i className="icon bi-file-earmark-person-fill"></i>
                </a>
                <a
                    href="https://github.com/sephynox/wahid-tech"
                    target="_blank"
                    className="github"
                    title="GitHub"
                    rel="noreferrer"
                >
                    <i className="icon bi-github"></i>
                </a>
            </footer>
        </AboutStyle>
    );
};

export default About;

const AboutStyle = styled.article`
    & h2 {
        margin: 0;
        font-size: 64px;
        font-weight: 700;
    }

    & p.typed-container {
        margin: 15px 0 0 0;
        font-size: 26px;
        font-family: 'Poppins', sans-serif;
    }

    & p span {
        color: #0563bb;
        letter-spacing: 1px;
    }

    & .social-links {
        margin-top: 30px;
    }

    & .social-links a {
        font-size: 24px;
        display: inline-block;
        line-height: 1;
        margin-right: 20px;
        transition: 0.3s;
    }

    & .social-links a:hover {
        color: #0563bb;
    }

    @media (max-width: 992px) {
        text-align: center;

        & h2 {
            font-size: 32px;
        }

        & p {
            margin-top: 10px;
            font-size: 20px;
            line-height: 24px;
        }
    }
`;
