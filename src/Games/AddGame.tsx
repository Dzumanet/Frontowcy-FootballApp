import { ChangeEvent, FormEvent, useState } from "react";
import { GameDto } from "../types";
import { useCreateGameMutation } from "../queries/useCreateGameMutation.ts";
import { GameForm } from "../Forms/GameForm.tsx";
import { useGetTeamsQuery } from "../queries/useGetTeamsQuery.ts";

export const AddGame = () => {
    const { mutate: createGame, isPending } = useCreateGameMutation();
    const { data: teams, isLoading, error } = useGetTeamsQuery();

    if (isLoading) return <p>Loading Team list...</p>;
    if (error) return <p>{error.message}</p>;

    const [values, setValues] = useState<GameDto>({
        gameTitle: '',
        gameDate: '',
        venue: '',
        duration: 90,
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
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const filterOptions1 = teams?.filter(option => option.id !== values.teamBId);
    const filterOptions2 = teams?.filter(option => option.id !== values.teamAId);

    return (
        <div>
            <h2>Add Game</h2>
            <GameForm handleSubmit={handleSubmit} handleChange={handleChange} value={values} isPending={isPending}
                      filterOptions1={filterOptions1} filterOptions2={filterOptions2}/>

        </div>
    );
};