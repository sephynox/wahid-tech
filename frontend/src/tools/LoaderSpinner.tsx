import React from 'react';
import Loader from 'react-loader-spinner';

type Props = {
    type?: 'Bars' | 'Circles' | 'Grid' | 'Oval' | 'Rings' | 'TailSpin' | 'ThreeDots';
    color?: string;
    width?: number;
    height?: number;
    timeout?: number;
};

const LoaderSpinner = ({
    width = 80,
    height = 80,
    type = 'Oval',
    color = '#004085',
    timeout = 3000 }: Props
): JSX.Element => {
    return (
        <Loader
            type={type}
            color={color}
            height={height}
            width={width}
            timeout={3000}
        />
    );
};

export default LoaderSpinner;
