import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Section } from '../styles/Section';

const NotFound = (): JSX.Element => {
    const { t } = useTranslation();

    const title = 404;
    const subtext = t('page_not_found');

    return (
        <Container>
            <Section>
                <div className="title">
                    <h2>{title}</h2>
                    <p>{subtext}</p>
                </div>
            </Section>
        </Container>
    );
};

export default NotFound;
