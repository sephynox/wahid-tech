import OpenSeaDark from '../resources/images/opensea-dark.png'
import OpenSeaLight from '../resources/images/opensea-light.png'

export enum Themes {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum Active {
    ON = 'active',
    OFF = ''
};

export type Theme = {
    name: string;
    border: string;
    borderAlt: string;
    background: string;
    backgroundAlt: string;
    backgroundIcon: string;
    backgroundOption: string;
    backgroundExtended: string;
    backgroundDelta: string;
    link: string;
    linkHover: string;
    hr: string;
    text: string;
    textAlt: string;
    textIcon: string;
    info: string;
    infoText: string;
    infoBorder: string;
    warn: string;
    warnText: string;
    warnBorder: string;
    danger: string;
    dangerText: string;
    dangerBorder: string;
    success: string;
    successText: string;
    successBorder: string;
    images: Record<string, string>;
};

export const lightTheme: Theme = {
    name: Themes.LIGHT,
    border: '1px solid rgba(0, 0, 0, .125)',
    borderAlt: '1px solid rgba(0,0,0,.125)',
    background: 'rgb(255, 255, 255)',
    backgroundAlt: '#e9ecef',
    backgroundIcon: 'rgb(255, 255, 255)',
    backgroundOption: '#b7bec4',
    backgroundExtended: 'rgba(244, 244, 244)',
    backgroundDelta: 'rgba(0, 0, 0, .1)',
    link: 'rgb(11, 134, 249)',
    linkHover: 'rgb(38, 107, 172)',
    hr: 'rgb(96, 96, 96)',
    text: '#000',
    textAlt: '#1a487d',
    textIcon: '#000',
    info: 'rgb(5, 99, 187)',
    infoText: '#004085',
    infoBorder: 'rgb(13, 142, 174)',
    warn: 'rgb(227, 0, 21)',
    warnText: 'rgb(227, 0, 21)',
    warnBorder: 'rgb(227, 0, 21)',
    danger: 'rgba(151, 3, 1, 0.3)',
    dangerText: '#721c24',
    dangerBorder: 'rgb(157, 3, 1)',
    success: 'rgb(19, 162, 7)',
    successText: 'rgb(19, 162, 7)',
    successBorder: 'rgb(19, 162, 7)',
    images: {
        opensea: OpenSeaLight
    }
};

export const darkTheme: Theme = {
    name: Themes.DARK,
    border: '1px solid rgba(169, 155, 134, 0.13)',
    borderAlt: '1px solid rgba(169, 155, 134, 0.13)',
    background: 'rgb(18, 18, 19)',
    backgroundAlt: 'rgb(29, 31, 31)',
    backgroundIcon: 'rgb(87, 87, 87)',
    backgroundOption: '#6c757d',
    backgroundExtended: 'rgb(32, 34, 34)',
    backgroundDelta: 'rgba(0, 0, 0)',
    link: 'rgb(81, 139, 193)',
    linkHover: 'rgb(6, 125, 237)',
    hr: 'rgb(81, 83, 84)',
    text: '#fff',
    textAlt: '#acc7e6',
    textIcon: '#9ba4ae',
    infoText: '#81b6f0',
    info: 'rgb(5, 99, 187)',
    infoBorder: 'rgb(6, 65, 129)',
    warn: 'rgba(168, 141, 12, 0.3)',
    warnText: '#f0cf81',
    warnBorder: 'rgb(174, 146, 13)',
    danger: 'rgba(126, 3, 1, 0.3)',
    dangerText: '#f08181',
    dangerBorder: 'rgb(220, 11, 5)',
    success: 'rgb(32, 253, 13)',
    successText: 'rgb(32, 253, 13)',
    successBorder: 'rgb(32, 253, 13)',
    images: {
        opensea: OpenSeaDark
    }
};

export const availableThemes: Record<string, Theme> = {
    [Themes.LIGHT]: lightTheme,
    [Themes.DARK]: darkTheme
};

export default Theme;
