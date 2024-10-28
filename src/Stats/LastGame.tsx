import { useGetGamesQuery } from "../queries/useGetGamesQuery.ts";
import { useFindTeamById } from "../hooks/useFindTeamById.tsx";


export const LastGame = () => {

    const { data: games } = useGetGamesQuery();

    const lastGame = games?.slice()
        .sort((a, b) => new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime())[0];

    const { teamA, teamB } = useFindTeamById(lastGame?.teamAId ?? null, lastGame?.teamBId ?? null);


    return (
        <div>
            <h3>Last match played</h3>
            <table>
                <thead>
                <tr>
                    <th>Game name</th>
                    <th>Place</th>
                    <th>Date of the game</th>
                    <th>Duration Time</th>
                    <th>Match between teams</th>
                    <th>Match result</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{lastGame?.gameTitle}</td>
                    <td>{lastGame?.venue}</td>
                    <td>{lastGame?.gameDate}</td>
                    <td>{lastGame?.duration}</td>
                    <td>{teamA?.teamName} : {teamB?.teamName}</td>
                    <td>{lastGame?.resultTeamA} : {lastGame?.resultTeamB}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};