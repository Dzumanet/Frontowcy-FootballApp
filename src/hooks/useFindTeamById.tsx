import { useGetTeamsQuery } from "../queries/useGetTeamsQuery.ts";
import { useMemo } from "react";

export const useFindTeamById = (teamAId: string | null, teamBId: string | null) => {
    const { data: teams = [] } = useGetTeamsQuery();

    const teamA = useMemo(() => teams.find(team => team.id === teamAId) || null, [teams, teamAId]);
    const teamB = useMemo(() => teams.find(team => team.id === teamBId) || null, [teams, teamBId]);

    return { teamA, teamB };
};