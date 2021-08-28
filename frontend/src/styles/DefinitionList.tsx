import styled from 'styled-components';

export const DefinitionList = styled.dl`
    & dd {
        text-align: left;
        margin-left: calc(30% + 20px);
        padding-bottom: 5px;
        line-break: strict;
        word-wrap: break-word;
    }

    & dt {
        width: 30%;
        float: left;
        text-align: right;
        font-weight: normal;
        font-style: italic;
        color: #595959;
        padding-bottom: 5px;
        line-break: strict;
    }

    @media screen and (max-width: 768px) {
        & dt {
            width: 30%;
            text-align: left;
        }

        & dd {
            width: calc(70% - 20px);
        }
    }

    @media screen and (max-width: 400px) {
        & dt {
            width: 100%;
            text-align: left;
        }

        & dt.xs-right {
            text-align: right;
        }

        & dd,
        dt {
            clear: both;
            width: 100%;
            display: block;
            margin-left: auto;
        }
    }
`;
