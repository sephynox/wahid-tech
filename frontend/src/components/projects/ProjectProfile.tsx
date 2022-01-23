import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Button, Container, Figure } from 'react-bootstrap';
import axios from 'axios';
import i18next from 'i18next';
import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';
import { AppContext } from '../../App';
import { systemEvents } from '../../Data';
import * as Constants from '../../Constants';
import Data from './Data';
import NotFound from '../../pages/NotFound';
import HorizontalRule from '../../styles/HorizontalRule';
import { DefinitionList } from '../../styles/DefinitionList';
import SocialLinks from '../../tools/SocialLinks';
import { Breadcrumbs } from '../../layout/Navigation';
import { Author } from '../../tools/Citation';

const NftProfile: React.FunctionComponent = (): JSX.Element => {
    const { t, i18n } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const [readme, setReadme] = useState<string | null>(null);
    const appContext = useContext(AppContext);

    const data = Data[id];

    const formatName = (author: Author) => {
        return `${author.given} ${author.middle ? author.middle.substring(0, 1) + '. ' : ' '}${author.family}`;
    };

    const fetchReadme = (path: string) => {
        axios.get(path).then((response) => setReadme(response.data));
    };

    useEffect(() => {
        fetchReadme(data.readme);
    }, [data]);

    if (data === undefined) {
        return <NotFound />;
    }

    const disqus_lang = i18n.language === 'en-US' ? 'en' : i18n.language.replace('-', '_');
    const authors = data.authors.map((author: Author) => formatName(author)).join(', ');
    const full_url = Constants.SITE_PROJECT_PATH_BASE_URL + data.path;
    const created: string = Intl.DateTimeFormat(i18next.language).format(data.date);
    const meta_date = [data.date.getFullYear(), data.date.getMonth(), data.date.getDate()].join('-');
    const meta_modified = data.modified
        ? [data.modified.getFullYear(), data.modified.getMonth(), data.modified.getDate()].join('-')
        : undefined;

    return (
        <>
            <Helmet>
                <meta property="og:title" content={data.name} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={full_url} />
                <meta property="og:image" content={data.image.url} />
                <meta property="og:description" content={data.description} />
                <meta property="article:published_time" content={meta_date} />
                <meta property="article:modified_time" content={meta_modified} />
                {data.authors.map((a, i) => (
                    <meta key={i} property="article:author" content={formatName(a)} />
                ))}
                {data.tags.map((t, i) => (
                    <meta key={i} property="article:tag" content={t} />
                ))}
            </Helmet>
            <Breadcrumbs
                links={[
                    { text: t('project'), path: Constants.SITE_BLOG_PATH_BASE },
                    { text: t('open_source'), path: '', active: true },
                ]}
            />
            <ProjectStyle>
                <header>
                    <Figure>
                        <img src={data.image.url} alt={data.image.alt} />
                    </Figure>
                    <h1 className="text-xs-center">{data.name}</h1>
                    <Container>
                        <DefinitionList>
                            <dt>{t('byline')}:</dt>
                            <dd>{authors}</dd>
                            <dt>{t('repository')}:</dt>
                            <dd>
                                <a href={data.repo_url}>{data.repo_url}</a>
                            </dd>
                            <dt>{t('published')}:</dt>
                            <dd>{created}</dd>
                            <dt>{t('summary')}:</dt>
                            <dd>{data.description}</dd>
                            <dt>{t('share')}:</dt>
                            <dd>
                                <SocialLinks url={full_url} title={data.name} />
                            </dd>
                        </DefinitionList>
                    </Container>
                </header>
                <h2>{t('details')}</h2>
                <HorizontalRule />
                <ReactMarkdown>{readme ?? ''}</ReactMarkdown>
                <HorizontalRule />
                <footer>
                    {data.comments && (
                        <details open>
                            <summary>
                                <h2>{t('comments')}</h2>
                            </summary>
                            {appContext.allowedCookieState['disqus'] ? (
                                <DiscussionEmbed
                                    shortname="wahidtech"
                                    config={{
                                        onNewComment: () => {
                                            appContext.logEvent(systemEvents['disqus_comment']);
                                        },
                                        url: full_url,
                                        identifier: data.path,
                                        title: data.name,
                                        language: disqus_lang,
                                    }}
                                />
                            ) : (
                                <p>
                                    {t('content.disqus_disabled')}
                                    <br />
                                    <Button onClick={appContext.togglePrivacySelector} variant="link">
                                        {t('data_privacy')}
                                    </Button>
                                </p>
                            )}
                        </details>
                    )}
                </footer>
            </ProjectStyle>
        </>
    );
};

export default NftProfile;

const ProjectStyle = styled.article`
    max-width: 800px;

    & section {
        padding: 0;
    }

    & section h1 {
        margin-bottom: 20px;
    }

    & section h3 {
        margin-top: 30px;
        font-size: 1.4em;
    }

    & summary h2 {
        margin: 20px 0 20px 0;
        font-size: 1.3em;
        display: inline-block;
        text-transform: capitalize;
        color: #595959;
    }

    & .container {
        padding: 0;
    }

    @media screen and (max-width: 768px) {
        & header + h2 {
            display: block;
            text-align: center;
        }

        & footer p {
            text-align: left;
        }

        & section p {
            text-align: justify;
        }

        & figure {
            padding: 10px;
        }
    }
`;