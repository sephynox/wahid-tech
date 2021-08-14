import React from 'react';
import styled from 'styled-components';
import { Theme } from './Themes';

type Props = {
    icon: string;
    title: string;
    size: number;
    onClick: () => void;
    enabled?: boolean;
    text?: string;
};

const IconButton: React.FunctionComponent<Props> = (props): JSX.Element => {
    const enabled = props.enabled === undefined ? true : props.enabled;

    return (
        <IconButtonStyle size={props.size}>
            {props.text ? `${props.text} ` : null}
            <i
                title={props.title}
                onClick={props.onClick}
                className={`${props.icon} ${enabled ? 'active' : 'inactive'}`}></i>
        </IconButtonStyle>
    );
};

export default IconButton;

const IconButtonStyle = styled.div<Theme>`
    cursor: pointer;

    & i {
        font-size: ${(props: Props) => props.size}px;
    }
`;
