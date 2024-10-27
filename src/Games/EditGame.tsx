import { useGetTeamsQuery } from "../queries/useGetTeamsQuery.ts";
import { ChangeEvent, FormEvent, useState } from "react";
import { GameDto, GameEntity } from "../types";
import { GameForm } from "../Forms/GameForm.tsx";
import { useUpdateGameMutation } from "../queries/useUpdateGameMutation.ts";
import styled from "styled-components";

type EditGameProps = {
    game: GameEntity;
}

const StyledEditWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StyledFormContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-bottom: 30px;
`;

export const EditGame = ({ game }: EditGameProps) => {
    const { mutate: updateGame, isPending } = useUpdateGameMutation(game.id);
    const { data: teams } = useGetTeamsQuery();


    const [values, setValues] = useState<GameDto>({
        gameTitle: game.gameTitle,
        gameDate: game.gameDate,
        venue: game.venue,
        duration: game.duration,
        resultTeamA: game.resultTeamA,
        resultTeamB: game.resultTeamB,
        teamAId: game.teamAId,
        teamBId: game.teamBId
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        updateGame({
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
        <StyledEditWrapper>
            <div>
            <h2>Edit Game</h2>
            </div>
            <StyledFormContainer>
            <GameForm handleSubmit={handleSubmit} handleChange={handleChange} value={values} isPending={isPending}
                      filterOptions1={filterOptions1} filterOptions2={filterOptions2}/>
            </StyledFormContainer>
        </StyledEditWrapper>
    );
};