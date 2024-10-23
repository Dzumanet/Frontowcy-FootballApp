import { PlayerEntity } from "../types";
import { useUpdatePlayerMutation } from "../queries/useUpdatePlayerMutation.ts";
import { ChangeEvent, FormEvent, useState } from "react";
import { PlayerForm } from "../Forms/PlayerForm.tsx";

type EditPlayerProps = {
    player: PlayerEntity;
}



export const EditPlayer = ({ player }: EditPlayerProps) => {
    const { mutate, isPending } = useUpdatePlayerMutation(player.id);


    const [values, setValues] = useState({
        firstName: player.firstName,
        lastName: player.lastName
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
        });

    };


    return (
        <>
            <PlayerForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} isPending={isPending}/>
        </>
    );
};