import React from "react";
import { Container } from './styles';

type MainContentProps = {
    children: React.ReactNode;
};

const MainContent: React.FC<MainContentProps> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    );
};

export default MainContent;