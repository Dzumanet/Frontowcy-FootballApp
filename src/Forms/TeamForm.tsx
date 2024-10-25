import { ChangeEvent, FormEvent, useState } from "react";
import { TeamDto, TeamEntity, TeamValidationErrors } from "../types";
import { validateTeam } from "../utils/validateTeam.ts";
import styled from "styled-components";
import { ActionButton, SaveButton } from "../Buttons/ActionButton.tsx";

type TeamFormProps = {
    handleSubmit: (e: FormEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    values: TeamDto;
    isPending: boolean;
    existingTeam?: TeamDto[];
    editTeam?: TeamEntity;
}

const StyledForm = styled.form`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;

`;
const StyledLabel = styled.label`
    margin: 10px 0;

`;

const StyledInput = styled.input`
    width: 150px;
    padding: 5px;

`;
const StyledNumberInput = styled.input`
    width: 55px;
    padding: 5px;
    margin-bottom: 15px;

`;
const StyledBtnContainer = styled.div`
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);

`;

export const TeamForm = ({
                             handleSubmit,
                             handleChange,
                             values,
                             isPending,
                             existingTeam,
                             editTeam,
                         }: TeamFormProps) => {

    const [errors, setErrors] = useState<TeamValidationErrors>({
        teamName: '',
        establishedYear: '',
        location: '',
        teamExists: ''
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateTeam(values, existingTeam || [], editTeam);
        setErrors(validationErrors);

        if (!validationErrors.teamName && !validationErrors.establishedYear && !validationErrors.location && !validationErrors.teamExists) {
            handleSubmit(e);
        }
    };

    return (
        <StyledForm onSubmit={onSubmit}>
            {errors.teamExists && <p>{errors.teamExists}</p>}
            <StyledLabel htmlFor="teamName">Team Name</StyledLabel>
            {errors.teamName && <p>{errors.teamName}</p>}

            <StyledInput
                type="text"
                id="teamName"
                name="teamName"
                value={values.teamName}
                onChange={handleChange}
                // required
            />

            <StyledLabel htmlFor="location">Location</StyledLabel>
            {errors.location && <p>{errors.location}</p>}
            <StyledInput
                type="text"
                id="location"
                name="location"
                value={values.location}
                onChange={handleChange}
                // required
            />

            <StyledLabel htmlFor="establishedYear">Established Year</StyledLabel>
            {errors.establishedYear && <p>{errors.establishedYear}</p>}
            <StyledNumberInput
                type="number"
                id="establishedYear"
                name="establishedYear"
                value={values.establishedYear}
                onChange={handleChange}
                // required
            />
            <StyledBtnContainer>
                {/*<button type="submit" disabled={isPending}>Save Team</button>*/}
                <ActionButton type="submit" label="Save Team" Component={SaveButton} disabled={isPending}/>
            </StyledBtnContainer>
        </StyledForm>
    );
};
