import React from "react";
import styled from "styled-components";

import { ThemeEngine } from "../styles/GlobalStyle";

type Props = {
  title: string;
  links: SocialBlock[];
  url?: string;
};

export type SocialBlock = {
  title: string;
  icon: string;
  url: string;
};

export const SocialLink = ({ title, icon, url }: SocialBlock): JSX.Element => (
  <SocialLinkStyle href={url} target="_blank" title={title}>
    <i className={icon}></i>
  </SocialLinkStyle>
);

const SocialLinks: React.FunctionComponent<Props> = ({ title, url, links }): JSX.Element => {
  const path: string = url ?? window.location.href;
  return (
    <>
      {links.map(
        (l, i): JSX.Element => (
          <SocialLink key={i} icon={l.icon} title={title} url={path} />
        ),
      )}
    </>
  );
};

export default SocialLinks;

const SocialLinkStyle = styled.a`
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  transition: 0.3s;

  :not(:last-child) {
    margin-right: 20px;
  }

  &:hover {
    color: ${(props: ThemeEngine) => props.theme.info};
  }
`;
