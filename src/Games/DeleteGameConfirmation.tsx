import { GameEntity } from "../types";
import { useDeleteGameMutation } from "../queries/useDeleteGameMutation.ts";
import styled from "styled-components";
import { ActionButton, DeleteButton } from "../Buttons/ActionButton.tsx";

type DeletePlayerConfirmationProps = {
    game: GameEntity;
}

const StyledContainer = styled.div`
    text-align: center;
`

export const DeleteGameConfirmation = ({ game }: DeletePlayerConfirmationProps) => {
    const { mutate: deleteGame, isPending } = useDeleteGameMutation(game.id);


    const handleDelete = () => {
        deleteGame();
    };

    if (isPending) return <p>Loading...</p>;

    return (
        <StyledContainer>
            <p>Do you really want to delete game? <strong>{game.gameTitle} {game.gameDate}</strong></p>
            <ActionButton onClick={handleDelete} label='Delete' Component={DeleteButton} disabled={true} />
        </StyledContainer>
    );
};