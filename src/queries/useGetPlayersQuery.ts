import { useApi } from "../hooks/useApi.ts";
import { useQuery } from "@tanstack/react-query";
import { PlayerEntity } from "../types";

export const useGetPlayers = () => {
    const { apiGet } = useApi();

    const {data, isLoading, error} = useQuery({
        queryKey: ['players'],
        queryFn: async () => {
            return apiGet<PlayerEntity[]>('players');
        }
    })
    return {
        data,
        isLoading,
        error,
    }
};