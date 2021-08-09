import React from 'react';
import ContentLoader from 'react-content-loader';
import { randomNumber } from '../utils/data-helpers';

type Props = {
    type?: 'profile' | 'paragraph';
    color?: string;
    width?: number;
    height?: number;
    timeout?: number;
};

const LoaderContent = ({
    width = 150,
    height = 250,
    type = 'paragraph',
    color = '#004085'
}: Props): JSX.Element => {
    const loaderType = (): JSX.Element => {
        const minWidth: number = width * .70;
        const maxWidthShort: number = width * .30;
        const minWidthShort: number = maxWidthShort * .70;

        switch (type) {
            case 'profile':
                return (
                    <>
                        <rect x="48" y="8" rx="3" ry="3" width={randomNumber(minWidthShort, maxWidthShort)} height="6" />
                        <rect x="48" y="26" rx="3" ry="3" width={randomNumber(minWidthShort, maxWidthShort)} height="6" />
                        <rect x="0" y="56" rx="3" ry="3" width={randomNumber(minWidth, width)} height="6" />
                        <rect x="0" y="72" rx="3" ry="3" width={randomNumber(minWidth, width)} height="6" />
                        <rect x="0" y="88" rx="3" ry="3" width={randomNumber(minWidth, width)} height="6" />
                        <circle cx="20" cy="20" r="20" />
                    </>
                );
            case 'paragraph':
            default:
                return (
                    <>
                        <rect x="0" y="56" rx="3" ry="3" width={randomNumber(minWidth, width)} height="6" />
                        <rect x="0" y="72" rx="3" ry="3" width={randomNumber(minWidth, width)} height="6" />
                        <rect x="0" y="88" rx="3" ry="3" width={randomNumber(minWidth, width)} height="6" />
                    </>
                );
        };
    };

    return (
        <ContentLoader
            speed={2}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            {loaderType()}
        </ContentLoader>
    );
};

export default LoaderContent;
