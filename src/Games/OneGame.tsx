import { GameEntity } from "../types";
import { EditGame } from "./EditGame.tsx";
import { useGetTeamsQuery } from "../queries/useGetTeamsQuery.ts";

type OneGameProps = {
    game: GameEntity;
    isActive: boolean;
    toggleShowGameInfo: () => void;
}

export const OneGame = ({ game, isActive, toggleShowGameInfo }: OneGameProps) => {

    const {data: teams, isFetching, error} = useGetTeamsQuery();

    const teamA = teams?.find(team => team.id === game.teamAId);
    const teamB = teams?.find(team => team.id === game.teamBId);

    if (isFetching) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (<>
            <tr>
                <td>{game.id}</td>
                <td>{game.gameTitle}</td>
                <td>{game.gameDate}</td>
                <td>{game.venue}</td>
                <td>{game.duration} min</td>
                <td>{teamA?.teamName}</td>
                <td>{teamB?.teamName}</td>
                <td>{game.resultTeamA} : {game.resultTeamB}</td>
                <td>
                    <button onClick={toggleShowGameInfo}>{isActive ? 'Cancel' : 'Edit Game'}</button>
                </td>
            </tr>
            {isActive && (
                <tr>
                    <EditGame game={game} />
                </tr>

            )}
        </>
    );
};