import { useState } from 'react'
import { Routes } from 'react-router'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogList from "./components/LogList"

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    <LogList></LogList>
      
    </>
  )
}

export default App
