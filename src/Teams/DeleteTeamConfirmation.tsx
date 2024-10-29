import { TeamEntity } from "../types";
import { useDeleteTeamMutation } from "../queries/useDeleteTeamMutation.ts";
import { useGetPlayersQuery } from "../queries/useGetPlayersQuery.ts";
import { useUpdateMultiplePlayersTeamMutation } from "../queries/useUpdateMultiplePlayersTeamMutation.ts";
import styled from "styled-components";
import { ActionButton, CancelButton, DeleteButton } from "../Buttons/ActionButton.tsx";
import { validateTeamParticipationInGames } from "../utils/validateTeam.ts";
import { useGetGamesQuery } from "../queries/useGetGamesQuery.ts";


type DeletePlayerConfirmationProps = {
    onCancel: () => void;
    team: TeamEntity;
}

const StyledDeleteTeamContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.colors.secondaryBackground};
    padding: 10px 30px;

    p:nth-child(1), p:nth-child(2) {
        text-align: center;

    }

    p:nth-child(2) {
        text-transform: uppercase;
        font-size: 22px;
        font-weight: bold;

    }

    div {
        display: flex;
        justify-content: space-evenly;
    }
`;


export const DeleteTeamConfirmation = ({ onCancel, team }: DeletePlayerConfirmationProps) => {
    const { mutate, isPending } = useDeleteTeamMutation(team.id);
    const { mutate: updatePlayersTeam } = useUpdateMultiplePlayersTeamMutation();
    const { data: players } = useGetPlayersQuery();
    const { data: games } = useGetGamesQuery();

    const validationTeamInGame = validateTeamParticipationInGames(team.id, games || []);

    const teamPlayers = players?.filter(player => player.teamId === team.id);

    const handleDelete = () => {
        if (validationTeamInGame) {
            return;
        }

        mutate(undefined, {
            onSuccess: () => {
                if (teamPlayers) {
                    const playerIds = teamPlayers.map(player => player.id);
                    if (playerIds.length > 0) {
                        updatePlayersTeam({
                            playerIds,
                            teamId: null
                        });
                    }
                }
            }
        });
    };

    if (isPending) return <p>Loading...</p>;

    return (
        <StyledDeleteTeamContainer>
            {validationTeamInGame ? (
                <p>This team has participated in games and cannot be removed.</p>
            ) : (
                <>
                    <p>Do you really want to delete team </p>
                    <p>{team.teamName} ?</p>
                    {teamPlayers && teamPlayers.length > 0 ? (
                        <>
                            <p>By deleting the team, you will also remove the players assigned to it.</p>
                            <ul>
                                {teamPlayers.map(player => (
                                    <li key={player.id}>
                                        {player.firstName} {player.lastName}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : undefined}
                    <div>
                        <ActionButton onClick={handleDelete} label="Delete" Component={DeleteButton}/>
                        <ActionButton onClick={onCancel} label="Cancel" Component={CancelButton}/>
                    </div>
                </>
            )
            }

        </StyledDeleteTeamContainer>
    );

};