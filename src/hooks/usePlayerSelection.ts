import { ChangeEvent, useState } from "react";
import { PlayerEntity } from "../types";

export const usePlayerSelection = (players: PlayerEntity[]) => {
    const [selectedPlayerId, setSelectedPlayerId] = useState<string>('');
    const [addedPlayers, setAddedPlayers] = useState<PlayerEntity[]>([]);


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

    return {
        selectedPlayerId,
        setSelectedPlayerId,
        addedPlayers,
        setAddedPlayers,
        handleSelectChange,
        handleAddPlayer
    };
};