import { PlayerEntity } from "../types";
import { useState } from "react";
import { EditPlayer } from "./EditPlayer.tsx";


type OnePlayerProps = {
    player: PlayerEntity;
}


export const OnePlayer = ({ player }: OnePlayerProps) => {
    const [mode, setMode] = useState<'edit' | 'delete' | 'none'>('none');

    const toggleEditMode = () => {
        setMode(prevMode => prevMode === "edit" ? "none" : "edit");
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
                    <button>Delete</button>
                </td>
                <td>

                        {mode === 'edit' ? <EditPlayer player={player}/> : undefined}

                </td>

            </tr>


        </>
    );
};