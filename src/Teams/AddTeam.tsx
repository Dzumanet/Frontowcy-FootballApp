import { ChangeEvent, FormEvent, useState } from "react";
import { TeamForm } from "../Forms/TeamForm.tsx";
import { PlayerEntity, TeamDto, TeamEntity } from "../types";
import { useCreateTeamMutation } from "../queries/useCreateTeamMutation.ts";
import { useGetPlayersQuery } from "../queries/useGetPlayersQuery.ts";
import { useUpdateMultiplePlayersTeamMutation } from "../queries/useUpdateMultiplePlayersTeamMutation.ts";
import { useGetTeamsQuery } from "../queries/useGetTeamsQuery.ts";
import { AddPlayersToTeam } from "./AddPlayersToTeam.tsx";

export const AddTeam = () => {
    const { mutate: createTeam, isPending } = useCreateTeamMutation();
    const { mutate: updatePlayersTeam } = useUpdateMultiplePlayersTeamMutation();
    const { data: players } = useGetPlayersQuery();
    const { data: teams } = useGetTeamsQuery();

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
        const { name, value, type } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    return (
        <div>
            <h2>Add New Team</h2>
            <TeamForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} isPending={isPending}
                      existingTeam={teams}/>
            <AddPlayersToTeam availablePlayers={players || []} addedPlayers={addedPlayers}
                              handleAddPlayer={handleAddPlayer} handleSelectChange={handleSelectChange}
                              selectedPlayerId={selectedPlayerId}/>
        </div>
    );
};