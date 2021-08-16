import styled from 'styled-components';
import { ThemeEngine } from './GlobalStyle';

const HorizontalRule = styled.hr`
    background-color: ${(props: ThemeEngine) => props.theme.hr};
    position: relative;
    width: 50%;
    margin: 20px 0;
    opacity: 0.75;

    &:after {
        content: '';
        position: absolute;
        display: block;
        width: 100px;
        height: 3px;
        background: ${(props: ThemeEngine) => props.theme.info};
        left: 50px;
        bottom: 0;
    }

    @media screen and (max-width: 768px) {
        margin: 20px auto;

        &:after {
            width: 50px;
            left: calc(50% - 25px);
        }
    }
`;

export default HorizontalRule;
