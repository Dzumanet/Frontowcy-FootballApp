import { PlayerEntity } from "../types";
import { useDeletePlayerMutation } from "../queries/useDeletePlayerMutation.ts";
import { validatePlayerAssignedToTeam } from "../utils/validatePlayer.ts";
import styled from "styled-components";
import { ActionButton, CancelButton, DeleteButton } from "../Buttons/ActionButton.tsx";

type DeletePlayerConfirmationProps = {
    onCancel: () => void;
    player: PlayerEntity;
}

const DeletePlayerWrapper = styled.div`
    text-align: center;
    padding: 20px;
    
    button {
        margin-right: 15px;
        margin-left: 15px;
    }
`

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
        <DeletePlayerWrapper>
            {validationError ? (
                <p>Player is assigned to a team. Cannot be removed.</p>
            ) : (
                <div>
                    <p>Do you really want to delete player? <strong>{player.firstName} {player.lastName}</strong></p>
                    <ActionButton onClick={handleDelete} label='Delete' Component={DeleteButton} />
                    <ActionButton onClick={onCancel} label='Cancel' Component={CancelButton}/>
                </div>)
            }

        </DeletePlayerWrapper>
    )
        ;
};