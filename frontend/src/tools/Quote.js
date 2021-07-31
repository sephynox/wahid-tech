import { Blockquote } from "./Styles";

const Quote = (props) => {
    const quote = props.quote;
    const author = props.author !== undefined ? props.author : 'Unknown';

    return (
        <Blockquote>
            &ldquo;{quote}&rdquo;<br /><span className="article-quote-author">- {author}</span>
        </Blockquote >
    );
};

export default Quote;
