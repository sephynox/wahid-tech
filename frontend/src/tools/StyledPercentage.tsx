import React from 'react';
import * as Constants from '../Constants';
import { formatPercent } from '../utils/data-formatters';

const StyledPercentage = (percent?: number, l = Constants.DEFAULT_LANG): JSX.Element => {
    if (!percent) {
        return (<span className="color grey">-</span>);
    }

    const ret = formatPercent(percent, Constants.DEFAULT_PERCENT_PLACES, l);
    const sign = percent < 0 ? 'bi bi-arrow-down-short' : 'bi bi-arrow-up-short';
    const color = percent < 0 ? 'color red' : 'color green';

    return (<span className={color}>{ret} <i className={sign}></i></span>);
};

export default StyledPercentage;
