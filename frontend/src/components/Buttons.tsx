import React from 'react';
import { AppContext } from '../App';
import { Themes } from '../tools/Themes';

const Buttons: React.FunctionComponent = (): JSX.Element => {
    const appContext = React.useContext(AppContext);
    const toggleTheme = () => {
        let mode = Themes.LIGHT;

        if (appContext.theme === Themes.LIGHT) {
            mode = Themes.DARK;
        }

        appContext.setTheme(mode);
    };

    return (
        <div className='nav-menu-buttons'>
            <button className="nav-link" onClick={toggleTheme}>
                <i className={appContext.theme === Themes.LIGHT ? 'icon bi-sun-fill' : 'icon bi-moon-fill'}></i>
                <span>{appContext.theme === Themes.LIGHT ? 'Toggle Dark' : 'Toggle Light'}</span>
            </button>
        </div>
    );
};

export default Buttons;
