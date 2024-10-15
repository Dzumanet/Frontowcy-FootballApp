import { useApi } from "../hooks/useApi.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerEntity, TeamEntity } from "../types";
import { useGetPlayersQuery } from "./useGetPlayersQuery.ts";

export const useDeleteTeamMutation = (teamId: string) => {
    const { apiDelete, apiPatch } = useApi();
    const queryClient = useQueryClient();
    const {data: players} = useGetPlayersQuery();

    const { mutate, isPending } = useMutation({
        mutationKey: ['teams', 'deleteTeams', teamId],
        mutationFn: async () => {
            await apiDelete<TeamEntity>(`teams/${teamId}`);

            const playersToUpdate = players?.filter(player => player.teamId === teamId) || [];

            const updatePlayerPromises = playersToUpdate?.map(player =>
                apiPatch<PlayerEntity, Partial<PlayerEntity>>(`players/${player.id}`, {
                    ...player,
                    teamId: null
                })
            );

            await Promise.all(updatePlayerPromises);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['teams']
            });
            queryClient.invalidateQueries({
                queryKey: ['players']
            })
        }
    });

    return {
        mutate,
        isPending
    };
};