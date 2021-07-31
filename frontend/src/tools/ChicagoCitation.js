import { HangingIndent } from "./Styles";
//TODO
const ChicagoCitation = (props) => {
    const today = new Date;
    const journal = props.journal !== undefined ? props.journal : null;
    const book = props.book !== undefined ? true : false;
    const blog = props.blog !== undefined ? true : false;
    const publisher = props.publisher;
    const site = props.site !== undefined ? props.site : null;
    const authors = props.authors === undefined ?
        props.title :
        props.authors.map((author) => (author.middle !== undefined ? author.middle.substr(0, 1) + ' ' : '') + author.given + ' ' + author.family)
            .join(', ')
            .replace(/\.+$/, '');
    const title = book ? props.title + '.' : "\u201C" + props.title + ",\u201D";
    const url = props.url !== undefined ? props.url.replace(/http[s]?:\/\//, '') : null;
    const pages = props.page_start !== undefined ? (props.page_end !== undefined ? 'pp. ' + props.page_start + '-' + props.page_end : 'p. ' + props.page_start) : null;
    const archive = props.archive !== undefined ? props.archive : null;
    const date_year = props.date_year !== undefined ? props.date_year : null;
    const date_month = props.date_month !== undefined ? props.date_month : null;
    const date_day = props.date_day !== undefined ? props.date_day : null;
    const date_today = today.getDate() + ' ' + today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear();
    const date_string = date_year === undefined ?
        'n.d.' :
        (date_month !== null ? date_month : '') + ' ' +
        (date_day !== null ? date_day : '') + ', ' +
        date_year;

    return (
        <HangingIndent id={props.id !== undefined ? props.id : null}>
            {authors}, {title}{site !== null ? <i> {site}</i> : <i> {publisher}</i>}{blog ? ' (blog)' : ''}, {date_string}, {url !== null ? (<><a href={archive !== null ? archive : url} target="_new">{url}</a>.</>) : null}
        </HangingIndent >
    );
};

export default ChicagoCitation;
