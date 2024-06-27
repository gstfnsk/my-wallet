import React, { useState, useMemo} from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";

import listOfMonths from "../../utils/months";

import expenses from "../../repositories/expenses"
import gains from "../../repositories/gains"

import { Container, Content } from "./styles";


const Dashboard: React.FC = () => {

    const [monthSelection, setMonthSelection] = useState<number>(new Date().getMonth() + 1);
    const [yearSelection, setYearSelection] = useState<number>(new Date().getFullYear());

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
        [...expenses, ...gains].forEach(item => {
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

    const handleMonthSelection = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelection(parseMonth);
        } catch(e) {
            throw new Error ('invalid month value. ')
        }
    }

    const handleYearSelection = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelection(parseYear);
        } catch(e) {
            throw new Error ('invalid year value. ')
        }
    }

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={months} onChange={(e) => handleMonthSelection(e.target.value)} defaultValue={monthSelection}/>
                <SelectInput options={years} onChange={(e) => handleYearSelection(e.target.value)} defaultValue={yearSelection}/>
            </ContentHeader>
            <Content>
                <WalletBox title={"saldo"} amount={150.00} footerLabel={"atualizado conforme as entradas e saídas"} icon={"dollar"} color={"#4E41F0"} />
                <WalletBox title={"entradas"} amount={5000.00} footerLabel={"atualizado conforme as entradas e saídas"} icon={"arrowUp"} color={"#F7931B"} />
                <WalletBox title={"saldo"} amount={4850.00} footerLabel={"atualizado conforme as entradas e saídas"} icon={"arrowDown"} color={"#E44C4E"} />
            </Content>
        </Container>
    );
};

export default Dashboard;