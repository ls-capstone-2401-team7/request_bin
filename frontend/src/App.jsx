import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
// import { io } from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import Hello from './components/Hello'
import Test from './components/Test'

import './App.css'
// const socket = io('http://localhost:3000');

function App() {
  // const [count, setCount] = useState(0)

  // socket.on('backend', (message) => console.log(message))

  // useEffect(() => {
  //   socket.emit('frontend', "helloefromfrontendzooor")

  //   const testRequest =  async ( ) => fetch('http://localhost:3000')
  //   testRequest()
  // }, [])
  return (
    <>
    <Routes>
      <Route path='/' element={<Hello />}></Route>
      <Route path='/test' element={<Test />}></Route>
    </Routes>

    </>
  )
}

export default App
