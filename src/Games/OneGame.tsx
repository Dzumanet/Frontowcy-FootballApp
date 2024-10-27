import { GameEntity } from "../types";
import { GameInfo } from "./GameInfo.tsx";
import { EditButton, ToggleButton } from "../Buttons/ToggleButton.tsx";
import { useFindTeamById } from "../hooks/useFindTeamById.tsx";

type OneGameProps = {
    game: GameEntity;
    isActive: boolean;
    toggleShowGameInfo: () => void;
}

export const OneGame = ({ game, isActive, toggleShowGameInfo }: OneGameProps) => {

    const {teamA, teamB} = useFindTeamById(game.teamAId, game.teamBId);

    return (<>
            <tr>
                <td>{game.gameTitle}</td>
                <td>{game.gameDate}</td>
                <td>{game.venue}</td>
                <td>{game.duration} min</td>
                <td>{teamA?.teamName}</td>
                <td>{teamB?.teamName}</td>
                <td>{game.resultTeamA} : {game.resultTeamB}</td>
                <td>
                    <ToggleButton onClick={toggleShowGameInfo} isShown={isActive} showText="Edit" hideText="Cancel"
                                  Component={EditButton}/>
                </td>
            </tr>
            {isActive && (
                <tr>
                    <td colSpan={8}>
                        <GameInfo game={game}/>
                    </td>
                </tr>
            )}
        </>
    );
};