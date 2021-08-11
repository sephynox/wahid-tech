const numberWithCommas = (x: number, r?: number): string => {
    const ret = r ? x.toFixed(2) : x.toString();
    return ret.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatPrice = (p: number): string => {
    return '$' + numberWithCommas(p, 2) + ' USD';
};

export const formatPercent = (p: number, r = 2): string => {
    return numberWithCommas(p, r) + '%';
};

export const formatTitleCase = (input: string): string => {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
}

export const formatFirstUpper = (input: string): string => {
    return input.replace(/\w\S*/g, function (str) {
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
}
