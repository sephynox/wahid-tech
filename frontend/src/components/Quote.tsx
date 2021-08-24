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
            <span>&ldquo;{quote}&rdquo;</span>
            <br />
            <cite>- {author}</cite>
        </Blockquote>
    );
};

export default Quote;
