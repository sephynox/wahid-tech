import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { Themes } from "../styles/Themes";

type Props = {
  theme: Themes;
  setTheme: (value: Themes) => void;
};

const ToggleTheme: React.FunctionComponent<Props> = ({ theme, setTheme }): JSX.Element => {
  const toggleTheme = (theme: Themes): Themes => (theme === Themes.DARK ? Themes.LIGHT : Themes.DARK);

  const getThemeIcon = (Theme: Themes): JSX.Element => {
    switch (Theme) {
      case Themes.LIGHT:
        return <FontAwesomeIcon icon={faSun} />;
      case Themes.DARK:
        return <FontAwesomeIcon icon={faMoon} />;
    }
  };

  return (
    <ButtonStyle active={false} onClick={() => setTheme(toggleTheme(theme))}>
      {getThemeIcon(theme)}
    </ButtonStyle>
  );
};

export default ToggleTheme;

const ButtonStyle = styled(Button)`
  border-radius: 25px;
`;
