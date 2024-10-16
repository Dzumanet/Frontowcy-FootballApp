import { useApi } from "../hooks/useApi.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamEntity } from "../types";

export const useDeleteTeamMutation = (teamId: string) => {
    const { apiDelete } = useApi();
    const queryClient = useQueryClient();
    // const {data: players} = useGetPlayersQuery();

    const { mutate, isPending } = useMutation({
        mutationKey: ['teams', 'deleteTeams', teamId],
        mutationFn: async () => {
            return apiDelete<TeamEntity>(`teams/${teamId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['teams']
            });
        }
    });

    return {
        mutate,
        isPending
    };
};
