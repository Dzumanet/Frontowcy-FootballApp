import { ChangeEvent, FormEvent } from "react";
import { PlayerDto } from "../types";
import styled from "styled-components";

type PlayerFormProps = {
    handleSubmit: (e: FormEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    values: PlayerDto;
    isPending: boolean;
}

const FormatedInput = styled.input`
max-width: 100px;
`

export const PlayerForm = ({ handleSubmit, handleChange, values, isPending }: PlayerFormProps) => {


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">firstName</label>
            <FormatedInput type="text" id="firstName" name="firstName" value={values.firstName} onChange={handleChange}
                   required/>
            <label htmlFor="lastName">lastName</label>
            <FormatedInput type="text" id="lastName" name="lastName" value={values.lastName} onChange={handleChange} required/>
            <button type="submit" disabled={isPending}>Save</button>
        </form>
    );
};