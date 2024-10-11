import { useApi } from "../hooks/useApi.ts";
import { useMutation } from "@tanstack/react-query";
import { PlayerDto, PlayerEntity } from "../types";

export const useCreatePlayerMutation = () => {
    const { apiPost } = useApi();

    const { mutate, isPending } = useMutation({
        mutationKey: ['players', 'createPlayer'],
        mutationFn: async (payload: PlayerDto) => {
            return apiPost<PlayerEntity, PlayerDto>('players', payload);
        },

    });

    return {
        mutate,
        isPending
    };

};