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
            <em>&ldquo;{quote}&rdquo;</em>
            <br />
            <cite>- {author}</cite>
        </Blockquote>
    );
};

export default Quote;
