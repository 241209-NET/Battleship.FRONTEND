import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scoreboard = () => {
    const [users, setUsers] = useState([]);

    const getData = async () => {
        try
        {
            const res = await axios.get('http://localhost:5298/api/User'); // will need to change
            setUsers(res.data);
        } catch (e)
        {
            console.error("Could not fetch Data: " , e);
        }
        
    };

    useEffect(() => {
        getData();
    }, []);

    const scores = users.map(user => ({
        id: user.id,
        username: user.accountName,
        wins: user.numWins,
        losses: user.numLosses,
        ratio: user.numLosses == 0 ? user.numWins : user.numWins / user.numLosses
    }));

    const sortedScores = scores.sort((a,b) => b.ratio - a.ratio);
    return (
        <div id="leader">
            <h2>Leaderboard</h2>
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
                            <tr key={user.id}>
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