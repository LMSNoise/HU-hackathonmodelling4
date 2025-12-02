import { useState } from 'react'
import { Routes, Route, Router, BrowserRouter } from 'react-router'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogList from "./components/LogList"

function App() {
  const [count, setCount] = useState(0)

  return (

    <>
    <BrowserRouter>
      <Routes>
      <Route path="/dashboard" element={<LogList />}></Route>
      <Route path="/login" element={<div>Login page</div>}></Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
