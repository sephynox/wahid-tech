import React from 'react';
import { Blockquote } from '../tools/Styles';

type Props = {
    quote: string;
    author?: string;
};

const Quote = ({ quote, author }: Props): JSX.Element => {
    author = author !== undefined ? author : 'Unknown';

    return (
        <Blockquote>
            <span>&ldquo;{quote}&rdquo;</span>
            <br />
            <span className="article-quote-author">- {author}</span>
        </Blockquote>
    );
};

export default Quote;
