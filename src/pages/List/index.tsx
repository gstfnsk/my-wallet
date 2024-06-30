import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import FinanceHistoryCard from "../../components/FinanceHistoryCard";

//Data
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

//Utils
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";

import { Container, Content, Filters } from "./styles";
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
    const [monthSelection, setMonthSelection] = useState<number>(new Date().getMonth() + 1);
    const [yearSelection, setYearSelection] = useState<number>(new Date().getFullYear());
    const [frequencyFilterSelected, setfrequencyFilterSelected] = useState(['recorrente', 'eventual']);

    const { balanceType } = useParams();

    const pageData = useMemo(() => {
        return balanceType === 'income-balance' ?
            {
                title: 'Entradas',
                lineColor: '#4E41F0',
                data: gains
            }
            :
            {
                title: 'Saídas',
                lineColor: '#E44C4E',
                data: expenses
            }
    }, [balanceType]);


    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                'value': index + 1,
                'label': month
            }
        })
    }, []);

    const handleMonthSelection = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelection(parseMonth);
        } catch {
            throw new Error('invalid month value. ')
        }
    }

    const handleYearSelection = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelection(parseYear);
        } catch {
            throw new Error('invalid year value. ')
        }
    }

    const years = useMemo(() => {
        let uniqueYears: number[] = [];
        const { data } = pageData;
        data.forEach(item => {
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
    }, [pageData]);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);
        if (alreadySelected >= 0) {
            const filtered = frequencyFilterSelected.filter(item => item !== frequency);
            setfrequencyFilterSelected(filtered);
        } else {
            setfrequencyFilterSelected((prev) => [...prev, frequency]);
        }
    }

    useEffect(() => {
        const { data } = pageData;
        const filteredDate = data.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelection && year === yearSelection && frequencyFilterSelected.includes(item.frequency);
        });

        const formattedDate = filteredDate.map((item, index) => {
            return {
                id: index,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
            }
        });
        setData(formattedDate);
    }, [pageData, monthSelection, yearSelection, data.length, frequencyFilterSelected]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} onChange={(e) => handleMonthSelection(e.target.value)} defaultValue={monthSelection} />
                <SelectInput options={years} onChange={(e) => handleYearSelection(e.target.value)} defaultValue={yearSelection} />
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                    ${frequencyFilterSelected.includes('recorrente') && 'tag-activated'}`}
                    onClick={() => handleFrequencyClick('recorrente')}>
                    Recorrentes
                </button>
                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual
                    ${frequencyFilterSelected.includes('eventual') && 'tag-activated'}`}
                    onClick={() => handleFrequencyClick('eventual')}>
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