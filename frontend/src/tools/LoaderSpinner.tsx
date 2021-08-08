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
    timeout = 60000 }: Props
): JSX.Element => {
    return (
        <div className="loader-center">
            <Loader
                type={type}
                color={color}
                height={height}
                width={width}
                timeout={timeout}
            />
        </div>
    );
};

export default LoaderSpinner;
