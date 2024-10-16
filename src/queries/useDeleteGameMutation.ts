import { useApi } from "../hooks/useApi.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GameEntity } from "../types";

export const useDeleteTeamMutation = (gameId: string) => {
    const { apiDelete } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['games', 'deleteGames', gameId],
        mutationFn: async () => {
            return apiDelete<GameEntity>(`games/${gameId}`);
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
