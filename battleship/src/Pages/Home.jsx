import { useEffect, useState } from "react";
import "../css/App.css";
import { BarChart } from "@mui/x-charts/BarChart";
import Scoreboard from "../components/Scoreboard";
import GameList from "../components/GameList";
import axios from "axios";
import './css/home.css'

export default function Home() {
  const [leaderboard, setLeaderboard] = useState(true);
  const toggleLeader = () => {
    setLeaderboard(!leaderboard);
  };
  const [email, setEmail] = useState(sessionStorage.getItem("username"));
  

  const [stats, setStats] = useState(["", 0, 0]);
  const tokenfromsesh = sessionStorage.getItem("token");

    const getData = async () => {
        try
        {
            const res = await axios.get(`${import.meta.env.VITE_API}/Score`, {
                headers: {
                    Authorization: `Bearer ${tokenfromsesh}`
                }
            });
            setStats(res.data);
            console.log(res.data.accountName);
        } catch (e)
        {
            console.error("Could not fetch Data: " , e);
        }
        
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(stats.accountName);

  return (
    <div className="home">
      <div className="graph-user">
        <div className="user-info">
          <h2>Welcome {stats.accountName}</h2>
          <p>Email: {email}</p>
          <p>Wins: {stats.wins}</p>
          <p>Losses: {stats.losses}</p>
        </div>
        <div className="graph">
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: ["Wins", "Losses"],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [stats.wins, stats.losses],
                color: "#006eff",
              },
            ]}
            width={500}
            height={300}
            borderRadius={20}
          />
        </div>
      </div>
      <div className="other-info">
        
        {leaderboard ? <Scoreboard></Scoreboard> : <GameList></GameList>}
        <button className="button"id="LeaderToggle" onClick={toggleLeader}>
          {leaderboard ? "My Games" : "Leaderboard"}{" "}
        </button>
      </div>
    </div>
  );
}
