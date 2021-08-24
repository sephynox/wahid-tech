import styled from 'styled-components';

export const BlogPost = styled.article`
    max-width: 800px;

    & section h2 {
        margin-bottom: 20px;
    }

    & h3 {
        margin 20px 0 20px 0;
        font-size: 1.3em;
        display: inline-block;
        text-transform: capitalize;
        color: #595959;
    }

    & section h4 {
        margin-top: 30px;
        font-size: 1.2em;
    }

    & figure {
        padding: 50px;
        text-align: center;
    }

    & figure img {
        max-width: 100%;
    }

    & figure figcaption {
        display: inherit;
        padding-top: 20px;
    }

    & .container {
        padding: 0;
    }

    @media screen and (max-width: 768px) {
        & em {
            text-align: center;
        }
    }
`;
