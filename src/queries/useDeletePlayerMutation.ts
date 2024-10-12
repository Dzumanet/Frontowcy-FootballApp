import { useApi } from "../hooks/useApi.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerEntity } from "../types";

export const useDeletePlayerMutation = (playerId: string) => {
    const { apiDelete } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['players', 'deletePlayer', playerId],
        mutationFn: async () => {
            return apiDelete<PlayerEntity>(`players/${playerId}`);
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