import { useState } from "react";
import { PlayerList } from "./Players/PlayerList.tsx";
import { TeamsList } from "./Teams/TeamsList.tsx";
import { GamesList } from "./Games/GamesList.tsx";
import styled from "styled-components";
import { ToggleButton, HeaderButton } from "./Buttons/ToggleButton.tsx";

const FootballAppWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: ${props => props.theme.colors.primaryBackground};
    color: ${props => props.theme.colors.primaryText};
`;

const StyledHeader = styled.header`
    text-align: center;

    button {
        margin-right: 20px;
    }
`;

export const FootballApp = () => {
    const [mode, setMode] = useState<'playerList' | 'teamList' | 'gameList' | 'none'>('none');


    const toggleShowPlayer = () => {
        setMode(prevMode => prevMode === 'playerList' ? 'none' : 'playerList');
    };
    const toggleShowTeams = () => {
        setMode(prevMode => prevMode === 'teamList' ? 'none' : 'teamList');
    };
    const toggleShowGame = () => {
        setMode(prevMode => prevMode === 'gameList' ? 'none' : 'gameList');
    };


    return (
        <FootballAppWrapper>
            <StyledHeader>
                <h1>Football App</h1>
                <ToggleButton onClick={toggleShowPlayer} isShown={mode === 'playerList'} showText="Show players"
                              hideText="Hide Players" Component={HeaderButton}/>
                <ToggleButton onClick={toggleShowTeams} isShown={mode === 'teamList'} showText="Show Teams"
                              hideText="Hide Teams" Component={HeaderButton}/>
                <ToggleButton onClick={toggleShowGame} isShown={mode === 'gameList'} showText="Show Games"
                              hideText="Hide Games" Component={HeaderButton}/>


            </StyledHeader>
            <main>
                {mode === 'playerList' ? <PlayerList/> : undefined}
                {mode === 'teamList' ? <TeamsList/> : undefined}
                {mode === 'gameList' ? <GamesList/> : undefined}
            </main>
        </FootballAppWrapper>

    );

};