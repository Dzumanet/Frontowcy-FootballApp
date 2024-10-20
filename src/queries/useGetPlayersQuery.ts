import { useApi } from "../hooks/useApi.ts";
import { useQuery } from "@tanstack/react-query";
import { PlayerEntity } from "../types";

export const useGetPlayersQuery = () => {
    const { apiGet } = useApi();

    const {data, isLoading, error} = useQuery({
        queryKey: ['players'],
        queryFn: async () => {
            return apiGet<PlayerEntity[]>('players');
        },
        refetchOnMount: false,
    })
    return {
        data,
        isLoading,
        error,
    }
};