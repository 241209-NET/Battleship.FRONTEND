import { useEffect, useState } from "react";
import "../css/App.css";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Home() {
  const [data, setData] = useState([7, 4]);
  const [name, setUsername] = useState("name sample")
  const [email, setEmail] = useState(sessionStorage.getItem("username"))
  const [id, setId] = useState(sessionStorage.getItem("userid"))

  useEffect(() => {
    // get wins and losses
  }, []);

  return (
    <div className="home">
      <div className="graph-user">
        <div className="user-info">
          <h2>Welcome {name}</h2>
          <p>Email: {email}</p>
          <p>Id: {id}</p>
        </div>
        <div className="graph">
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: ["wins", "losses"],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: data,
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
        <h1>This will be some other info</h1>
      </div>
    </div>
  );
}
