import { PlayerEntity } from "../types";
import { useState } from "react";
import { EditPlayer } from "./EditPlayer.tsx";
import { DeletePlayerConfirmation } from "./DeletePlayerConfirmation.tsx";
import styled from "styled-components";


type OnePlayerProps = {
    player: PlayerEntity;
}


const ActionButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #007bff;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: #0056b3;
    }
`;

const EditPlayerWrapper = styled.td`
    text-align: center;
    height: 100px;
    background: ${props => props.theme.colors.secondaryBackground};
    
`;

export const OnePlayer = ({ player }: OnePlayerProps) => {
    const [mode, setMode] = useState<'edit' | 'delete' | 'none'>('none');

    const toggleEditMode = () => {
        setMode(prevMode => prevMode === "edit" ? "none" : "edit");
    };

    const toggleDeleteMode = () => {
        setMode(prevMode => prevMode === "delete" ? "none" : "delete");
    };

    return (
        <>
            <tr>
                <td>{player.id}</td>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.teamId}</td>
                <td>
                    <ActionButton onClick={toggleEditMode}>
                        {mode === 'edit' ? 'Cancel' : 'Edit'}
                    </ActionButton>
                </td>
                <td>
                    <ActionButton onClick={toggleDeleteMode}>
                        {mode === 'delete' ? 'Cancel' : 'Delete'}
                    </ActionButton>
                </td>
            </tr>
            {mode === 'edit' && (
                <tr>
                    <EditPlayerWrapper colSpan={6}>
                        <EditPlayer player={player}/>
                    </EditPlayerWrapper>
                </tr>
            )}
            {mode === 'delete' && (
                <tr>
                    <td colSpan={6}>
                        <DeletePlayerConfirmation player={player} onCancel={toggleDeleteMode}/>
                    </td>
                </tr>
            )}
        </>
    );
};


// export const OnePlayer = ({ player }: OnePlayerProps) => {
//     const [mode, setMode] = useState<'edit' | 'delete' | 'none'>('none');
//
//     const toggleEditMode = () => {
//         setMode(prevMode => prevMode === "edit" ? "none" : "edit");
//     };
//
//     const toggleDeleteMode = () => {
//         setMode(prevMode => prevMode === "delete" ? "none" : "delete");
//     };
//
//     return (
//             <ul style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 width: '800px'
//
//             }}>
//                 <li>{player.id}</li>
//                 <li>{player.firstName}</li>
//                 <li>{player.lastName}</li>
//                 <li>{player.teamId}</li>
//                 <li>
//                     <button onClick={toggleEditMode}>{mode === 'edit' ? 'Cancel' : 'Edit'}</button>
//                 </li>
//                 <li>
//                     <button onClick={toggleDeleteMode}>{mode === 'delete' ? 'Cancel' : 'Delete'}</button>
//                 </li>
//                 <li>
//                     {mode === 'edit' ? <EditPlayer player={player}/> : undefined}
//                 </li>
//                 <li>
//                     {mode === 'delete' ?
//                         <DeletePlayerConfirmation player={player} onCancel={toggleDeleteMode}/> : undefined}
//                 </li>
//             </ul>
//     );
// };