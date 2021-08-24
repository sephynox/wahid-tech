import styled from 'styled-components';
import { ThemeEngine } from './GlobalStyle';

export const Blockquote = styled.blockquote`
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 10px;
    border-left: 1px solid ${(props: ThemeEngine) => props.theme.text};
    font-size: 1.2rem;
    color: ${(props: ThemeEngine) => props.theme.textAlt};

    & cite {
        color: #595959;
    }
`;
