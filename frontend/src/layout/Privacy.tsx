import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import PrivacyPrompt, { PrivacyCookieState, PrivacyPromptState, PrivacySetting } from "../components/PrivacyPrompt";
import { formatFirstUpper } from "../utils/data-formatters";
import { purgeCookies } from "../utils/data-helpers";

type PrivacySettings = Record<string, PrivacySetting>;

type Props = {
  systemCookies: PrivacySettings;
  privacyCookieState: PrivacyCookieState;
  privacyPromptState: PrivacyPromptState;
  setPrivacyPromptState: (state: PrivacyPromptState) => void;
  setAllowedCookieState: (state: PrivacyCookieState) => void;
};

const Privacy: React.FunctionComponent<Props> = ({
  systemCookies,
  privacyCookieState,
  privacyPromptState,
  setAllowedCookieState,
  setPrivacyPromptState,
}): JSX.Element => {
  const { t } = useTranslation();
  const [privacyPromptComplete, setPrivacyPromptComplete] = useState(
    localStorage.getItem("privacyPromptComplete") === "true",
  );
  const [allowedCookies, setAllowedCookies] = useState<Array<string>>([]);

  const promptCallback = (state: PrivacyCookieState): void => {
    setPrivacyPromptComplete(true);

    setAllowedCookieState(state);
    setPrivacyPromptState(PrivacyPromptState.INACTIVE);

    let cookies = allowedCookies;

    for (const key in state) {
      if (state[key]) {
        cookies = [...cookies, ...systemCookies[key].cookies.map((pc) => pc.name)];
      }
    }

    setAllowedCookies(cookies);
  };

  const setSettingsState = (state: PrivacyCookieState, settings: PrivacySettings): PrivacySettings => {
    Object.keys(state).forEach((k) => (settings[k] ? (settings[k].active = state[k]) : null));
    return settings;
  };

  const privacyPrompt = {
    title: formatFirstUpper(t("privacy_consent")),
    text: t("content.privacy_consent"),
    show: !privacyPromptComplete || privacyPromptState === PrivacyPromptState.ACTIVE ? true : false,
    acceptAllText: t("button.accept_all"),
    rejectAllText: t("button.reject_all"),
    closeExpandedText: t("button.close"),
    customizeText: t("button.customize"),
    acceptExpandedText: t("button.accept"),
    tableText: {
      name: formatFirstUpper(t("cookie")),
      expiration: formatFirstUpper(t("expiration")),
      description: formatFirstUpper(t("description")),
    },
    settings: setSettingsState(privacyCookieState, systemCookies),
    defaults: systemCookies,
    settingsCallback: promptCallback,
  };

  useEffect(() => {
    if (!privacyPromptComplete) {
      purgeCookies();
    } else {
      purgeCookies(allowedCookies, true);
    }

    localStorage.setItem("privacyPromptComplete", privacyPromptComplete ? "true" : "false");

    if (privacyCookieState["performance"] && !document.getElementById("new-relic")) {
      const script = document.createElement("script");
      script.id = "new-relic";
      script.src = "/scripts/nr.js";
      script.async = true;

      document.head.appendChild(script);
      return () => document.getElementById("new-relic")?.remove();
    }
  }, [allowedCookies, privacyPromptComplete, privacyCookieState]);

  return <PrivacyPrompt {...privacyPrompt} />;
};

export default Privacy;
