import React, { useState } from 'react';
import { useSwipeable, SwipeEventData, SwipeableProps } from 'react-swipeable';
import styled from 'styled-components';
import { Theme } from '../tools/Themes';

type Props = {
    swipeMessage: string,
    swipeIcon?: string,
    swipeActions: (event: SwipeEventData) => void
};

const SwipeDown: React.FunctionComponent<Props> = (props): JSX.Element => {
    const [swipeMargin, setSwipeMargin] = useState(0);

    const swipeConfig: SwipeableProps = {
        onSwiping: (e) => { setSwipeMargin(e.deltaY < 100 ? e.deltaY : 100); }
    };

    const swipeHandlers = useSwipeable({
        onSwiped: (event) => {
            props.swipeActions(event);
            setSwipeMargin(0);
        }, ...swipeConfig,
    });

    return (
        <SwipeDownStyle {...swipeHandlers} style={{ marginTop: swipeMargin }}>
            <div className={`swipe-indicator ${swipeMargin > 0 ? 'active' : 'inactive'}`}>
                <span className="capitalize">{props.swipeMessage}</span><hr />
                <i className={props.swipeIcon ? props.swipeIcon : 'bi-chevron-bar-down'}></i>
                <div className="pb-4"></div>
            </div>
            {props.children}
        </SwipeDownStyle>
    );
};

export default SwipeDown;

const SwipeDownStyle = styled.div<Theme>`
    & .swipe-indicator {
        margin: 0 auto;
        max-width: 200px;
        font-size: 30px;
        text-align: center;
        transition: visibility 0s, opacity 0.75s linear;
    }

    & .swipe-indicator.inactive {
        height: 0;
        visibility: hidden;
        opacity: 0;
    }

    & .swipe-indicator.active {
        height: auto;
        visibility: visible;
        opacity: 1;
    }
`;
