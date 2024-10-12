import { useApi } from "../hooks/useApi.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamDto, TeamEntity } from "../types";

export const useUpdateTeamMutation = (teamId: string) => {
    const { apiPut } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['teams', 'updateTeams'],
        mutationFn: async (payload: TeamDto) => {
            return apiPut<TeamEntity, TeamDto>(`teams/${teamId}`, payload);
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