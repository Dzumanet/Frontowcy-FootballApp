import { useGetGamesQuery } from "../queries/useGetGamesQuery.ts";
import { useState } from "react";
import { OneGame } from "./OneGame.tsx";
import { AddGame } from "./AddGame.tsx";
import styled from "styled-components";
import { ErrorText } from "../common/ErrorText.tsx";
import { AddButton, ToggleButton } from "../Buttons/ToggleButton.tsx";

const StyledGamesListContainer = styled.div`
    width: 800px;
    margin: 0 auto;
`;

const StyledGamesTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    table-layout: fixed;
    font-size: 18px;
`;

const StyledTableHeader = styled.thead`
    background-color: ${props => props.theme.colors.secondaryBackground};

    tr {
        border-bottom: 1px solid #ddd;
    }

    th {
        padding: 0.5rem;
        text-align: left;
    }
`;

const StyledTh = styled.th`
    width: 120px;
`

const StyledTableBody = styled.tbody`
    tr {
        border-bottom: 1px solid #ddd;
    }
    td {
        padding: 0.8rem;
    }
`;

const StyledAddContainer = styled.div`
    margin-top: 15px;
    text-align: center;
`;


export const GamesList = () => {
    const { data, isLoading, error } = useGetGamesQuery();
    const [activeGameInfo, setActiveGameInfo] = useState<string | null>(null);
    const [addGame, setAddGame] = useState<boolean>(false);


    if (isLoading) return <p>Loading games list...</p>;
    if (error) return <ErrorText>{error.message}</ErrorText>;


    const toggleAddGame = () => {
        setAddGame(prevAddGame => !prevAddGame);
    };

    const toggleShowGameInfo = (gameId: string) => {
        setActiveGameInfo(prevGameId => (prevGameId === gameId ? null : gameId));
    };

    return (

        <StyledGamesListContainer>
            <StyledGamesTable>
                <StyledTableHeader>
                <tr>
                    {/*<th>ID</th>*/}
                    <StyledTh>Game Title</StyledTh>
                    <StyledTh>Game Date</StyledTh>
                    <StyledTh>Venue</StyledTh>
                    <th>Duration</th>
                    <th>Team A</th>
                    <th>Team B</th>
                    <th>Result</th>
                    <th></th>
                </tr>
                </StyledTableHeader>
                <StyledTableBody>
                {data?.map(game => <OneGame
                    key={game.id}
                    game={game}
                    isActive={game.id === activeGameInfo}
                    toggleShowGameInfo={() =>toggleShowGameInfo(game.id)}
                    />
                )}
                </StyledTableBody>
            </StyledGamesTable>
            <StyledAddContainer>
            <ToggleButton onClick={toggleAddGame} isShown={addGame} showText='Add New Game' hideText='Close' Component={AddButton} />
            {addGame ? <AddGame/> : undefined}
            </StyledAddContainer>
        </StyledGamesListContainer>
    );
};