import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import APACitation from './APACitation';
import MLACitation from './MLACitation';
import ChicagoCitation from './ChicagoCitation';

const Citation = (citation) => {
    const authors = citation.authors;
    const publisher = citation.publisher;
    const title = citation.title;
    const url = window.location.href.split('?')[0];
    const date_year = citation.date_year !== undefined ? citation.date_year : null;
    const date_month = citation.date_month !== undefined ? citation.date_month : null;
    const date_day = citation.date_day !== undefined ? citation.date_day : null;

    return (
        <Tabs defaultActiveKey="apa" id="article-citations" className="mb-5">
            <Tab eventKey="apa" title="APA">
                <APACitation authors={authors} date_year={date_year} date_month={date_month} date_day={date_day} title={title} publisher={publisher} url={url} />
            </Tab>
            <Tab eventKey="mla" title="MLA">
                <MLACitation authors={authors} date_year={date_year} date_month={date_month} date_day={date_day} title={title} publisher={publisher} url={url} />
            </Tab>
            <Tab eventKey="chicago" title="Chicago">
                <ChicagoCitation blog authors={authors} date_year={date_year} date_month={date_month} date_day={date_day} title={title} publisher={publisher} url={url} />
            </Tab>
        </Tabs>
    );
};

export default Citation;
