import { HangingIndent } from "./Styles";

const APACitation = (props) => {
    const journal = props.journal !== undefined ? props.journal : null;
    const publisher = props.publisher;
    const site = props.site !== undefined ? props.site : null;
    const authors = props.authors === undefined ?
        props.publisher :
        props.authors.map((author) => author.family + ', ' +
            (author.middle !== undefined ? author.middle.substr(0, 1) + '. ' : ' ') +
            author.given.substr(0, 1) + '.')
            .join(', ')
            .replace(/\.+$/, '');
    const chapter = props.chapter !== undefined ? props.chapter : null;
    const title = props.title;
    const url = props.url !== undefined ? props.url : null;
    const pages = props.page_start !== undefined ? (props.page_end !== undefined ? 'pp. ' + props.page_start + '-' + props.page_end : 'p. ' + props.page_start) : null;
    const archive = props.archive !== undefined ? props.archive : null;
    const date_year = props.date_year !== undefined ? props.date_year : null;
    const date_month = props.date_month !== undefined ? props.date_month : null;
    const date_day = props.date_day !== undefined ? props.date_day : null;
    const date_string = date_year === undefined ?
        'n.d.' :
        date_year +
        (date_month !== null ? ', ' + date_month : '') +
        (date_day !== null ? ' ' + date_day : '');

    return (
        <HangingIndent id={props.id !== undefined ? props.id : null}>
            {authors}. ({date_string}). {chapter !== null ? (<> {chapter}. In </>) : null}<i className={journal === null ? null : 'no-italic'}>{title}</i>.{journal !== null ? (<> <i>{journal}</i>. </>) : null}{pages !== null ? (<> ({pages}). </>) : null}<span> {site !== null ? site : publisher}</span>. {url !== null ? (<><a href={archive !== null ? archive : url} target="_new">{url}</a>.</>) : null}
        </HangingIndent >
    );
};

export default APACitation;
