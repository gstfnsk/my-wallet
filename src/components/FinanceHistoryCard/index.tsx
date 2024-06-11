import React from "react";
import { Container, Tag } from './styles';

interface IFinanceHistoryCardProps {
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;
}
//propriedades que o componente exige para ser exibido na tela
const FinanceHistoryCard: React.FC<IFinanceHistoryCardProps> = ({
    tagColor,
    title,
    subtitle,
    amount
}) => {
    return (
        <Container>
            <Tag color = {tagColor} />
            <div>
                <span>{title}</span>
                <small>{subtitle}</small>
            </div>
           <h3>{amount}</h3>
        </Container>
    );
};

export default FinanceHistoryCard;