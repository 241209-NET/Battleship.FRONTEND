import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router'
import Game from './Pages/Game'
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/Game' element={<Game />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
