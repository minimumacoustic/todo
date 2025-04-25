import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { CommonParent } from './components/CommonParent'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <CommonParent/>
      
    </>
  )
}

export default App
