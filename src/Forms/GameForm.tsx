import { ChangeEvent, FormEvent } from "react";
import { GameDto } from "../types";

type GameFormProps = {
    handleSubmit: (e: FormEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: GameDto;
    isPending: boolean;

}

export const GameForm = ({handleSubmit, handleChange, value, isPending}: GameFormProps) => {


    const onSubmit = (e: FormEvent) => {
    //     dorobic sprawdzanie błędów
        handleSubmit(e)
    }

    return (
        <form onSubmit={onSubmit}>
            {/*{errors.teamExists && <p>{errors.teamExists}</p>}*/}
            <label htmlFor="gameTitle">Game Title</label>
            {/*{errors.teamName && <p>{errors.teamName}</p>}*/}

            <input
                type="text"
                id="gameTitle"
                name="gameTitle"
                value={value.gameTitle}
                onChange={handleChange}
                required
            />

            <label htmlFor="gameDate">Game Date</label>
            {/*{errors.location && <p>{errors.location}</p>}*/}
            <input
                type="text"
                id="gameDate"
                name="gameDate"
                value={value.gameDate}
                onChange={handleChange}
                required
            />
            <label htmlFor="venue">Venue</label>
            {/*{errors.location && <p>{errors.location}</p>}*/}
            <input
                type="text"
                id="venue"
                name="venue"
                value={value.venue}
                onChange={handleChange}
                required
            />
            <label htmlFor="duration">Duration Time</label>
            {/*{errors.location && <p>{errors.location}</p>}*/}
            <input
                type="number"
                id="duration"
                name="duration"
                value={value.duration}
                onChange={handleChange}
                required
            />
            <label htmlFor="teamAId">Team A</label>
            {/*{errors.location && <p>{errors.location}</p>}*/}
            <input
                type="text"
                id="teamAId"
                name="teamAId"
                value={value.teamAId ?? ''}
                onChange={handleChange}
                required
            />
            <label htmlFor="resultTeamA">Result Team A</label>
            {/*{errors.location && <p>{errors.location}</p>}*/}
            <input
                type="number"
                id="resultTeamA"
                name="resultTeamA"
                value={value.resultTeamA}
                onChange={handleChange}
                required
            />

            <label htmlFor="teamBId">Team B</label>
            {/*{errors.location && <p>{errors.location}</p>}*/}
            <input
                type="text"
                id="teamBId"
                name="teamBId"
                value={value.teamBId ?? ''}
                onChange={handleChange}
                required
            />
            <label htmlFor="resultTeamB">Result Team B</label>
            {/*{errors.location && <p>{errors.location}</p>}*/}
            <input
                type="number"
                id="resultTeamB"
                name="resultTeamB"
                value={value.resultTeamB}
                onChange={handleChange}
                required
            />

            <button type="submit" disabled={isPending}>Save Team</button>
        </form>
    )
}