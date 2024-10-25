import { useGetTeamsQuery } from "../queries/useGetTeamsQuery.ts";
import { useState } from "react";
import { OneTeam } from "./OneTeam.tsx";
import { AddTeam } from "./AddTeam.tsx";
import styled from "styled-components";
import { AddButton, ToggleButton } from "../Buttons/ToggleButton.tsx";


const StyledTeamListContainer = styled.div`
    width: 800px;
    margin: 0 auto;
`;

const StyledTeamTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    table-layout: fixed;
    font-size: 18px;
`;

const StyledTableHeader = styled.thead`
    background-color: ${props => props.theme.colors.secondaryBackground};

    tr {
        border-bottom: 1px solid #ddd;
    }

    th {
        padding: 0.5rem;
        text-align: left;
    }
`;

const StyledTableBody = styled.tbody`
    tr {
        border-bottom: 1px solid #ddd;
    }

    td {
        padding: 0.8rem;
    }
`;

const StyledAddTeamContainer = styled.div`
    margin-top: 15px;
    text-align: center;
`;


export const TeamsList = () => {
    const { data, isFetching, error } = useGetTeamsQuery();
    const [addTeam, setAddTeam] = useState(false);
    const [activeTeamInfo, setActiveTeamInfo] = useState<string | null>(null);

    if (isFetching) return <p>Loading players list...</p>;
    if (error) return <p>{error.message}</p>;

    const toggleAddTeam = () => {
        setAddTeam(prevAddPlayer => !prevAddPlayer);
    };

    const toggleShowTeamInfo = (teamId: string) => {
        setActiveTeamInfo(prevTeamId => (prevTeamId === teamId ? null : teamId));
    };

    return (
        <StyledTeamListContainer>
            <StyledTeamTable>
                <StyledTableHeader>
                    <tr>
                        {/*<th>ID</th>*/}
                        <th>Team Name</th>
                        <th>Location</th>
                        <th>Established Year</th>
                        <th></th>
                    </tr>
                </StyledTableHeader>
                <StyledTableBody>
                    {data?.map(team => <OneTeam
                        team={team}
                        key={team.id}
                        isActive={team.id === activeTeamInfo}
                        toggleShowTeamInfo={() => toggleShowTeamInfo(team.id)}
                    />)}
                </StyledTableBody>
            </StyledTeamTable>
            <StyledAddTeamContainer>
                <ToggleButton onClick={toggleAddTeam} isShown={addTeam} showText="Add Team" hideText="Close"
                              Component={AddButton}/>
                {addTeam ? <AddTeam/> : undefined}
            </StyledAddTeamContainer>
        </StyledTeamListContainer>
    );
};