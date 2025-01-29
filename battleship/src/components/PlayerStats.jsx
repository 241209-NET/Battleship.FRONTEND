import { useState,useEffect } from 'react';
import axios from 'axios';

const PlayerStats = () => {
    const [stats, setStats] = useState([]);
    const tokenfromsesh = sessionStorage.getItem("token");

    const getData = async () => {
        try
        {
            const res = await axios.get('http://localhost:5298/Score', {
                headers: {
                    Authorization: `Bearer ${tokenfromsesh}`
                }
            });
            setStats(res.data);
            console.log(res.data);
        } catch (e)
        {
            console.error("Could not fetch Data: " , e);
        }
        
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div id="stats">
            <h2>Player Stats</h2>
                <h3>Wins: {stats.wins}</h3>
                <h3>Losses: {stats.losses}</h3>
        </div>
);
}

export default PlayerStats;
