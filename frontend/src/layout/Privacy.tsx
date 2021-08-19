import i18next from 'i18next';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../App';
import PrivacyPrompt, { PrivacyCookieState, PrivacyPromptState, PrivacySetting } from '../components/PrivacyPrompt';
import { formatFirstUpper, formatNumber } from '../utils/data-formatters';
import { purgeCookies } from '../utils/data-helpers';

const Privacy: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();
    const appContext = useContext(AppContext);
    const [privacyPromptComplete, setPrivacyPromptComplete] = useState(localStorage.getItem('privacyPromptComplete') === 'true');
    const [allowedCookies, setAllowedCookies] = useState<Array<string>>([]);

    const promptCallback = (state: PrivacyCookieState): void => {
        setPrivacyPromptComplete(true);

        appContext.setAllowedCookieState(state);
        appContext.setPrivacySelectorState(PrivacyPromptState.INACTIVE);

        let cookies = allowedCookies;

        for (const key in state) {
            if (!state[key]) {
                appContext.logEvent({ category: 'Privacy Cookie', action: 'Disabled', label: key });
            } else {
                cookies = [...cookies, ...systemCookies[key].cookies.map((pc) => pc.name)];
            }
        }

        setAllowedCookies(cookies);
    };

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
                    name: 'AMP_TOKEN',
                    expiration: `${formatNumber(1, i18next.language, 0)} ${t('time.years')}`,
                    description: 'Contains a token that can be used to retrieve a Client ID from AMP Client ID service.'
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
                {
                    name: 'CGIC',
                    expiration: `${formatNumber(6, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Improves the delivery of search results by auto-completing search queries based on a user’s initial input.'
                },
                {
                    name: 'SID',
                    expiration: `${formatNumber(6, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Used to store digitally signed and encrypted records of a user’s Google Account ID and most recent sign-in time.'
                },
                {
                    name: 'HSID',
                    expiration: `${formatNumber(6, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Used to store digitally signed and encrypted records of a user’s Google Account ID and most recent sign-in time.'
                },
                {
                    name: 'OTZ',
                    expiration: `${formatNumber(10, i18next.language, 0)} ${t('time.years')}`,
                    description: 'Used to track website traffic information.'
                },
            ],
        },
        'advertising': {
            active: appContext.allowedCookieState['advertising'] ?? false,
            locked: false,
            title: formatFirstUpper(t('advertising')),
            description: t('content.advertising_cookies'),
            cookies: [
                {
                    name: 'IDE',
                    expiration: `${formatNumber(13, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Used to show Google ads on non-Google sites.'
                },
                {
                    name: 'ANID',
                    expiration: `${formatNumber(13, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Used to show Google ads on non-Google sites.'
                },
                {
                    name: 'NID',
                    expiration: `${formatNumber(6, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Used to show Google ads in Google services for signed-out users.'
                },
                {
                    name: 'HSID',
                    expiration: `${formatNumber(1, i18next.language, 0)} ${t('time.years')}`,
                    description: 'Used to build a profile of the website visitor’s interests and show relevant ads on other sites.'
                },
                {
                    name: 'APISID',
                    expiration: `${formatNumber(10, i18next.language, 0)} ${t('time.years')}`,
                    description: 'Used to play YouTube videos embedded on the website.'
                },
                {
                    name: 'SAPISID',
                    expiration: `${formatNumber(10, i18next.language, 0)} ${t('time.years')}`,
                    description: 'Used to play YouTube videos embedded on the website.'
                },
                {
                    name: 'SIDCC',
                    expiration: `${formatNumber(6, i18next.language, 0)} ${t('time.months')}`,
                    description: 'Used as security measure to protect users data from unauthorized access.'
                },
                {
                    name: '_gac_<property-id>',
                    expiration: `${formatNumber(90, i18next.language, 0)} ${t('time.days')}`,
                    description: 'Contains campaign related information for the user.'
                },
                {
                    name: '_gac_gb_<container-id>',
                    expiration: `${formatNumber(90, i18next.language, 0)} ${t('time.days')}`,
                    description: 'Contains campaign related information.'
                },
            ]
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
                {
                    name: 'intercom-id-*',
                    expiration: `${formatNumber(1, i18next.language, 0)} ${t('time.years')}`,
                    description: 'Please see Disqus documentation.'
                },
                {
                    name: 'intercom-session-*',
                    expiration: `${formatNumber(1, i18next.language, 0)} ${t('time.weeks')}`,
                    description: 'Please see Disqus documentation.'
                },
            ],
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
        defaults: systemCookies,
        settingsCallback: promptCallback,
    };

    useEffect(() => {
        if (!privacyPromptComplete) {
            purgeCookies();
        } else {
            purgeCookies(allowedCookies, true);
        }

        if (appContext.allowedCookieState['performance'] && !document.getElementById('new-relic')) {
            const script = document.createElement('script');
            script.id = 'new-relic';
            script.src = '/scripts/nr.js';
            script.async = true;

            document.head.appendChild(script);
        }

        localStorage.setItem('privacyPromptComplete', privacyPromptComplete ? 'true' : 'false');
    }, [allowedCookies, privacyPromptComplete, appContext.allowedCookieState]);

    return (
        <PrivacyPrompt {...privacyPrompt} />
    );
};

export default Privacy;
