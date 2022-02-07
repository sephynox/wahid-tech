import React from "react";
import styled from "styled-components";

type Props = {
  icon: string;
  title: string;
  size: number;
  onClick: () => void;
  enabled?: boolean;
  text?: string;
  tab?: number;
};

const IconButton: React.FunctionComponent<Props> = (props): JSX.Element => {
  const enabled = props.enabled === undefined ? true : props.enabled;

  return (
    <IconButtonStyle size={props.size}>
      {props.text ? `${props.text} ` : null}
      <i
        title={props.title}
        onClick={props.onClick}
        onKeyPress={props.onClick}
        role="button"
        tabIndex={props.tab ?? 0}
        className={`${props.icon} ${enabled ? "active" : "inactive"}`}
      ></i>
    </IconButtonStyle>
  );
};

export default IconButton;

const IconButtonStyle = styled.div`
  & i {
    cursor: pointer;
    font-size: ${(props: Props) => props.size}px;
  }
`;
