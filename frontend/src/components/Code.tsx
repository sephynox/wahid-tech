import React from "react";
import { solarizedLight, CodeBlock, tomorrowNight } from "react-code-blocks";
import { useTheme } from "styled-components";

import Theme, { Themes } from "../styles/Themes";

type CodeProps = {
  text: string;
  language: string;
  showLineNumbers?: boolean;
};

export const Code = (props: CodeProps): JSX.Element => {
  const theme: Theme = useTheme();
  return <CodeBlock {...props} theme={theme.name === Themes.DARK ? tomorrowNight : solarizedLight} />;
};

export default Code;
