import { GameDto, GameValidationErrors } from "../types";

export const validateGame = (values: GameDto) => {
    const errors: GameValidationErrors = {
        gameTitle: '',
        gameDate: '',
        venue: '',
        duration: '',
        resultTeamA: '',
        resultTeamB: '',
        teamAId: '',
        teamBId: '',
        existingGame: ''
    };

    if (!values.gameTitle.trim()) {
        errors.gameTitle = 'Game title is required.';
    } else if (values.gameTitle.length < 2) {
        errors.gameTitle = 'Game title must be at least 2 characters long.';
    }

    if (!values.gameDate) {
        errors.gameDate = 'Game date is required.';
    } else {
        const gameDate = new Date(values.gameDate);

        if (isNaN(gameDate.getTime())) {
            errors.gameDate = 'Invalid date format.';
        } else {
            const gameYear = gameDate.getFullYear();
            if (gameYear < 1900 || gameYear > 2050) {
                errors.gameDate = `Please provide a valid year between 1900 and 2050.`;
            }
        }
    }

    if (!values.venue.trim()) {
        errors.venue = 'Provide the venue location.';
    } else if (values.venue.length < 2) {
        errors.venue = 'Venue location must be at least 2 characters long.';
    }

    if (values.duration === undefined || values.duration === null) {
        errors.duration = 'Duration is required.';
    } else if (values.duration < 90) {
        errors.duration = 'Duration must be greater than or equal to 90 minutes.';
    }

    if (!values.teamAId) {
        errors.teamAId = 'Team A is required.';
    }

    if (!values.teamBId) {
        errors.teamBId = 'Team B is required.';
    }

    if (values.resultTeamA === undefined || values.resultTeamA === null) {
        errors.resultTeamA = 'Result for Team A is required.';
    } else if (values.resultTeamA < 0) {
        errors.resultTeamA = 'Result must be 0 or greater.';
    }

    if (values.resultTeamB === undefined || values.resultTeamB === null) {
        errors.resultTeamB = 'Result for Team B is required.';
    } else if (values.resultTeamB < 0) {
        errors.resultTeamB = 'Result must be 0 or greater.';
    }



    return errors;
};
