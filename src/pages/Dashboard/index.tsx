import React, { useState, useMemo } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";

import listOfMonths from "../../utils/months";

import expenses from "../../repositories/expenses"
import gains from "../../repositories/gains"

import happyImg from "../../assets/happy.svg";
import grinningImg from "../../assets/grinning.svg";
import sadImg from "../../assets/sad.svg";

import { Container, Content } from "./styles";


const Dashboard: React.FC = () => {

    const [monthSelection, setMonthSelection] = useState<number>(new Date().getMonth() + 1);
    const [yearSelection, setYearSelection] = useState<number>(new Date().getFullYear());

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                'value': index + 1,
                'label': month
            }
        })
    }, []);

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
    }, []);

    const totalExpenses = useMemo(() => {
        let total: number = 0;
        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelection && year === yearSelection) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('invalid amount! Amount must be a number.')
                }
            }

        });
        return total;
    }, [monthSelection, yearSelection]);

    const totalGains = useMemo(() => {
        let total: number = 0;
        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelection && year === yearSelection) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('invalid amount! Amount must be a number.')
                }
            }

        });
        return total;
    }, [monthSelection, yearSelection]);

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalExpenses, totalGains]);

    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Que triste!",
                description: "Nesse mês, você gastou mais do que deveria.",
                footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
                icon: sadImg
            }
        }
        else if (totalBalance === 0) {
            return {
                title: "Ufaa!",
                description: "Nesse mês, você gastou exatamente o que ganhou.",
                footerText: "Tenha cuidado. No próximo mês tente poupar o seu dinheiro.",
                icon: grinningImg
            }
        }
        else {
            return {
                title: "Muito bem!",
                description: "Sua carteira está positiva!",
                footerText: "Continue assim. Considere investir o seu saldo.",
                icon: happyImg
            }
        }

    }, [totalBalance]);

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

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={months} onChange={(e) => handleMonthSelection(e.target.value)} defaultValue={monthSelection} />
                <SelectInput options={years} onChange={(e) => handleYearSelection(e.target.value)} defaultValue={yearSelection} />
            </ContentHeader>
            <Content>
                <WalletBox title={"saldo"} amount={totalBalance} footerLabel={"atualizado conforme as entradas e saídas"} icon={"dollar"} color={"#4E41F0"} />
                <WalletBox title={"entradas"} amount={totalGains} footerLabel={"atualizado conforme as entradas e saídas"} icon={"arrowUp"} color={"#F7931B"} />
                <WalletBox title={"saídas"} amount={totalExpenses} footerLabel={"atualizado conforme as entradas e saídas"} icon={"arrowDown"} color={"#E44C4E"} />
                <MessageBox title={message.title} description={message.description} footerText={message.footerText} icon={message.icon} />
            </Content>
        </Container>
    );
};

export default Dashboard;