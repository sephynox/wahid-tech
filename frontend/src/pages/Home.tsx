import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Constants from '../Constants';
import { donationAddresses } from '../Data';
import CryptoAssets from '../tools/CryptoAssets';

const Home = (): JSX.Element => {
    const { t } = useTranslation();

    const title = Constants.SITE_NAME;
    const subtext = 'An informational website and technology blog.';

    return (
        <div className="container">
            <section>
                <div className="title">
                    <h2>{title}</h2>
                    <p>{subtext}</p>
                </div>
            </section>
            <section>
                <h3 className="capitalize">{t('donate')}</h3>
                <p>Proceeds will be used to maintain, enhance, and develop content for the platform.</p>
                <CryptoAssets data={donationAddresses} size={24} />
            </section>
        </div>
    );
};

export default Home;
