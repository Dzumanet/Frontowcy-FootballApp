import { useCreatePlayerMutation } from "../queries/useCreatePlayerMutation.ts";
import { PlayerForm } from "../Forms/PlayerForm.tsx";
import { ChangeEvent, FormEvent, useState } from "react";

export const AddPlayer = () => {
    const { mutate, isPending } = useCreatePlayerMutation();

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

        if (!values.firstName.trim() || !values.lastName.trim()) {
            alert('Please fill in all fields before saving.');
            setValues({
                firstName: '',
                lastName: ''
            });
            return;
        }

        mutate({
            firstName: values.firstName,
            lastName: values.lastName
        });

        setValues({
            firstName: '',
            lastName: ''
        });
    };

    return (
        <div>
            <h2>Add new player</h2>
            <PlayerForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} isPending={isPending}/>
        </div>
    );
};