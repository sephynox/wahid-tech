import React from "react";
import styled from "styled-components";

import { ThemeEngine } from "../styles/GlobalStyle";

type Props = {
  quote: string;
  author?: string;
};

export const Blockquote = styled.blockquote`
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10px;
  border-left: 1px solid ${(props: ThemeEngine) => props.theme.text};
  font-size: 1.2em;
  color: ${(props: ThemeEngine) => props.theme.textAlt};

  & em {
    margin-top: 10px;
    margin-bottom: 10px;
    color: ${(props: ThemeEngine) => props.theme.subduedText};
  }

  @media screen and (max-width: 768px) {
    & em {
      text-align: right;
    }
  }
`;

const Quote = ({ quote, author }: Props): JSX.Element => {
  author = author !== undefined ? author : "Unknown";

  return (
    <Blockquote>
      <cite>&ldquo;{quote}&rdquo;</cite>
      <br />
      <em>- {author}</em>
    </Blockquote>
  );
};

export default Quote;
