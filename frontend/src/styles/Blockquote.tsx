import styled from 'styled-components';
import { ThemeEngine } from './GlobalStyle';

export const Blockquote = styled.blockquote`
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 10px;
    border-left: 1px solid ${(props: ThemeEngine) => props.theme.text};
    font-size: 1.2em;
    color: ${(props: ThemeEngine) => props.theme.textAlt};

    & em {
        margin-top: 10px;
        margin-bottom: 10px;
        color: ${(props: ThemeEngine) => props.theme.subduedText};
    }

    @media screen and (max-width: 768px) {
        & em {
            text-align: right;
        }
    }
`;
