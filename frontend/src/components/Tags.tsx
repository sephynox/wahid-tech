import React from "react";
import { Badge } from "react-bootstrap";
import styled from "styled-components";

type Props = {
  tags: Array<string>;
};

type Tag = {
  text: string;
};

export const TagBadge = ({ text }: Tag): JSX.Element => <BadgeStyle>{text}</BadgeStyle>;

const Tags: React.FunctionComponent<Props> = ({ tags }: Props): JSX.Element => {
  return (
    <>
      {tags.map(
        (t: string, i): JSX.Element => (
          <TagBadge key={i} text={t} />
        ),
      )}
    </>
  );
};

export default Tags;

const BadgeStyle = styled(Badge)`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;
