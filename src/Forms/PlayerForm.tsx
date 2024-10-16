import { ChangeEvent, FormEvent, useState } from "react";
import { PlayerDto, PlayerValidationErrors } from "../types";
import styled from "styled-components";
import { validatePlayer } from "../utils/validatePlayer.ts";

type PlayerFormProps = {
    handleSubmit: (e: FormEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    values: PlayerDto;
    isPending: boolean;
    existingPlayers?: PlayerDto[];
}

const FormatedInput = styled.input`
    max-width: 100px;
`;

export const PlayerForm = ({ handleSubmit, handleChange, values, isPending, existingPlayers }: PlayerFormProps) => {
    const [errors, setErrors] = useState<PlayerValidationErrors>({
        firstName: '',
        lastName: '',
        playerExists: ''

    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validatePlayer(values, existingPlayers || []);
        setErrors(validationErrors);

        if (!validationErrors.firstName && !validationErrors.lastName && !validationErrors.playerExists) {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="firstName">First Name</label>
            {errors.playerExists && <p>{errors.playerExists}</p>}
            <FormatedInput type="text" id="firstName" name="firstName" value={values.firstName} onChange={handleChange}
                           required/>
            {errors.firstName && <p>{errors.firstName}</p>}
            <label htmlFor="lastName">Last Name</label>
            <FormatedInput type="text" id="lastName" name="lastName" value={values.lastName} onChange={handleChange}
                           required/>
            {errors.lastName && <p>{errors.lastName}</p>}
            <button type="submit" disabled={isPending}>Save</button>
        </form>
    );
};