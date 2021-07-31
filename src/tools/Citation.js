import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { HangingIndent } from "./Styles";

const Citation = (citation) => {
    const authors = citation.authors;
    const title = citation.title;
    const url = window.location.href;
    const date_year = citation.date_year !== undefined ? citation.date_year : null;
    const date_month = citation.date_month !== undefined ? citation.date_month : null;
    const date_day = citation.date_day !== undefined ? citation.date_day : null;

    return (
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="APA">
                <HangingIndent>
                    <a href={url}>{url}</a>.
                </HangingIndent>
            </Tab>
            <Tab eventKey="profile" title="MLA">
                <HangingIndent>
                    <a href={url}>{url}</a>.
                </HangingIndent>
            </Tab>
            <Tab eventKey="contact" title="Chicago">
                <HangingIndent>
                    <a href={url}>{url}</a>.
                </HangingIndent>
            </Tab>
        </Tabs>
    );
};

export default Citation;
