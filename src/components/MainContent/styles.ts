import styled from "styled-components";

export const Container = styled.div`
    padding: 25px;
    grid-area: CT;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary};
    height: calc(100vh - 70px);
    overflow-y: scroll;

    /*
     não sei se essas customizações do scroll ainda são suportados
    ::-webkit-scrollbar {
        width: 10px;
    }

     ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.secondary};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.tertiary};
        border-radius: 10px;
    } */

`;