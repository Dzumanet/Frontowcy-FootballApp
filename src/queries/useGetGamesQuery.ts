import { useApi } from "../hooks/useApi.ts";
import { useQuery } from "@tanstack/react-query";
import { GameEntity } from "../types";

export const useGetGamesQuery = () => {
    const { apiGet } = useApi();

    const { data, isLoading, error } = useQuery({
        queryKey: ['games'],
        queryFn: async () => {
            return apiGet<GameEntity[]>('games');
        },
        refetchOnMount: false,
    });
    return {
        data,
        isLoading,
        error,
    };
};