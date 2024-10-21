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
            <ul style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '800px'

            }}>
                <li>{game.id}</li>
                <li>{game.gameTitle}</li>
                <li>{game.gameDate}</li>
                <li>{game.venue}</li>
                <li>{game.duration} min</li>
                <li>{teamA?.teamName}</li>
                <li>{teamB?.teamName}</li>
                <li>{game.resultTeamA} : {game.resultTeamB}</li>
                <li>
                    <button onClick={toggleShowGameInfo}>{isActive ? 'Cancel' : 'Edit Game'}</button>
                </li>
            </ul>
            {isActive && (
                <div>
                    <EditGame game={game} />
                </div>

            )}
        </>
    );
};