import { useApi } from "../hooks/useApi.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamDto, TeamEntity } from "../types";

export const useCreateTeamMutation = () => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['teams', 'createTeams'],
        mutationFn: async (payload: TeamDto) => {
            return apiPost<TeamEntity, TeamDto>('teams', payload);
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