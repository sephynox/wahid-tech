import React from 'react';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NotFound = (): JSX.Element => {
    const { t } = useTranslation();

    const title = 404;
    const subtext = t('page_not_found');

    return (
        <Container>
            <section>
                <div className="title">
                    <h2>{title}</h2>
                    <p>{subtext}</p>
                </div>
            </section>
        </Container>
    );
};

export default NotFound;
