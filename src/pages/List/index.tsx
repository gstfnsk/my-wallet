import React, {useMemo, useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import ContentHeader from "../../components/ContentHeader";
import { Container, Content, Filters } from "./styles";
import SelectInput from "../../components/SelectInput";
import FinanceHistoryCard from "../../components/FinanceHistoryCard";

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

interface IData {
    id: string,
    description: string,
    amountFormatted: string,
    frequency: string,
    dateFormatted: string,
    tagColor: string
}

const List: React.FC = () => {

    const [data, setData] = useState<IData[]>([]); 

    

    const { type } = useParams(); 

    const title = useMemo(() => {
        return type === 'income-balance' ? {titleName: 'Entradas', titleColor: '#F7931B'} : {titleName: 'Saídas', titleColor: '#E44C4E'};
    },[type]);

    const listData = useMemo(() => {
        return type === 'income-balance' ? gains : expenses;
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

    useEffect(() => {
        const response = listData.map(item => {
            return {
                id: String(Math.random() * data.length),
                description: item.description,
                amountFormatted: item.amount,
                frequency: item.frequency,
                dateFormatted: item.date,
                tagColor: item.frequency ==='recorrente' ? '#4E41F0' : '#E44C4E',
            }
        })
        // console.log(response);
        setData(response);
    },[]);

    return (
        <Container>
            <ContentHeader title={title.titleName} lineColor={title.titleColor}>
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
                {
                    data.map(item => (
                        <FinanceHistoryCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />

                    ))
                }
                
            </Content>
        </Container>
    );
};

export default List;