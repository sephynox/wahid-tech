import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import APACitation from "./APACitation";
import ChicagoCitation from "./ChicagoCitation";
import MLACitation from "./MLACitation";
import Citation from "../tools/Citation";

const CitationGuide = ({ id, authors, publisher, title, date_year, date_month, date_day }: Citation): JSX.Element => {
  const url = window.location.href.split("?")[0];

  return (
    <>
      <Tabs defaultActiveKey="apa" id="article-citations" className="mb-5">
        <Tab eventKey="apa" title="APA">
          <APACitation
            id={`citation-apa-${id.toLowerCase()}-${date_year}`}
            authors={authors}
            date_year={date_year}
            date_month={date_month}
            date_day={date_day}
            title={title}
            publisher={publisher}
            url={url}
          />
        </Tab>
        <Tab eventKey="mla" title="MLA">
          <MLACitation
            id={`citation-mla-${id.toLowerCase()}-${date_year}`}
            authors={authors}
            date_year={date_year}
            date_month={date_month}
            date_day={date_day}
            title={title}
            publisher={publisher}
            url={url}
          />
        </Tab>
        <Tab eventKey="chicago" title="Chicago">
          <ChicagoCitation
            blog
            id={`citation-chicago-${id.toLowerCase()}-${date_year}`}
            authors={authors}
            date_year={date_year}
            date_month={date_month}
            date_day={date_day}
            title={title}
            publisher={publisher}
            url={url}
          />
        </Tab>
      </Tabs>
      <hr className="mt-5" />
    </>
  );
};

export default CitationGuide;
