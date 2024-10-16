import { useApi } from "../hooks/useApi.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GameDto, GameEntity } from "../types";

export const useUpdateGameMutation = (gameId: string) => {
    const { apiPut } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['games', 'updateTeams'],
        mutationFn: async (payload: GameDto) => {
            return apiPut<GameEntity, GameDto>(`games/${gameId}`, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['games']
            });
        }
    });

    return {
        mutate,
        isPending
    };
};