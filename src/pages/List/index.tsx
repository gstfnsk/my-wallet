import React, {useMemo, useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import ContentHeader from "../../components/ContentHeader";
import { Container, Content, Filters } from "./styles";
import SelectInput from "../../components/SelectInput";
import FinanceHistoryCard from "../../components/FinanceHistoryCard";

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";

interface IData {
    id: number,
    description: string,
    amountFormatted: string,
    frequency: string,
    dateFormatted: string,
    tagColor: string
}

const List: React.FC = () => {

    const [data, setData] = useState<IData[]>([]); 
    const [monthSelection, setMonthSelection] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelection, setYearSelection] = useState<string>(String(new Date().getFullYear()));

    const { type } = useParams(); 

    const title = useMemo(() => {
        return type === 'income-balance' ? {titleName: 'Entradas', titleColor: '#F7931B'} : {titleName: 'Saídas', titleColor: '#E44C4E'};
    },[type]);

    const listData = useMemo(() => {
        return type === 'income-balance' ? gains : expenses;
    },[type]);


    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                'value': index+1,
                'label': month
            }
        })
    },[]);

    const years = useMemo(() => {
        let uniqueYears: number[] = [];
        listData.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });
        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        });
    },[]);

    useEffect(() => {
        const filteredDate = listData.filter(item => {
            const date = new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return month === monthSelection && year === yearSelection;
        });

        const formattedDate = filteredDate.map((item, index) => {
            return {
                id:index,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency ==='recorrente' ? '#4E41F0' : '#E44C4E',
            }
        });
        setData(formattedDate);
    },[listData, monthSelection, yearSelection, data.length]);

    return (
        <Container>
            <ContentHeader title={title.titleName} lineColor={title.titleColor}>
                <SelectInput options={months} onChange={(e) => setMonthSelection(e.target.value)} defaultValue={monthSelection}/>
                <SelectInput options={years} onChange={(e) => setYearSelection(e.target.value)} defaultValue={yearSelection}/>
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