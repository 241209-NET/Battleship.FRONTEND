import { useState,useEffect } from 'react';
import axios from 'axios';

const GameList = () => {
    const [games, setGameList] = useState([]);
    const [unfinshedGames, setUnfinishedGames] = useState(false);
    const tokenfromsesh = sessionStorage.getItem("token");

    const getData = async () => {
        try
        {
            const res = await axios.get(`${import.meta.env.VITE_API}/Game`, {
                headers: {
                    Authorization: `Bearer ${tokenfromsesh}`
                }
            }); // will need to change
            //const res = await axios.get(`http://localhost:5298/api/Game/id/${userIDfromsesh}`); 
            setGameList(res.data);
        } catch (e)
        {
            console.error("Could not fetch Data: " , e);
        }
        
    };

    useEffect(() => {
        getData();
    }, []);

    const toggleDisplay = () => {
        setUnfinishedGames(!unfinshedGames)
    };

    

    const unfinished = games.filter(g => g.status === false);
    

    return (
        <div id="log">
        <h2>Game Log</h2>
        <button id ="resumeButton" onClick={toggleDisplay}>Show Resumable Games</button>
        <table className="homeTable">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                </tr>
            </thead>
            <tbody>
                {unfinshedGames ? 
                    unfinished.map((g, index) => (
                        <tr key={index}>
                            <td>{g.status == true ? "In Progress" : "Completed"}</td>
                            <td>{g.startTime}</td>
                            <td>{g.endTime}</td>
                        </tr>
                    )) :
                games.map((g, index) => (
                    <tr key={index}>
                        <td>{g.status == true ? "In Progress" : "Completed"}</td>
                        <td>{g.startTime}</td>
                        <td>{g.endTime}</td>
                    </tr>
                ))}
            </tbody>
        </table>
</div>
);
}

export default GameList;
