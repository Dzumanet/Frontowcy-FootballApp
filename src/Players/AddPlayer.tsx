import { useCreatePlayerMutation } from "../queries/useCreatePlayerMutation.ts";
import { PlayerForm } from "../Forms/PlayerForm.tsx";
import { ChangeEvent, FormEvent, useState } from "react";
import { useGetPlayersQuery } from "../queries/useGetPlayersQuery.ts";

export const AddPlayer = () => {
    const { mutate, isPending } = useCreatePlayerMutation();
    const { data: players } = useGetPlayersQuery();

    const [values, setValues] = useState({
        firstName: '',
        lastName: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        mutate({
            firstName: values.firstName,
            lastName: values.lastName
        }, {
            onSuccess: () => {
                setValues({
                    firstName: '',
                    lastName: ''
                });
            }
        });
    };

    return (
        <div>
            <h2>Add new player</h2>
            <PlayerForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                values={values}
                isPending={isPending}
                existingPlayers={players || []}
            />
        </div>
    );
};