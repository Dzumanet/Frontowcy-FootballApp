import { ChangeEvent, FormEvent, useState } from "react";
import { GameDto, GameValidationErrors, TeamEntity } from "../types";
import { validateGame } from "../utils/validateGame.ts";
import { ErrorText } from "../common/ErrorText.tsx";
import styled from "styled-components";
import { ActionButton, SaveButton } from "../Buttons/ActionButton.tsx";

type GameFormProps = {
    handleSubmit: (e: FormEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    value: GameDto;
    isPending: boolean;
    filterOptions1: TeamEntity[] | undefined;
    filterOptions2: TeamEntity[] | undefined;
}


const StyledForm = styled.form`
    //width: 80%;
    //height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 20px;
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    //width: 20%;
    //justify-content: space-between;
    align-items: center;
    text-align: center;
    margin: 0 15px;

    position: relative;
`;
const StyledInput = styled.input`
    width: 150px;
    padding: 5px;

`;

const StyledLabel = styled.label`
    width: 120px;
    margin: 10px 0;

`;


const StyledSelect = styled.select`
    width: 160px;
    padding: 5px;

`;
const StyledNumberInput = styled.input`
    width: 150px;
    padding: 5px;
    text-align: center;

`;
const StyledBtnContainer = styled.div`
    position: absolute;
    bottom: -50px;
    left: 50%;
    transform: translateX(-50%);

`;

export const GameForm = ({
                             handleSubmit,
                             handleChange,
                             value,
                             isPending,
                             filterOptions1,
                             filterOptions2
                         }: GameFormProps) => {

    const [errors, setErrors] = useState<GameValidationErrors>({
        gameTitle: '',
        gameDate: '',
        venue: '',
        duration: '',
        resultTeamA: '',
        resultTeamB: '',
        teamAId: '',
        teamBId: '',

    });


    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateGame(value);
        setErrors(validationErrors);

        if (!validationErrors.gameTitle && !validationErrors.gameDate && !validationErrors.venue && !validationErrors.duration && !validationErrors.teamAId && !validationErrors.teamBId) {
            handleSubmit(e);
        }
    };

    return (

        <StyledForm onSubmit={onSubmit}>
            <StyledContainer>
                <StyledLabel htmlFor="gameTitle">Game Title</StyledLabel>
                <StyledInput
                    type="text"
                    id="gameTitle"
                    name="gameTitle"
                    value={value.gameTitle}
                    onChange={handleChange}
                    // required
                />
                {errors.gameTitle && <ErrorText>{errors.gameTitle}</ErrorText>}

                <StyledLabel htmlFor="venue">Venue Location</StyledLabel>
                <StyledInput
                    type="text"
                    id="venue"
                    name="venue"
                    value={value.venue}
                    onChange={handleChange}
                    // required
                />
                {errors.venue && <ErrorText>{errors.venue}</ErrorText>}


                <StyledLabel htmlFor="teamAId">Team A</StyledLabel>
                {errors.teamAId && <ErrorText>{errors.teamAId}</ErrorText>}

                <StyledSelect
                    id="teamAId"
                    name="teamAId"
                    value={value.teamAId ?? ''}
                    onChange={handleChange}
                    // required
                >

                    <option value="" disabled>Select Team A</option>
                    {filterOptions1?.map(team => (
                        <option key={team.id} value={team.id}>
                            {team.teamName}
                        </option>
                    ))}
                </StyledSelect>

                <StyledLabel htmlFor="teamBId">Team B</StyledLabel>
                {errors.teamBId && <ErrorText>{errors.teamBId}</ErrorText>}

                <StyledSelect
                    id="teamBId"
                    name="teamBId"
                    value={value.teamBId ?? ''}
                    onChange={handleChange}
                    // required
                >

                    <option value="" disabled>Select Team B</option>
                    {filterOptions2?.map(team => (
                        <option key={team.id} value={team.id}>
                            {team.teamName}
                        </option>
                    ))}
                </StyledSelect>
            </StyledContainer>
            <StyledContainer>

                <StyledLabel htmlFor="gameDate">Game Date</StyledLabel>
                <StyledNumberInput
                    type="date"
                    id="gameDate"
                    name="gameDate"
                    value={value.gameDate}
                    onChange={handleChange}
                    // required
                />
                {errors.gameDate && <ErrorText>{errors.gameDate}</ErrorText>}


                <StyledLabel htmlFor="duration">Duration Time</StyledLabel>
                <StyledNumberInput
                    type="number"
                    id="duration"
                    name="duration"
                    value={value.duration}
                    onChange={handleChange}
                    // min={90}
                    // required
                />
                {errors.duration && <ErrorText>{errors.duration}</ErrorText>}

                <StyledLabel htmlFor="resultTeamA">Result Team A</StyledLabel>
                <StyledNumberInput
                    type="number"
                    id="resultTeamA"
                    name="resultTeamA"
                    value={value.resultTeamA}
                    onChange={handleChange}
                    // min={0}
                    // required
                />
                {errors.resultTeamA && <ErrorText>{errors.resultTeamA}</ErrorText>}

                <StyledLabel htmlFor="resultTeamB">Result Team B</StyledLabel>
                <StyledNumberInput
                    type="number"
                    id="resultTeamB"
                    name="resultTeamB"
                    value={value.resultTeamB}
                    onChange={handleChange}
                    // min={0}
                    // required
                />
                {errors.resultTeamB && <ErrorText>{errors.resultTeamB}</ErrorText>}

            </StyledContainer>
            <StyledBtnContainer>
                <ActionButton type="submit"  label='Save Game' Component={SaveButton} disabled={isPending} />
            </StyledBtnContainer>
        </StyledForm>
    );

};