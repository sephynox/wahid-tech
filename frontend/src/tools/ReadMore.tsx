import React, { useState } from 'react';
import styled from 'styled-components';
import { ThemeEngine } from '../styles/GlobalStyle';

type Props = {
    text: string;
    charactersMax: number;
};

enum ReadMoreState {
    SHOW = 'show',
    HIDE = 'hide'
};

const ReadMore: React.FunctionComponent<Props> = ({ text, charactersMax }: Props): JSX.Element => {
    const textShort = text.substr(0, charactersMax);
    const textExtra = text.substr(charactersMax, text.length);
    const showButton = text.length <= charactersMax ? 'hide' : '';
    const [readMoreState, setReadMoreState] = useState(() => ReadMoreState.HIDE);

    const toggleShowMore = () => {
        setReadMoreState(readMoreState === ReadMoreState.SHOW ? ReadMoreState.HIDE : ReadMoreState.SHOW);
    };

    return (
        <ReadMoreStyles>
            {textShort}<span className={'read-more-target ' + readMoreState}>{textExtra}</span>
            <button onClick={toggleShowMore} className={'read-more-trigger ' + showButton}></button>
        </ReadMoreStyles>
    );
};

export default ReadMore;

const ReadMoreStyles = styled.p`
    & .read-more-target {
        transition: .1s ease;
    }

    & .read-more-target.hide {
        opacity: 0;
        max-height: 0;
        font-size: 0;
    }

    & .read-more-target.show {
        opacity: 1;
        max-height: auto;
    }
    
    & .read-more-trigger.hide {
        display: none;
    }

    & .read-more-target.hide ~ .read-more-trigger:before {
        content: 'Show more';
    }

    & .read-more-target.show ~ .read-more-trigger:before {
        content: 'Show less';
    }

    & .read-more-trigger {
        cursor: pointer;
        display: inline-block;
        padding: 0 .5em;
        color: ${(props: ThemeEngine) => props.theme.text};
        line-height: 2;
        border: 1px solid ${(props: ThemeEngine) => props.theme.backgroundAlt};
        background-color: ${(props: ThemeEngine) => props.theme.backgroundExtended};
        border-radius: .25em;
    }
`;
