export const numberWithCommas = (x: number, r?: number): string => {
    const ret = r ? x.toFixed(2) : x.toString();
    return ret.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatPrice = (p: number): string => {
    return '$' + numberWithCommas(p, 2) + ' USD';
};

export const formatPercent = (p: number, r = 2): string => {
    return numberWithCommas(p, r) + '%';
};
