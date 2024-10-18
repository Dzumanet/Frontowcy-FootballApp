// Entity
export type PlayerEntity = {
    id: string;
    firstName: string;
    lastName: string;
    teamId: string | null;
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
    duration: number;
    resultTeamA: number;
    resultTeamB: number;
    teamAId: string | null;
    teamBId: string | null;
}

//Dto

export type PlayerDto = Omit<PlayerEntity, "id" | "teamId">

export type TeamDto = Omit<TeamEntity, "id">

export type GameDto = Omit<GameEntity, "id">

//Errors
export type PlayerValidationErrors = {
    firstName: string;
    lastName: string;
    playerExists: string;
}
export type TeamValidationErrors = {
    teamName: string;
    establishedYear: string;
    location: string;
    teamExists: string;
}

export type GameValidationErrors = {
    gameTitle: string,
    gameDate: string,
    venue: string,
    duration: string,
    resultTeamA: string,
    resultTeamB: string,
    teamAId: string,
    teamBId: string,
    existingGame: string
}