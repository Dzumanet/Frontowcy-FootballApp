import { TeamEntity } from "../types";
import { useState } from "react";
import { DeleteTeamConfirmation } from "./DeleteTeamConfirmation.tsx";
import { EditTeam } from "./EditTeam.tsx";
import { PlayersInTeam } from "./PlayersInTeam.tsx";

type TeamInfoProps = {
    team: TeamEntity;
}

export const TeamInfo = ({ team }: TeamInfoProps) => {
    const [mode, setMode] = useState<'edit' | 'delete' | 'none'>('none');

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
            left: "120%",
            width: 400,
        }}>
            <h2>{team.teamName}</h2>
            <p>Location: {team.location}</p>
            <p>Established Year: {team.establishedYear}</p>

            <PlayersInTeam teamId={team.id} isEditMode={mode === 'edit'}/>

            <button onClick={toggleEditMode}>{mode === 'edit' ? 'Cancel' : 'Edit'}</button>
            <button onClick={toggleDeleteMode}>{mode === 'delete' ? 'Cancel' : 'Delete'}</button>
            <div>
                {mode === 'edit' ? <EditTeam team={team}/> : undefined}
                {mode === 'delete' ? <DeleteTeamConfirmation onCancel={toggleDeleteMode} team={team}/> : undefined}
            </div>
        </td>
    );
};