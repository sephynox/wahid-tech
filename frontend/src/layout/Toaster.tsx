import React from 'react';
import { withTheme } from 'styled-components'
import { Toaster as ReactToaster } from 'react-hot-toast';
import Theme from '../tools/Themes';

const Toaster = ({ theme }: { theme: Theme }): JSX.Element => {
    return (
        <ReactToaster
            toastOptions={{
                style: {
                    color: theme.text,
                    backgroundColor: theme.backgroundExtended,
                },
            }}
        />
    );
};

export default withTheme(Toaster);
