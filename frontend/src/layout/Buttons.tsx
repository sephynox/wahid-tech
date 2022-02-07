import React from "react";
import { useTranslation } from "react-i18next";

import { Themes } from "../styles/Themes";
import { PrivacyPromptState } from "../components/PrivacyPrompt";
import { LanguageSelectorState } from "./LanguageSelector";
import ToggleTheme from "./ToggleTheme";

type Props = {
  theme: Themes;
  setTheme: (value: Themes) => void;
  systemLanguages: Record<string, string>;
  languageSelectorState: LanguageSelectorState;
  setLanguageSelectorState: (state: LanguageSelectorState) => void;
  privacyPromptState: PrivacyPromptState;
  setPrivacyPromptState: (state: PrivacyPromptState) => void;
};

const Buttons: React.FunctionComponent<Props> = ({
  theme,
  systemLanguages,
  languageSelectorState,
  privacyPromptState,
  setTheme,
  setLanguageSelectorState,
  setPrivacyPromptState,
}): JSX.Element => {
  const { t, i18n } = useTranslation();

  const toggleLangSelector = () => {
    setLanguageSelectorState(
      languageSelectorState === LanguageSelectorState.CLOSED
        ? LanguageSelectorState.OPEN
        : LanguageSelectorState.CLOSED,
    );
  };

  const togglePrivacyPrompt = () => {
    setPrivacyPromptState(
      privacyPromptState === PrivacyPromptState.INACTIVE ? PrivacyPromptState.ACTIVE : PrivacyPromptState.INACTIVE,
    );
  };

  return (
    <div className="nav-menu-buttons">
      <hr className="mt-3 mb-3" />
      <ul>
        <li>
          <ToggleTheme theme={theme} setTheme={setTheme} />
        </li>
        <li>
          <button className="nav-link" onClick={toggleLangSelector}>
            <i className="icon bi-translate"></i>
            <span>&nbsp;{systemLanguages[i18n.language]}</span>
          </button>
        </li>
        <li>
          <button className="nav-link" onClick={togglePrivacyPrompt}>
            <i className="icon bi-collection"></i>
            <span>&nbsp;{t("data_privacy")}</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Buttons;
