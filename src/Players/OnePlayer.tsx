import { PlayerEntity } from "../types";
import { useState } from "react";
import { EditPlayer } from "./EditPlayer.tsx";
import { DeletePlayerConfirmation } from "./DeletePlayerConfirmation.tsx";


type OnePlayerProps = {
    player: PlayerEntity;
}


export const OnePlayer = ({ player }: OnePlayerProps) => {
    const [mode, setMode] = useState<'edit' | 'delete' | 'none'>('none');

    const toggleEditMode = () => {
        setMode(prevMode => prevMode === "edit" ? "none" : "edit");
    };

    const toggleDeleteMode = () => {
        setMode(prevMode => prevMode === "delete" ? "none" : "delete");
    };

    return (<>
            <tr>
                <td>{player.id}</td>
                <td>{player.firstName}</td>
                <td>{player.lastName}</td>
                <td>{player.teamId}</td>
                <td>
                    <button onClick={toggleEditMode}>{mode === 'edit' ? 'Cancel' : 'Edit'}</button>
                </td>
                <td>
                    <button onClick={toggleDeleteMode}>{mode === 'delete' ? 'Cancel' : 'Delete'}</button>
                </td>
                <td>
                    {mode === 'edit' ? <EditPlayer player={player}/> : undefined}
                </td>
                <td>
                    {mode === 'delete' ?
                        <DeletePlayerConfirmation player={player} onCancel={toggleDeleteMode}/> : undefined}
                </td>
            </tr>
        </>
    );
};