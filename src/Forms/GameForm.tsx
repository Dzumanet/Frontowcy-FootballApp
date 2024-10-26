import { ChangeEvent, FormEvent, useState } from "react";
import { GameDto, GameValidationErrors, TeamEntity } from "../types";
import { validateGame } from "../utils/validateGame.ts";
import { ErrorText } from "../common/ErrorText.tsx";

type GameFormProps = {
    handleSubmit: (e: FormEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    value: GameDto;
    isPending: boolean;
    filterOptions1: TeamEntity[] | undefined;
    filterOptions2: TeamEntity[] | undefined;
}

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
        existingGame: ''

    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateGame(value);
        setErrors(validationErrors);

        if (!validationErrors.gameTitle && !validationErrors.gameDate && !validationErrors.venue && !validationErrors.duration) {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={onSubmit} style={{
            display: 'flex',
            flexDirection: 'column',

        }}>
            <label htmlFor="gameTitle">Game Title</label>
            {errors.gameTitle && <ErrorText>{errors.gameTitle}</ErrorText>}
            <input
                type="text"
                id="gameTitle"
                name="gameTitle"
                value={value.gameTitle}
                onChange={handleChange}
                // required
            />

            <label htmlFor="gameDate">Game Date</label>
            {errors.gameDate && <ErrorText>{errors.gameDate}</ErrorText>}
            <input
                type="date"
                id="gameDate"
                name="gameDate"
                value={value.gameDate}
                onChange={handleChange}
                // required
            />

            <label htmlFor="venue">Venue</label>
            {errors.venue && <ErrorText>{errors.venue}</ErrorText>}
            <input
                type="text"
                id="venue"
                name="venue"
                value={value.venue}
                onChange={handleChange}
                // required
            />

            <label htmlFor="duration">Duration Time</label>
            {errors.duration && <ErrorText>{errors.duration}</ErrorText>}
            <input
                type="number"
                id="duration"
                name="duration"
                value={value.duration}
                onChange={handleChange}
                // min={90}
                // required
            />

            <label htmlFor="teamAId">Team A</label>
            {errors.teamAId && <ErrorText>{errors.teamAId}</ErrorText>}
            <select
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
            </select>

            <label htmlFor="resultTeamA">Result Team A</label>
            {errors.resultTeamA && <ErrorText>{errors.resultTeamA}</ErrorText>}
            <input
                type="number"
                id="resultTeamA"
                name="resultTeamA"
                value={value.resultTeamA}
                onChange={handleChange}
                // min={0}
                // required
            />

            <label htmlFor="teamBId">Team B</label>
            {errors.teamBId && <ErrorText>{errors.teamBId}</ErrorText>}
            <select
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
            </select>

            <label htmlFor="resultTeamB">Result Team B</label>
            {errors.resultTeamB && <ErrorText>{errors.resultTeamB}</ErrorText>}
            <input
                type="number"
                id="resultTeamB"
                name="resultTeamB"
                value={value.resultTeamB}
                onChange={handleChange}
                // min={0}
                // required
            />

            <button type="submit" disabled={isPending}>Save Game</button>

        </form>
    );
};