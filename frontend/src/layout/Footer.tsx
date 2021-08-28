import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import * as Constants from '../Constants';
import { ThemeEngine } from '../styles/GlobalStyle';
import Theme from '../tools/Themes';

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
    color: ${(props: ThemeEngine) => props.theme.text};
    font-size: 14px;
    text-align: right;
    padding: 20px;
    width: 100%;
`;
