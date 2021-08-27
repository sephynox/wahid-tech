import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../App';
import { systemEvents, systemLanguages } from '../Data';
import { Themes } from '../tools/Themes';

const Buttons: React.FunctionComponent = (): JSX.Element => {
    const appContext = useContext(AppContext);

    const { t, i18n } = useTranslation();

    const toggleTheme = () => {
        let mode = Themes.LIGHT;

        if (appContext.theme === Themes.LIGHT) {
            mode = Themes.DARK;
        }

        appContext.logEvent({ ...systemEvents['change_theme'], label: mode.toString() });
        appContext.setTheme(mode);
    };

    return (
        <div className="nav-menu-buttons">
            <hr className="mt-3 mb-3" />
            <ul>
                <li>
                    <button className="nav-link" onClick={toggleTheme}>
                        <i className={appContext.theme === Themes.LIGHT ? 'icon bi-moon-fill' : 'icon bi-sun-fill'}></i>
                        <span className="capitalize">&nbsp;{appContext.theme === Themes.LIGHT ? t('dark') : t('light')}</span>
                    </button>
                </li>
                <li>
                    <button className="nav-link" onClick={appContext.toggleLangSelector}>
                        <i className="icon bi-translate"></i>
                        <span>&nbsp;{systemLanguages[i18n.language]}</span>
                    </button>
                </li>
                <li>
                    <button className="nav-link" onClick={appContext.togglePrivacySelector}>
                        <i className="icon bi-collection"></i>
                        <span className="capitalize">&nbsp;{t('data_privacy')}</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Buttons;
