import { TeamEntity } from "../types";
import { useState } from "react";
import { useGetPlayersQuery } from "../queries/useGetPlayersQuery.ts";
import { DeleteTeamConfirmation } from "./DeleteTeamConfirmation.tsx";

type TeamInfoProps = {
    team: TeamEntity;
}

export const TeamInfo = ({ team }: TeamInfoProps) => {
    const [mode, setMode] = useState<'edit' | 'delete' | 'none'>('none');
    const { data: players } = useGetPlayersQuery();

    const teamPlayers = players?.filter(player => player.teamId === team.id);

    console.log('teamPlayers', teamPlayers);

    const toggleEditMode = () => {
        setMode(prevMode => prevMode === "edit" ? "none" : "edit");
    };

    const toggleDeleteMode = () => {
        setMode(prevMode => prevMode === "delete" ? "none" : "delete");
    };

    return (
        <td style={{
            position: 'absolute',
            top: 0,
            left: "100%",
            width: 400,
        }}>
            <h2>team info</h2>
            <p>{team.teamName}</p>
            <p>{team.location}</p>
            <ul>
                <p>Players in the team:</p>
                {teamPlayers && teamPlayers.length > 0 ? (
                    teamPlayers.map(player => (
                        <li key={player.id}>
                            {player.firstName} {player.lastName}
                        </li>
                    ))
                ) : (
                    <p>No players in the team.</p>
                )}
            </ul>
            <button onClick={toggleEditMode}>{mode === 'edit' ? 'Cancel' : 'Edit'}</button>
            <button onClick={toggleDeleteMode}>{mode === 'delete' ? 'Cancel' : 'Delete'}</button>
            <div>
                {mode === 'edit' ? <p>Edit Team</p> : undefined}
                {mode === 'delete' ? <DeleteTeamConfirmation onCancel={toggleDeleteMode} team={team}/> : undefined}

            </div>
        </td>
    );
};