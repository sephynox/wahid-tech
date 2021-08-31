import React from 'react';
import { Blockquote } from '../styles/Blockquote';

type Props = {
    quote: string;
    author?: string;
};

const Quote = ({ quote, author }: Props): JSX.Element => {
    author = author !== undefined ? author : 'Unknown';

    return (
        <Blockquote>
            <cite>&ldquo;{quote}&rdquo;</cite>
            <br /><em>- {author}</em>
        </Blockquote>
    );
};

export default Quote;
