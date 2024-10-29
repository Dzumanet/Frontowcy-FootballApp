import { GameEntity, TeamDto, TeamEntity, TeamValidationErrors } from "../types";

export const validateTeam = (values: TeamDto, existingTeam?: TeamDto[], currentTeam?: TeamEntity) => {
    const errors: TeamValidationErrors = {
        teamName: '',
        establishedYear: '',
        location: '',
        teamExists: ''
    };

    if (!values.teamName.trim()) {
        errors.teamName = 'Team name is required.';
    } else if (values.teamName.length < 2) {
        errors.teamName = 'Team name must be at least 2 characters long.';
    }
    if (!values.establishedYear) {
        errors.establishedYear = 'Established year is required.';
    } else if (values.establishedYear < 1800 || values.establishedYear > new Date().getFullYear()) {
        errors.establishedYear = `Please provide a valid year between 1800 and ${new Date().getFullYear()}.`;
    }
    if (!values.location.trim()) {
        errors.location = 'Location is required.';
    } else if (values.location.length < 2) {
        errors.location = 'Team name must be at least 2 characters long.';
    }


    if (existingTeam && currentTeam?.teamName !== values.teamName) {
        const teamExists = existingTeam.some(
            team => team.teamName === values.teamName
        );

        if (teamExists) {
            errors.teamExists = 'A team with this name already exists.';
        }
    }

    return errors;
};

export const validateTeamParticipationInGames = (teamId: string, games: GameEntity[]) => {
    const teamInGames = games.some(
        (game) => game.teamAId === teamId || game.teamBId === teamId
    );

    return teamInGames;


};