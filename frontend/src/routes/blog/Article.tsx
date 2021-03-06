import React, { useCallback, useContext, useEffect, useReducer, useRef } from "react";
import { Col, Container, Figure, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import i18next from "i18next";
import tocbot from "tocbot";

import * as Constants from "../../Constants";
import { AppContext } from "../../App";
import { ensLookupReducer, EnsLookupState, fetchAddresses, initialEnsLookupState } from "../../actions/Ethereum";
import { Breadcrumbs } from "../../layout/Navigation";
import Sharing from "../../layout/Sharing";
import Commenting from "../../layout/Commenting";
import { ThemeEngine } from "../../styles/GlobalStyle";
import { Section } from "../../styles/Section";
import { QuietList } from "../../styles/Lists";
import { DefinitionList } from "../../styles/DefinitionList";
import HorizontalRule from "../../styles/HorizontalRule";
import NotFound from "../../routes/NotFound";
import Data from "../../Data/Blog";
import CitationGuide from "../../components/CitationGuide";
import { Author, formatAuthorName } from "../../tools/Citation";
import References from "../../components/References";
import APACitation from "../../components/APACitation";
import Blockies from "../../tools/Blockies";
import Tags from "../../components/Tags";
import { ArticleData, ArticleEdit } from "../../tools/Article";
import Tocbot from "../../components/Tocbot";
import { formatNumber } from "../../utils/data-formatters";
import { arrayToRecord } from "../../utils/data-helpers";

const Article: React.FunctionComponent = (): JSX.Element => {
  const isActive = useRef(true);
  const appContext = useContext(AppContext);
  const { t } = useTranslation();
  const { name } = useParams<{ name: string }>();
  const [ensData, dispatchEnsData] = useReducer(ensLookupReducer, initialEnsLookupState);

  const data: ArticleData = Data[name ?? ""];

  const editItem = (edit: ArticleEdit, index: number): JSX.Element => {
    return (
      <li key={index}>
        <strong>
          {t(edit.type.toString())}: {Intl.DateTimeFormat(i18next.language).format(edit.date)}
        </strong>
        <p>
          <i>{edit.reason}</i>
        </p>
      </li>
    );
  };

  const authorResolver = useCallback(async () => {
    fetchAddresses(
      data.authors.filter((authors) => !!authors.dns).map((authors) => authors.dns as string),
      appContext.ethersProvider,
    )((state: EnsLookupState): void => {
      if (isActive.current) {
        dispatchEnsData(state);
      }
    });
  }, [data.authors, appContext.ethersProvider]);

  useEffect(() => {
    authorResolver();

    return () => {
      isActive.current = false;
      tocbot.destroy();
    };
  }, [data, authorResolver]);

  if (data === undefined) {
    return <NotFound />;
  }

  const MyArticle = data.component;
  const article_full_url = Constants.SITE_BLOG_ARTICLE_BASE_URL + data.path;
  const article_references = arrayToRecord(data.references, "id");
  const article_authors = data.authors.map((author: Author) => formatAuthorName(author)).join(", ");
  const publish_date = Intl.DateTimeFormat(i18next.language).format(data.date);
  const meta_date = [data.date.getFullYear(), data.date.getMonth(), data.date.getDate()].join("-");
  const modified_date = data.edits
    ? Intl.DateTimeFormat(i18next.language).format(
        data.edits.reduce((prev, next) => (next.date > prev.date ? next : prev)).date,
      )
    : undefined;
  const meta_modified = modified_date;

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="author" content={article_authors} />
        <meta property="og:title" content={data.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={article_full_url} />
        <meta property="og:image" content={data.image.url} />
        <meta property="og:description" content={data.description} />
        <meta property="article:section" content="Blog" />
        <meta property="article:published_time" content={meta_date} />
        <meta property="article:modified_time" content={meta_modified} />
        <meta name="twitter:card" content="summary" />
        <meta property="twitter:domain" content={Constants.SITE_DOMAIN} />
        <meta property="twitter:url" content={article_full_url} />
        <meta name="twitter:title" content={data.title} />
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
          { text: t("blog"), path: Constants.SITE_BLOG_PATH_BASE },
          { text: t("article"), path: "", active: true },
        ]}
      />
      <ArticleStyle>
        <header>
          <Figure>
            <img src={data.image.url} alt={data.image.alt} />
          </Figure>
          <Section>
            <h1 className="text-xs-center">{data.title}</h1>
          </Section>
          <Container>
            <Row>
              <Col xs={12} sm={12} md={2}>
                <Blockies state={ensData} width={100} />
              </Col>
              <Col xs={12} md={10}>
                <DefinitionList>
                  <dt>{t("byline")}:</dt>
                  <dd>{article_authors}</dd>
                  <dt>{t("published")}:</dt>
                  <dd>{publish_date}</dd>
                  {modified_date !== undefined ? (
                    <>
                      <dt>{t("last_update")}:</dt>
                      <dd>{modified_date}</dd>
                    </>
                  ) : null}
                  <dt>{t("summary")}:</dt>
                  <dd>{data.description}</dd>
                  <dt>{t("share")}:</dt>
                  <dd>
                    <Sharing url={article_full_url} title={data.title} />
                  </dd>
                  <dt>{t("tags")}:</dt>
                  <dd>
                    <Tags tags={data.tags} />
                  </dd>
                  <dt>{t("length")}:</dt>
                  <dd>
                    {formatNumber(data.readTime, i18next.language, 0)} {t("time.minutes")}
                  </dd>
                </DefinitionList>
              </Col>
            </Row>
          </Container>
          <h2>{t("full_story")}</h2>
          <HorizontalRule />
        </header>
        <Tocbot header={t("table_of_contents")} contentSelector="article" headingSelector="h3, h4, h5, h6" />
        <MyArticle r={article_references} />
        <footer>
          <HorizontalRule />
          {data.edits !== undefined && data.edits.length > 0 && (
            <details>
              <summary>
                <h2>{t("edits")}</h2>
              </summary>
              <QuietList>{data.edits.map((edit, i) => editItem(edit, i))}</QuietList>
            </details>
          )}
          {data.references.length > 0 && (
            <details>
              <summary>
                <h2>{t("references")}</h2>
              </summary>
              <References data={data.references} format={APACitation} />
            </details>
          )}
          <details>
            <summary>
              <h2>{t("citations")}</h2>
            </summary>
            <CitationGuide
              id={data.authors[0].family}
              authors={data.authors}
              publisher={Constants.SITE_NAME}
              title={data.title}
              date_year={data.date.getFullYear()}
              date_month={data.date.toLocaleString("default", { month: "long" })}
              date_day={data.date.getDate()}
            />
          </details>
          {data.comments && (
            <details open>
              <summary>
                <h2>{t("comments")}</h2>
              </summary>
              <Commenting full_url={article_full_url} identifier={data.path} title={data.title} />
            </details>
          )}
        </footer>
      </ArticleStyle>
    </>
  );
};

export default Article;

const ArticleStyle = styled.article`
  max-width: 800px;

  & section > figure {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  & section {
    padding: 0;
  }

  & section h1 {
    padding-bottom: 20px;
  }

  & h2 {
    padding: 20px 0 20px 0;
    font-size: 1.3em;
    display: inline-block;
    text-transform: capitalize;
    color: ${(props: ThemeEngine) => props.theme.subduedText};
  }

  & h3 {
    font-size: 1.2em;
  }

  & section h3 {
    padding-top: 30px;
    font-size: 1.4em;
  }

  & section h4 {
    padding-top: 20px;
    font-size: 1.1em;
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
