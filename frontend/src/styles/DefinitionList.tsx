import styled from 'styled-components';

export const DefinitionList = styled.dl`
    & dd {
        text-align: left;
        margin-left: calc(30% + 20px);
        padding-bottom: 5px;
    }

    & dt {
        width: 30%;
        float: left;
        text-align: right;
        font-weight: normal;
        font-style: italic;
        color: #595959;
        padding-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @media screen and (max-width: 768px) {
        & dt {
            width: 30%;
            text-align: left;
        }

        & dd {
            width: 70%;
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
