import { GameEntity } from "../types";
import { EditGame } from "./EditGame.tsx";

type OneGameProps = {
    game: GameEntity;
    isActive: boolean;
    toggleShowGameInfo: () => void;
}

export const OneGame = ({ game, isActive, toggleShowGameInfo }: OneGameProps) => {

    return (<>
            <tr>
                <td>{game.id}</td>
                <td>{game.gameTitle}</td>
                <td>{game.gameDate}</td>
                <td>{game.venue}</td>
                <td>{game.duration} min</td>
                <td>{game.teamAId}</td>
                <td>{game.teamBId}</td>
                <td>{game.resultTeamA} : {game.resultTeamB}</td>
                <td>
                    <button onClick={toggleShowGameInfo}>{isActive ? 'Cancel' : 'Edit Game'}</button>
                </td>
            </tr>
            {isActive && (
                <tr>
                    <EditGame/>
                </tr>

            )}
        </>
    );
};