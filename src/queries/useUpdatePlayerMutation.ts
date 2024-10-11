import { useApi } from "../hooks/useApi.ts";
import { useMutation } from "@tanstack/react-query";
import { PlayerDto, PlayerEntity } from "../types";

export const UseUpdatePlayerMutation = (playerId: string) => {
    const { apiPut } = useApi();

    const { mutate, isPending } = useMutation({
        mutationKey: ['players', 'updatePlayer'],
        mutationFn: async (payload: PlayerDto) => {
            return apiPut<PlayerEntity, PlayerDto>(`players/${playerId}`, payload);
        },

    });

    return {
        mutate,
        isPending
    };

};