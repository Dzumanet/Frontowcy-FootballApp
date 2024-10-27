import { TeamEntity } from "../types";
import { TeamInfo } from "./TeamInfo.tsx";

type OneTeamProps = {
    team: TeamEntity;
    isActive: boolean;
    toggleShowTeamInfo: () => void;
}

export const OneTeam = ({ team, isActive, toggleShowTeamInfo }: OneTeamProps) => {

    return (<>
            <tr>
                {/*<td>{team.id}</td>*/}
                <td>{team.teamName}</td>
                <td>{team.location}</td>
                <td>{team.establishedYear}</td>
                <td>
                    <button onClick={toggleShowTeamInfo}>{isActive ? 'Cancel' : 'Show Info'}</button>
                </td>
            </tr>
            {isActive && (
                <tr>
                    <td colSpan={4}>
                        <TeamInfo team={team}/>
                    </td>
                </tr>
            )}
        </>
    );
};