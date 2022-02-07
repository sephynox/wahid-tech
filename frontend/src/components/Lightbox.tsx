import React from "react";
import { useTheme } from "styled-components";

import Theme, { Themes } from "../styles/Themes";

type Props = {
  imageDark: string;
  imageLight: string;
  imageAlt: string;
};

export interface Image {
  url: string;
  alt: string;
}

const LightBox: React.FunctionComponent<Props> = (props): JSX.Element => {
  const theme: Theme = useTheme();
  return <img src={theme.name === Themes.DARK ? props.imageDark : props.imageLight} alt={props.imageAlt} />;
};

export default LightBox;
