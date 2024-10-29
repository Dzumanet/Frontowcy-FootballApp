import { useMemo } from "react";
import { useGetTeamsQuery } from "../queries/useGetTeamsQuery.ts";
import { useGetGamesQuery } from "../queries/useGetGamesQuery.ts";
import styled from "styled-components";
import { FaTrophy } from "react-icons/fa";

const StyledTable = styled.table`
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



const StyledTableBody = styled.tbody`
    tr {
        border-bottom: 1px solid #ddd;
    }

    td {
        padding: 0.8rem;
    }
`;


export const TopTeams = () => {
    const { data: games = [] } = useGetGamesQuery();
    const { data: teams = [] } = useGetTeamsQuery();

    const topTeams = useMemo(() => {
        const teamGoals: Record<string, number> = {};

        games.forEach(game => {
            if (game.teamAId) {
                teamGoals[game.teamAId] = (teamGoals[game.teamAId] || 0) + game.resultTeamA;
            }

            if (game.teamBId) {
                teamGoals[game.teamBId] = (teamGoals[game.teamBId] || 0) + game.resultTeamB;
            }
        });

        const sortedTeams = Object.entries(teamGoals)
            .map(([teamId, goals]) => ({
                teamId,
                goals,
                teamName: teams.find(team => team.id === teamId)?.teamName || 'Unknown Team'
            }))
            .sort((a, b) => b.goals - a.goals);

        return sortedTeams.slice(0, 3);
    }, [games, teams]);

    return (
        <div>
            <h3>Top 3 Teams by Goals</h3>
            <StyledTable>
                <StyledTableHeader>
                <tr>
                    <th>Rank</th>
                    <th>Nazwa Druzyny</th>
                    <th>Ilość goli</th>
                </tr>
                </StyledTableHeader>
                <StyledTableBody>
                {topTeams.map((team, index) => (
                    <tr key={team.teamId}>
                        <td>{index + 1 === 1 && <FaTrophy style={{ color: "gold", fontSize: "1.5em" }} />}
                            {index + 1 === 2 && <FaTrophy style={{ color: "silver", fontSize: "1.5em" }} />}
                            {index + 1 === 3 && <FaTrophy style={{ color: "#cd7f32", fontSize: "1.5em" }} />}
                            {index + 1}</td>
                        <td>{team.teamName}</td>
                        <td>{team.goals}</td>
                    </tr>
                ))}
                </StyledTableBody>
            </StyledTable>
        </div>
    );
};