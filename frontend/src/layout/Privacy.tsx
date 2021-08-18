import i18next from 'i18next';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../App';
import PrivacyPrompt, { PrivacyCookieState, PrivacyPromptState, PrivacySetting } from '../components/PrivacyPrompt';
import { formatFirstUpper, formatNumber } from '../utils/data-formatters';

const Privacy: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const appContext = useContext(AppContext);

    const systemCookies: Record<string, PrivacySetting> = {
        'required': {
            active: true,
            locked: true,
            title: formatFirstUpper(t('required')),
            description: t('content.required_cookies'),
            cookies: [
                {
                    name: 'session_id',
                    expiration: `${formatNumber(6, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Used to store session token.'
                },
            ],
        },
        'analytics': {
            active: appContext.allowedCookieState['analytics'] ?? true,
            locked: false,
            title: formatFirstUpper(t('analytics')),
            description: t('content.analytics_cookies'),
            cookies: [
                {
                    name: '_ga',
                    expiration: `${formatNumber(2, i18next.language, 0)} ${t('time.years')}`,
                    description: 'Used to distinguish users.'
                },
                {
                    name: '_gid',
                    expiration: `${formatNumber(24, i18next.language, 0)} ${t('time.hours')}`,
                    description: 'Used to distinguish users.'
                },
                {
                    name: '_gat',
                    expiration: `${formatNumber(1, i18next.language, 0)} ${t('time.minutes')}`,
                    description: 'Used to throttle request rate.'
                },
                {
                    name: '_ga_<container-id>',
                    expiration: `${formatNumber(2, i18next.language, 0)} ${t('time.years')}`,
                    description: 'Used to persist session state.'
                },
                {
                    name: '_gac_gb_<container-id>',
                    expiration: `${formatNumber(90, i18next.language, 0)} ${t('time.days')}`,
                    description: 'Contains campaign related information.'
                },
                {
                    name: 'AMP_TOKEN',
                    expiration: `${formatNumber(1, i18next.language, 0)} ${t('time.years')}`,
                    description: 'Contains a token that can be used to retrieve a Client ID from AMP Client ID service.'
                },
                {
                    name: '_gac_<property-id>',
                    expiration: `${formatNumber(90, i18next.language, 0)} ${t('time.days')}`,
                    description: 'Contains campaign related information for the user.'
                },
                {
                    name: '__utma',
                    expiration: `${formatNumber(2, i18next.language, 0)} ${t('time.years')}`,
                    description: 'Used to distinguish users and sessions.'
                },
                {
                    name: '__utmt',
                    expiration: `${formatNumber(10, i18next.language, 0)} ${t('time.minutes')}`,
                    description: 'Used to throttle request rate.'
                },
                {
                    name: '__utmb',
                    expiration: `${formatNumber(30, i18next.language, 0)} ${t('time.minutes')}`,
                    description: 'Used to determine new sessions/visits.'
                },
                {
                    name: '__utmz',
                    expiration: `${formatNumber(6, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Stores the traffic source or campaign that explains how the user reached your site.'
                },
                {
                    name: '__utmv',
                    expiration: `${formatNumber(2, i18next.language, 0)} ${t('time.years')}`,
                    description: 'Used to store visitor-level custom variable data.'
                },
            ],
        },
        'performance': {
            active: appContext.allowedCookieState['performance'] ?? true,
            locked: false,
            title: formatFirstUpper(t('performance')),
            description: t('content.performance_cookies'),
            cookies: [
                {
                    name: 'JSESSIONID',
                    expiration: formatFirstUpper(t('browser_closed')),
                    description: 'Used to monitor session counts for an application.'
                },
                {
                    name: 'NREUM',
                    expiration: formatFirstUpper(t('browser_closed')),
                    description: 'This cookie is only created in browsers that do not support the Navigation Timing API.'
                },
                {
                    name: 'NRAGENT',
                    expiration: formatFirstUpper(t('browser_closed')),
                    description: 'This cookie is used to communicate between the New Relic collector aggregating end user metrics and the agent(s) running in the associated web application.'
                },
            ],
        },
        'disqus': {
            active: appContext.allowedCookieState['disqus'] ?? true,
            locked: false,
            title: 'Disqus',
            description: t('content.disqus_cookies'),
            cookies: [
                {
                    name: 'disqus_unique',
                    expiration: `${formatNumber(24, i18next.language, 0)} ${t('time.hours')}`,
                    description: 'Internal statistics, used for anonymous visitors.'
                },
                {
                    name: 'testCookie',
                    expiration: `${formatNumber(24, i18next.language, 0)} ${t('time.hours')}`,
                    description: ' Used to check whether the browser accepts 3rd-party cookies.'
                },
                {
                    name: 'G_ENABLED_IDPS',
                    expiration: formatFirstUpper(t('no_expiration')),
                    description: 'Please see Disqus documentation.'
                },
                {
                    name: '__jid',
                    expiration: `${formatNumber(24, i18next.language, 0)} ${t('time.hours')}`,
                    description: 'Please see Disqus documentation.'
                },
                {
                    name: 'csrftoken',
                    expiration: `${formatNumber(5, i18next.language, 0)} ${t('time.minutes')}`,
                    description: 'Please see Disqus documentation.'
                },
                {
                    name: 'disqusauth',
                    expiration: `${formatNumber(3, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Please see Disqus documentation.'
                },
                {
                    name: 'disqusauths',
                    expiration: `${formatNumber(3, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Please see Disqus documentation.'
                },
                {
                    name: 'sessionid',
                    expiration: `${formatNumber(3, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Please see Disqus documentation.'
                },
            ],
        }
    };

    const promptCallback = (state: PrivacyCookieState): void => {
        localStorage.setItem('privacyPromptComplete', 'true');
        localStorage.setItem('allowedCookieState', JSON.stringify(state));

        appContext.setAllowedCookieState(state);
        appContext.setPrivacySelectorState(PrivacyPromptState.INACTIVE);

        for (const key in state) {
            if (!state[key]) {
                appContext.logEvent({ category: 'Privacy Cookie', action: 'Disabled', label: key });
            }
        }
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
        tableText: {
            name: formatFirstUpper(t('cookie')),
            expiration: formatFirstUpper(t('expiration')),
            description: formatFirstUpper(t('description')),
        },
        settings: systemCookies,
        settingsCallback: promptCallback,
    };

    return (
        <PrivacyPrompt {...privacyPrompt} />
    );
};

export default Privacy;
