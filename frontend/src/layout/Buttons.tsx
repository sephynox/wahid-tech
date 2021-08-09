import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../App';
import { Themes } from '../tools/Themes';

const Buttons: React.FunctionComponent = (): JSX.Element => {
    const appContext = React.useContext(AppContext);

    const { t, i18n } = useTranslation();

    const toggleTheme = () => {
        let mode = Themes.LIGHT;

        if (appContext.theme === Themes.LIGHT) {
            mode = Themes.DARK;
        }

        appContext.setTheme(mode);
    };

    return (
        <div className="nav-menu nav-menu-buttons">
            <hr className="nav-menu mt-2 mb-3" />
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
                        <span>&nbsp;{i18n.language}</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Buttons;
