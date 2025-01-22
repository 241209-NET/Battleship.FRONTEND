import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <div>
        <h2 className="title">Battleship</h2>
        <NavBar />
        <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        </div>
      </div>
      </Router>
    </>
  )
}

export default App
