import { GameEntity } from "../types";
import { useDeleteGameMutation } from "../queries/useDeleteGameMutation.ts";

type DeletePlayerConfirmationProps = {
    game: GameEntity;
}

export const DeleteGameConfirmation = ({ game }: DeletePlayerConfirmationProps) => {
    const { mutate: deleteGame, isPending } = useDeleteGameMutation(game.id);


    const handleDelete = () => {
        deleteGame();
    };

    if (isPending) return <p>Loading...</p>;

    return (
        <div>
            <div>
                <p>Do you really want to delete game? <strong>{game.gameTitle} {game.gameDate}</strong></p>
                <button disabled onClick={handleDelete}>Delete</button>
            </div>

        </div>
    );
};