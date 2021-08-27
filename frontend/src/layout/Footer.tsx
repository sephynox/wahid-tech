import React from 'react';
import * as Constants from '../Constants';
import styled from 'styled-components';
import Theme from '../tools/Themes';
import { useTranslation } from 'react-i18next';

const Footer: React.FunctionComponent = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <FooterStyle id="footer" className="justify-content-center copyright capitalize">
            {t('copyright')} <strong>{Constants.MY_NAME}</strong>.
        </FooterStyle>
    );
};

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
