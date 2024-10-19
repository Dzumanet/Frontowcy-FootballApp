import { useApi } from "../hooks/useApi.ts";
import { useQuery } from "@tanstack/react-query";
import { TeamEntity } from "../types";

export const useGetTeamsQuery = () => {
    const { apiGet } = useApi();

    const { data, isFetching, error } = useQuery({
        queryKey: ['teams'],
        queryFn: async () => {
            return apiGet<TeamEntity[]>('teams');
        },
        refetchOnMount: false,
    });
    return {
        data,
        isFetching,
        error,
    };
};