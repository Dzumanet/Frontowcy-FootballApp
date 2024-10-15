import { ChangeEvent, FormEvent, useState } from "react";
import { PlayerEntity, TeamDto, TeamValidationErrors } from "../types";
import { validateTeam } from "../utils/validateTeam.ts";

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
    existingTeam?: TeamDto[];
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
                             isPending,
                             existingTeam
                         }: TeamFormProps) => {

    const [errors, setErrors] = useState<TeamValidationErrors>({
        teamName: '',
        establishedYear: '',
        location: '',
        teamExists: ''
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateTeam(values, existingTeam || []);
        setErrors(validationErrors);

        if (!validationErrors.teamName && !validationErrors.establishedYear && !validationErrors.location && !validationErrors.teamExists) {
            handleSubmit(e);
        }
    };
    console.log(errors);

    return (
        <form onSubmit={onSubmit}>
            {errors.teamExists && <p>{errors.teamExists}</p>}
            <label htmlFor="teamName">Team Name</label>
            {errors.teamName && <p>{errors.teamName}</p>}

            <input
                type="text"
                id="teamName"
                name="teamName"
                value={values.teamName}
                onChange={handleChange}
                required
            />

            <label htmlFor="location">Location</label>
            {errors.location && <p>{errors.location}</p>}
            <input
                type="text"
                id="location"
                name="location"
                value={values.location}
                onChange={handleChange}
                required
            />

            <label htmlFor="establishedYear">Established Year</label>
            {errors.establishedYear && <p>{errors.establishedYear}</p>}
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
