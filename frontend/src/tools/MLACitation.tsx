import React from 'react';
import { ArticleAuthor } from '../components/blog/Article';
import Citation from './Citation';
import { HangingIndent } from '../styles/HangingIndent';

//TODO
const MLACitation = ({
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
    url,
    archive,
    date_year,
    date_month,
    date_day,
}: Citation): JSX.Element => {
    const today = new Date();
    const author_list =
        authors === undefined
            ? publisher
            : authors
                .map(
                    (author: ArticleAuthor) =>
                        author.family +
                        ', ' +
                        author.given +
                        '.' +
                        (author.middle !== undefined ? ' ' + author.middle.substr(0, 1) + '.' : ''),
                )
                .join(', ')
                .replace(/\.+$/, '');
    // const pages =
    //     page_start !== undefined
    //         ? page_end !== undefined
    //             ? 'pp. ' + page_start + '-' + page_end
    //             : 'p. ' + page_start
    //         : undefined;
    const date_today =
        today.getDate() + ' ' + today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear();
    const date_string =
        date_year === undefined
            ? 'n.d.'
            : (date_day !== undefined ? ' ' + date_day : '') +
            (date_month !== undefined ? ', ' + date_month.substr(0, 3) + '.' : '') +
            ' ' +
            date_year;

    url = url !== undefined ? url.replace(/http[s]?:\/\//, '') : undefined;
    title = book ? title + '.' : '\u201C' + title + '.\u201D';

    return (
        <HangingIndent id={id !== undefined ? id : undefined}>
            {author_list}. <cite>{title}</cite>
            {site !== undefined ? <i> {site}</i> : <i> {publisher}</i>}, {date_string},{' '}
            {url !== undefined ? (
                <>
                    <a href={archive !== undefined ? archive : url} rel="noreferrer" target="_blank">
                        {url}
                    </a>
                    . Accessed {date_today}.
                </>
            ) : undefined}
        </HangingIndent>
    );
};

export default MLACitation;
