import { useState } from "react";
import { PlayerList } from "./Players/PlayerList.tsx";

export const FootballApp = () => {
    const [mode, setMode] = useState<'playerList' | 'teamList' | 'gameList' | 'none'>('none');


    const toggleShowPlayer = () => {
        setMode(prevMode => prevMode === 'playerList' ? 'none' : 'playerList');
    };
    const toggleShowTeams = () => {
        setMode(prevMode => prevMode === 'teamList' ? 'none' : 'teamList');
    };
    const toggleShowGame = () => {
        setMode(prevMode => prevMode === 'gameList' ? 'none' : 'gameList');
    };


    return (
        <>
            <div>
                <h1>Football App</h1>
                <button onClick={toggleShowPlayer}>{mode === 'playerList' ? 'Hide Players' : 'Show players'}</button>
                <button onClick={toggleShowTeams}>{mode === 'teamList' ? 'Hide Teams' : 'Show Teams'}</button>
                <button onClick={toggleShowGame}>{mode === 'gameList' ? 'Hide Teams' : 'Show Games'}</button>


            </div>
            <div>
                {mode === 'playerList' ? <PlayerList/> : undefined}
                {mode === 'teamList' ? <h2>Team List</h2> : undefined}
                {mode === 'gameList' ? <h2>Game List</h2> : undefined}
            </div>
        </>

    );

};