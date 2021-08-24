import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import APACitation from './APACitation';
import MLACitation from './MLACitation';
import ChicagoCitation from './ChicagoCitation';
import Citation from './Citation';

const CitationGuide = ({ authors, publisher, title, date_year, date_month, date_day }: Citation): JSX.Element => {
    const url = window.location.href.split('?')[0];

    return (
        <>
            <Tabs defaultActiveKey="apa" id="article-citations" className="mb-5">
                <Tab eventKey="apa" title="APA">
                    <APACitation
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
