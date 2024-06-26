import React from "react";
import { Container, Header, LogoImg, Title, MenuContainer, MenuItemLink } from './styles';
import logoImg from '../../assets/logo.svg';

import {MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp} from 'react-icons/md';

const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogoImg src={logoImg} alt="Logo Minha Carteira" /> 
                <Title> Minha Carteira</Title>
            </Header>
            <MenuContainer>
                <MenuItemLink href="/dashboard">
                    <MdDashboard />
                    Dashboard
                </MenuItemLink>
                <MenuItemLink href="/list/income-balance">
                <MdArrowUpward />
                    Entradas
                </MenuItemLink>
                <MenuItemLink href="/list/outcome-balance">
                <MdArrowDownward />
                    Saídas
                </MenuItemLink>
                <MenuItemLink href="#">
                <MdExitToApp />
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>
    );
};

export default Aside;