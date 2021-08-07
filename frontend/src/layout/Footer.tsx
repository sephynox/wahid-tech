import React from 'react';
import * as Constants from '../Constants';

const Footer: React.FunctionComponent = (): JSX.Element => (
    <footer id="footer" className="justify-content-center">
        <div className="container">
            <div className="copyright">
                © Copyright <strong>{Constants.MY_NAME}</strong>. All Rights Reserved.
            </div>
        </div>
    </footer>
);

export default Footer;
