import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { AppContext } from '../App';
import { availableThemes } from '../tools/Themes';
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
    const appContext = useContext(AppContext);
    const baseColor = availableThemes[appContext.theme].loaderBase;
    const highlightColor = availableThemes[appContext.theme].loaderHightlight;

    switch (type) {
        default:
        case 'Profile':
            return (
                <>
                    <Skeleton
                        circle
                        width={width}
                        height={height}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                    />
                    <Skeleton count={1} width={width} baseColor={baseColor} highlightColor={highlightColor} />
                </>
            );
        case 'Bars':
            return (
                <>
                    {[...Array(bars)].map((i) => (
                        <Skeleton
                            key={i}
                            count={1}
                            width={`calc(${width} - ${randomNumber(1, 10)}em)`}
                            baseColor={baseColor}
                            highlightColor={highlightColor}
                        />
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
                            <Skeleton
                                key={i}
                                count={1}
                                width={`calc(${width} - ${randomNumber(1, 10)}em)`}
                                baseColor={baseColor}
                                highlightColor={highlightColor}
                            />
                        );
                    })}
                </>
            );
    }
};

export default LoaderSkeleton;