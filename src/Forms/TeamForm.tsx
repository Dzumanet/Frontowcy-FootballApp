import { ChangeEvent, FormEvent, useState } from "react";
import { TeamDto, TeamValidationErrors } from "../types";
import { validateTeam } from "../utils/validateTeam.ts";

type TeamFormProps = {
    handleSubmit: (e: FormEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    values: TeamDto;
    isPending: boolean;
    existingTeam?: TeamDto[];
}

export const TeamForm = ({
                             handleSubmit,
                             handleChange,
                             values,
                             isPending,
                             existingTeam
                         }: TeamFormProps) => {

    const [errors, setErrors] = useState<TeamValidationErrors>({
        teamName: '',
        establishedYear: '',
        location: '',
        teamExists: ''
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateTeam(values, existingTeam || []);
        setErrors(validationErrors);

        if (!validationErrors.teamName && !validationErrors.establishedYear && !validationErrors.location && !validationErrors.teamExists) {
            handleSubmit(e);
        }
    };
    console.log(errors);

    return (
        <form onSubmit={onSubmit}>
            {errors.teamExists && <p>{errors.teamExists}</p>}
            <label htmlFor="teamName">Team Name</label>
            {errors.teamName && <p>{errors.teamName}</p>}

            <input
                type="text"
                id="teamName"
                name="teamName"
                value={values.teamName}
                onChange={handleChange}
                required
            />

            <label htmlFor="location">Location</label>
            {errors.location && <p>{errors.location}</p>}
            <input
                type="text"
                id="location"
                name="location"
                value={values.location}
                onChange={handleChange}
                required
            />

            <label htmlFor="establishedYear">Established Year</label>
            {errors.establishedYear && <p>{errors.establishedYear}</p>}
            <input
                type="number"
                id="establishedYear"
                name="establishedYear"
                value={values.establishedYear}
                onChange={handleChange}
                required
            />
            <button type="submit" disabled={isPending}>Save Team</button>
        </form>
    );
};
