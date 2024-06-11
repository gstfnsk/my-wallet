import styled from "styled-components";

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 250px auto; //duas colunas
    grid-template-rows: 70px auto; //duas linhas
    grid-template-areas:  
    'AS MH' //11, 12,
    'AS CT'; //21, 22,

    height: 100vh;
`;