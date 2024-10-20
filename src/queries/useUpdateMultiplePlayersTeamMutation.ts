import { useApi } from "../hooks/useApi.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerEntity } from "../types";

export const useUpdateMultiplePlayersTeamMutation = () => {
    const { apiPatch } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['players', 'updateMultiplePlayers'],
        mutationFn: async ({ playerIds, teamId }: { playerIds: string[], teamId: string | null }) => {
            const updatePromises = playerIds.map(playerId =>
                apiPatch<PlayerEntity, Partial<PlayerEntity>>(`players/${playerId}`, { teamId })
            );
            return Promise.all(updatePromises);
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