import React from 'react';

export enum OverlayState {
    SHOW = 'active',
    HIDE = ''
};

const Overlay = ({ state }: { state: OverlayState }): JSX.Element => {
    return (
        <div id="overlay" className={state as string}></div>
    );
};

export default Overlay;
