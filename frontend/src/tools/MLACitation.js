import { HangingIndent } from "./Styles";
//TODO
const MLACitation = (props) => {
    const today = new Date;
    const journal = props.journal !== undefined ? props.journal : null;
    const book = props.book !== undefined ? true : false;
    const publisher = props.publisher;
    const site = props.site !== undefined ? props.site : null;
    const authors = props.authors === undefined ?
        props.publisher :
        props.authors.map((author) => author.family + ', ' + author.given + '.' +
            (author.middle !== undefined ? ' ' + author.middle.substr(0, 1) + '.' : ''))
            .join(', ')
            .replace(/\.+$/, '');
    const title = book ? props.title + '.' : "\u201C" + props.title + ".\u201D";
    const url = props.url !== undefined ? props.url.replace(/http[s]?:\/\//, '') : null;
    const pages = props.page_start !== undefined ? (props.page_end !== undefined ? 'pp. ' + props.page_start + '-' + props.page_end : 'p. ' + props.page_start) : null;
    const archive = props.archive !== undefined ? props.archive : null;
    const date_year = props.date_year !== undefined ? props.date_year : null;
    const date_month = props.date_month !== undefined ? props.date_month : null;
    const date_day = props.date_day !== undefined ? props.date_day : null;
    const date_today = today.getDate() + ' ' + today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear();
    const date_string = date_year === undefined ?
        'n.d.' :
        (date_day !== null ? ' ' + date_day : '') +
        (date_month !== null ? ', ' + date_month.substr(0, 3) + '.' : '') + ' ' +
        date_year;

    return (
        <HangingIndent id={props.id !== undefined ? props.id : null}>
            {authors}. {title}{site !== null ? <i> {site}</i> : <i> {publisher}</i>}, {date_string}, {url !== null ? (<><a href={archive !== null ? archive : url} target="_new">{url}</a>. Accessed {date_today}.</>) : null}
        </HangingIndent >
    );
};

export default MLACitation;
