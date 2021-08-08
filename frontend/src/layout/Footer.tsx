import React from 'react';
import * as Constants from '../Constants';
import styled from 'styled-components';
import Theme from '../tools/Themes';

const Footer: React.FunctionComponent = (): JSX.Element => (
    <FooterStyle id="footer" className="justify-content-center">
        <div className="container">
            <div className="copyright">
                © Copyright <strong>{Constants.MY_NAME}</strong>. All Rights Reserved.
            </div>
        </div>
    </FooterStyle>
);

export default Footer;

const FooterStyle = styled.footer<Theme>`
    height: 60px;
    margin-top: -60px;
    border-top: 1px solid #6c757d;
    color: #45505b;
    font-size: 14px;
    text-align: center;
    padding: 20px 0;
    width: 100%;
`;
