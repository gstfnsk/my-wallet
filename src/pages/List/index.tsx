import React, {useMemo} from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import ContentHeader from "../../components/ContentHeader";
import { Container, Content, Filters } from "./styles";
import SelectInput from "../../components/SelectInput";
import FinanceHistoryCard from "../../components/FinanceHistoryCard";


const List: React.FC = () => {

    const { type } = useParams(); 

    const title = useMemo(() => {
        return type === 'income-balance' ? 'Entradas' : 'Saídas';
    },[type]);

    const months = [
        {'value': 7, 'label':'Julho'},
        {'value': 8, 'label':'Agosto'},
        {'value': 9, 'label':'Setembro'}
    ];
    const years = [
        {'value': 2024, 'label': 2024},
        {'value': 2025, 'label':2025}
    ];

    return (
        <Container>
            <ContentHeader title={title} lineColor="#fff">
                <SelectInput options={months}></SelectInput>
                <SelectInput options={years}></SelectInput>
            </ContentHeader>

            <Filters>
                <button 
                type="button"
                className="tag-filter tag-filter-recurrent">
                    Recorrentes
                </button>
                <button 
                type="button"
                className="tag-filter tag-filter-eventual">
                    Eventuais
                </button>
            </Filters>

            <Content>
                <FinanceHistoryCard 
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="10/06/2024"
                    amount="R$ 100,00"
                />
                <FinanceHistoryCard 
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="10/06/2024"
                    amount="R$ 100,00"
                />
                <FinanceHistoryCard 
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="10/06/2024"
                    amount="R$ 100,00"
                />
                <FinanceHistoryCard 
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="10/06/2024"
                    amount="R$ 100,00"
                />
                <FinanceHistoryCard 
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="10/06/2024"
                    amount="R$ 100,00"
                />
                <FinanceHistoryCard 
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="10/06/2024"
                    amount="R$ 100,00"
                />
                <FinanceHistoryCard 
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="10/06/2024"
                    amount="R$ 100,00"
                />
                <FinanceHistoryCard 
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="10/06/2024"
                    amount="R$ 100,00"
                />
                <FinanceHistoryCard 
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="10/06/2024"
                    amount="R$ 100,00"
                />
                <FinanceHistoryCard 
                    tagColor="#E44C4E"
                    title="Conta de Luz"
                    subtitle="10/06/2024"
                    amount="R$ 100,00"
                />
            </Content>
        </Container>
    );
};

export default List;