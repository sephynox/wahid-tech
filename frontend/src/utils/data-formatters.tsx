import * as Constants from '../Constants';

export const formatNumberWithSeparators = (x: number, r?: number, s = ','): string => {
    const ret = r ? x.toFixed(2) : x.toString();
    return ret.replace(/\B(?=(\d{3})+(?!\d))/g, s);
}

export const formatPrice = (n: number, r = 2, l = Constants.DEFAULT_LANG, c = Constants.DEFAULT_CURRENCY): string => {
    return `${Intl.NumberFormat(l, { style: 'currency', currency: c, minimumFractionDigits: r }).format(n)}`;
};

export const formatPercent = (p: number, r = 2, l = Constants.DEFAULT_LANG): string => {
    return `${Intl.NumberFormat(l, { maximumFractionDigits: r }).format(p)}%`;
};

export const formatTitleCase = (input: string): string => {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
}

export const formatFirstUpper = (input: string): string => {
    return input.replace(/\w\S*/g, function (str) {
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
}

// Thanks https://stackoverflow.com/a/9462382/8177368
export const formatShortNumber = (n: number, d: number): string => {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'B' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup.slice().reverse().find(function (item) {
        return n >= item.value;
    });

    return item ? (n / item.value).toFixed(d).replace(rx, '$1') + item.symbol : '0';
}
