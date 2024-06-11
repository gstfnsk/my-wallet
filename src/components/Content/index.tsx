import React from "react";
import { Container } from './styles';

type ContentProps = {
    children: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    );
};

export default Content;