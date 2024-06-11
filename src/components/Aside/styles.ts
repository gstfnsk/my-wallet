import styled from "styled-components";

export const Container = styled.div`
    grid-area: AS;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.secondary};
    padding-left: 20px;
    border-right: 1px solid ${props => props.theme.colors.grey};
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    height: 70px;
`;
export const MenuContainer = styled.nav`
    display: flex;
    margin-top: 50px;
    flex-direction: column;
   
    /* justify-content: center; */
`;
export const MenuItemLink = styled.a`
    color: ${props => props.theme.colors.info};
    text-decoration: none;
    margin: 7px 0;
    display: flex;
    align-items: center;
    transition: opacity .3s;
    &:hover{
        opacity: 0.7;
    }

    > svg {
        font-size: 20px;
        margin-right: 6px;
    }
`;
export const Title = styled.h3`
    display: flex;
    align-items: center;
    margin-left: 10px;
`;

export const LogoImg = styled.img`
    height: 40px;
    width: 40px;
`;