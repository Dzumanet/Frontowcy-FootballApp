import { useGetPlayersQuery } from "../queries/useGetPlayersQuery.ts";
import { useState } from "react";
import { useUpdateMultiplePlayersTeamMutation } from "../queries/useUpdateMultiplePlayersTeamMutation.ts";

type PlayersInTeamProps = {
    teamId: string | null;
    isEditMode: boolean;

}

export const PlayersInTeam = ({ teamId, isEditMode }: PlayersInTeamProps) => {
    const { data: players } = useGetPlayersQuery();
    const { mutate: updatePlayersTeam } = useUpdateMultiplePlayersTeamMutation();
    const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

    const teamPlayers = players?.filter(player => player.teamId === teamId);


    const handleCheckboxChange = (playerId: string) => {
        setSelectedPlayers(prevSelectedPlayers => {
            if (prevSelectedPlayers.includes(playerId)) {
                return prevSelectedPlayers.filter(id => id !== playerId);
            } else {
                return [...prevSelectedPlayers, playerId];
            }
        });
    };

    const handleDeleteSelectedPlayer = () => {
        const playerIds = selectedPlayers.map(playerId => playerId);
        updatePlayersTeam({
            playerIds,
            teamId: null
        });
        setSelectedPlayers([]);
    };

    return (
        <ul>
            <p>Players in the team:</p>
            {isEditMode && (<p> Select the players you want to remove</p>)}
            {teamPlayers && teamPlayers.length > 0 ? (

                teamPlayers.map(player => (
                    <li key={player.id}>
                        {isEditMode ? (
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedPlayers.includes(player.id)} // Sprawdzenie, czy zawodnik jest zaznaczony
                                    onChange={() => handleCheckboxChange(player.id)} // Obsługa zmiany stanu checkboxa
                                />
                                {player.firstName} {player.lastName}
                            </label>
                        ) : (
                            <span>{player.firstName} {player.lastName}</span> // Wyświetlanie tylko imienia i nazwiska w trybie "nie edycji"
                        )}

                    </li>

                ))
            ) : (
                <p>No players in the team.</p>
            )}
            {selectedPlayers.length > 0 && (
                <button onClick={handleDeleteSelectedPlayer}>delete</button>
            )}
        </ul>
    );
};