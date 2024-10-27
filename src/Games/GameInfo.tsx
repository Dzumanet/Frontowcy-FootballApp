import { GameEntity } from "../types";
import { useState } from "react";
import styled from "styled-components";
import { DeleteButton, EditButton, ToggleButton } from "../Buttons/ToggleButton.tsx";
import { useFindTeamById } from "../hooks/useFindTeamById.tsx";
import { EditGame } from "./EditGame.tsx";
import { DeleteGameConfirmation } from "./DeleteGameConfirmation.tsx";


type GameInfoProps = {
    game: GameEntity;
    // teamA: TeamEntity | null;
    // teamB: TeamEntity | null;

}

const GameContainer = styled.div`
    position: relative;
`;

const StyledInfo = styled.div`
    width: 100%;

    h2 {
        margin-top: 0;
        margin-bottom: 10px;
        text-align: center;
        font-size: 24px;
        text-transform: uppercase;
    }

    div {
        display: flex;
        justify-content: space-evenly;

        h3 {
            margin-top: 10px;

        }
    }

`;

const EditBtnContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    button {
        margin-right: 10px;
    }
`;

const DeleteBtnContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    button {
        margin-right: 10px;
    }
`;


export const GameInfo = ({ game }: GameInfoProps) => {
    const [mode, setMode] = useState<'edit' | 'delete' | 'none'>('none');
    const { teamA, teamB } = useFindTeamById(game.teamAId, game.teamBId);

    const toggleEditMode = () => {
        setMode(prevMode => prevMode === "edit" ? "none" : "edit");
    };

    const toggleDeleteMode = () => {
        setMode(prevMode => prevMode === "delete" ? "none" : "delete");
    };


    return (
        <>
            <GameContainer>
                <StyledInfo>
                    <h2>{game.gameTitle}</h2>
                    <div>
                        <p>{game.gameTitle}</p>
                        <p>{game.gameDate}</p>
                        <p>{game.venue}</p>
                        <p>{game.duration} min</p>
                        <div>
                            {teamA && teamB ? (
                                <>
                                    <p>{teamA.teamName} : {teamB.teamName}</p>
                                    <p>{game.resultTeamA} : {game.resultTeamB}</p> </>
                            ) : (
                                <div>
                                    <p>No team added</p>
                                </div>
                            )}
                        </div>

                    </div>
                </StyledInfo>

                <div>
                    {mode === 'edit' ? <EditGame game={game}/> : undefined}
                    {mode === 'delete' ?
                        <DeleteGameConfirmation game={game}/> : undefined}
                </div>
                <EditBtnContainer>
                    <ToggleButton onClick={toggleEditMode} isShown={mode === 'edit'} showText="Edit" hideText="Cancel"
                                  Component={EditButton}/>
                </EditBtnContainer>
                <DeleteBtnContainer>
                    <ToggleButton onClick={toggleDeleteMode} isShown={mode === 'delete'} showText="Delete"
                                  hideText="Cancel" Component={DeleteButton}/>


                </DeleteBtnContainer>
            </GameContainer>

        </>
    );


};