export const numberWithCommas = (x: number, r?: number): string => {
    const ret = r ? x.toFixed(2) : x.toString();
    return ret.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatPrice = (price: number): string => {
    return '$' + numberWithCommas(price, 2) + ' USD';
};

export const formatPercent = (percent: number): string => {
    return numberWithCommas(percent) + '%';
};
