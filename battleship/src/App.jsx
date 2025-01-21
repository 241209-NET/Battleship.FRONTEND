import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router'
import Game from './Pages/Game'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
