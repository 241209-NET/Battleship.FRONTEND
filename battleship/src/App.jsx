import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router"; // Correct import
import Game from "./Pages/Game";
import NavBar from "./components/NavBar";
import Home from "./Pages/Home";
import Waves from "./components/Waves";
import Signin from "./Pages/Signin";
import NotFound from "./components/NotFound";
import "./css/App.css";

// Component to give access only to Authenticated Users
const ProtectedRoute = ({ children }) => {
  return sessionStorage.getItem("userid") ? children : <Navigate to="/" />;
};

// Component to manage conditional NavBar rendering
function AppContent() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" && <h2 className="title">⚓ Battleship</h2>}
      {/* Conditionally render NavBar */}
      {location.pathname !== "/" && <NavBar />}
      <div className="body">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route
            path="/Home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Game"
            element={
              <ProtectedRoute> 
                <Game />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Waves />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
