import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../App';
import PrivacyPrompt, { PrivacyCookieState, PrivacyPromptState, PrivacySetting } from '../components/PrivacyPrompt';
import { formatFirstUpper } from '../utils/data-formatters';

const Privacy: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const appContext = useContext(AppContext);

    const systemCookies: Record<string, PrivacySetting> = {
        'required': {
            active: true,
            locked: true,
            title: formatFirstUpper(t('required')),
            description: t('content.required_cookies'),
            cookies: {}
        },
        'analytics': {
            active: appContext.allowedCookieState['analytics'] ?? true,
            locked: false,
            title: formatFirstUpper(t('analytics')),
            description: t('content.analytics_cookies'),
            cookies: {}
        },
        'disqus': {
            active: appContext.allowedCookieState['disqus'] ?? true,
            locked: false,
            title: 'Disqus',
            description: t('content.disqus_cookies'),
            cookies: {}
        }
    };

    const promptCallback = (state: PrivacyCookieState): void => {
        localStorage.setItem('privacyPromptComplete', 'true');
        localStorage.setItem('allowedCookieState', JSON.stringify(state));

        appContext.setAllowedCookieState(state);
        appContext.setPrivacySelectorState(PrivacyPromptState.INACTIVE);
    };

    const privacyPrompt = {
        title: formatFirstUpper(t('privacy_consent')),
        text: t('content.privacy_consent'),
        show: appContext.privacySelectorState === PrivacyPromptState.ACTIVE ? true : false,
        acceptAllText: t('button.accept_all'),
        rejectAllText: t('button.reject_all'),
        closeExpandedText: t('button.close'),
        customizeText: t('button.customize'),
        acceptExpandedText: t('button.accept'),
        settings: systemCookies,
        settingsCallback: promptCallback,
    };

    return (
        <PrivacyPrompt {...privacyPrompt} />
    );
};

export default Privacy;
