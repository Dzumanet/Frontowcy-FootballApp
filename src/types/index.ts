// Entity
export type PlayerEntity = {
    id: string;
    firstName: string;
    lastName: string;
    teamId: string;
}

export type TeamEntity = {
    id: string;
    teamName: string;
    establishedYear: number;
    location: string;
}

export type GameEntity = {
    id: string;
    gameTitle: string;
    gameDate: string;
    venue: string;
    duration: string;
    result: string;
    teamAId: string;
    teamBId: string;
}

//Dto

export type PlayerDto = Omit<PlayerEntity, "id">

export type TeamDto = Omit<TeamEntity, "id">

export type GameDto = Omit<GameEntity, "id">