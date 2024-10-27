import { useGetPlayersQuery } from "../queries/useGetPlayersQuery.ts";
import { OnePlayer } from "./OnePlayer.tsx";
import styled from "styled-components";
import { AddPlayer } from "./AddPlayer.tsx";
import { useState } from "react";
import { AddButton, ToggleButton } from "../Buttons/ToggleButton.tsx";

const PlayerListContainer = styled.div`
    width: 800px;
    margin: 0 auto;
`;

const PlayerTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    table-layout: fixed;
    font-size: 18px;
`;

const TableHeader = styled.thead`
    background-color: ${props => props.theme.colors.secondaryBackground};

    tr {
        border-bottom: 1px solid #ddd;
    }

    th {
        padding: 0.5rem;
        text-align: left;
    }
`;

const TableBody = styled.tbody`
    tr {
        border-bottom: 1px solid #ddd;
    }
    td {
        padding: 0.8rem;
    }
`;

const AddPlayerContainer = styled.div`
    margin-top: 30px;
    text-align: center;

`;

export const PlayerList = () => {
    const { data, isLoading, error } = useGetPlayersQuery();
    const [addPlayer, setAddPlayer] = useState(false);

    if (isLoading) return <p>Loading players list...</p>;
    if (error) return <p>{error.message}</p>;

    const toggleAddPlayer = () => {
        setAddPlayer(prevAddPlayer => !prevAddPlayer);
    };

    return (
        <PlayerListContainer>
            <PlayerTable>
                <TableHeader>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Team ID</th>
                        <th></th>
                        <th></th>
                    </tr>
                </TableHeader>
                <TableBody>
                    {data?.map(player => (
                        <OnePlayer player={player} key={player.id}/>
                    ))}
                </TableBody>
            </PlayerTable>
            <AddPlayerContainer>
                <ToggleButton onClick={toggleAddPlayer} isShown={addPlayer} showText="Add Player" hideText="Close"
                              Component={AddButton}/>
                {addPlayer && <AddPlayer/>}
            </AddPlayerContainer>
        </PlayerListContainer>
    );
};