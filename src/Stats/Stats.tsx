import { useState } from "react";
import { StatsButton, ToggleButton } from "../Buttons/ToggleButton.tsx";
import { LastGame } from "./LastGame.tsx";
import { GameChart } from "./GameChart.tsx";
import { TopTeams } from "./TopTeams.tsx";
import styled from "styled-components";


const StyledWrapper = styled.div`
    width: 800px;
    margin-top: 20px;
    text-align: center;
`;
const StyledBtnContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;

`;

export const Stats = () => {
    const [mode, setMode] = useState<'last' | 'count' | 'top' | 'none'>('none');

    const toggleShowLast = () => {
        setMode(prevMode => prevMode === 'last' ? 'none' : 'last');
    };
    const toggleShowCount = () => {
        setMode(prevMode => prevMode === 'count' ? 'none' : 'count');
    };
    const toggleShowTopTeams = () => {
        setMode(prevMode => prevMode === 'top' ? 'none' : 'top');
    };

    return (
        <StyledWrapper>
            <StyledBtnContainer>

                <ToggleButton onClick={toggleShowLast} isShown={mode === 'last'} showText="Show Last Game"
                              hideText="Hide Players" Component={StatsButton}/>
                <ToggleButton onClick={toggleShowCount} isShown={mode === 'count'} showText="Show Games Count"
                              hideText="Hide Players" Component={StatsButton}/>
                <ToggleButton onClick={toggleShowTopTeams} isShown={mode === 'top'} showText="Show Top Teams"
                              hideText="Hide Players" Component={StatsButton}/>

            </StyledBtnContainer>

            <div>
                {mode === 'last' ? <LastGame/> : undefined}
                {mode === 'count' ? <GameChart/> : undefined}
                {mode === 'top' ? <TopTeams/> : undefined}

            </div>

        </StyledWrapper>
    );
};