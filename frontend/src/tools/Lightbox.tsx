import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Themes } from '../tools/Themes';

type Props = {
    imageDark: string;
    imageLight: string;
    imageAlt: string;
};

export interface Image {
    url: string,
    alt: string,
};

const LightBox: React.FunctionComponent<Props> = (props): JSX.Element => {
    const appContext = useContext(AppContext);
    return (<img src={appContext.theme === Themes.DARK ? props.imageDark : props.imageLight} alt={props.imageAlt} />);
};

export default LightBox;
