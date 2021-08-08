import React from 'react';
import { ArticleAuthor } from '../components/blog/Article';
import Citation from './Citation';
import { HangingIndent } from '../styles/HangingIndent';

//TODO
const ChicagoCitation = ({
    id,
    authors,
    title,
    publisher,
    chapter,
    page_start,
    page_end,
    journal,
    site,
    book,
    blog,
    url,
    archive,
    date_year,
    date_month,
    date_day,
}: Citation): JSX.Element => {
    //const today = new Date();
    const authors_list =
        authors === undefined
            ? title
            : authors
                .map(
                    (author: ArticleAuthor) =>
                        (author.middle !== undefined ? author.middle.substr(0, 1) + ' ' : '') +
                        author.given +
                        ' ' +
                        author.family,
                )
                .join(', ')
                .replace(/\.+$/, '');
    // const pages =
    //     page_start !== undefined
    //         ? page_end !== undefined
    //             ? 'pp. ' + page_start + '-' + page_end
    //             : 'p. ' + page_start
    //         : undefined;
    // const date_today =
    //     today.getDate() + ' ' + today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear();
    const date_string =
        date_year === undefined
            ? 'n.d.'
            : (date_month !== undefined ? date_month : '') +
            ' ' +
            (date_day !== undefined ? date_day : '') +
            ', ' +
            date_year;

    title = book ? title + '.' : '\u201C' + title + ',\u201D';
    url = url !== undefined ? url.replace(/http[s]?:\/\//, '') : undefined;

    return (
        <HangingIndent id={id !== undefined ? id : undefined}>
            {authors_list}, {title}
            {site !== undefined ? <i> {site}</i> : <i> {publisher}</i>}
            {blog ? ' (blog)' : ''}, {date_string},{' '}
            {url !== undefined ? (
                <>
                    <a href={archive !== undefined ? archive : url} target="_new">
                        {url}
                    </a>
                    .
                </>
            ) : undefined}
        </HangingIndent>
    );
};

export default ChicagoCitation;
