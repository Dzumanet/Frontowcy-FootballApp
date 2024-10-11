import { useApi } from "../hooks/useApi.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerDto, PlayerEntity } from "../types";

export const useUpdatePlayerMutation = (playerId: string) => {
    const { apiPut } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['players', 'updatePlayer'],
        mutationFn: async (payload: PlayerDto) => {
            return apiPut<PlayerEntity, PlayerDto>(`players/${playerId}`, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['players']
            });
        }
    });

    return {
        mutate,
        isPending
    };

};