import styled from 'styled-components';

export const TopButton = styled.div`
    position: fixed;
    height: 56px;
    width: 56px;
    right: 40px;
    border-radius: 50px;
    bottom: 100px;
    padding: 5px 12px;
    align-items: center;
    font-size: 30px;
    color:  ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.backgroundExtended};
    transition: 0.5s all ease-in-out;
    overflow: hidden;
    z-index: 1;
    opacity: .75;
    cursor: pointer;

    &:hover {
        background-color: rgb(5, 99, 187);
    }

    @media screen and (max-width: 768px) {
        bottom: 80px;
        right: 15px;
        opacity: .5;
    }
`;

export const Blockquote = styled.blockquote`
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 10px;
    border-left: 1px solid ${({ theme }) => theme.text};
    font-size: 1.2rem;
    color: ${({ theme }) => theme.textAlt};
`;

export const HangingIndent = styled.p`
    padding-left: 1.5em;
    text-indent:-1.5em;
`;
