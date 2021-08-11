import React from 'react';
import styled from 'styled-components';

type Props = {
    text: string;
    charactersMax: number;
};

const ReadMore: React.FunctionComponent<Props> = ({ text, charactersMax }: Props): JSX.Element => {
    const textShort = text.substr(0, charactersMax);
    const textExtra = text.substr(charactersMax, text.length);

    return (
        <ReadMoreStyles>
            <input type="checkbox" className="read-more-state" id="post-1" />
            <p className="read-more-wrap">{textShort}<span className="read-more-target">{textExtra}</span></p>
            <label className="read-more-trigger"></label>
        </ReadMoreStyles>
    );
};

export default ReadMore;

const ReadMoreStyles = styled.div`
    & .read-more-state {
        display: none;
    }

    & .read-more-target {
        opacity: 0;
        max-height: 0;
        font-size: 0;
        transition: .25s ease;
    }

    & .read-more-state:checked ~ .read-more-wrap .read-more-target {
        opacity: 1;
        font-size: inherit;
        max-height: 999em;
    }

    & .read-more-state ~ .read-more-trigger:before {
        content: 'Show more';
    }

    & .read-more-state:checked ~ .read-more-trigger:before {
        content: 'Show less';
    }

    & .read-more-trigger {
        cursor: pointer;
        display: inline-block;
        padding: 0 .5em;
        color: #666;
        font-size: .9em;
        line-height: 2;
        border: 1px solid #ddd;
        border-radius: .25em;
    }
`;
