import { useGetGamesQuery } from "../queries/useGetGamesQuery.ts";
import { useState } from "react";
import { OneGame } from "./OneGame.tsx";
import { AddGame } from "./AddGame.tsx";

export const GamesList = () => {
    const { data, isLoading, error } = useGetGamesQuery();
    const [activeGameInfo, setActiveGameInfo] = useState<string | null>(null);
    const [addGame, setAddGame] = useState<boolean>(false);


    if (isLoading) return <p>Loading games list...</p>;
    if (error) return <p>{error.message}</p>;


    const toggleAddGame = () => {
        setAddGame(prevAddGame => !prevAddGame);
    };

    const toggleShowGameInfo = (gameId: string) => {
        setActiveGameInfo(prevGameId => (prevGameId === gameId ? null : gameId));
    };

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Game Title</th>
                    <th>Game Date</th>
                    <th>Venue</th>
                    <th>Duration Time</th>
                    <th>Team A</th>
                    <th>Team B</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody>
                {data?.map(game => <OneGame
                    key={game.id}
                    game={game}
                    isActive={game.id === activeGameInfo}
                    toggleShowGameInfo={() =>toggleShowGameInfo(game.id)}
                    />
                )}
                </tbody>
            </table>
            <button onClick={toggleAddGame}>{addGame ? 'Close' : 'Add Game'}</button>
            {addGame ? <AddGame/> : undefined}
        </div>
    );
};