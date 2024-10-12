import { PlayerDto, PlayerEntity, PlayerValidationErrors } from "../types";

export const validatePlayer = (values: PlayerDto, existingPlayers?: PlayerDto[]) => {
    const errors: PlayerValidationErrors = {
        firstName: '',
        lastName: '',
        playerExists: '',


    };

    if (!values.firstName.trim()) {
        errors.firstName = 'First name is required.';
    } else if (values.firstName.length < 2) {
        errors.firstName = 'First name must be at least 2 characters long.';
    }
    if (!values.lastName.trim()) {
        errors.lastName = 'First name is required.';
    } else if (values.lastName.length < 2) {
        errors.lastName = 'Last name must be at least 2 characters long.';
    }

    if (existingPlayers) {
        const playerExists = existingPlayers.some(
            player => player.firstName === values.firstName && player.lastName === values.lastName
        );

        if (playerExists) {
            errors.playerExists = 'A player with this name already exists.';

        }
    }

    return errors;
};

export const validatePlayerAssignedToTeam = (player: PlayerEntity): boolean => {
    if (player.teamId) {
        console.log('Player is assigned to a team. Cannot be removed.');
        return true;
    }
    return false;
};