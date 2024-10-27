import { PlayerEntity } from "../types";
import { ChangeEvent } from "react";
import styled from "styled-components";
import { ActionButton, SaveButton } from "../Buttons/ActionButton.tsx";

type AddPlayersToTeamProps = {
    availablePlayers: PlayerEntity[] | undefined;
    addedPlayers: PlayerEntity[];
    handleAddPlayer: () => void;
    handleSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    selectedPlayerId: string;
}

const StyledAddWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    width: 70%;
`;

const StyledOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
`;

const StyledLabel = styled.label`
    margin: 10px 0;
`;

const StyledSelect = styled.select`
    width: 150px;
    padding: 5px;
    margin-right: 20px;
    margin-bottom: 10px;
`;

const StyledAddedPlayerContainer = styled.div`
    width: 40%;
`;

export const AddPlayersToTeam = ({
                                     availablePlayers,
                                     addedPlayers,
                                     handleAddPlayer,
                                     handleSelectChange,
                                     selectedPlayerId
                                 }: AddPlayersToTeamProps) => {


    return (
        <StyledAddWrapper>
            <StyledOptionContainer>

                <StyledLabel htmlFor="teamPlayers">Select Player to Add</StyledLabel>
                <StyledSelect
                    name="teamPlayers"
                    id="teamPlayers"
                    value={selectedPlayerId}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>Select player</option>
                    {availablePlayers
                        ?.filter(player => !player.teamId)
                        .map(player => (
                            <option key={player.id} value={player.id}>
                                {player.firstName}
                            </option>
                        ))}
                </StyledSelect>

                <ActionButton type="button" onClick={handleAddPlayer} label="Add Player" Component={SaveButton}/>
            </StyledOptionContainer>
            <StyledAddedPlayerContainer>
                <h3>The Players will be added to the team:</h3>
                <ul>
                    {addedPlayers.map(player => (
                        <li key={player.id}>
                            {player.firstName} {player.lastName}
                        </li>
                    ))}
                </ul>
            </StyledAddedPlayerContainer>
        </StyledAddWrapper>
    );

};