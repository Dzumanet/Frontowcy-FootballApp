import { TeamEntity } from "../types";
import { useState } from "react";
import { TeamInfo } from "./TeamInfo.tsx";


type OneTeamProps = {
    team: TeamEntity;
}

export const OneTeam = ({ team }: OneTeamProps) => {
    const [mode, setMode] = useState<'showInfo' | 'delete' | 'none'>('none');

    const toggleShowTeamInfo = () => {
        setMode(prevMode => prevMode === "showInfo" ? "none" : "showInfo");
    };

    return (<>
            <tr>
                <td>{team.id}</td>
                <td>{team.teamName}</td>
                <td>{team.location}</td>
                <td>{team.establishedYear}</td>
                <td>
                    <button onClick={toggleShowTeamInfo}>{mode === 'showInfo' ? 'Cancel' : 'showInfo'}</button>
                </td>
            </tr>
            <tr>
                {mode === 'showInfo' ? <TeamInfo team={team}/> : undefined}
            </tr>
        </>
    );
};