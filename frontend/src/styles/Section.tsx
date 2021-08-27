import styled from 'styled-components';

export const Section = styled.section`
    width: 100%;
    background-size: cover;
    position: relative;
    padding: 24px 0 20px 0;

    & em {
        width: 100%;
        margin-bottom: 20px;
        display: inline-block;
    }

    & h2 {
        font-size: 32px;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 20px;
        padding-bottom: 20px;
        position: relative;
    }

    & h2::before {
        content: '';
        position: absolute;
        display: block;
        width: 120px;
        height: 1px;
        background: #ddd;
        bottom: 1px;
    }

    & h2::after {
        content: '';
        position: absolute;
        display: block;
        width: 40px;
        height: 3px;
        background: #0563bb;
        bottom: 0;
        left: 40px;
    }

    @media screen and (max-width: 768px) {
        & h2 {
            text-align: center;
        }

        & h2::before {
            left: calc(50% - 60px);
        }

        & h2::after {
            left: calc(50% - 20px);
        }

        & em {
            text-align: center;
        }
    }
`;
