import React from 'react';
import ContentLoader from 'react-content-loader';

type Props = {
    type?: 'card' | 'paragraph';
    color?: string;
    width?: number;
    height?: number;
    timeout?: number;
};

const LoaderContent = ({
    width = 80,
    height = 80,
    type = 'paragraph',
    color = '#004085',
    timeout = 60000 }: Props
): JSX.Element => {
    const loaderType = (): JSX.Element => {
        switch (type) {
            case 'card':
                return (
                    <>
                        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
                        <circle cx="20" cy="20" r="20" />
                    </>
                );
            case 'paragraph':
            default:
                return (
                    <>
                        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
                        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
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
            {loaderType}
        </ContentLoader>
    );
};

export default LoaderContent;
