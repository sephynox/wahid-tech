import React from 'react';
import Citation, { Author } from './Citation';
import { HangingIndent } from '../styles/HangingIndent';

export const APAInline: React.FunctionComponent<{ r: Citation | Array<Citation> }> = ({ r }): JSX.Element => {
    const citations: Array<Citation> = Array.isArray(r) ? r : [r];

    const getUrl = (ref: Citation): string | undefined => {
        return ref.url;
    };

    const getAuthors = (ref: Citation): string => {
        let authors: Array<Author> = [];
        let glue = ', ';
        let post = '';

        if (ref.authors === undefined) {
            return ref.publisher;
        }

        if (ref.authors.length < 3) {
            authors = ref.authors;
            glue = ' & ';
        } else if (ref.authors.length === 3) {
            const pop = ref.authors[2].family ?? '';
            authors = ref.authors.slice(0, 2);

            if (pop) {
                post = ', & ' + pop;
            }
        } else if (ref.authors.length > 3) {
            authors = ref.authors.slice(0, 3);
            post = ', et al.';
        }

        return authors.map((author) => author.family).join(glue) + post;
    };

    const getDate = (ref: Citation): string => {
        if (!ref.date_year) {
            return 'n.d.';
        }

        return ref.date_year.toString();
    };

    const getCite = (ref: Citation, index: number): JSX.Element => {
        if (getUrl(ref) !== undefined) {
            return (
                <a key={index} target="_blank" href={getUrl(ref)} rel="noreferrer">
                    {getAuthors(ref)}, {getDate(ref)}
                </a>
            );
        } else {
            return (
                <a key={index} href={`#${ref.id}`}>
                    {getAuthors(ref)}, {getDate(ref)}
                </a>
            );
        }
    };

    const l = citations.length;
    return (
        <>
            (
            {citations.map((ref, i) => {
                return (
                    <span key={i}>
                        {getCite(ref, i)}
                        {i + 1 !== l ? '; ' : ''}
                    </span>
                );
            })}
            )
        </>
    );
};

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
                      (author: Author) =>
                          author.family +
                          ', ' +
                          (author.middle !== undefined ? author.middle.substring(0, 1) + '. ' : ' ') +
                          author.given.substring(0, 1) +
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
            <i className={journal === undefined ? undefined : 'no-italic'}>
                <cite>{title}</cite>
            </i>
            .
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
                    <a href={archive !== undefined ? archive : url} rel="noreferrer" target="_blank">
                        {url}
                    </a>
                    .
                </>
            ) : undefined}
        </HangingIndent>
    );
};

export default APACitation;
