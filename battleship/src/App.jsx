import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router'
import Game from './Pages/Game'
import NavBar from './components/NavBar';
import Home from './components/Home';
import './App.css'

function App() {

  return (
    <>
      <Router>
      <div>
        <h2 className="title">Battleship</h2>
        <NavBar />
        <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/Game' element={<Game />}/>
        </Routes>
        </div>
      </div>
      </Router>
    </>
  )
}

export default App
