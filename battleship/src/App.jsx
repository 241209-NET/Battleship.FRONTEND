import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router'; // Correct import
import Game from './Pages/Game';
import NavBar from './components/NavBar';
import Home from './components/Home';
import './App.css';
import Signin from './components/Signin';

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
          <Route path="/Home" element={<Home />} />
          <Route path="/Game" element={<Game />} />
        </Routes>
      </div>
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

export default App