import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { Col, Container, Figure, Row } from "react-bootstrap";
import axios from "axios";
import i18next from "i18next";
import styled from "styled-components";

import * as Constants from "../../Constants";
import { DefinitionList } from "../../styles/DefinitionList";
import { ThemeEngine } from "../../styles/GlobalStyle";
import HorizontalRule from "../../styles/HorizontalRule";
import { ensLookupReducer, initialEnsLookupState, EnsLookupState, fetchAddresses } from "../../actions/Ethereum";
import { AppContext } from "../../App";
import Data, { Project } from "../../Data/Project";
import LoaderSkeleton from "../../components/LoaderSkeleton";
import { Breadcrumbs } from "../../layout/Navigation";
import Commenting from "../../layout/Commenting";
import Blockies from "../../tools/Blockies";
import { Author, formatAuthorName } from "../../tools/Citation";
import NotFound from "../NotFound";
import Sharing from "../../layout/Sharing";

const NftProfile: React.FunctionComponent = (): JSX.Element => {
  const isActive = useRef(true);
  const appContext = useContext(AppContext);
  const { t } = useTranslation();
  const { project } = useParams<{ project: string }>();
  const [readme, setReadme] = useState<string | null>(null);
  const [ensData, dispatchEnsData] = useReducer(ensLookupReducer, initialEnsLookupState);

  const data: Project = Data[project ?? ""];

  const readmeLinks = (href: string) => `${data.repo_url}/blob/HEAD/${href}`;

  const fetchReadme = useCallback(async (path: string) => {
    axios.get(path).then((response) => isActive.current && setReadme(response.data));
  }, []);

  const dispatchEnsDataAssist = (state: EnsLookupState): void => {
    if (isActive.current) {
      dispatchEnsData(state);
    }
  };

  const authorResolver = useCallback(async () => {
    fetchAddresses(
      data.authors.filter((authors) => !!authors.dns).map((authors) => authors.dns as string),
      appContext.ethersProvider,
    )(dispatchEnsDataAssist);
  }, [data, appContext.ethersProvider]);

  useEffect(() => {
    if (data !== undefined) {
      authorResolver();
      fetchReadme(data.readme);
    }
    return () => {
      isActive.current = false;
    };
  }, [data, fetchReadme, authorResolver]);

  if (data === undefined) {
    return <NotFound />;
  }

  const authors = data.authors.map((author: Author) => formatAuthorName(author)).join(", ");
  const full_url = Constants.SITE_PROJECT_PATH_BASE_URL + data.path;
  const created: string = Intl.DateTimeFormat(i18next.language).format(data.date);
  const meta_date = [data.date.getFullYear(), data.date.getMonth(), data.date.getDate()].join("-");
  const meta_modified = data.modified
    ? [data.modified.getFullYear(), data.modified.getMonth(), data.modified.getDate()].join("-")
    : undefined;

  return (
    <>
      <Helmet>
        <title>{data.name}</title>
        <meta name="description" content={data.description} />
        <meta name="author" content={authors} />
        <meta property="og:title" content={data.name} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={full_url} />
        <meta property="og:image" content={data.image.url} />
        <meta property="og:description" content={data.description} />
        <meta property="article:section" content="Projects" />
        <meta property="article:published_time" content={meta_date} />
        <meta property="article:modified_time" content={meta_modified} />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:domain" content={Constants.SITE_DOMAIN} />
        <meta property="twitter:url" content={full_url} />
        <meta name="twitter:title" content={data.name} />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content={data.image.url} />
        <meta name="keywords" content={data.tags.map((t) => t).join(",")} />
        {data.authors.map((a, i) => a.og && <meta key={i} property="article:author" content={a.og} />)}
        {data.tags.map((t, i) => (
          <meta key={i} property="article:tag" content={t} />
        ))}
      </Helmet>
      <Breadcrumbs
        links={[
          { text: t("project"), path: Constants.SITE_BLOG_PATH_BASE },
          { text: t("open_source"), path: "", active: true },
        ]}
      />
      <ProjectStyle>
        <header>
          <Figure>
            <img src={data.image.url} alt={data.image.alt} />
          </Figure>
          <h1 className="text-xs-center">{data.name}</h1>
          <Container>
            <Row>
              <Col xs={12} sm={12} md={2}>
                <Blockies state={ensData} width={100} />
              </Col>
              <Col xs={12} md={10}>
                <DefinitionList>
                  <dt>{t("byline")}:</dt>
                  <dd>{authors}</dd>
                  <dt>{t("repository")}:</dt>
                  <dd>
                    <a href={data.repo_url}>{data.repo_url}</a>
                  </dd>
                  <dt>{t("published")}:</dt>
                  <dd>{created}</dd>
                  <dt>{t("summary")}:</dt>
                  <dd>{data.description}</dd>
                  <dt>{t("share")}:</dt>
                  <dd>
                    <Sharing url={full_url} title={data.name} />
                  </dd>
                </DefinitionList>
              </Col>
            </Row>
          </Container>
        </header>
        <h2>{t("details")}</h2>
        <HorizontalRule />
        {readme ? (
          <ReactMarkdown transformLinkUri={readmeLinks} linkTarget="_blank">
            {readme}
          </ReactMarkdown>
        ) : (
          <LoaderSkeleton type="Paragraphs" bars={32} width="100%" height="300" />
        )}
        <br />
        <HorizontalRule />
        <footer>
          {data.comments && (
            <details open>
              <summary>
                <h2>{t("comments")}</h2>
              </summary>
              <Commenting full_url={full_url} identifier={data.path} title={data.name} />
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
    color: ${(props: ThemeEngine) => props.theme.subduedText};
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
