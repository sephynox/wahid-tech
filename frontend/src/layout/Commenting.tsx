import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import * as Constants from "../Constants";
import { systemEvents } from "../Data";
import { AppAction, AppContext } from "../App";
import { PrivacyPromptState } from "../components/PrivacyPrompt";
import Comments from "../components/Comments";

type Props = {
  full_url: string;
  identifier: string;
  title: string;
};

const Commenting = ({ full_url, identifier, title }: Props): JSX.Element => {
  const { t, i18n } = useTranslation();
  const appContext = useContext(AppContext);
  const lang = i18n.language === "en-US" ? "en" : i18n.language.replace("-", "_");

  const eventComment = () => appContext.dispatch({ type: AppAction.LOG, event: systemEvents["disqus_comment"] });
  const setPrivacyPromptState = (state: PrivacyPromptState) =>
    appContext.dispatch({
      type: state === PrivacyPromptState.INACTIVE ? AppAction.CLOSE_PRIVACY : AppAction.OPEN_PRIVACY,
    });

  if (appContext.state.privacyCookieState["disqus"]) {
    return (
      <Comments
        shortname={Constants.SITE_SHORTNAME}
        full_url={full_url}
        identifier={identifier}
        title={title}
        language={lang}
        eventComment={eventComment}
      />
    );
  } else {
    return (
      <p>
        {t("content.disqus_disabled")}
        <br />
        <Button onClick={() => setPrivacyPromptState(PrivacyPromptState.ACTIVE)} variant="link">
          {t("data_privacy")}
        </Button>
      </p>
    );
  }
};

export default Commenting;
