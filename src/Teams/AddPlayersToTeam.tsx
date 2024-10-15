import { PlayerEntity } from "../types";
import { ChangeEvent } from "react";

type AddPlayersToTeamProps = {
    availablePlayers: PlayerEntity[] | undefined;
    addedPlayers: PlayerEntity[];
    handleAddPlayer: () => void;
    handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    selectedPlayerId: string;
}


export const AddPlayersToTeam = ({
                                     availablePlayers,
                                     addedPlayers,
                                     handleAddPlayer,
                                     handleSelectChange,
                                     selectedPlayerId
                                 }: AddPlayersToTeamProps) => {


    return (
        <>
            <label htmlFor="teamPlayers">Select Player to Add</label>
            <select
                name="teamPlayers"
                id="teamPlayers"
                value={selectedPlayerId}
                onChange={handleSelectChange}
            >
                <option value="" disabled>Select player</option>
                {availablePlayers
                    ?.filter(player => !player.teamId)
                    .map(player => (
                        <option key={player.id} value={player.id}>
                            {player.firstName}
                        </option>
                    ))}
            </select>
            <button type="button" onClick={handleAddPlayer}>Add Player</button>

            <h3>The Players will be added to the team:</h3>
            <ul>
                {addedPlayers.map(player => (
                    <li key={player.id}>
                        {player.firstName} {player.lastName}
                    </li>
                ))}
            </ul>
        </>
    );

};