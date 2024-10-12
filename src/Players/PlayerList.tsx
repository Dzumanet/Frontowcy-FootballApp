import { useGetPlayers } from "../queries/useGetPlayersQuery.ts";
import { OnePlayer } from "./OnePlayer.tsx";
import styled from "styled-components";
import { AddPlayer } from "./AddPlayer.tsx";
import { useState } from "react";

// const PlayerListWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//
// `;

const StyledTable = styled.table`
    //width: 780px;
`;

export const PlayerList = () => {
    const { data, isLoading, error } = useGetPlayers();
    const [addPlayer, setAddPlayer] = useState(false);

    if (isLoading) return <p>Loading players list...</p>;
    if (error) return <p>{error.message}</p>;

    const toggleAddPlayer = () => {
        setAddPlayer(prevAddPlayer => !prevAddPlayer);
    };

    return (
        <div>
            <StyledTable>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Team ID</th>
                </tr>
                </thead>
                <tbody>
                {data?.map(player => <OnePlayer player={player} key={player.id}/>)}
                </tbody>
            </StyledTable>
            <button onClick={toggleAddPlayer}>{addPlayer ? 'Close' : 'Add Player'}</button>
            {addPlayer ? <AddPlayer/> : undefined}
        </div>
    );

};