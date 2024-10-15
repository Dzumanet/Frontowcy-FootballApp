import { TeamEntity } from "../types";
import { useDeleteTeamMutation } from "../queries/useDeleteTeamMutation.ts";
import { useGetPlayersQuery } from "../queries/useGetPlayersQuery.ts";

type DeletePlayerConfirmationProps = {
    onCancel: () => void;
    team: TeamEntity;
}

export const DeleteTeamConfirmation = ({ onCancel, team }: DeletePlayerConfirmationProps) => {
    const { mutate, isPending } = useDeleteTeamMutation(team.id);
    const { data: players } = useGetPlayersQuery();


    const teamPlayers = players?.filter(player => player.teamId === team.id);


    const handleDelete = () => {
        mutate();
    };

    if (isPending) return <p>Loading...</p>;

    return (
        <div>
            <div>
                <p>Do you really want to delete team <strong>{team.teamName} ?</strong></p>
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


                <button onClick={handleDelete}>Delete</button>
                <button onClick={onCancel}>Cancel</button>
            </div>

        </div>
    );

};