import { useGetTeamsQuery } from "../queries/useGetTeamsQuery.ts";
import { useState } from "react";
import { OneTeam } from "./OneTeam.tsx";
import { AddTeam } from "./AddTeam.tsx";

export const TeamsList = () => {
    const { data, isLoading, error } = useGetTeamsQuery();
    const [addTeam, setAddTeam] = useState(false);
    const [activeTeamInfo, setActiveTeamInfo] = useState<string | null>(null);

    if (isLoading) return <p>Loading players list...</p>;
    if (error) return <p>{error.message}</p>;

    const toggleAddTeam = () => {
        setAddTeam(prevAddPlayer => !prevAddPlayer);
    };

    const toggleShowTeamInfo = (teamId: string) => {
        setActiveTeamInfo(prevTeamId => (prevTeamId === teamId ? null : teamId));
    };

    return (
        <div style={{
            width: '100%',
        }}>
            <table style={{
                position: 'relative',
            }}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Team Name</th>
                    <th>Location</th>
                    <th>Established Year</th>
                </tr>
                </thead>
                <tbody>
                {data?.map(team => <OneTeam
                    team={team}
                    key={team.id}
                    isActive={team.id === activeTeamInfo}
                    toggleShowTeamInfo={() => toggleShowTeamInfo(team.id)}
                />)}
                </tbody>
            </table>
            <button onClick={toggleAddTeam}>{addTeam ? 'Close' : 'Add Team'}</button>
            {addTeam ? <AddTeam/> : undefined}

        </div>
    );
};