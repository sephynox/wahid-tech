import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { DiscussionEmbed } from 'disqus-react';
import { AppContext } from '../App';
import { systemEvents } from '../Data';

type Props = {
    full_url: string;
    identifier: string;
    title: string;
};

const Comments = ({ full_url, identifier, title }: Props): JSX.Element => {
    const { t, i18n } = useTranslation();
    const appContext = useContext(AppContext);

    const lang = i18n.language === 'en-US' ? 'en' : i18n.language.replace('-', '_');

    if (appContext.allowedCookieState['disqus']) {
        return (
            <DiscussionEmbed
                shortname="wahidtech"
                config={{
                    onNewComment: () => {
                        appContext.logEvent(systemEvents['disqus_comment']);
                    },
                    url: full_url,
                    identifier: identifier,
                    title: title,
                    language: lang,
                }}
            />
        );
    } else {
        return (
            <p>
                {t('content.disqus_disabled')}
                <br />
                <Button onClick={appContext.togglePrivacySelector} variant="link">
                    {t('data_privacy')}
                </Button>
            </p>
        );
    }
};

export default Comments;
