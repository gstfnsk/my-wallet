import React from 'react';

// import { PieChart, Pie, ResponsiveContainer } from 'recharts';

import { Container, LeftSide, LabelContainer, Label, RightSide } from './styles';

const PieChartCard: React.FC = () => {
    return (
        <Container>
            <LeftSide>
                <LabelContainer>
                    <Label>
                        <div>95%</div>
                        <span>Saídas</span>

                    </Label>
                </LabelContainer>
            </LeftSide>
            <RightSide>
                {/* <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={ }
                            labelLine={false}
                            dataKey="percent"
                        >

                        </Pie>
                    </PieChart>
                </ResponsiveContainer> */}
            </RightSide>
        </Container>
    );
}
export default PieChartCard;