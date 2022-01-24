import React, { useContext } from 'react';
import { solarizedLight, CodeBlock, tomorrowNight } from 'react-code-blocks';
import { AppContext } from '../App';
import { Themes } from '../tools/Themes';

type CodeProps = {
    text: string;
    language: string;
    showLineNumbers?: boolean;
};

export const Code = (props: CodeProps): JSX.Element => {
    const appContext = useContext(AppContext);

    return <CodeBlock {...props} theme={appContext.theme === Themes.DARK ? tomorrowNight : solarizedLight} />;
};

export default Code;
