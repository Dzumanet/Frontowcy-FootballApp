import { ChangeEvent, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useGetGamesQuery } from "../queries/useGetGamesQuery.ts";
import { GameEntity } from "../types";
import styled from "styled-components";


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  
`;
const StyledStatsTable = styled.table`
    width: 70%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: 18px;
`;

const StyledTableHeader = styled.thead`
    background-color: ${props => props.theme.colors.secondaryBackground};

    tr {
        border-bottom: 1px solid #ddd;
    }

    th {
        padding: 0.5rem;
        text-align: center;
    }
`;

const StyledTh = styled.th`
    width: 120px;
`;

const StyledTableBody = styled.tbody`
    tr {
        border-bottom: 1px solid #ddd;
    }

    td {
        padding: 0.8rem;
    }
`;


export const GameChart = () => {
    const [timeUnit, setTimeUnit] = useState<'day' | 'week' | 'month'>('day');
    const { data, error, isLoading } = useGetGamesQuery();

    const getWeekNumber = (date: Date): number => {
        const d = new Date(date.getTime());
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
        return weekNo;
    };

    const processData = (games: GameEntity[], unit: 'day' | 'week' | 'month') => {
        const groupedData: { [key: string]: number } = {};

        games.forEach((game) => {
            const date = new Date(game.gameDate);
            let key = '';

            if (unit === 'day') {
                key = date.toISOString().split('T')[0]; // YYYY-MM-DD
            } else if (unit === 'week') {
                const weekNumber = getWeekNumber(date);
                key = `${date.getFullYear()}-W${weekNumber}`;
            } else if (unit === 'month') {
                key = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`; // YYYY-MM
            }

            groupedData[key] = (groupedData[key] || 0) + 1;
        });

        const chartData = Object.keys(groupedData)
            .map((key) => ({
                date: key,
                count: groupedData[key],
            }))
            .sort((a, b) => (a.date > b.date ? 1 : -1));

        return chartData;
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTimeUnit(e.target.value as 'day' | 'week' | 'month');

    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading games data</div>;

    const chartData = processData(data!, timeUnit);


    return (
        <div>
            <div>
                <h2>Number of Games per {timeUnit.charAt(0).toUpperCase() + timeUnit.slice(1)}</h2>
                <select
                    value={timeUnit}
                    onChange={handleChange}>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                </select>
                <BarChart width={730} height={250} data={chartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date" angle={-45} textAnchor="end" interval={0} height={60}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend wrapperStyle={{
                        position: 'relative',
                        top: 0,
                    }}/>
                    <Bar  dataKey="count" name="Games Played" fill="#8884d8"/>
                </BarChart>
            </div>
            <StyledContainer>
                <h3>Data Table</h3>
                <StyledStatsTable>
                    <StyledTableHeader>
                    <tr>
                        <StyledTh>Date</StyledTh>
                        <StyledTh>Games Played</StyledTh>
                    </tr>
                    </StyledTableHeader>
                    <StyledTableBody>
                    {chartData.map((data) => (
                        <tr key={data.date}>
                            <td>{data.date}</td>
                            <td>{data.count}</td>
                        </tr>
                    ))}
                    </StyledTableBody>
                </StyledStatsTable>
            </StyledContainer>
        </div>
    );
};
