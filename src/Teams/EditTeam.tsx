import { useUpdateTeamMutation } from "../queries/useUpdateTeamMutation.ts";
import { TeamDto, TeamEntity } from "../types";
import { ChangeEvent, FormEvent, useState } from "react";
import { TeamForm } from "../Forms/TeamForm.tsx";
import { useUpdateMultiplePlayersTeamMutation } from "../queries/useUpdateMultiplePlayersTeamMutation.ts";
import { useGetPlayersQuery } from "../queries/useGetPlayersQuery.ts";
import { useGetTeamsQuery } from "../queries/useGetTeamsQuery.ts";
import { AddPlayersToTeam } from "./AddPlayersToTeam.tsx";
import { usePlayerSelection } from "../hooks/usePlayerSelection.ts";
import styled from "styled-components";


type EditTeamProps = {
    team: TeamEntity;
}

const StyledEditWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StyledFormContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    margin-bottom: 30px;
`;

export const EditTeam = ({ team }: EditTeamProps) => {
    const { mutate: updateTeam, isPending } = useUpdateTeamMutation(team.id);
    const { mutate: updatePlayersTeam } = useUpdateMultiplePlayersTeamMutation();
    const { data: players } = useGetPlayersQuery();
    const { data: teams } = useGetTeamsQuery();
    const {
        selectedPlayerId,
        setSelectedPlayerId,
        addedPlayers,
        setAddedPlayers,
        handleSelectChange,
        handleAddPlayer,

    } = usePlayerSelection(players || []);

    const [values, setValues] = useState<TeamDto>({
        teamName: team.teamName,
        location: team.location,
        establishedYear: team.establishedYear,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        updateTeam({
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
                setAddedPlayers([]);
                setSelectedPlayerId('');
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
        <StyledEditWrapper>
            <div>
                <h2>Edit Team</h2>
            </div>
            <StyledFormContainer>
                <TeamForm
                    handleSubmit={handleSubmit} handleChange={handleChange} values={values} isPending={isPending}
                    existingTeam={teams} editTeam={team}
                />
                <AddPlayersToTeam availablePlayers={players || []} addedPlayers={addedPlayers}
                                  handleAddPlayer={handleAddPlayer} handleSelectChange={handleSelectChange}
                                  selectedPlayerId={selectedPlayerId}/>
            </StyledFormContainer>

        </StyledEditWrapper>
    );
};