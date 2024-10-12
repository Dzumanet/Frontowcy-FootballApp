import { PlayerEntity } from "../types";
import { useDeletePlayerMutation } from "../queries/useDeletePlayerMutation.ts";
import { validatePlayerAssignedToTeam } from "../utils/validatePlayer.ts";

type DeletePlayerConfirmationProps = {
    onCancel: () => void;
    player: PlayerEntity;
}

export const DeletePlayerConfirmation = ({ onCancel, player }: DeletePlayerConfirmationProps) => {
    const { mutate, isPending } = useDeletePlayerMutation(player.id);

    const validationError = validatePlayerAssignedToTeam(player);

    const handleDelete = () => {
        if (!validationError) {
            mutate();
        }
    };

    if (isPending) return <p>Loading...</p>;

    return (
        <div>
            {validationError ? (
                <p>Player is assigned to a team. Cannot be removed.</p>
            ) : (
                <div>
                    <p>Do you really want to delete player? <strong>{player.firstName} {player.lastName}</strong></p>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>)
            }

        </div>
    )
        ;
};