import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Section } from '../../styles/Section';
import * as Constants from '../../Constants';
import { donationAddresses } from '../../Data';
import Postcard from '../../tools/Postcard';
import Data, { Projects } from './Data';
import CryptoAssets from '../../tools/CryptoAssets';

const ProjectHome: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();

    const title = t('projects');
    const donate = t('content.donate');
    const subtext = t('content.projects');
    const list = Projects.map((path: string) => {
        const project = Data[path];
        const link = Constants.SITE_PROJECT_ASSET_PATH + path;
        const name: string = project.name ?? t('no_name');
        const description: string = project.description;
        const image = {
            url: project.image.url,
            alt: name,
        };

        return (
            <Col xs={12} sm={12} md={6} lg={4} xl={4} key={path}>
                <Postcard
                    height={700}
                    title={name}
                    image={image}
                    text={description}
                    link={link}
                    date={project.date}
                    linkText={t('view')}
                />
            </Col>
        );
    });

    return (
        <>
            <Section>
                <header>
                    <h1>{title}</h1>
                    <em>{subtext}</em>
                </header>
                <Row>{list}</Row>
            </Section>
            <Section>
                <header>
                    <h3>{t('donate')}</h3>
                    <p>{donate}</p>
                </header>
                <CryptoAssets data={donationAddresses} size={24} />
            </Section>
        </>
    );
};

export default ProjectHome;
