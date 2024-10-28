import { useMemo } from "react";
import { useGetTeamsQuery } from "../queries/useGetTeamsQuery.ts";
import { useGetGamesQuery } from "../queries/useGetGamesQuery.ts";

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
            <table>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Nazwa Druzyny</th>
                    <th>Ilość goli</th>
                </tr>
                </thead>
                <tbody>
                {topTeams.map((team, index) => (
                    <tr key={team.teamId}>
                        <td>{index + 1}</td>
                        <td>{team.teamName}</td>
                        <td>{team.goals}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};