import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Scoreboard.css';

const Scoreboard = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState(sessionStorage.getItem("accountName"));



    const getData = async () => {
        try
        {
            const res = await axios.get(`${import.meta.env.VITE_API}/api/User`); // will need to change
            setUsers(res.data);
            console.log(res.data);
        } catch (e)
        {
            console.error("Could not fetch Data: " , e);
        }
        
    };

    useEffect(() => {
        getData();
    }, []);

    const scores = users.map(user => ({
        username: user.accountName,
        wins: user.wins,
        losses: user.losses,
        ratio: user.losses === 0 ? user.wins : user.wins / user.losses
    }));

    const sortedScores = scores.sort((a,b) => b.ratio - a.ratio);
    return (
        <div id="leader">
            <div id="leaderTitle">
                <h2>Leaderboard</h2>
            </div>
                <table className="homeTable">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>W/L</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedScores.map((user, index) => (
                            <tr key= {index + 1}  className={ name == user.username ? "loggedUser" : "notLoggedUser"}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.wins}</td>
                                <td>{user.losses}</td>
                                <td>{user.ratio.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );

};

export default Scoreboard;