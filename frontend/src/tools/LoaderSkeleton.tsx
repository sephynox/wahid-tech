import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { randomNumber } from '../utils/data-helpers';

type Props = {
    type?: 'Profile' | 'Bars' | 'Paragraphs';
    height?: number | string;
    width?: number | string;
    bars?: number;
};

const LoaderSkeleton: React.FunctionComponent<Props> = ({
    type = 'Profile',
    height = 80,
    width = 80,
    bars = 1,
}: Props): JSX.Element => {
    switch (type) {
        default:
        case 'Profile':
            return (
                <>
                    <Skeleton circle width={width} height={height} />
                    <Skeleton count={1} width={width} />
                </>
            );
        case 'Bars':
            return (
                <>
                    {[...Array(bars)].map((i) => (
                        <Skeleton key={i} count={1} width={`calc(${width} - ${randomNumber(1, 10)}em)`} />
                    ))}
                </>
            );
        case 'Paragraphs':
            return (
                <>
                    {Array.from(Array(bars), (e, i) => {
                        return i % randomNumber(1, bars) === 0 ? (
                            <br key={i} />
                        ) : (
                            <Skeleton key={i} count={1} width={`calc(${width} - ${randomNumber(1, 10)}em)`} />
                        );
                    })}
                </>
            );
    }
};

export default LoaderSkeleton;
