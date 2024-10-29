import { TeamEntity } from "../types";
import { TeamInfo } from "./TeamInfo.tsx";
import { ShowButton, ToggleButton } from "../Buttons/ToggleButton.tsx";

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
                    <ToggleButton onClick={toggleShowTeamInfo} isShown={isActive} showText="Show Info" hideText="Cancel"
                                  Component={ShowButton}/>
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