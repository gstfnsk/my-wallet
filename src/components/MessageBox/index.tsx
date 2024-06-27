import React from "react";
import { Container } from './styles';

import happyImg from "../../assets/happy.svg";

interface IMessageBoxProps{
    title: string;
    description: string;
    footerText: string;
    icon: string;
}

const MessageBox: React.FC<IMessageBoxProps> = ({
    title,
    description,
    footerText,
    icon
}) => {
    return (
        <Container>
            <header>
                <h1>
                    {title}
                    {/* Muito bem!  */}
                    <img src=
                    // {happyImg}
                    {icon}
                     alt={""}/> 
                </h1>
                <p>
                    {/* Sua carteira está positiva! */}
                    {description}
                </p>
            </header>
            <footer>
                <span>
                    {footerText}
                    {/* Continue assim. Considere investir o seu saldo.*/}
                    </span> 
            </footer>
        </Container>
    );
};

export default MessageBox;