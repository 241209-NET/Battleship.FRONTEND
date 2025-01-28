import '../css/App.css';
import Scoreboard from '../components/Scoreboard';
import GameList from '../components/GameList';
import PlayerStats from '../components/PlayerStats';
import {useState} from 'react';


export default function Home() {
const [leaderboard, setLeaderboard] = useState(true);
const toggleLeader = () => {
    setLeaderboard(!leaderboard);
}
    return ( 

        

        <div className="home">
            <PlayerStats></PlayerStats>
           { leaderboard ? <Scoreboard></Scoreboard> : <GameList></GameList> }
           <button id="LeaderToggle" onClick={toggleLeader}>{leaderboard ? "My Games" : "Leaderboard"} </button>
        </div>
    )

}