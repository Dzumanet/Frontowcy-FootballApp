import { TeamEntity } from "../types";
import { useState } from "react";
import { DeleteTeamConfirmation } from "./DeleteTeamConfirmation.tsx";
import { EditTeam } from "./EditTeam.tsx";
import { PlayersInTeam } from "./PlayersInTeam.tsx";
import styled from "styled-components";
import { DeleteButton, EditButton, ToggleButton } from "../Buttons/ToggleButton.tsx";


type TeamInfoProps = {
    team: TeamEntity;
}

const TeamContainer = styled.div`
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


export const TeamInfo = ({ team }: TeamInfoProps) => {
    const [mode, setMode] = useState<'edit' | 'delete' | 'none'>('none');

    const toggleEditMode = () => {
        setMode(prevMode => prevMode === "edit" ? "none" : "edit");
    };

    const toggleDeleteMode = () => {
        setMode(prevMode => prevMode === "delete" ? "none" : "delete");
    };

    return (
        <>
            <TeamContainer>
                <StyledInfo>
                    <h2>{team.teamName}</h2>
                    <div>
                        <h3>Location: {team.location}</h3>
                        <h3>Established Year: {team.establishedYear}</h3>
                    </div>
                </StyledInfo>

                <PlayersInTeam teamId={team.id} isEditMode={mode === 'edit'}/>
                <div>
                    {mode === 'edit' ? <EditTeam team={team}/> : undefined}
                    {mode === 'delete' ?
                        <DeleteTeamConfirmation onCancel={toggleDeleteMode} team={team}/> : undefined}
                </div>
                <EditBtnContainer>
                    <ToggleButton onClick={toggleEditMode} isShown={mode === 'edit'} showText="Edit" hideText="Cancel"
                                  Component={EditButton}/>
                    {/*<button onClick={toggleEditMode}>{mode === 'edit' ? 'Cancel' : 'Edit'}</button>*/}
                </EditBtnContainer>
                <DeleteBtnContainer>
                    <ToggleButton onClick={toggleDeleteMode} isShown={mode === 'delete'} showText="Delete"
                                  hideText="Cancel" Component={DeleteButton}/>


                </DeleteBtnContainer>
            </TeamContainer>

        </>
    );


};