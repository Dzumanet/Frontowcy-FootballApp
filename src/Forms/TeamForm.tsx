import { ChangeEvent, FormEvent } from "react";
import { PlayerEntity, TeamDto } from "../types";

type TeamFormProps = {
    handleSubmit: (e: FormEvent) => void;
    handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAddPlayer: () => void;
    selectedPlayerId: string;
    addedPlayers: PlayerEntity[]; // Lista graczy już dodanych do drużyny
    availablePlayers: PlayerEntity[] | undefined; // Lista dostępnych graczy

    values: TeamDto;
    isPending: boolean;
}

export const TeamForm = ({
                             handleSubmit,
                             handleAddPlayer,
                             availablePlayers,
                             selectedPlayerId,
                             handleSelectChange,
                             addedPlayers,
                             handleChange,
                             values,
                             isPending
                         }: TeamFormProps) => {


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="teamName">Team Name</label>
            <input
                type="text"
                id="teamName"
                name="teamName"
                value={values.teamName}
                onChange={handleChange}
                required
            />

            <label htmlFor="location">Location</label>
            <input
                type="text"
                id="location"
                name="location"
                value={values.location}
                onChange={handleChange}
                required
            />

            <label htmlFor="establishedYear">Established Year</label>
            <input
                type="number"
                id="establishedYear"
                name="establishedYear"
                value={values.establishedYear}
                onChange={handleChange}
                required
            />

            {/* Lista rozwijana do wyboru gracza */}
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

            <button type="submit" disabled={isPending}>Save Team</button>
        </form>

    );
};
