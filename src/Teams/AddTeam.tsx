import { ChangeEvent, FormEvent, useState } from "react";
import { TeamForm } from "../Forms/TeamForm.tsx";
import { PlayerEntity, TeamDto, TeamEntity } from "../types";
import { useCreateTeamMutation } from "../queries/useCreateTeamMutation.ts";
import { useGetPlayersQuery } from "../queries/useGetPlayersQuery.ts";
import { useUpdateMultiplePlayersTeamMutation } from "../queries/useUpdateMultiplePlayersTeamMutation.ts";

export const AddTeam = () => {
    const { mutate: createTeam, isPending } = useCreateTeamMutation();
    const { mutate: updatePlayersTeam } = useUpdateMultiplePlayersTeamMutation();
    const { data: players } = useGetPlayersQuery();

    const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');
    const [addedPlayers, setAddedPlayers] = useState<PlayerEntity[]>([]);
    const [values, setValues] = useState<TeamDto>({
        teamName: '',
        location: '',
        establishedYear: 2024,
    });

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedPlayerId(e.target.value);
    };

    const handleAddPlayer = () => {
        if (!selectedPlayerId) return;

        const playerToAdd = players?.find(player => player.id === selectedPlayerId);
        if (playerToAdd && !addedPlayers.some(player => player.id === playerToAdd.id)) {
            setAddedPlayers(prevPlayers => [...prevPlayers, playerToAdd]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        createTeam({
            teamName: values.teamName,
            location: values.location,
            establishedYear: values.establishedYear
        }, {
            onSuccess: (newTeam: TeamEntity) => {
                const playerIds = addedPlayers.map(player => player.id);
                updatePlayersTeam({
                    playerIds,
                    teamId: newTeam.id
                });
            }
        });
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Add New Team</h2>
            <TeamForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                handleAddPlayer={handleAddPlayer}
                selectedPlayerId={selectedPlayerId}
                values={values}
                addedPlayers={addedPlayers}
                isPending={isPending}
                availablePlayers={players}
            />
        </div>
    );
};