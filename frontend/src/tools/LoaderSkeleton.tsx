import React from 'react';
import Skeleton from 'react-loading-skeleton';

type Props = {
    type?: 'Profile';
    height?: number;
    width?: number | string;
};

const LoaderSkeleton: React.FunctionComponent<Props> = ({
    type = 'Profile',
    height = 80,
    width = 80,
}: Props): JSX.Element => {
    switch (type) {
        default:
        case 'Profile':
            return (
                <>
                    <Skeleton circle width={width} height={height - 20} />
                    <Skeleton count={1} width={width} />
                </>
            );
    }
};

export default LoaderSkeleton;
