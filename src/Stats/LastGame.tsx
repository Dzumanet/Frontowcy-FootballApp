import { useGetGamesQuery } from "../queries/useGetGamesQuery.ts";
import { useFindTeamById } from "../hooks/useFindTeamById.tsx";
import styled from "styled-components";


const StyledStatsContainer = styled.div`
    width: 800px;
    margin: 0 auto;
`;

const StyledStatsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
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


export const LastGame = () => {

    const { data: games } = useGetGamesQuery();

    const lastGame = games?.slice()
        .sort((a, b) => new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime())[0];

    const { teamA, teamB } = useFindTeamById(lastGame?.teamAId ?? null, lastGame?.teamBId ?? null);


    return (
        <StyledStatsContainer>
            <h3>Last match played</h3>
            <StyledStatsTable>
                <StyledTableHeader>
                    <tr>
                        <StyledTh>Game name</StyledTh>
                        <StyledTh>Place</StyledTh>
                        <th>Date of the game</th>
                        <th>Duration Time</th>
                        <th>Match between teams</th>
                        <th>Match result</th>
                    </tr>
                </StyledTableHeader>
                <StyledTableBody>
                    <tr>
                        <td>{lastGame?.gameTitle}</td>
                        <td>{lastGame?.venue}</td>
                        <td>{lastGame?.gameDate}</td>
                        <td>{lastGame?.duration}</td>
                        <td>{teamA?.teamName} : {teamB?.teamName}</td>
                        <td>{lastGame?.resultTeamA} : {lastGame?.resultTeamB}</td>
                    </tr>
                </StyledTableBody>
            </StyledStatsTable>
        </StyledStatsContainer>
    );
};