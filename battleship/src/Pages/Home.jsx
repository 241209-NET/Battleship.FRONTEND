import { useEffect, useState } from "react";
import "../css/App.css";
import { BarChart } from "@mui/x-charts/BarChart";
import Scoreboard from "../components/Scoreboard";
import GameList from "../components/GameList";
import axios from "axios";
<<<<<<< Updated upstream
import './css/Home.css'
=======

>>>>>>> Stashed changes

export default function Home() {
  const [leaderboard, setLeaderboard] = useState(true);
  const toggleLeader = () => {
    setLeaderboard(!leaderboard);
  };
  const [email, setEmail] = useState(sessionStorage.getItem("username"));
  const [name, setName] = useState(sessionStorage.getItem("accountName"));
  

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
    <div className="home">
      
      <div className="graph-user">
      <h2 id="StatsTitle">My Stats</h2>
      <div id="stats-content">
        <div className="user-info">
          <h2>Welcome {name}!</h2>
          <div id="WL">
          <p id="W">Wins: {stats.wins}</p>
          <p id="L">Losses: {stats.losses}</p>
          </div>
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
      </div>
      <div className="other-info">
       <Scoreboard></Scoreboard>
      </div>
      
    </div>
  );
}
