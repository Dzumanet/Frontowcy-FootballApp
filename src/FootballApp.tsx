import { useState } from "react";
import { PlayerList } from "./Players/PlayerList.tsx";
import { TeamsList } from "./Teams/TeamsList.tsx";
import { GamesList } from "./Games/GamesList.tsx";

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
                <button onClick={toggleShowGame}>{mode === 'gameList' ? 'Hide Games' : 'Show Games'}</button>


            </div>
            <div>
                {mode === 'playerList' ? <PlayerList/> : undefined}
                {mode === 'teamList' ? <TeamsList/> : undefined}
                {mode === 'gameList' ? <GamesList/> : undefined}
            </div>
        </>

    );

};