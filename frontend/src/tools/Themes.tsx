export type Theme = {
    name: string;
    border: string;
    borderAlt: string;
    background: string;
    backgroundAlt: string;
    backgroundIcon: string;
    backgroundOption: string;
    backgroundExtended: string;
    backgroundBlog: string;
    backgroundDelta: string;
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
};

export const lightTheme: Theme = {
    name: 'light',
    border: '1px solid rgba(0, 0, 0, .125)',
    borderAlt: '1px solid rgba(0,0,0,.125)',
    background: 'rgb(255, 255, 255)',
    backgroundAlt: '#e9ecef',
    backgroundIcon: 'rgb(255, 255, 255)',
    backgroundOption: '#b7bec4',
    backgroundExtended: 'rgba(244, 244, 244)',
    backgroundBlog: 'rgb(255, 255, 255)',
    backgroundDelta: 'rgba(0, 0, 0, .1)',
    hr: 'rgb(191, 191, 191)',
    text: '#000',
    textAlt: '#1a487d',
    textIcon: '#000',
    info: 'rgb(5, 99, 187)',
    infoText: '#004085',
    infoBorder: 'rgb(13, 142, 174)',
    warn: 'rgba(168, 141, 12, 0.3)',
    warnText: '#856404',
    warnBorder: 'rgb(174, 146, 13)',
    danger: 'rgba(151, 3, 1, 0.3)',
    dangerText: '#721c24',
    dangerBorder: 'rgb(157, 3, 1)',
    success: 'rgb(32, 253, 13)',
    successText: 'rgb(32, 253, 13)',
    successBorder: 'rgb(32, 253, 13)',
};

export const darkTheme: Theme = {
    name: 'dark',
    border: '1px solid rgba(169, 155, 134, 0.13)',
    borderAlt: '1px solid rgba(169, 155, 134, 0.13)',
    background: 'rgb(24, 26, 26)',
    backgroundAlt: 'rgb(29, 31, 31)',
    backgroundIcon: 'rgb(87, 87, 87)',
    backgroundOption: '#6c757d',
    backgroundExtended: 'rgb(32, 34, 34)',
    backgroundBlog: 'rgb(32, 34, 34)',
    backgroundDelta: 'rgba(0, 0, 0)',
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
};

export default Theme;
