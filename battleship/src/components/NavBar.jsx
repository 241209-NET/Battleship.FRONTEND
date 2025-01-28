import "./css/NavBar.css";
import { Link } from "react-router";
export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">⚓ Battleship</div>
      <div className="Nav">
        <Link to="/Home" className="link">
          Home
        </Link>
        <Link to="/Game" className="link">
          New Game
        </Link>
        <Link
          to="/"
          className="link"
          onClick={(e) => {
            sessionStorage.clear()
          }}
        >
          Log Out
        </Link>
      </div>
    </nav>
  );
}
