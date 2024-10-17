import { ChangeEvent, FormEvent, useState } from "react";
import { GameDto } from "../types";
import { useCreateGameMutation } from "../queries/useCreateGameMutation.ts";
import { GameForm } from "../Forms/GameForm.tsx";

export const AddGame = () => {
    const {mutate: createGame, isPending} = useCreateGameMutation()

    const [values, setValues] = useState<GameDto>({
        gameTitle: '',
        gameDate: '',
        venue: '',
        duration: 0,
        resultTeamA: 0,
        resultTeamB: 0,
        teamAId: null,
        teamBId: null
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        createGame({
            gameTitle: values.gameTitle,
            gameDate: values.gameDate,
            venue: values.venue,
            duration: values.duration,
            resultTeamA: values.resultTeamA,
            resultTeamB: values.resultTeamB,
            teamAId: values.teamAId,
            teamBId: values.teamBId
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value, type } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: type === 'number' ? Number(value) : value,
        }))
    }


    return (
        <div>
            <h2>Add Game</h2>
            <GameForm handleSubmit={handleSubmit} handleChange={handleChange} value={values} isPending={isPending} />
        </div>
    )
}