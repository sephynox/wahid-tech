import React from 'react';
import { ArticleAuthor } from '../components/blog/Article';
import Citation from './Citation';
import { HangingIndent } from '../styles/HangingIndent';

//TODO
const APACitation = ({
    id,
    authors,
    title,
    publisher,
    chapter,
    page_start,
    page_end,
    journal,
    site,
    url,
    archive,
    date_year,
    date_month,
    date_day,
}: Citation): JSX.Element => {
    const author_list =
        authors === undefined
            ? publisher
            : authors
                .map(
                    (author: ArticleAuthor) =>
                        author.family +
                        ', ' +
                        (author.middle !== undefined ? author.middle.substr(0, 1) + '. ' : ' ') +
                        author.given.substr(0, 1) +
                        '.',
                )
                .join(', ')
                .replace(/\.+$/, '');
    const pages =
        page_start !== undefined
            ? page_end !== undefined
                ? 'pp. ' + page_start + '-' + page_end
                : 'p. ' + page_start
            : undefined;
    const date_string =
        date_year === undefined
            ? 'n.d.'
            : date_year +
            (date_month !== undefined ? ', ' + date_month : '') +
            (date_day !== undefined ? ' ' + date_day : '');

    journal = journal !== undefined ? journal : undefined;

    return (
        <HangingIndent id={id !== undefined ? id : undefined}>
            {author_list}. ({date_string}). {chapter !== undefined ? <> {chapter}. In </> : undefined}
            <i className={journal === undefined ? undefined : 'no-italic'}><cite>{title}</cite></i>.
            {journal !== undefined ? (
                <>
                    {' '}
                    <i>{journal}</i>.{' '}
                </>
            ) : undefined}
            {pages !== undefined ? <> ({pages}). </> : undefined}
            <span> {site !== undefined ? site : publisher}</span>.{' '}
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

export default APACitation;
